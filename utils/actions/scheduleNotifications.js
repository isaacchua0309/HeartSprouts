import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { requestPermissions, scheduleNotification } from '../utils/notificationHandler';
import fetchEventsForFriend from '../utils/fetchEventsForFriend';

const ScheduleNotifications = ({ email, friends }) => {
  useEffect(() => {
    const setupNotifications = async () => {
      const permissionGranted = await requestPermissions();
      if (!permissionGranted) return;

      for (const friend of friends) {
        try {
          const events = await fetchEventsForFriend(email, friend.name);
          for (const event of events) {
            const notificationTime = new Date(event.date.seconds * 1000);
            notificationTime.setHours(notificationTime.getHours() - 1); // Notify 1 hour before the event
            await scheduleNotification(`Event Reminder`, `Don't forget about ${event.title}!`, notificationTime);
          }
        } catch (error) {
          Alert.alert('Error', `There was an error setting up notifications for ${friend.name}.`);
        }
      }
    };

    setupNotifications();
  }, [email, friends]);

  return (
    <View style={styles.container}>
      <Text>Notifications are being set up...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScheduleNotifications;
