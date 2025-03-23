
/**
 * Industry-specific competitor data and utilities
 */

/**
 * Identify industry-specific competitors based on the business context
 */
export function getIndustryCompetitors(businessContext: string): string[] {
  if (businessContext.includes('dating') || businessContext.includes('social') || 
      businessContext.includes('event') || businessContext.includes('festival') || 
      businessContext.includes('rave') || businessContext.includes('music') ||
      businessContext.includes('parties') || businessContext.includes('nightlife')) {
    return [
      "Tinder", "Bumble", "Hinge", "Feeld", "OkCupid", "Eventbrite", "Match.com", "Meetup",
      "Thursday", "Raya", "EDM Date", "Festival Connect", "Radiate", "Concert Buddy"
    ];
  } 
  else if (businessContext.includes('fitness') || businessContext.includes('health') || 
          businessContext.includes('wellness') || businessContext.includes('workout') ||
          businessContext.includes('gym') || businessContext.includes('exercise')) {
    return [
      "Peloton", "MyFitnessPal", "Fitbit", "Strava", "Nike Training Club", "Calm", "Headspace",
      "ClassPass", "Noom", "WW", "Life Time Fitness", "Planet Fitness", "Equinox"
    ];
  } 
  else if (businessContext.includes('food') || businessContext.includes('restaurant') || 
          businessContext.includes('delivery') || businessContext.includes('grocery') ||
          businessContext.includes('meal') || businessContext.includes('cooking')) {
    return [
      "Uber Eats", "DoorDash", "Grubhub", "Instacart", "Deliveroo", "HelloFresh", "Blue Apron",
      "Postmates", "Seamless", "GoPuff", "ChowNow", "Whole Foods", "Sprouts", "Trader Joe's"
    ];
  } 
  else if (businessContext.includes('finance') || businessContext.includes('banking') || 
          businessContext.includes('investment') || businessContext.includes('fintech') ||
          businessContext.includes('payment') || businessContext.includes('loan')) {
    return [
      "Robinhood", "Acorns", "Wealthfront", "Betterment", "Mint", "Personal Capital", "SoFi",
      "Chime", "Venmo", "Cash App", "PayPal", "Plaid", "Stripe", "Square"
    ];
  } 
  else if (businessContext.includes('education') || businessContext.includes('learning') || 
          businessContext.includes('teaching') || businessContext.includes('school') ||
          businessContext.includes('training') || businessContext.includes('course')) {
    return [
      "Coursera", "Udemy", "edX", "Khan Academy", "Duolingo", "Chegg", "Skillshare",
      "Brilliant", "MasterClass", "Codecademy", "Quizlet", "LinkedIn Learning", "Pluralsight"
    ];
  }
  else if (businessContext.includes('travel') || businessContext.includes('vacation') || 
          businessContext.includes('tourism') || businessContext.includes('hotel') ||
          businessContext.includes('booking') || businessContext.includes('trip')) {
    return [
      "Airbnb", "Booking.com", "Expedia", "TripAdvisor", "Hotels.com", "Kayak", "Hopper",
      "Vrbo", "Priceline", "Skyscanner", "Google Flights", "Marriott", "Hilton"
    ];
  }
  else if (businessContext.includes('real estate') || businessContext.includes('property') || 
          businessContext.includes('home') || businessContext.includes('housing') ||
          businessContext.includes('apartment') || businessContext.includes('rental')) {
    return [
      "Zillow", "Redfin", "Trulia", "Realtor.com", "Compass", "Century 21", "RE/MAX",
      "Apartments.com", "Keller Williams", "CoStar", "LoopNet", "Opendoor"
    ];
  }
  else if (businessContext.includes('ecommerce') || businessContext.includes('retail') || 
          businessContext.includes('shopping') || businessContext.includes('store') ||
          businessContext.includes('marketplace')) {
    return [
      "Amazon", "Shopify", "Walmart", "eBay", "Etsy", "Target", "Wayfair",
      "Best Buy", "Alibaba", "ASOS", "Chewy", "Home Depot", "Lowe's"
    ];
  }
  else if (businessContext.includes('software') || businessContext.includes('saas') || 
          businessContext.includes('tech') || businessContext.includes('app') ||
          businessContext.includes('platform') || businessContext.includes('it')) {
    return [
      "Microsoft", "Google", "Salesforce", "Adobe", "Oracle", "SAP", "Slack",
      "Zoom", "Atlassian", "Dropbox", "HubSpot", "ServiceNow", "Workday"
    ];
  }
  
  return [];
}
