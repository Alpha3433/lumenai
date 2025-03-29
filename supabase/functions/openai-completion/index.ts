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
    
    // Enhanced system messages for premium models (gpt-4o)
    let systemMessage = '';
    
    // Check if this is a premium model request
    const isPremiumModel = model === 'gpt-4o';
    
    // Check prompt type to add special formatting instructions
    const isValidationPrompt = prompt.toLowerCase().includes('financial and idea validation') || 
                               prompt.toLowerCase().includes('viability score');
    
    const isIndustryOverviewPrompt = prompt.toLowerCase().includes('industry overview');
    
    const isSwotPrompt = prompt.toLowerCase().includes('swot analysis');

    const isMarketAnalysisPrompt = prompt.toLowerCase().includes('market analysis');
    
    // Add special system instructions based on prompt type
    if (isValidationPrompt) {
      systemMessage = `You are a ${isPremiumModel ? 'world-class business analyst and venture capitalist with decades of experience' : 'helpful assistant'} that generates business plan content. For validation scoring, format important category scores with double asterisks. For example: **1. Overall viability score: 75/100** and **2. Market need assessment: 80/100**. Use this format for all numeric scores. After each heading, list bullet points using - at the start of each point. This is CRITICAL FOR PROPER DISPLAY of the report.`;
      
      if (isPremiumModel) {
        systemMessage += ' Provide significantly more detailed analysis and use real-world examples from relevant industries. Include specific metrics and benchmarks based on current market conditions.';
      }
    } else if (isMarketAnalysisPrompt) {
      systemMessage = `You are a ${isPremiumModel ? 'leading industry expert with access to comprehensive market research and data analytics tools' : 'helpful assistant'} that generates business plan content. For market analysis, include specific metrics like market size in dollars (e.g., $4.5 billion), growth rate percentages, age demographics, and identify real competitor companies with estimates of their market share and revenue.`;
      
      if (isPremiumModel) {
        systemMessage += ' Since this is a premium analysis, include more granular market segments, more detailed competitor analysis with at least 5-7 specific companies, and provide more nuanced insights about market entry barriers with industry-specific regulations and compliance requirements.';
      }
    } else if (isIndustryOverviewPrompt) {
      systemMessage = `You are a ${isPremiumModel ? 'detailed industry expert with access to comprehensive market research and data analytics tools' : 'helpful assistant'} that generates detailed industry overviews for business plans. Your task is to create ONLY an industry overview section that focuses exclusively on industry trends, market size, growth rates, and industry-specific information. Start with a heading "Industry Overview" and then provide 12-15 detailed sentences about the industry itself. Include specific metrics like total market size in dollars (e.g., $4.5 billion), compound annual growth rate percentages, technological trends, regulatory considerations, and consumer behavior patterns in the industry. IMPORTANT: When writing decimals in dollar amounts or percentages, make sure there is NO SPACE between the number and decimal point (use $4.5 not $4. 5). Do NOT include any information about competitors, Porter's Five Forces, or business-specific strategies. Focus ONLY on the industry as a whole. Use specific numbers, percentages, and factual market information throughout.`;
      
      if (isPremiumModel) {
        systemMessage += ' For this premium analysis, include detailed geographic breakdowns of the market, identify industry-specific supply chain considerations, and highlight niche segments with high growth potential.';
      }
    } else if (isSwotPrompt) {
      systemMessage = `You are a ${isPremiumModel ? 'renowned business strategist with expertise in business planning and market analysis' : 'helpful assistant'} that generates SWOT analyses for business plans. When creating a SWOT analysis, structure the response with clear headings for Strengths, Weaknesses, Opportunities, and Threats. For each category, provide 4 distinct and complete bullet points. IMPORTANT: Make sure each bullet point is a COMPLETE statement that stands on its own. DO NOT split a single strength, weakness, opportunity, or threat across multiple bullet points. Each bullet point should express one complete idea. Format your response exactly as follows (including the bullet points and whitespace):\n\n**Strengths**\n• [Complete strength 1]\n• [Complete strength 2]\n• [Complete strength 3]\n• [Complete strength 4]\n\n**Weaknesses**\n• [Complete weakness 1]\n• [Complete weakness 2]\n• [Complete weakness 3]\n• [Complete weakness 4]\n\n**Opportunities**\n• [Complete opportunity 1]\n• [Complete opportunity 2]\n• [Complete opportunity 3]\n• [Complete opportunity 4]\n\n**Threats**\n• [Complete threat 1]\n• [Complete threat 2]\n• [Complete threat 3]\n• [Complete threat 4]';
      
      if (isPremiumModel) {
        systemMessage += ' For this premium SWOT analysis, ensure that each point is highly specific with actual industry references, market statistics, and references to relevant technological or economic factors.';
      }
    } else if (prompt.toLowerCase().includes('executive summary')) {
      systemMessage = `You are a ${isPremiumModel ? 'renowned business strategist with expertise in business planning and market analysis' : 'helpful assistant'} that generates business plan content. Create a concise and compelling executive summary with exactly two paragraphs. The first paragraph should introduce the business concept, value proposition, and target market. The second paragraph should highlight the market opportunity, business model, and competitive advantage.`;
      
      if (isPremiumModel) {
        systemMessage += ' For this premium executive summary, include more strategic insights and specific market positioning details while maintaining the concise two-paragraph format.';
      }
    } else {
      systemMessage = `You are a ${isPremiumModel ? 'renowned business strategist with expertise in business planning and market analysis' : 'helpful assistant'} that generates business plan content. When including numbers with decimal points, always ensure there is no space between the number and the decimal point (use 4.5 not 4. 5).`;
      
      if (isPremiumModel) {
        systemMessage += ' Since this is a premium analysis, provide more strategic depth, industry-specific insights, and actionable recommendations based on current market trends and competitive dynamics.';
      }
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
