import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { firestore } from '../../utils/firebaseHelper';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Colors from '../../constants/colors';

const ExperienceBar = ({ email, onUpdatePetImage }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      const userDocRef = doc(firestore, 'Users', email);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (userData) {
        const totalXp = userData.XP || 0;
        const currentLevel = Math.floor(totalXp / 200) + 1;
        const xpInCurrentLevel = totalXp % 200;

        setXp(xpInCurrentLevel);
        setLevel(currentLevel);
        onUpdatePetImage(currentLevel);
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    } finally {
      setLoading(false);
    }
  }, [email, onUpdatePetImage]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLevelUp = useCallback(async () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    setXp(0);
    onUpdatePetImage(newLevel);

    try {
      const userDocRef = doc(firestore, 'Users', email);
      await updateDoc(userDocRef, {
        XP: newLevel * 200,
        level: newLevel,
      });
    } catch (error) {
      console.error('Error updating user data: ', error);
    }
  }, [email, level, onUpdatePetImage]);

  useEffect(() => {
    if (xp >= 200) {
      handleLevelUp();
    }
  }, [xp, handleLevelUp]);

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.white500} />;
  }

  const xpForNextLevel = 200;
  const progress = (xp / xpForNextLevel) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>Level: {level}</Text>
      <Text style={styles.xpText}>{xp} / {xpForNextLevel} XP</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    width: '100%', // Ensure it takes the full width of the container
  },
  levelText: {
    fontSize: 18,
    color: Colors.white500,
    fontWeight: 'bold'
  },
  xpText: {
    fontSize: 14,
    color: Colors.white700,
    marginTop: 8, // Add margin for spacing
    fontStyle: 'italic'
  },
  progressBar: {
    width: '80%',
    height: 20,
    backgroundColor: Colors.white700,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: Colors.pink500,
  },
});

export default ExperienceBar;
