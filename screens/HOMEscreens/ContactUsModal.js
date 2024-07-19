import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Linking,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/colors';

const ContactUsModal = ({ isVisible, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    const recipient = 'heartsproutsdev@gmail.com'; // Replace with your business email
    const subject = `Feedback from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl)
      .then(() => {
        setName('');
        setEmail('');
        setMessage('');
        onClose();
      })
      .catch((error) => {
        console.error('Error opening email client:', error);
        alert('Please try again.');
      });
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.contactModalContainer}>
          <View style={styles.contactModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.contactTitle}>Contact Us / Send Feedback</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor={Colors.white500}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              placeholderTextColor={Colors.white500}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Your Message"
              placeholderTextColor={Colors.white500}
              value={message}
              onChangeText={setMessage}
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contactModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contactModalContent: {
    width: '90%',
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
  contactTitle: {
    color: Colors.white500,
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: Colors.green500,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: Colors.white500,
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: Colors.white500,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.black300,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ContactUsModal;
