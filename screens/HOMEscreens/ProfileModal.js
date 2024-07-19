import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/colors';
import FAQModal from './FAQModal'; // Adjust the import path as necessary
import ContactUsModal from './ContactUsModal'; // Adjust the import path as necessary
import * as Notifications from 'expo-notifications';

// Function to cancel all scheduled notifications
const cancelAllNotifications = async () => {
  try {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    for (const notification of scheduledNotifications) {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
    console.log('All notifications canceled successfully.');
  } catch (error) {
    console.error('Error canceling notifications: ', error);
  }
};

const ProfileModal = ({ isVisible, onClose, navigation }) => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isFAQModalVisible, setFAQModalVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisible] = useState(false);

  const handleLogout = async () => {
    // Cancel all notifications before logging out
    await cancelAllNotifications();
    
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
          <TouchableOpacity style={styles.optionButton} onPress={() => setContactModalVisible(true)}>
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

      <FAQModal
        isVisible={isFAQModalVisible}
        onClose={() => setFAQModalVisible(false)}
      />

      <ContactUsModal
        isVisible={isContactModalVisible}
        onClose={() => setContactModalVisible(false)}
      />
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
});

export default ProfileModal;
