import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebaseHelper'; // Adjust the path as needed

jest.mock('../../utils/firebaseHelper', () => ({
  firestore: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };
  const mockRoute = {
    params: { email: 'test@example.com' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading indicator while fetching user data', () => {
    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  test('fetches user data and updates the state', async () => {
    getDoc.mockResolvedValueOnce({
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn().mockReturnValue({ level: 5 }),
    });

    const { getByText, queryByTestId } = render(
      <HomeScreen navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => expect(queryByTestId('loading-indicator')).toBeNull());
    expect(getByText('Feeling Choose Your Mood')).toBeTruthy();
  });

  test('opens and closes the mood overlay modal', async () => {
    const { getByText, queryByTestId } = render(
      <HomeScreen navigation={mockNavigation} route={mockRoute} />
    );

    const moodButton = getByText('Choose Your Mood');
    fireEvent.press(moodButton);

    await waitFor(() => expect(queryByTestId('mood-overlay')).toBeTruthy());

    const closeButton = getByText('Close'); // Adjust the selector based on your close button in MoodOverlay
    fireEvent.press(closeButton);

    await waitFor(() => expect(queryByTestId('mood-overlay')).toBeNull());
  });

  test('updates the pet image based on user level', async () => {
    getDoc.mockResolvedValueOnce({
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn().mockReturnValue({ level: 3 }),
    });

    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => expect(getByTestId('pet-image')).toHaveProp('source', expect.objectContaining({ uri: expect.stringContaining('lvl3.jpg') })));
  });

  // Add more tests as needed
});
