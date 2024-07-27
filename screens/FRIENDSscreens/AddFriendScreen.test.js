import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddFriendScreen from './AddFriendScreen'; // Adjust the import path as necessary
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';

// Mock the necessary dependencies
jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({ canceled: true })),
  MediaTypeOptions: {
    Images: 'Images',
  },
}));

jest.mock('../../utils/actions/friendCollectionCreation', () => ({
  createFriendDocumentWithEvents: jest.fn(),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('AddFriendScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const route = {
    params: {
      email: 'test@example.com',
    },
  };

// Purpose:
// To verify that the AddFriendScreen component renders the necessary UI elements correctly.

// What It Tests:
// Checks for the presence of the main title "Add a new relationship profile".
// Checks for the presence of the name input field with the placeholder "Enter name".
// Checks for the presence of the birthday input field labeled "Friend's Birthday".

// Expected Outcome:
// The component renders the main title, name input field, and birthday input field correctly.

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <NavigationContainer>
        <AddFriendScreen navigation={mockNavigation} route={route} />
      </NavigationContainer>
    );

    expect(getByText('Add a new relationship profile')).toBeTruthy();
    expect(getByPlaceholderText('Enter name')).toBeTruthy();
    expect(getByLabelText("Friend's Birthday")).toBeTruthy();
  });

// Purpose:
// To ensure that the component correctly handles the case where the user tries to add a friend without providing a name and birthday.

// What It Tests:
// Simulates a button press on the "Add Friend" button without entering a name.
// Verifies that an alert is shown with the message "Please enter both name and birthday".

// Expected Outcome:
// The alert is displayed with the correct error message, indicating that the name and birthday fields are required.

  it('shows an error alert when trying to add a friend with missing name', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <AddFriendScreen navigation={mockNavigation} route={route} />
      </NavigationContainer>
    );

    fireEvent.press(getByText('Add Friend'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please enter both name and birthday');
    });
  });
});


