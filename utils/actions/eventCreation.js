import { firestore } from '../firebaseHelper';
import { doc, collection, setDoc } from 'firebase/firestore';

/**
 * Adds an event to a specified person's directory in Firebase Firestore.
 * 
 * @param {string} name - The name of the person.
 * @param {string} eventName - The name of the event.
 * @param {Date} date - The date of the event.
 * @returns {Promise<void>}
 */
export const addEventToPerson = async (email, name, eventName, date) => {
  try {
    // Reference to the person's document in the 'Users' collection
    const personDocRef = doc(firestore, `/Users/${email}/Friends`,name);
    
    // Reference to the 'Events' subcollection within the person's document
    const eventsCollectionRef = collection(personDocRef, 'Events');
    
    // Create a new event document with a generated ID
    const eventDocRef = doc(eventsCollectionRef);

    // Set the event data
    await setDoc(eventDocRef, {
      eventName: eventName,
      date: date
    });

    console.log(`Event '${eventName}' added to ${name}'s directory`);
  } catch (error) {
    console.error('Error adding event: ', error);
  }
};
