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


