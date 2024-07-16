import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/colors';

const ProfileModal = ({ isVisible, onClose, navigation }) => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isFAQModalVisible, setFAQModalVisible] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    setLogoutModalVisible(false);
    navigation.navigate('Getting Started');
    onClose();
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out HeartSprouts! It’s a great app for emotional well-being. Get it here: https://github.com/isaacchua0309/HeartSprouts',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.profileModalContainer}>
        <View style={styles.profileModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.profileTitle}>your profile.</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.premiumButton}>
            <Text style={styles.sectionTitle}>PREMIUM.</Text>
            <Text style={styles.premiumButtonText}>Unlock all our exercises, prompts, AI features, iCloud Sync, and more</Text>
            <TouchableOpacity style={styles.tryButton}>
              <Text style={styles.tryButtonText}>Coming Soon!</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <TouchableOpacity style={styles.optionButton} onPress={() => setLogoutModalVisible(true)}>
            <Text style={styles.optionButtonText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>COMMUNITY</Text>
          <TouchableOpacity style={styles.optionButton} onPress={handleShare}>
            <Text style={styles.optionButtonText}>Share HeartSprouts with Your Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Instagram (coming soon!)</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>HELP & SUPPORT</Text>
          <TouchableOpacity style={styles.optionButton} onPress={() => setFAQModalVisible(true)}>
            <Text style={styles.optionButtonText}>Frequently Asked Questions (FAQs)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Contact Us / Send Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isLogoutModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.logoutModalContainer}>
          <View style={styles.logoutModalContent}>
            <Text style={styles.logoutText}>Are you sure you want to log out?</Text>
            <View style={styles.logoutButtons}>
              <TouchableOpacity
                style={[styles.logoutButton, styles.confirmButton]}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.logoutButton, styles.cancelButton]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isFAQModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFAQModalVisible(false)}
      >
        <View style={styles.faqModalContainer}>
          <View style={styles.faqModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
              <TouchableOpacity onPress={() => setFAQModalVisible(false)}>
                <Icon name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <Text style={styles.faqSectionTitle}>General</Text>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>1. What is HeartSprouts?</Text>
                <Text style={styles.faqAnswer}>HeartSprouts is an emotional well-being and relationship management app designed to help you nurture your emotional health and maintain meaningful connections with friends and family.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>2. How does HeartSprouts work?</Text>
                <Text style={styles.faqAnswer}>HeartSprouts allows you to track your mood, journal your thoughts, manage relationships, and receive notifications for important dates and events. It uses engaging features like an emotional pet and weekly prompts to encourage regular use.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>3. Is HeartSprouts free to use?</Text>
                <Text style={styles.faqAnswer}>Yes, HeartSprouts offers a free version with core features. There may be premium features available in the future.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>4. How do I get started with HeartSprouts?</Text>
                <Text style={styles.faqAnswer}>Download the app, create an account by providing your name, birthday, email, and password, and then follow the onboarding prompts to set up your profile.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>5. What platforms is HeartSprouts available on?</Text>
                <Text style={styles.faqAnswer}>HeartSprouts is available on both iOS and Android platforms.</Text>
              </View>

              <Text style={styles.faqSectionTitle}>Account and Profile</Text>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>6. How do I create an account?</Text>
                <Text style={styles.faqAnswer}>Open the app, select "Get Started," and follow the prompts to enter your name, birthday, email, and password.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>7. I forgot my password. How do I reset it?</Text>
                <Text style={styles.faqAnswer}>On the login screen, click "Forgot Password?" and follow the instructions to reset your password via email.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>8. How do I update my profile information?</Text>
                <Text style={styles.faqAnswer}>Go to the Profile section by clicking on your avatar, and you can update your name, email, and other personal information.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>9. Can I change my password?</Text>
                <Text style={styles.faqAnswer}>Yes, you can change your password in the settings section of your profile.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>10. How do I delete my account?</Text>
                <Text style={styles.faqAnswer}>To delete your account, contact support through the Help section in the app. They will assist you in deleting your account.</Text>
              </View>

              <Text style={styles.faqSectionTitle}>Mood Tracking and Journaling</Text>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>11. How do I track my mood?</Text>
                <Text style={styles.faqAnswer}>On the Home screen, click "Choose Your Mood" to select how you’re feeling. This will update your mood and provide relevant quotes.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>12. What are weekly journal prompts?</Text>
                <Text style={styles.faqAnswer}>Weekly journal prompts are questions that encourage you to reflect on your emotional state and relationships. You can answer these prompts in the Prompt Answer screen.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>13. How do I view my past journal entries?</Text>
                <Text style={styles.faqAnswer}>Go to the Weekly Reflection screen to view your past journal entries and see trends in your relationship satisfaction.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>14. Can I edit or delete a journal entry?</Text>
                <Text style={styles.faqAnswer}>Currently, entries are not editable to maintain the integrity of your reflections, but you can contact support for specific requests.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>15. How do I earn experience points (XP)?</Text>
                <Text style={styles.faqAnswer}>You earn XP by tracking your mood, completing journal prompts, and engaging with the app regularly.</Text>
              </View>

              <Text style={styles.faqSectionTitle}>Relationship Management</Text>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>16. How do I add a new friend?</Text>
                <Text style={styles.faqAnswer}>Navigate to the User Profiles screen and click "Add Friend." Enter your friend’s name, birthday, and upload an optional image.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>17. How do I view and edit a friend’s profile?</Text>
                <Text style={styles.faqAnswer}>Click on a friend’s profile from the User Profiles screen to view their details. You can edit their information or add events by clicking the edit button.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>18. What kind of events can I add for friends?</Text>
                <Text style={styles.faqAnswer}>You can add events like birthdays, anniversaries, and special reminders. The app will notify you ahead of these events.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>19. Can I delete a friend’s profile?</Text>
                <Text style={styles.faqAnswer}>Yes, go to the friend’s profile and select "Delete Profile" to remove them and their associated events from your list.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>20. How do I manage my friends list?</Text>
                <Text style={styles.faqAnswer}>You can add, edit, and delete friends from the User Profiles screen. Use the search function to quickly find specific friends.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>21. How do I know which relationships were the highlights of my week?</Text>
                <Text style={styles.faqAnswer}>Use the Relationship Satisfied screen to select up to three relationships that stood out during the week. This helps you focus on positive interactions.</Text>
              </View>

              <Text style={styles.faqSectionTitle}>Notifications</Text>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>22. How do I manage notifications?</Text>
                <Text style={styles.faqAnswer}>You can manage your notification preferences in the Settings section. The app will send reminders for important events and weekly prompts.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>23. Will I receive notifications for all events?</Text>
                <Text style={styles.faqAnswer}>Yes, the app sends notifications for all events you add to ensure you don’t miss important dates.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>24. How do I set up notifications for events?</Text>
                <Text style={styles.faqAnswer}>When you add an event to a friend's profile, the app automatically schedules a notification. You can manage these notifications in the settings.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>25. Can I turn off notifications?</Text>
                <Text style={styles.faqAnswer}>Yes, you can turn off notifications or customize them in the Settings section.</Text>
              </View>

              <Text style={styles.faqSectionTitle}>Technical Support</Text>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>26. The app is not working correctly. What should I do?</Text>
                <Text style={styles.faqAnswer}>Try restarting the app or your device. If the issue persists, contact support through the app’s help section.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>27. How can I contact customer support?</Text>
                <Text style={styles.faqAnswer}>You can reach customer support via the Help section in the Profile or Settings menu. There you can find options to send an email or access live chat.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>28. Is my data secure?</Text>
                <Text style={styles.faqAnswer}>Yes, HeartSprouts uses industry-standard security measures to protect your data. All sensitive information is encrypted.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>29. Can I use HeartSprouts on multiple devices?</Text>
                <Text style={styles.faqAnswer}>Yes, you can use HeartSprouts on multiple devices by signing in with the same account.</Text>
              </View>
              <View style={styles.faqBox}>
                <Text style={styles.faqText}>30. What should I do if I find a bug?</Text>
                <Text style={styles.faqAnswer}>If you encounter a bug, please report it through the Help section. Providing detailed information about the issue helps us resolve it quickly.</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  profileModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  profileModalContent: {
    height: '80%',
    backgroundColor: Colors.green700,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileTitle: {
    color: Colors.white500,
    fontSize: 24,
    fontWeight: 'bold',
  },
  premiumButton: {
    backgroundColor: Colors.green500,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  premiumButtonText: {
    color: Colors.white500,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  tryButton: {
    backgroundColor: Colors.white500,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  tryButtonText: {
    color: Colors.black300,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: Colors.white500,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  optionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.green500,
  },
  optionButtonText: {
    color: Colors.white500,
    fontSize: 16,
  },
  logoutModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoutModalContent: {
    width: '80%',
    backgroundColor: Colors.green700,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  logoutText: {
    color: Colors.white500,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  logoutButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoutButton: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: Colors.green500,
  },
  cancelButton: {
    backgroundColor: Colors.red500,
  },
  buttonText: {
    color: Colors.white500,
    fontWeight: 'bold',
  },
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
  faqTitle: {
    color: Colors.white500,
    fontSize: 24,
    fontWeight: 'bold',
  },
  faqSectionTitle: {
    color: Colors.white500,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  faqBox: {
    backgroundColor: Colors.green500,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
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

export default ProfileModal;
