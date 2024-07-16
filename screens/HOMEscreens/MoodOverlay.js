// MoodOverlay.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Colors from '../../constants/colors';

const emotions = [
  { name: 'Happy', color: '#FFD700' },
  { name: 'Sad', color: '#1E90FF' },
  { name: 'Angry', color: '#FF4500' },
  { name: 'Anxious', color: '#8A2BE2' },
  { name: 'Excited', color: '#FF6347' },
  { name: 'Tired', color: '#808080' },
  { name: 'Grateful', color: '#32CD32' }
];

const MoodOverlay = ({ isVisible, onClose, onSelectEmotion }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>How are you feeling today?</Text>
          <View style={styles.emotionsContainer}>
            {emotions.map((emotion) => (
              <TouchableOpacity
                key={emotion.name}
                style={[styles.emotionButton, { backgroundColor: emotion.color }]}
                onPress={() => {
                  onSelectEmotion(emotion.name);
                  onClose();
                }}
              >
                <Text style={styles.emotionButtonText}>{emotion.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.green300,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600'
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  emotionButton: {
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  emotionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MoodOverlay;
