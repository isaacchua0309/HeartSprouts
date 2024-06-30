// Import necessary modules
import firebase from 'firebase/app';
import 'firebase/database';
import PushNotification from 'react-native-push-notification';

// Initialize Firebase if not already done
// firebase.initializeApp(yourFirebaseConfig);

// Function to fetch events for all friends
async function fetchEventsForAllFriends(email) {
  const friendsRef = firebase.database().ref(`Users/${email}/Friends`);
  const friendsSnapshot = await friendsRef.once('value');
  
  const eventsPromises = [];
  
  friendsSnapshot.forEach(friend => {
    const eventsRef = firebase.database().ref(`friends/${friend.key}/Events`);
    const eventsPromise = eventsRef.once('value').then(eventsSnapshot => {
      const events = [];
      eventsSnapshot.forEach(event => {
        events.push({
          id: event.key,
          ...event.val()
        });
      });
      return events;
    });
    eventsPromises.push(eventsPromise);
  });
  
  // Wait for all events to be fetched
  const allEvents = await Promise.all(eventsPromises);
  
  return allEvents.flat(); // Combine events into a single array
}

// Function to filter upcoming events
function filterUpcomingEvents(events) {
  const now = new Date();
  return events.filter(event => new Date(event.date) > now);
}

// Function to schedule notifications for upcoming events
async function scheduleNotificationsForEvents(events) {
  events.forEach(event => {
    PushNotification.localNotificationSchedule({
      title: 'Upcoming Event',
      message: `${event.title} on ${event.date}`,
      date: new Date(event.date), // Date of the event
    });
  });
}

// Main function to handle event notifications
async function handleEventNotifications() {
  try {
    // Fetch events for all friends
    const allEvents = await fetchEventsForAllFriends();
    
    // Filter upcoming events
    const upcomingEvents = filterUpcomingEvents(allEvents);
    
    // Schedule notifications for upcoming events
    await scheduleNotificationsForEvents(upcomingEvents);
    
    console.log('Notifications scheduled successfully.');
  } catch (error) {
    console.error('Error handling event notifications:', error);
  }
}

export default handleEventNotifications;
