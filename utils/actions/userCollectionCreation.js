import { firestore } from '../firebaseHelper';
import { collection, doc, setDoc } from 'firebase/firestore';

const reflectionQuestions = [
  { question: 'What is one thing you appreciate most about your friend/family member?', answered: false },
  { question: 'How does spending time with your friend/family member make you feel?', answered: false },
  { question: 'What was the most meaningful conversation you had with your friend/family member recently?', answered: false },
  { question: 'How do you express gratitude to your friend/family member?', answered: false },
  { question: 'What qualities do you admire in your friend/family member?', answered: false },
  { question: 'How do you show support when your friend/family member is going through a tough time?', answered: false },
  { question: 'What shared experiences have strengthened your bond with your friend/family member?', answered: false },
  { question: 'How do you ensure you are present during interactions with your friend/family member?', answered: false },
  { question: 'What are some ways you can improve communication with your friend/family member?', answered: false },
  { question: 'How do you handle disagreements or conflicts with your friend/family member?', answered: false },
  { question: 'What are your friend’s/family member\'s hobbies and interests, and how do you engage with them?', answered: false },
  { question: 'How do you celebrate your friend’s/family member\'s achievements and milestones?', answered: false },
  { question: 'What is a recent act of kindness you did for your friend/family member?', answered: false },
  { question: 'How do you maintain a balance between giving and receiving in your relationship?', answered: false },
  { question: 'What is one thing you can do to make your friend/family member feel more valued?', answered: false },
  { question: 'How do you create memorable moments with your friend/family member?', answered: false },
  { question: 'What boundaries do you set to ensure a healthy relationship with your friend/family member?', answered: false },
  { question: 'How do you show respect for your friend’s/family member\'s opinions and perspectives?', answered: false },
  { question: 'What is something new you learned about your friend/family member recently?', answered: false },
  { question: 'How do you ensure that your time together is meaningful and not just routine?', answered: false },
  { question: 'What role does forgiveness play in your relationship with your friend/family member?', answered: false },
  { question: 'How do you handle misunderstandings with your friend/family member?', answered: false },
  { question: 'What traditions or rituals do you share with your friend/family member?', answered: false },
  { question: 'How do you show appreciation for the little things your friend/family member does?', answered: false },
  { question: 'What is your favorite memory with your friend/family member?', answered: false },
  { question: 'How do you encourage your friend/family member to pursue their dreams and goals?', answered: false },
  { question: 'What is one way you can be a better listener for your friend/family member?', answered: false },
  { question: 'How do you make time for your friend/family member despite a busy schedule?', answered: false },
  { question: 'What are some fun activities you enjoy doing with your friend/family member?', answered: false },
  { question: 'How do you handle changes in your relationship with your friend/family member?', answered: false },
  { question: 'What is a lesson you learned from your friend/family member?', answered: false },
  { question: 'How do you show your friend/family member that you trust them?', answered: false },
  { question: 'What is one way you can help your friend/family member when they are stressed?', answered: false },
  { question: 'How do you express your love and care for your friend/family member?', answered: false },
  { question: 'What is something you admire about your friend’s/family member\'s character?', answered: false },
  { question: 'How do you handle jealousy or competition in your relationship with your friend/family member?', answered: false },
  { question: 'What is one thing you can do to create a positive atmosphere during your interactions?', answered: false },
  { question: 'How do you keep your relationship with your friend/family member exciting and fresh?', answered: false },
  { question: 'What are some ways you can show empathy towards your friend/family member?', answered: false },
  { question: 'How do you ensure that your actions align with your words in your relationship?', answered: false },
  { question: 'What is a goal you have for your relationship with your friend/family member?', answered: false },
  { question: 'How do you make your friend/family member feel heard and understood?', answered: false },
  { question: 'What is one thing you can do to support your friend’s/family member\'s mental health?', answered: false },
  { question: 'How do you celebrate diversity and differences in your relationship with your friend/family member?', answered: false },
  { question: 'What is a challenge you faced together with your friend/family member and how did you overcome it?', answered: false },
  { question: 'How do you show your friend/family member that you appreciate their uniqueness?', answered: false },
  { question: 'What is a value you share with your friend/family member?', answered: false },
  { question: 'How do you maintain a sense of fun and playfulness in your relationship?', answered: false },
  { question: 'What is one way you can show your friend/family member that you are dependable?', answered: false },
  { question: 'How do you handle the ebb and flow of closeness in your relationship?', answered: false },
  { question: 'What is something you can do to ensure your friend/family member feels included?', answered: false },
  { question: 'How do you reflect on and learn from the ups and downs of your relationship with your friend/family member?', answered: false },
];

export const createUserDocumentWithFriends = async (name, birthday, email, password) => {
  try {
    // Reference to the 'Users' collection with the document ID as email
    const userDocRef = doc(firestore, 'Users', email);

    // Set the document data
    await setDoc(userDocRef, {
      name: name,
      birthday: birthday,
      email: email,
      password: password,
      XP: 0,
      questions: reflectionQuestions
    });

    // Reference to the 'Friends' subcollection in the 'Users' document
    const friendsCollectionRef = collection(userDocRef, 'Friends');

    // Add a temporary document to the 'Friends' subcollection
    const tempDocRef = doc(friendsCollectionRef, 'Friends Init');
    await setDoc(tempDocRef, {
      tempField: 'tempValue',
    });

    console.log('User document created with Friends subcollection');
  } catch (error) {
    console.error('Error creating user document: ', error);
  }
};
