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

// Purpose:
// To verify that the component renders the question and the text input field correctly when the data is fetched successfully.

// What It Tests:
// Mocks the getDoc function to return a sample question.
// Verifies that the question text and the placeholder text for the input field are rendered correctly.

// Expected Outcome:
// The question text "Sample question?" and the placeholder text "Start writing..." are displayed on the screen.

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


// Purpose:
// To ensure that an appropriate error message is shown when there is a failure in fetching the questions.

// What It Tests:
// Mocks the getDoc function to simulate a failure in fetching data.
// Uses jest.spyOn to monitor the Alert.alert function.
// Verifies that the error alert is shown with the correct message when data fetching fails.

// Expected Outcome:
// An alert is shown with the message "Error: Failed to fetch questions. Please try again later."

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
