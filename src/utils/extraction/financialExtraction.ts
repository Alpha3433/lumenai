
// Helper functions to extract financial data from business plan

export function extractRevenue(financialText: string | undefined): { year1: string; year3: string } | null {
  if (!financialText) return null;
  
  // Look for Year 1 revenue projections with improved pattern matching
  const year1Match = financialText?.match(/Year 1.*?\$(\d+[,\d]*(\.\d+)?)/i) ||
                     financialText?.match(/first year.*?\$(\d+[,\d]*(\.\d+)?)/i) ||
                     financialText?.match(/\$(\d+[,\d]*(\.\d+)?)\s*(?:in|for|during)\s*(?:the\s*)?first\s*year/i);
  
  // Look for Year 3 revenue projections
  const year3Match = financialText?.match(/Year 3.*?\$(\d+[,\d]*(\.\d+)?)/i) ||
                     financialText?.match(/third year.*?\$(\d+[,\d]*(\.\d+)?)/i) ||
                     financialText?.match(/\$(\d+[,\d]*(\.\d+)?)\s*(?:in|for|during)\s*(?:the\s*)?third\s*year/i);
  
  // If we can't find specific year matches, look for any dollar amounts
  const anyDollarMatch = financialText?.match(/\$(\d+[,\d]*(\.\d+)?)/i);
  
  return {
    year1: year1Match ? 
      (year1Match[0].includes("$") ? year1Match[0].match(/\$[^\s]*/)?.[0] || "Revenue Projections Pending" : `$${year1Match[1]}`) : 
      anyDollarMatch ? anyDollarMatch[0] : "Revenue Projections Pending",
    year3: year3Match ? 
      (year3Match[0].includes("$") ? year3Match[0].match(/\$[^\s]*/)?.[0] || "3-Year Projection Pending" : `$${year3Match[1]}`) : 
      "3-Year Projection Pending"
  };
}
