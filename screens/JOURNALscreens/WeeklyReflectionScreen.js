import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const data = [
  { id: '1', title: 'On Relief of Missing Out', description: 'This week, we\'ll stay away from the hustle.', progress: '0/7' },
  { id: '2', title: 'On Embracing Change', description: 'This week, we won\'t be afraid to make changes in our lives.', progress: '0/7' },
  { id: '3', title: 'On Starting Over', description: 'This week, we\'ll start fresh and find ourselves once again.', progress: '0/7' },
  { id: '4', title: 'On Letting Go', description: 'This week, we\'ll say goodbye.', progress: '0/7' },
  { id: '5', title: 'On Purpose', description: 'This week, we\'ll be. But on purpose.', progress: '0/7' },
  { id: '6', title: 'On Joy and Happiness', description: 'This week, we\'ll spend some time joyfully.', progress: '0/7' },
  { id: '7', title: 'On Rest and Recovery', description: 'This week, we\'ll explore resting on purpose.', progress: '0/7' },
  { id: '8', title: 'On Quantity and Quality', description: 'This week, we\'ll compare more with better.', progress: '0/7' },
];

const PromptScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => alert(item.title)}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <Text style={styles.itemProgress}>{item.progress}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DAILY</Text>
        <Text style={styles.headerSubtitle}>prompts.</Text>
      </View>
      <TouchableOpacity style={styles.promptButton} onPress={() => navigation.navigate('Satisfaction Rating')}>
        <Text style={styles.promptButtonText}>Answer Weekly Prompt</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  promptButton: {
    backgroundColor: '#1a73e8',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  promptButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemTextContainer: {
    maxWidth: '80%',
  },
  itemTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    color: '#aaa',
    fontSize: 14,
  },
  itemProgress: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default PromptScreen;
