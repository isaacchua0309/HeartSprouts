import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Permissions from 'expo-permissions';

// Request permission to send notifications
export const requestNotificationPermissions = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  return status === 'granted';
};

// Schedule a notification
export const scheduleNotification = async (title, body, date) => {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: {
      date: date,
    },
  });
};

// Cancel a notification
export const cancelNotification = async (notificationId) => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};

// Get all scheduled notifications
export const getAllScheduledNotifications = async () => {
  return await Notifications.getAllScheduledNotificationsAsync();
};
