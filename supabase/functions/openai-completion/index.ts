
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
    const { prompt, model, temperature, max_tokens } = await req.json();
    
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
    
    console.log(`Calling OpenAI API with model: ${model}`);
    
    // Check if this is a financial validation prompt to add special formatting instructions
    const isValidationPrompt = prompt.toLowerCase().includes('financial and idea validation') || 
                               prompt.toLowerCase().includes('viability score');
    
    // Add special system instructions based on prompt type
    let systemMessage = '';
    
    if (isValidationPrompt) {
      systemMessage = 'You are a helpful assistant that generates business plan content. For validation scoring, format important category scores with double asterisks. For example: **1. Overall viability score: 75/100** and **2. Market need assessment: 80/100**. Use this format for all numeric scores. After each heading, list bullet points using - at the start of each point. This is CRITICAL FOR PROPER DISPLAY of the report.';
    } else if (prompt.toLowerCase().includes('market analysis')) {
      systemMessage = 'You are a helpful assistant that generates business plan content. For market analysis, include specific metrics like market size in dollars (e.g., $4.5 billion), growth rate percentages, age demographics, and identify real competitor companies with estimates of their market share and revenue. Format any statistics with numbers and percentages clearly. Provide detailed information on at least 3-4 specific real companies in this industry, including their year founded, approximate annual revenue, and key strengths/weaknesses.';
    } else if (prompt.toLowerCase().includes('executive summary')) {
      systemMessage = 'You are a helpful assistant that generates business plan content. Create a concise and compelling executive summary with exactly two paragraphs. The first paragraph should introduce the business concept, value proposition, and target market. The second paragraph should highlight the market opportunity, business model, and competitive advantage.';
    } else if (prompt.toLowerCase().includes('industry overview')) {
      systemMessage = 'You are a helpful assistant that generates detailed industry overviews for business plans. Create a comprehensive overview with AT LEAST 14-16 detailed sentences. Include specific metrics like total market size in dollars (e.g., $4.5 billion), compound annual growth rate percentages, key technological trends, regulatory considerations, consumer behavior patterns, major industry challenges, emerging opportunities, and competitive dynamics. Do not label this as "Industry Overview" - just provide the detailed content directly. Use specific numbers, percentages, and factual market information throughout. Mention how recent macroeconomic factors, technological innovations, and shifts in consumer preferences are influencing the industry. Discuss supply chain considerations, labor market dynamics affecting the industry, and potential future developments over the next 3-5 years. Include information about industry consolidation trends, international market expansion opportunities, sustainability considerations, and any disruptive technologies reshaping the competitive landscape. Additionally, discuss how changing demographics and societal shifts are creating new market segments. Analyze how investment patterns in the industry have changed over the past 5 years and how they might evolve in the future. Include at least 3-4 specific statistical data points with dollar amounts or percentages.';
    } else {
      systemMessage = 'You are a helpful assistant that generates business plan content.';
    }
    
    // Call OpenAI API using Chat Completions endpoint (newer API)
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 1000
      })
    });
    
    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }
    
    const data = await openAIResponse.json();
    const text = data.choices?.[0]?.message?.content || '';
    
    return new Response(
      JSON.stringify({ text, success: true }),
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
