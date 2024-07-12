import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SatisfactionRatingScreen = ({ navigation, route }) => {
  const {email} = route.params;
  const [rsQuality, setRsQuality] = useState(5);

  const getRsQualityText = (value) => {
    if (value <= 2) return "I'm very unhappy with my relationships. They lack the connection and support I need.";
    if (value <= 4) return "I'm somewhat unhappy with my relationships. There are significant areas that need improvement.";
    if (value <= 6) return "I'm neither satisfied nor dissatisfied with my relationships. They are okay, but there's room for improvement.";
    if (value <= 8) return "I'm generally happy with my relationships. They provide support and connection most of the time.";
    return "I'm extremely happy with my relationships. They are fulfilling, supportive, and strong.";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>How satisfactory are your relationships?</Text>
      </View>
      <Text style={styles.subText}>
        You'll see insights and charts of your sleep quality on the trends page.
      </Text>
      <View style={styles.imageContainer}>
        {/* You can add an image here if needed */}
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderText}>This week</Text>
        <Text style={styles.sleepQualityText}>{getRsQualityText(rsQuality)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={sleepQuality}
          onValueChange={(value) => setRsQuality(value)}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#333333"
          thumbTintColor="#FFFFFF"
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabelText}>Not at all</Text>
          <Text style={styles.sliderLabelText}>Very</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Relationships Satisfied',{email,rsQuality})}>
        <Icon name="chevron-right" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  sliderContainer: {
    alignItems: 'center',
  },
  sliderText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  sleepQualityText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slider: {
    width: '80%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  sliderLabelText: {
    color: '#FFFFFF',
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    backgroundColor: '#444444',
    borderRadius: 25,
    padding: 10,
  },
});

export default SatisfactionRatingScreen;
