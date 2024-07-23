import { firestore, storage } from '../firebaseHelper';
import { collection, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const createFriendDocumentWithEvents = async (email, name, birthday, imageUri) => {
  try {
    const friendDocRef = doc(firestore, `Users/${email}/Friends`, name);

    const friendDoc = await getDoc(friendDocRef);
    if (friendDoc.exists()) {
      throw new Error('A friend with this name already exists.');
    }

    let imageUrl = null;
    if (imageUri) {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const storageRef = ref(storage, `profileImages/${filename}`);
      await uploadBytes(storageRef, blob);
      imageUrl = await getDownloadURL(storageRef);
    }

    await setDoc(friendDocRef, {
      name: name,
      birthday: Timestamp.fromDate(birthday),
      image: imageUrl,
    });

    const eventsCollectionRef = collection(friendDocRef, 'Events');
    const tempDocRef = doc(eventsCollectionRef, 'EventsInit');
    await setDoc(tempDocRef, {
      tempField: 'tempValue',
    });

    console.log('User document created with Friends subcollection');
  } catch (error) {
    console.error('Error creating user document: ', error);
    throw error;
  }
};

