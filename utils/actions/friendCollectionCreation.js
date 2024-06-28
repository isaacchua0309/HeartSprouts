import { firestore } from '../firebaseHelper';
import { collection, doc, setDoc } from 'firebase/firestore';

export const createFriendDocumentWithEvents = async (email, name, birthday) => {
  try {
    // Reference to the 'Users' collection with the document ID as email
    const userDocRef = doc(firestore, `Users/${email}/Friends`, name);

    // Set the document data
    await setDoc(userDocRef, {
      name: name,
      birthday: birthday,
    });

    // Reference to the 'Events' subcollection in the 'Friends' document
    const eventsCollectionRef = collection(userDocRef, 'Events');

    // Add a temporary document to the 'Events' subcollection
    const tempDocRef = doc(eventsCollectionRef, 'EventsInit');
    await setDoc(tempDocRef, {
      tempField: 'tempValue',
    });

    console.log('User document created with Friends subcollection');
  } catch (error) {
    console.error('Error creating user document: ', error);
  }
};
