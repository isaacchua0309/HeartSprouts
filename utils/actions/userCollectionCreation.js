import { firestore } from '../firebaseHelper';
import { collection, doc, setDoc } from 'firebase/firestore';

export const createUserDocumentWithFriends = async (name, birthday, email, password) => {
  try {
    // Reference to the 'Users' collection with the document ID as email
    const userDocRef = doc(firestore, 'Users', email);

    // Set the document data
    await setDoc(userDocRef, {
      name: name,
      birthday: birthday,
      email: email,
      password: password
    });

    console.log('User document created with Friends subcollection');
  } catch (error) {
    console.error('Error creating user document: ', error);
  }
};
