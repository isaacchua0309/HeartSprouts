import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/colors'; // Make sure to adjust the import path according to your project structure

const SatisfactionRatingScreen = ({ navigation, route }) => {
  const { email } = route.params;
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
          <Icon name="arrow-left" size={30} color={Colors.white500} />
        </TouchableOpacity>
        <Text style={styles.headerText}>How satisfactory are your relationships?</Text>
      </View>
      <Text style={styles.subText}>
        You'll see insights and charts of your relationship quality on the trends page.
      </Text>
      <View style={styles.contentContainer}>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderText}>This week</Text>
          <Text style={styles.rsQualityText}>{getRsQualityText(rsQuality)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={rsQuality}
            onValueChange={(value) => setRsQuality(value)}
            minimumTrackTintColor={Colors.white500}
            maximumTrackTintColor={Colors.green700}
            thumbTintColor={Colors.white500}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabelText}>Not at all</Text>
            <Text style={styles.sliderLabelText}>Very</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Relationships Satisfied', { email, rsQuality })}>
          <Icon name="chevron-right" size={30} color={Colors.white500} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green500,
    padding: 20,
  },
  header: {
    marginTop: 8,
    marginLeft: 20,
    marginRight: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    // marginRight: 0,
   
  },
  headerText: {
    color: Colors.white500,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  subText: {
    color: Colors.white500,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  sliderContainer: {
    alignItems: 'center',
    flex: 1,
  },
  sliderText: {
    color: Colors.white500,
    fontSize: 18,
    marginBottom: 10,
  },
  rsQualityText: {
    color: Colors.white500,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 40,
  },
  sliderLabelText: {
    color: Colors.white500,
    fontSize: 16,
  },
  nextButton: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: Colors.green700,
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default SatisfactionRatingScreen;
