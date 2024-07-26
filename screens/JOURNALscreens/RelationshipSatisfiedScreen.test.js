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


