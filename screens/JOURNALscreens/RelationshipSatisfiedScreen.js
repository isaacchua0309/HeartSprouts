import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const focusItems = [
  { id: '1', name: 'Work', icon: 'briefcase' },
  { id: '2', name: 'Relaxing', icon: 'weather-sunny' },
  { id: '3', name: 'Family', icon: 'home' },
  { id: '4', name: 'Friends', icon: 'account-group' },
  { id: '5', name: 'Date', icon: 'heart' },
  { id: '6', name: 'Pets', icon: 'dog' },
  { id: '7', name: 'Fitness', icon: 'dumbbell' },
  { id: '8', name: 'Self-care', icon: 'crown' },
  { id: '9', name: 'Partner', icon: 'account-heart' },
  { id: '10', name: 'Reading', icon: 'book' },
  { id: '11', name: 'Learning', icon: 'school' },
  { id: '12', name: 'Travel', icon: 'train' },
  { id: '13', name: 'Nature', icon: 'leaf' },
  { id: '14', name: 'Party', icon: 'party-popper' },
  { id: '15', name: 'Movies', icon: 'movie' },
];

const RelationshipSatisfiedScreen = ({ navigation, route }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);

  const handlePress = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : prev.length < 3
        ? [...prev, item.id]
        : prev
    );

    setSelectedNames((prev) =>
      prev.includes(item.name)
        ? prev.filter((name) => name !== item.name)
        : prev.length < 3
        ? [...prev, item.name]
        : prev
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedItems.includes(item.id) && styles.selectedItem,
      ]}
      onPress={() => handlePress(item)}
    >
      <Icon name={item.icon} size={30} color={selectedItems.includes(item.id) ? '#000' : '#fff'} />
      <Text style={[styles.itemText, selectedItems.includes(item.id) && styles.selectedItemText]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>What's your main focus for today?</Text>
        <Text style={styles.subText}>Pick up to 3.</Text>
      </View>
      <FlatList
        data={focusItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        key={2} // Force re-render when changing numColumns
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Prompt Answer')}>
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
    marginBottom: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 40, // adjust to center the text properly
  },
  subText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 20,
    borderRadius: 50,
    backgroundColor: '#333333',
    width: '40%', // ensure the items fit well in two columns
  },
  selectedItem: {
    backgroundColor: '#FFFFFF',
  },
  itemText: {
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
  },
  selectedItemText: {
    color: '#000000',
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    backgroundColor: '#444444',
    borderRadius: 25,
    padding: 10,
  },
});

export default RelationshipSatisfiedScreen;
