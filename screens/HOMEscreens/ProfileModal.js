// ProfileModal.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/colors';

const ProfileModal = ({ isVisible, onClose }) => {
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
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
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
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 5,
    marginTop: 16
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
});

export default ProfileModal;
