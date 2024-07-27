import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { Alert } from 'react-native';
import { JournalContext } from '../../utils/JournalContext';

// Mock the necessary modules
jest.mock('@firebase/auth');

describe('LoginScreen', () => {
  const navigate = jest.fn();

  const mockNavigation = {
    navigate,
    goBack: jest.fn(),
  };

  const mockContextValue = {
    fetchJournalData: jest.fn(),
    setLoading: jest.fn(),
  };

  const renderComponent = () =>
    render(
      <NavigationContainer>
        <JournalContext.Provider value={mockContextValue}>
          <LoginScreen navigation={mockNavigation} />
        </JournalContext.Provider>
      </NavigationContainer>
    );

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert');
  });

// Purpose:
// To verify that the LoginScreen component renders the essential UI elements correctly when it is loaded.

// What It Tests:
// The presence of an input field for the email, identified by the placeholder text 'Email'.
// The presence of an input field for the password, identified by the placeholder text 'Password'.
// The presence of a 'SIGN IN' button.

// Expected Outcome:
// The test checks that these elements are correctly rendered and visible on the screen.

  it('should render correctly', () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('SIGN IN')).toBeTruthy();
  });

// Purpose:
// To ensure that the application provides appropriate feedback if the user attempts to sign in with incorrect credentials.

// What It Tests:
// Mocks the signInWithEmailAndPassword function to simulate a login failure by rejecting the promise with an error.
// Changes the email input field to 'test@example.com'.
// Changes the password input field to 'password123'.
// Simulates a press on the 'SIGN IN' button.
// Waits for and verifies that an alert is shown with the message 'Log In Failed' and 'Please Check Email and Password'.

// Expected Outcome
// The test checks that the Alert.alert function is called with the correct message when login credentials are invalid.
// Ensures the application correctly handles login failures by notifying the user.

  it('should show an alert if email or password is incorrect', async () => {
    signInWithEmailAndPassword.mockRejectedValue(new Error('Invalid credentials'));

    const { getByPlaceholderText, getByText } = renderComponent();

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('SIGN IN'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Log In Failed', 'Please Check Email and Password');
    });
  });
});





