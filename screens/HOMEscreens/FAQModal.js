import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/colors';

const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "What is HeartSprouts?",
        answer: "HeartSprouts is an emotional well-being and relationship management app designed to help you nurture your emotional health and maintain meaningful connections with friends and family.",
      },
      {
        question: "How does HeartSprouts work?",
        answer: "HeartSprouts allows you to track your mood, journal your thoughts, manage relationships, and receive notifications for important dates and events. It uses engaging features like an emotional pet and weekly prompts to encourage regular use.",
      },
      {
        question: "Is HeartSprouts free to use?",
        answer: "Yes, HeartSprouts offers a free version with core features. There may be premium features available in the future.",
      },
      {
        question: "How do I get started with HeartSprouts?",
        answer: "Download the app, create an account by providing your name, birthday, email, and password, and then follow the onboarding prompts to set up your profile.",
      },
      {
        question: "What platforms is HeartSprouts available on?",
        answer: "HeartSprouts is available on both iOS and Android platforms.",
      },
    ],
  },
  {
    category: "Account and Profile",
    questions: [
      {
        question: "How do I create an account?",
        answer: "Open the app, select 'Get Started', and follow the prompts to enter your name, birthday, email, and password.",
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer: "On the login screen, click 'Forgot Password?'' and follow the instructions to reset your password via email.",
      },
      {
        question: "How do I update my profile information?",
        answer: "Go to the Profile section by clicking on your avatar, and you can update your name, email, and other personal information.",
      },
      {
        question: "Can I change my password?",
        answer: "Yes, you can change your password in the settings section of your profile.",
      },
      {
        question: "How do I delete my account?",
        answer: "To delete your account, contact support through the Help section in the app. They will assist you in deleting your account.",
      },
    ],
  },
  {
    category: "Mood Tracking & Journaling",
    questions: [
      {
        question: "How do I track my mood?",
        answer: "On the Home screen, click 'Choose Your Mood' to select how you’re feeling. This will update your mood and provide relevant quotes.",
      },
      {
        question: "What are weekly journal prompts?",
        answer: "Weekly journal prompts are questions that encourage you to reflect on your emotional state and relationships. You can answer these prompts in the Prompt Answer screen.",
      },
      {
        question: "How do I view my past journal entries?",
        answer: "Go to the Weekly Reflection screen to view your past journal entries and see trends in your relationship satisfaction.",
      },
      {
        question: "Can I edit or delete a journal entry?",
        answer: "Currently, entries are not editable to maintain the integrity of your reflections, but you can contact support for specific requests.",
      },
      { 
        question: "How do I earn experience points (XP)?",
        answer: "You earn XP by tracking your mood, completing journal prompts, and engaging with the app regularly.",
      },
    ],
  },
  {
    category: "Relationship Manager",
    questions: [
      {
        question: "How do I add a new friend?",
        answer: "avigate to the User Profiles screen and click 'Add Friend.'' Enter your friend’s name, birthday, and upload an optional image.",
      },
      {
        question: "How do I view and edit a friend’s profile?",
        answer: "Click on a friend’s profile from the User Profiles screen to view their details. You can edit their information or add events by clicking the edit button.",
      },
      {
        question: "What kind of events can I add for friends?",
        anwer: "You can add events like birthdays, anniversaries, and special reminders. The app will notify you ahead of these events.",
      },
      { 
        question: "Can I delete a friend’s profile?",
        answer: "Yes, go to the friend’s profile and select 'Delete Profile' to remove them and their associated events from your list.",
      },
      {
        question: "How do I manage my friends list?",
        answer: "You can add, edit, and delete friends from the User Profiles screen. Use the search function to quickly find specific friends.",
      },
      {
        question: "How do I know which relationships were the highlights of my week?",
        answer: "Use the Relationship Satisfied screen to select up to three relationships that stood out during the week. This helps you focus on positive interactions."
      },
    ],
  },
  {
    category: "Notifications",
    questions: [
      {
        question: "How do I manage notifications?",
        answer: "You can manage your notification preferences in the Settings section. The app will send reminders for important events and weekly prompts.",
      },
      {
        question: "Will I receive notifications for all events?",
        answer: "Yes, the app sends notifications for all events you add to ensure you don’t miss important dates.",
      },
      {
        question: "How do I set up notifications for events?",
        anwer: "When you add an event to a friend's profile, the app automatically schedules a notification. You can manage these notifications in the settings.",
      },
      { 
        question: "Can I turn off notifications?",
        answer: "Yes, you can turn off notifications or customize them in the Settings section.",
      },
    ],
  },
  {
  category: "Technical Support",
  questions: [
    {
      question: "The app is not working correctly. What should I do?",
      answer: "Try restarting the app or your device. If the issue persists, contact support through the app’s help section.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach customer support via the Help section in the Profile or Settings menu. There you can find options to send an email or access live chat.",
    },
    {
      question: "Is my data secure?",
      anwer: "Yes, HeartSprouts uses industry-standard security measures to protect your data. All sensitive information is encrypted.",
    },
    { 
      question: "Can I use HeartSprouts on multiple devices?",
      answer: "Yes, you can use HeartSprouts on multiple devices by signing in with the same account.",
    },
    {
      question: "What should I do if I find a bug?",
      answer: "If you encounter a bug, please report it through the Help section. Providing detailed information about the issue helps us resolve it quickly."
    }
  ],
},
];

const FAQModal = ({ isVisible, onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
    setExpandedQuestion(null); // Reset expanded question when a new category is expanded
  };

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.faqModalContainer}>
        <View style={styles.faqModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.faqTitle}>Frequently Asked Questions (FAQs)</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {faqData.map((category, catIndex) => (
              <View key={catIndex} style={styles.categoryBox}>
                <TouchableOpacity onPress={() => toggleCategory(catIndex)} style={styles.categoryHeader}>
                  <Text style={styles.categoryTitle}>{category.category}</Text>
                  <Icon
                    name={expandedCategory === catIndex ? 'angle-up' : 'angle-down'}
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
                {expandedCategory === catIndex && (
                  category.questions.map((faq, qIndex) => (
                    <View key={qIndex} style={styles.faqBox}>
                      <TouchableOpacity onPress={() => toggleQuestion(qIndex)} style={styles.faqHeader}>
                        <Text style={styles.faqText}>{qIndex + 1}. {faq.question}</Text>
                        <Icon
                          name={expandedQuestion === qIndex ? 'angle-up' : 'angle-down'}
                          size={24}
                          color="#fff"
                        />
                      </TouchableOpacity>
                      {expandedQuestion === qIndex && (
                        <Text style={styles.faqAnswer}>{faq.answer}</Text>
                      )}
                    </View>
                  ))
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  faqModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  faqModalContent: {
    width: '90%',
    height: '90%',
    backgroundColor: Colors.green700,
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  faqTitle: {
    color: Colors.white500,
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryBox: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.green600,
    padding: 15,
    borderRadius: 10,
  },
  categoryTitle: {
    color: Colors.white500,
    fontSize: 18,
    fontWeight: 'bold',
  },
  faqBox: {
    backgroundColor: Colors.green500,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqText: {
    color: Colors.white500,
    fontSize: 16,
    fontWeight: 'bold',
  },
  faqAnswer: {
    color: Colors.white500,
    fontSize: 14,
    marginTop: 5,
  },
});

export default FAQModal;

