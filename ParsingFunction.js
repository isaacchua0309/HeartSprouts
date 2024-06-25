// Import a date parsing library (date-fns)
import { parse, format } from 'date-fns';

// Function to parse dynamic input
function parseDynamicInput(input) {
  // Regular expression patterns
  const datePatterns = [
    /\b(\d{1,2}(?:st|nd|rd|th)?\s+of\s+\w+)\b/i, // 16th of June
    /\b(\w+\s+\d{1,2}(?:st|nd|rd|th)?)\b/i,       // May 13th
  ];
  const userPattern = /\b(?:with|for|to)\s+(\w+)\b/i; // with Darren
  const eventPattern = /^(.+?)\s+(?:on|at|by|in)\b/i; // Dinner with Darren

  let date = null;
  let user = null;
  let eventName = null;

  // Extract date
  for (let pattern of datePatterns) {
    const dateMatch = input.match(pattern);
    if (dateMatch) {
      date = parse(dateMatch[1], 'MMMM do', new Date());
      if (isNaN(date)) {
        date = parse(dateMatch[1], 'do MMMM', new Date());
      }
      break;
    }
  }

  // Extract user
  const userMatch = input.match(userPattern);
  if (userMatch) {
    user = userMatch[1];
  }

  // Extract event name
  const eventMatch = input.match(eventPattern);
  if (eventMatch) {
    eventName = eventMatch[1];
  }

  // Return the parsed data
  return {
    user: user || 'Unknown',
    date: date ? format(date, 'yyyy-MM-dd') : 'Unknown',
    eventName: eventName || 'Unknown'
  };
}

// Example usage
const inputs = [
  "Dinner with Darren on May 13th",
  "Darren's wedding on the 16th of June"
];

inputs.forEach(input => {
  const parsedData = parseDynamicInput(input);
  console.log(parsedData);
});