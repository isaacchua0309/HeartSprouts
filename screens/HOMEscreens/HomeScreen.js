import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/colors';
import ExperienceBar from './ExperienceBar';
import MoodOverlay from './MoodOverlay';
import ProfileModal from './ProfileModal';
import SettingsModal from './SettingsModal';
import quotes from '../../constants/quotes';
import emotions from '../../constants/emotions';
import { firestore } from '../../utils/firebaseHelper'; // Adjust the path as needed
import { doc, getDoc } from 'firebase/firestore';

const HomeScreen = ({ navigation, route }) => {
  const { email, level } = route.params; // Get the level from route params
  const [currentText, setCurrentText] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
  const [petImage, setPetImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleUpdatePetImage(level); // Use the passed level to set the initial pet image
  }, [level]);

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

  const getButtonColor = () => {
    const emotion = emotions.find(e => e.name === selectedEmotion);
    return emotion ? emotion.color : Colors.green700;
  };

  const handleUpdatePetImage = useCallback((level) => {
    switch (level) {
      case 1:
        setPetImage(require('../../assets/characterimages/lvl1.jpg'));
        break;
      case 2:
        setPetImage(require('../../assets/characterimages/lvl2.jpg'));
        break;
      case 3:
        setPetImage(require('../../assets/characterimages/lvl3.jpg'));
        break;
      case 4:
        setPetImage(require('../../assets/characterimages/lvl4.jpg'));
        break;
      case 5:
        setPetImage(require('../../assets/characterimages/lvl5.jpg'));
        break;
      case 6:
        setPetImage(require('../../assets/characterimages/lvl6.jpg'));
        break;
      case 7:
        setPetImage(require('../../assets/characterimages/lvl7.jpg'));
        break;
      case 8:
        setPetImage(require('../../assets/characterimages/lvl8.jpg'));
        break;
      case 9:
        setPetImage(require('../../assets/characterimages/lvl9.jpg'));
        break;
      case 10:
        setPetImage(require('../../assets/characterimages/lvl10.jpg'));
        break;
      case 11:
        setPetImage(require('../../assets/characterimages/lvl11.jpg'));
        break;
      case 12:
        setPetImage(require('../../assets/characterimages/lvl12.jpg'));
        break;
      case 13:
        setPetImage(require('../../assets/characterimages/lvl13.jpg'));
        break;
      case 14:
        setPetImage(require('../../assets/characterimages/lvl14.jpg'));
        break;
      case 15:
        setPetImage(require('../../assets/characterimages/lvl15.jpg'));
        break;
      default:
        setPetImage(require('../../assets/characterimages/lvl1.jpg'));
    }
  }, []);

  const fetchLatestLevel = async () => {
    setLoading(true);
    try {
      const userDoc = await getDoc(doc(firestore, 'Users', email));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const latestLevel = userData.level;
        handleUpdatePetImage(latestLevel);
      } else {
        console.log('No such user!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!petImage || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.white500} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="profile-button"
        style={styles.profileButton}
        onPress={() => setProfileModalVisible(true)}
      >
        <Icon name="user" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        testID="mood-button"
        style={[styles.chooseMoodButton, { backgroundColor: getButtonColor() }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.chooseMoodButtonText}>
          {selectedEmotion ? `Feeling ${selectedEmotion}` : 'Choose Your Mood'}
        </Text>
      </TouchableOpacity>

      <MoodOverlay
        testID="mood-overlay"
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSelectEmotion={setSelectedEmotion}
      />

      <ProfileModal
        testID="profile-modal"
        navigation={navigation}
        isVisible={isProfileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        onSettingsPress={() => {
          setProfileModalVisible(false);
          setSettingsModalVisible(true);
        }}
      />

      <SettingsModal
        isVisible={isSettingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
      />

      <TouchableOpacity
        testID="refresh-button"
        style={styles.refreshButton}
        onPress={fetchLatestLevel}
      >
        <Ionicons name="refresh" size={24} color="#fff" />
      </TouchableOpacity>

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
  
        <Image testID="pet-image" source={petImage} style={styles.image} />
      </View>

      <ExperienceBar email={email} onUpdatePetImage={handleUpdatePetImage} />

      <View testID="nav-bar" style={styles.navBar}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green500,
  },
  profileButton: {
    position: 'absolute',
    top: 20,
    left: 30,
    padding: 10,
    backgroundColor: Colors.green700,
    borderRadius: 8,
  },
  chooseMoodButton: {
    position: 'absolute',
    top: 20,
    right: 30,
    padding: 10,
    backgroundColor: Colors.green700,
    borderRadius: 8,
  },
  chooseMoodButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  refreshButton: {
    position: 'absolute',
    top: 20,
    left: 80,
    padding: 10,
    backgroundColor: Colors.green700,
    borderRadius: 8,
  },
  speechBubbleWrapper: {
    marginBottom: 30,
    shadowColor: Colors.black300,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.30,
    shadowRadius: 3.84,
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
    backgroundColor: Colors.brown300,
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
    borderColor: Colors.green300,
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




