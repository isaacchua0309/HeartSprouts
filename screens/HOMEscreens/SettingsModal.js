// SettingsModal.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/colors';

const SettingsModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.settingsModalContainer}>
        <View style={styles.settingsModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.settingsTitle}>Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* Add your settings options here */}
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Privacy Settings</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Notification Preferences</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  settingsModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  settingsModalContent: {
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
  settingsTitle: {
    color: Colors.white500,
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: Colors.white500,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 16,
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

export default SettingsModal;
