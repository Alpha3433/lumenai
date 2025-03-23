
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
    
    // Check prompt type to add special formatting instructions
    const isValidationPrompt = prompt.toLowerCase().includes('financial and idea validation') || 
                               prompt.toLowerCase().includes('viability score');
    
    const isIndustryOverviewPrompt = prompt.toLowerCase().includes('industry overview');
    
    // Add special system instructions based on prompt type
    let systemMessage = '';
    
    if (isValidationPrompt) {
      systemMessage = 'You are a helpful assistant that generates business plan content. For validation scoring, format important category scores with double asterisks. For example: **1. Overall viability score: 75/100** and **2. Market need assessment: 80/100**. Use this format for all numeric scores. After each heading, list bullet points using - at the start of each point. This is CRITICAL FOR PROPER DISPLAY of the report.';
    } else if (prompt.toLowerCase().includes('market analysis')) {
      systemMessage = 'You are a helpful assistant that generates business plan content. For market analysis, include specific metrics like market size in dollars (e.g., $4.5 billion), growth rate percentages, age demographics, and identify real competitor companies with estimates of their market share and revenue. Format any statistics with numbers and percentages clearly. IMPORTANT: Include a dedicated section titled "Key Competitors" with detailed information on at least 4-5 specific real companies in this industry. For each competitor, use this format: "Company: [Name], Market Share: [percentage], Founded: [year], Revenue: [$amount], Strength: [main strength], Weakness: [main weakness]". Always include these exact fields for each competitor. ALSO INCLUDE a section titled "Porter\'s Five Forces Analysis" with subsections for each of the five forces: "Threat of New Entrants", "Threat of Substitution", "Bargaining Power of Suppliers", "Bargaining Power of Buyers", and "Competitive Rivalry". For each force, indicate whether it is HIGH, MEDIUM, or LOW, and provide 3-4 bullet points explaining why.';
    } else if (isIndustryOverviewPrompt) {
      systemMessage = 'You are a helpful assistant that generates detailed industry overviews for business plans. Your task is to create ONLY an industry overview section that focuses exclusively on industry trends, market size, growth rates, and industry-specific information. Start with a heading "Industry Overview" and then provide 12-15 detailed sentences about the industry itself. Include specific metrics like total market size in dollars (e.g., $4.5 billion), compound annual growth rate percentages, technological trends, regulatory considerations, and consumer behavior patterns in the industry. IMPORTANT: When writing decimals in dollar amounts or percentages, make sure there is NO SPACE between the number and decimal point (use $4.5 not $4. 5). Do NOT include any information about competitors, Porter\'s Five Forces, or business-specific strategies. Focus ONLY on the industry as a whole. Use specific numbers, percentages, and factual market information throughout.';
    } else if (prompt.toLowerCase().includes('executive summary')) {
      systemMessage = 'You are a helpful assistant that generates business plan content. Create a concise and compelling executive summary with exactly two paragraphs. The first paragraph should introduce the business concept, value proposition, and target market. The second paragraph should highlight the market opportunity, business model, and competitive advantage.';
    } else {
      systemMessage = 'You are a helpful assistant that generates business plan content. When including numbers with decimal points, always ensure there is no space between the number and the decimal point (use 4.5 not 4. 5).';
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
    
    // Post-process the response to fix any remaining decimal formatting issues
    const fixedText = text
      .replace(/(\d+)\.\s+(\d+)/g, '$1.$2')
      .replace(/\$(\d+)\.\s+(\d+)/g, '\$$1.$2');
    
    return new Response(
      JSON.stringify({ text: fixedText, success: true }),
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
