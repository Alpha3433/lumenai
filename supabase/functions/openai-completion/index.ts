
// Follow this setup guide to integrate the Deno runtime:
// https://docs.supabase.com/guides/functions/deno-runtime
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// This function handles OpenAI API calls securely from the backend
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { prompt, model, temperature, max_tokens, isAuthenticated, priority, forceLiveResponse } = await req.json();
    
    // Get the OpenAI API key from environment variables
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!apiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Use the requested model or default to gpt-4o
    const useModel = model || 'gpt-4o';
    
    console.log(`Calling OpenAI API with model: ${useModel}`);
    console.log(`Request priority: ${priority || 'normal'}`);
    
    let systemMessage = 'You are a world-class business analyst and planner that generates comprehensive, detailed business plan content. ';
    
    // Check prompt type to add special formatting instructions
    const isValidationPrompt = prompt.toLowerCase().includes('financial and idea validation') || 
                               prompt.toLowerCase().includes('viability score');
    
    const isSwotPrompt = prompt.toLowerCase().includes('swot analysis');
    const isMarketAnalysisPrompt = prompt.toLowerCase().includes('market analysis');
    const isExecutiveSummaryPrompt = prompt.toLowerCase().includes('executive summary');
    
    // Add detailed system instructions based on prompt type
    if (isValidationPrompt) {
      systemMessage += `For validation scoring, format important category scores with double asterisks. For example: **1. Overall viability score: 75/100** and **2. Market need assessment: 80/100**. Use this format for all numeric scores. After each heading, list bullet points using - at the start of each point. ALWAYS PROVIDE A COMPLETE ANALYSIS - DO NOT CUT YOUR RESPONSE SHORT FOR ANY REASON. Include specific metrics and benchmarks based on current market conditions.`;
    } else if (isMarketAnalysisPrompt) {
      systemMessage += `For market analysis, include specific metrics like market size in dollars (e.g., $4.5 billion), growth rate percentages, and identify at least 3 real competitor companies. PROVIDE A COMPLETE ANALYSIS - NEVER CUT YOUR RESPONSE SHORT. Include all sections requested in the prompt and ensure each section is fully developed. DO NOT TRUNCATE YOUR RESPONSE FOR ANY REASON.`;
    } else if (isSwotPrompt) {
      systemMessage += `When creating a SWOT analysis, structure your response with clear headings for Strengths, Weaknesses, Opportunities, and Threats. For each category, provide EXACTLY 4 distinct and complete bullet points. IMPORTANT: Make sure each bullet point is a COMPLETE statement that stands on its own. DO NOT TRUNCATE YOUR RESPONSE FOR ANY REASON.`;
    } else if (isExecutiveSummaryPrompt) {
      systemMessage += `Create a concise and compelling executive summary with EXACTLY TWO PARAGRAPHS. The first paragraph should introduce the business concept, value proposition, and target market. The second paragraph should highlight the market opportunity, business model, and competitive advantage. Be specific, clear, and compelling. Include actual numbers, percentages, and concrete details where relevant. The summary must be COMPLETE and COHERENT. DO NOT TRUNCATE YOUR RESPONSE.`;
    } else {
      systemMessage += `PROVIDE A COMPLETE AND COMPREHENSIVE RESPONSE - DO NOT TRUNCATE OR CUT YOUR ANSWER SHORT FOR ANY REASON. Always provide strategic depth, industry-specific insights, and actionable recommendations based on current market trends and competitive dynamics.`;
    }
    
    // Call OpenAI API with optimized parameters for reliability
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: useModel,
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 2500, // Increased token limit for more thorough responses
        presence_penalty: 0.0,  // Reduced penalties for more reliable responses
        frequency_penalty: 0.0,
      })
    });
    
    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }
    
    const data = await openAIResponse.json();
    const text = data.choices?.[0]?.message?.content || '';
    
    console.log(`OpenAI response length: ${text.length} characters`);
    
    return new Response(
      JSON.stringify({ text: text, success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in openai-completion function:', error);
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
