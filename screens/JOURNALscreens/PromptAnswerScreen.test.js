import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import PromptAnswerScreen from './PromptAnswerScreen';
import { JournalContext } from '../../utils/JournalContext';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';
import { firestore } from '../../utils/firebaseHelper';

// Mock Firebase functions
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock('../../utils/firebaseHelper', () => ({
  firestore: {},
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockRoute = {
  params: {
    email: 'test@example.com',
    rsQuality: 5,
    selectedFriends: ['friend1', 'friend2'],
  },
};

const mockJournalContext = {
  setShouldRefresh: jest.fn(),
  setHasAddedJournalEntryThisWeek: jest.fn(),
};

describe('PromptAnswerScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders question and text input correctly', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        questions: [{ id: 'q1', question: 'Sample question?', answered: false }],
      }),
    });

    const { getByText, getByPlaceholderText } = render(
      <JournalContext.Provider value={mockJournalContext}>
        <PromptAnswerScreen navigation={mockNavigation} route={mockRoute} />
      </JournalContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('Sample question?')).toBeTruthy();
      expect(getByPlaceholderText('Start writing...')).toBeTruthy();
    });
  });

  it('shows an error alert if fetching questions fails', async () => {
    getDoc.mockRejectedValueOnce(new Error('Failed to fetch'));

    jest.spyOn(Alert, 'alert');

    render(
      <JournalContext.Provider value={mockJournalContext}>
        <PromptAnswerScreen navigation={mockNavigation} route={mockRoute} />
      </JournalContext.Provider>
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to fetch questions. Please try again later.');
    });
  });
});
