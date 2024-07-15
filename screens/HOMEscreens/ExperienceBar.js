import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firestore } from '../../utils/firebaseHelper';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Colors from '../../constants/colors';

const ExperienceBar = ({ email, onUpdatePetImage }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(firestore, 'Users', email);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const totalXp = userData.XP || 0;
      const currentLevel = Math.floor(totalXp / 200) + 1;
      const xpInCurrentLevel = totalXp % 200;

      setXp(xpInCurrentLevel);
      setLevel(currentLevel);
      onUpdatePetImage(currentLevel);
    };

    fetchUserData();
  }, [email, onUpdatePetImage]);

  useEffect(() => {
    if (level > 15) {
      setLevel(15);
      setXp(0);
    }
  }, [level]);

  const xpForNextLevel = 200;
  const progress = (xp / xpForNextLevel) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>Level: {level}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.xpText}>{xp} / {xpForNextLevel} XP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  levelText: {
    fontSize: 18,
    color: Colors.white500,
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: Colors.white500,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
  xpText: {
    fontSize: 14,
    color: Colors.white500,
  },
});

export default ExperienceBar;


