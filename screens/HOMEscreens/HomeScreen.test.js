import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen'; // Adjust the import path as necessary
import { doc, getDoc } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

jest.mock('../../utils/firebaseHelper', () => ({
  firestore: {},
}));

jest.mock('./ExperienceBar', () => 'ExperienceBar');
jest.mock('./MoodOverlay', () => 'MoodOverlay');
jest.mock('./ProfileModal', () => 'ProfileModal');
jest.mock('./SettingsModal', () => 'SettingsModal');

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const route = {
    params: {
      email: 'test@example.com',
      level: 1,
    },
  };

  it('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <HomeScreen navigation={mockNavigation} route={route} />
    );

    expect(getByTestId('profile-button')).toBeTruthy();
    expect(getByTestId('mood-button')).toBeTruthy();
    expect(getByTestId('refresh-button')).toBeTruthy();
    expect(getByTestId('pet-image')).toBeTruthy();
    expect(getByTestId('nav-bar')).toBeTruthy();
  });

  it('opens profile modal when profile button is pressed', () => {
    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation} route={route} />
    );

    fireEvent.press(getByTestId('profile-button'));
    expect(getByTestId('profile-modal')).toBeTruthy();
  });

  it('opens mood overlay when mood button is pressed', () => {
    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation} route={route} />
    );

    fireEvent.press(getByTestId('mood-button'));
    expect(getByTestId('mood-overlay')).toBeTruthy();
  });

  it('refreshes pet image when refresh button is pressed', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ level: 2 }),
    });

    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation} route={route} />
    );

    fireEvent.press(getByTestId('refresh-button'));
    await waitFor(() => {
      expect(getDoc).toHaveBeenCalled();
    });
  });
});

