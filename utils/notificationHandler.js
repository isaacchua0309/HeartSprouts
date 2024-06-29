import * as Notifications from 'expo-notifications';

// Request permission to send notifications
export const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Failed to get push token for push notification!');
    return false;
  }
  return true;
};

// Schedule a notification
export const scheduleNotification = async (title, body, time) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: {
      seconds: (time - new Date()) / 1000,
    },
  });
};

