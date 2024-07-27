import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import RelationshipSatisfiedScreen from './RelationshipSatisfiedScreen'; // Adjust the import path as necessary
import { getDocs, collection } from 'firebase/firestore';
import Colors from '../../constants/colors';

jest.mock('firebase/firestore', () => ({
  getDocs: jest.fn(),
  collection: jest.fn(),
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

jest.mock('../../utils/firebaseHelper', () => ({
  firestore: {},
}));

describe('RelationshipSatisfiedScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const route = {
    params: {
      email: 'test@example.com',
      rsQuality: 'Good',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

// Purpose:
// To verify that the RelationshipSatisfiedScreen displays a loading indicator correctly when it is fetching data.

// What It Tests:
// The presence of a loading indicator (loading-indicator).
// Mocks the getDocs function to simulate a pending data fetch.

// Expected Outcome:
// The loading indicator is rendered while data is being fetched.

  it('renders loading state correctly', async () => {
    getDocs.mockResolvedValueOnce({
      docs: [],
    });

    const { getByTestId } = render(
      <RelationshipSatisfiedScreen navigation={mockNavigation} route={route} />
    );

    await act(async () => {
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });


// Purpose:
// To ensure that the list of friends is rendered correctly after being fetched from the database.

// What It Tests:
// Mocks the getDocs function to return a list of friends.
// Verifies that the friend names (Friend 1 and Friend 2) are displayed on the screen.

// Expected Outcome:
// The friend names are rendered correctly after fetching.

  it('renders friends correctly after fetching', async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        { id: '1', data: () => ({ name: 'Friend 1' }) },
        { id: '2', data: () => ({ name: 'Friend 2' }) },
      ],
    });

    const { getByText } = render(
      <RelationshipSatisfiedScreen navigation={mockNavigation} route={route} />
    );

    await waitFor(() => {
      expect(getByText('Friend 1')).toBeTruthy();
      expect(getByText('Friend 2')).toBeTruthy();
    });
  });


// Purpose:
// To ensure that friends can be selected and deselected correctly.

// What It Tests:
// Mocks the getDocs function to return a list of friends.
// Simulates pressing on a friend's name to select and deselect them.
// Verifies that the background color of the friend's item changes correctly (white500 for selected and green700 for deselected).

// Expected Outcome:
// The friend's background color toggles between selected and deselected states correctly.

  it('selects and deselects friends correctly', async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        { id: '1', data: () => ({ name: 'Friend 1' }) },
        { id: '2', data: () => ({ name: 'Friend 2' }) },
      ],
    });

    const { getByText, getByTestId } = render(
      <RelationshipSatisfiedScreen navigation={mockNavigation} route={route} />
    );

    await waitFor(() => {
      fireEvent.press(getByText('Friend 1'));
    });

    await waitFor(() => {
      expect(getByTestId('Friend 1').props.style.backgroundColor).toEqual(Colors.white500);
      fireEvent.press(getByText('Friend 1'));
      expect(getByTestId('Friend 1').props.style.backgroundColor).toEqual(Colors.green700);
    });
  });


// Purpose:
// To ensure that pressing the "Next" button navigates to the "Prompt Answer" screen with the correct parameters.

// What It Tests:
// Mocks the getDocs function to return a list of friends.
// Simulates pressing the "Next" button.
// Verifies that the navigation function is called with the expected parameters (email, rsQuality, and selectedFriends).

// Expected Outcome:
// The screen navigates to the "Prompt Answer" screen with the correct parameters when the "Next" button is pressed.

  it('navigates to Prompt Answer screen on next button press', async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        { id: '1', data: () => ({ name: 'Friend 1' }) },
        { id: '2', data: () => ({ name: 'Friend 2' }) },
      ],
    });

    const { getByTestId } = render(
      <RelationshipSatisfiedScreen navigation={mockNavigation} route={route} />
    );

    await waitFor(() => {
      fireEvent.press(getByTestId('next-button'));
    });

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Prompt Answer', {
        email: 'test@example.com',
        rsQuality: 'Good',
        selectedFriends: [],
      });
    });
  });
});


