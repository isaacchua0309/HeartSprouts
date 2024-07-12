import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
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

const quotes = {
  Happy: [
    "Happiness is not by chance, but by choice.",
    "The purpose of our lives is to be happy.",
    "Happiness radiates like the fragrance from a flower."
  ],
  Sad: [
    "Sadness flies away on the wings of time.",
    "Tears are words that need to be written.",
    "The walls we build around us to keep sadness out also keeps out the joy."
  ],
  Angry: [
    "Let your anger be the fuel for your future success.",
    "Anger is one letter short of danger. Handle it with care.",
    "Transform your anger into passion and determination."
  ],
  Anxious: [
    "This too shall pass.",
    "Take a deep breath. Everything will be okay.",
    "One step at a time, one moment at a time."
  ],
  Excited: [
    "Embrace the thrill and enjoy every moment!",
    "Your excitement is contagious. Spread it everywhere!",
    "Today is the day for new adventures."
  ],
  Tired: [
    "Rest if you must, but don't you quit.",
    "Recharge, refresh, and tackle tomorrow anew.",
    "It's okay to take a break. You deserve it."
  ],
  Grateful: [
    "Gratitude turns what we have into enough.",
    "Appreciate the little things, for they are the big things.",
    "Your heart of gratitude shines brightly."
  ],
};

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

const HomeScreen = ({ navigation, route }) => {
  const [currentText, setCurrentText] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedEmotion) {
      const setRandomText = () => {
        const emotionQuotes = quotes[selectedEmotion];
        const randomIndex = Math.floor(Math.random() * emotionQuotes.length);
        setCurrentText(emotionQuotes[randomIndex]);
      };

      setRandomText();
      const interval = setInterval(setRandomText, 3 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [selectedEmotion]);

  const { email } = route.params;

  const getButtonColor = () => {
    const emotion = emotions.find(e => e.name === selectedEmotion);
    return emotion ? emotion.color : Colors.green700;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.chooseMoodButton, { backgroundColor: getButtonColor() }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.chooseMoodButtonText}>
          {selectedEmotion ? `Feeling ${selectedEmotion}` : 'Choose Your Mood'}
        </Text>
      </TouchableOpacity>

      <MoodOverlay
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSelectEmotion={setSelectedEmotion}
      />

      {selectedEmotion && (
        <View style={styles.speechBubbleWrapper}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>{currentText}</Text>
          </View>
          <View style={styles.speechBubbleTailWrapper}>
            <View style={styles.speechBubbleTail} />
          </View>
        </View>
      )}

      <View style={styles.circle}>
        <Image source={require('../../assets/characterimages/lvl5.jpg')} style={styles.image} />
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Journal', { email })}>
          <Ionicons name="book" size={24} color={Colors.green300} />
          <Text style={styles.navText}>Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home', { email })}>
          <Ionicons name="home" size={24} color={Colors.green300} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Users', { email })}>
          <Icon name="users" size={24} color={Colors.green300} />
          <Text style={styles.navText}>Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green500,
    padding: 20,
  },
  chooseMoodButton: {
    position: 'absolute',
    top: 20,
    padding: 10,
    backgroundColor: Colors.green700,
    borderRadius: 8,
  },
  chooseMoodButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  speechBubbleWrapper: {
    marginBottom: 30,
    alignItems: 'center',
  },
  speechBubbleWrapper: {
    marginBottom: 30, // Adjust this value to move the bubble upwards
    // Shadows for iOS
    shadowColor: Colors.black500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.30,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  speechBubble: {
    maxWidth: '80%',
    padding: 18,
    backgroundColor: Colors.green300,
    borderRadius: 20,
    position: 'relative',
  },
  speechText: {
    fontSize: 16,
    color: Colors.black300,
    fontWeight: '600'
  },
  speechBubbleTail: {
    position: 'absolute',
    bottom: -10,
    left: '50%',
    marginLeft: -10,
    width: 20,
    height: 20,
    backgroundColor: Colors.green300,
    transform: [{ rotate: '45deg' }],
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7bc87',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: '5%',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: Colors.green500,
    borderTopWidth: 4,
    borderColor: Colors.green700,
    position: 'absolute',
    bottom: 0,
  },
  navButton: {
    marginTop: '5%',
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    marginTop: 5,
    color: Colors.white700,
  },
});

export default HomeScreen;
