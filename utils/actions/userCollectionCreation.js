import { firestore } from '../firebaseHelper';
import { collection, addDoc, doc } from 'firebase/firestore';

export const createUserDocumentWithFriends = async (name,birthday,email,password) => {
  try {
    // Create a new user document
    const userDocRef = await addDoc(collection(firestore, 'Users'),{
      // Example user data
      name: name,
      birthday: birthday,
      email: email,
      password: password
    });
    // Add a 'Friends' subcollection to the user document
    const friendsCollectionRef = collection(doc(firestore, 'Users', userDocRef.id), 'Friends');

    console.log('User document created with Friends subcollection');
  } catch (error) {
    console.error('Error creating user document: ', error);
  }
};
