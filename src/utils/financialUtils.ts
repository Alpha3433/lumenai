
export interface FinancialItem {
  year: string;
  amount: number;
}

export interface FinancialData {
  revenue: FinancialItem[];
  expenses: FinancialItem[];
  profit: FinancialItem[];
  breakEven: string;
}

export const extractFinancialData = (text: string): FinancialData => {
  // Default data structure
  const data = {
    revenue: [
      { year: 'Year 1', amount: 100000 },
      { year: 'Year 2', amount: 150000 },
      { year: 'Year 3', amount: 225000 }
    ],
    expenses: [
      { year: 'Year 1', amount: 80000 },
      { year: 'Year 2', amount: 110000 },
      { year: 'Year 3', amount: 160000 }
    ],
    profit: [
      { year: 'Year 1', amount: 20000 },
      { year: 'Year 2', amount: 40000 },
      { year: 'Year 3', amount: 65000 }
    ],
    breakEven: "12 months"
  };

  // Try to extract real numbers from the text
  try {
    // Find year 1 revenue
    const year1Match = text.match(/year\s*1.*?\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:k|m|b|thousand|million|billion)?/i) ||
                       text.match(/first\s*year.*?\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:k|m|b|thousand|million|billion)?/i);
    
    // Find year 2 revenue
    const year2Match = text.match(/year\s*2.*?\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:k|m|b|thousand|million|billion)?/i) ||
                       text.match(/second\s*year.*?\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:k|m|b|thousand|million|billion)?/i);
    
    // Find year 3 revenue
    const year3Match = text.match(/year\s*3.*?\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:k|m|b|thousand|million|billion)?/i) ||
                       text.match(/third\s*year.*?\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:k|m|b|thousand|million|billion)?/i);
    
    // Break-even
    const breakEvenMatch = text.match(/break[- ]even.*?(\d+)\s*(month|year|day|week)/i);
    
    if (year1Match && year1Match[1]) {
      data.revenue[0].amount = parseFinancialValue(year1Match[0]);
    }
    
    if (year2Match && year2Match[1]) {
      data.revenue[1].amount = parseFinancialValue(year2Match[0]);
    }
    
    if (year3Match && year3Match[1]) {
      data.revenue[2].amount = parseFinancialValue(year3Match[0]);
    }
    
    if (breakEvenMatch) {
      data.breakEven = `${breakEvenMatch[1]} ${breakEvenMatch[2]}${breakEvenMatch[1] !== '1' ? 's' : ''}`;
    }

    // Calculate reasonable expenses and profits based on the revenue
    data.expenses = data.revenue.map(item => ({
      year: item.year,
      amount: Math.round(item.amount * 0.7) // Assume expenses are 70% of revenue
    }));

    data.profit = data.revenue.map((item, index) => ({
      year: item.year,
      amount: item.amount - data.expenses[index].amount
    }));

    return data;
  } catch (e) {
    console.log("Error parsing financial data:", e);
    return data;
  }
};

export const parseFinancialValue = (valueString: string): number => {
  // Remove $ and commas
  const cleaned = valueString.replace(/[$,]/g, '');
  
  // Extract the numeric part and potential multiplier (k, m, b)
  const match = cleaned.match(/(\d+(?:\.\d+)?)\s*(?:thousand|million|billion|k|m|b)?/i);
  
  if (!match) return 0;
  
  let value = parseFloat(match[1]);
  const multiplier = match[2]?.toLowerCase();
  
  // Apply multiplier if present
  if (multiplier === 'k' || multiplier === 'thousand') value *= 1000;
  else if (multiplier === 'm' || multiplier === 'million') value *= 1000000;
  else if (multiplier === 'b' || multiplier === 'billion') value *= 1000000000;
  
  return value;
};
