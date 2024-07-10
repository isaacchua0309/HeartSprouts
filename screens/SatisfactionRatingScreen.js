import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import Slider from '@react-native-community/slider';

const SatisfactionRatingScreen = () => {
  const [sleepQuality, setSleepQuality] = useState(5);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>How well did you sleep today?</Text>
        <Text style={styles.subText}>
          We ask because you said you want to improve your sleep. After a few days you'll see insights and charts of your sleep quality on the trends page.
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('./path/to/your/image.png')} style={styles.image} />
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderText}>Last night</Text>
        <Text style={styles.sleepQualityText}>I slept quite well.</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={sleepQuality}
          onValueChange={value => setSleepQuality(value)}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        <View style={styles.sliderLabels}>
          <Text>Not at all</Text>
          <Text>Very</Text>
        </View>
      </View>
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
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
});

export default SatisfactionRatingScreen;
