import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseHelper';

const fetchEventsForFriend = async (email, friendName) => {
  try {
    const eventsCollectionRef = collection(firestore, `Users/${email}/Friends/${friendName}/Events`);
    const querySnapshot = await getDocs(eventsCollectionRef);
    const eventsList = querySnapshot.docs
      .filter(doc => doc.id !== 'EventsInit')
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    return eventsList;
  } catch (error) {
    console.error('Error fetching events: ', error);
    throw error;
  }
};

export default fetchEventsForFriend;
