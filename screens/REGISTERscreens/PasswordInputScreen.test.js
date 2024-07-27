import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PassWordInputScreen from './PasswordInputScreen';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { createUserDocumentWithFriends } from '../../utils/actions/userCollectionCreation';
import { Alert } from 'react-native';

jest.mock('@firebase/auth');
jest.mock('../../utils/actions/userCollectionCreation');

describe('PassWordInputScreen', () => {
  const navigate = jest.fn();
  const mockRoute = {
    params: {
      name: 'Test Name',
      birthday: '01/01/2000',
      email: 'test@example.com',
    },
  };

  const mockNavigation = {
    navigate,
    goBack: jest.fn(),
  };

  const renderComponent = () =>
    render(
      <NavigationContainer>
        <PassWordInputScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>
    );

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert');
  });


//   Purpose:
// To check if the component renders the expected elements correctly when it is loaded.
// Verifies that the instructional text and the password input field are present.

// What It Tests:
// The presence of the text "What password would you like to secure your account with?".
// The presence of a placeholder text "Password" in the password input field.

  it('should render correctly', () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    expect(getByText('What password would you like to secure your account with?')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

//   Purpose:
// To check if the password validation indicators update correctly when the user enters a valid password.

// What It Tests:
// When the password "Password1" is entered:
// The indicator for "8 CHARACTERS" should turn green (style { backgroundColor: '#28a745' }).
// The indicator for "1 CAPITAL" should turn green.
// The indicator for "1 LOWERCASE" should turn green.
// The indicator for "1 NUMBER" should turn green.

  it('should update password validation state', () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(passwordInput, 'Password1');

    expect(getByText('✓ 8 CHARACTERS')).toHaveStyle({ backgroundColor: '#28a745' });
    expect(getByText('✓ 1 CAPITAL')).toHaveStyle({ backgroundColor: '#28a745' });
    expect(getByText('✓ 1 LOWERCASE')).toHaveStyle({ backgroundColor: '#28a745' });
    expect(getByText('✓ 1 NUMBER')).toHaveStyle({ backgroundColor: '#28a745' });
  });

// Purpose:
// To ensure that an alert is shown if the user tries to submit a password that does not meet the requirements.

// What It Tests:
// Entering a password "pass" which does not meet the requirements.
// Pressing the register button triggers an alert with the message 'Password Requirements'.
// Ensures the navigation does not occur if the password is invalid.

  it('should show an alert if password requirements are not met', () => {
    const { getByTestId, getByPlaceholderText } = renderComponent();

    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'pass');

    const sendButton = getByTestId('registerButton');
    fireEvent.press(sendButton);

    expect(Alert.alert).toHaveBeenCalledWith('Password Requirements', 'Please ensure your password meets all the requirements.');
    expect(navigate).not.toHaveBeenCalled();
  });

//   Purpose:
//   To verify that when a valid password is entered, the app successfully navigates to the "Account Creation Successful" screen.

//   What It Tests:
//   Mocks the Firebase createUserWithEmailAndPassword function to resolve successfully.
//   Mocks the createUserDocumentWithFriends function to resolve successfully.
//   Enters a valid password "Password1".
//   Presses the register button.
//   Checks if the navigation to 'Account Creation Successful' screen occurs with the correct email parameter.

  it('should navigate to Account Creation Successful screen if password meets requirements', async () => {
    createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: '123' } });
    createUserDocumentWithFriends.mockResolvedValue();

    const { getByTestId, getByPlaceholderText } = renderComponent();

    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'Password1');

    const sendButton = getByTestId('registerButton');
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('Account Creation Successful', { email: 'test@example.com' });
    });
  });
});






