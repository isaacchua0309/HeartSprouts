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

  it('should render correctly', () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('SIGN IN')).toBeTruthy();
  });

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





