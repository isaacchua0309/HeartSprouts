const nlp = require('compromise');
const chrono = require('chrono-node');

// Function to parse dynamic input
function parseDynamicInput(input) {
  // Use chrono-node to parse dates
  const parsedDate = chrono.parseDate(input);
  const date = parsedDate ? parsedDate.toISOString().split('T')[0] : 'Unknown';

  // Use compromise to process the text
  const doc = nlp(input);

  // Extract user (assuming the user is a proper noun or noun after "with", "for", "to")
  const userMatch = doc.match('(with|for|to) [#ProperNoun]').out('array');
  const user = userMatch.length > 0 ? userMatch[0].split(' ')[1] : 'Unknown';

  // Extract event name (everything before "on", "at", "by", "in" that is not a date)
  const eventPrepositions = ['on', 'at', 'by', 'in'];
  let eventName = input;
  eventPrepositions.forEach(preposition => {
    const prepositionIndex = input.toLowerCase().indexOf(` ${preposition} `);
    if (prepositionIndex !== -1) {
      const potentialEventName = input.substring(0, prepositionIndex).trim();
      if (!chrono.parseDate(potentialEventName)) {
        eventName = potentialEventName;
      }
    }
  });

  return {
    user,
    date,
    eventName,
  };
}

// Example usage
const inputs = [
  "Dinner with Darren on May 13th",
  "Darren's wedding on the 16th of June",
  "Meeting with Alice at 3 PM",
  "Conference call with Bob on July 5th",
  "Lunch with Sarah tomorrow",
  "Project deadline on 10th August",
];

inputs.forEach(input => {
  const parsedData = parseDynamicInput(input);
  console.log(parsedData);
});
