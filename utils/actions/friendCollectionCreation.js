import { firestore } from '../firebaseHelper';
import { collection, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';

export const createFriendDocumentWithEvents = async (email, name, birthday, image) => {
  try {
    // Reference to the 'Friends' subcollection
    const friendDocRef = doc(firestore, `Users/${email}/Friends`, name);

    // Check if a friend with the same name already exists
    const friendDoc = await getDoc(friendDocRef);
    if (friendDoc.exists()) {
      throw new Error('A friend with this name already exists.');
    }

    // Set the document data with the birthday as a Firebase Timestamp
    await setDoc(friendDocRef, {
      name: name,
      birthday: Timestamp.fromDate(birthday),
      image: image || null, // Save the image URL if provided, else save as null
    });

    // Reference to the 'Events' subcollection in the 'Friends' document
    const eventsCollectionRef = collection(friendDocRef, 'Events');

    // Add a temporary document to the 'Events' subcollection
    const tempDocRef = doc(eventsCollectionRef, 'EventsInit');
    await setDoc(tempDocRef, {
      tempField: 'tempValue',
    });

    console.log('User document created with Friends subcollection');
  } catch (error) {
    console.error('Error creating user document: ', error);
    throw error; // Rethrow error for higher-level error handling
  }
};
