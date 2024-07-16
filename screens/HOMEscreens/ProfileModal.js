import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/colors';

const ProfileModal = ({ isVisible, onClose, navigation}) => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    setLogoutModalVisible(false);
    navigation.navigate('Getting Started');
    onClose();
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
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Share HeartSprouts with Your Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Instagram (coming soon!)</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>HELP & SUPPORT</Text>
          <TouchableOpacity style={styles.optionButton}>
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
    padding:12,
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
    marginBottom: 10
  },
  tryButtonText: {
    color: Colors.black300,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: Colors.white500,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12
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
