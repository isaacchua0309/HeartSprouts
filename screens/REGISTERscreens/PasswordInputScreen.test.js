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

  it('should render correctly', () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    expect(getByText('What password would you like to secure your account with?')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('should update password validation state', () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(passwordInput, 'Password1');

    expect(getByText('✓ 8 CHARACTERS')).toHaveStyle({ backgroundColor: '#28a745' });
    expect(getByText('✓ 1 CAPITAL')).toHaveStyle({ backgroundColor: '#28a745' });
    expect(getByText('✓ 1 LOWERCASE')).toHaveStyle({ backgroundColor: '#28a745' });
    expect(getByText('✓ 1 NUMBER')).toHaveStyle({ backgroundColor: '#28a745' });
  });

  it('should show an alert if password requirements are not met', () => {
    const { getByTestId, getByPlaceholderText } = renderComponent();

    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'pass');

    const sendButton = getByTestId('registerButton');
    fireEvent.press(sendButton);

    expect(Alert.alert).toHaveBeenCalledWith('Password Requirements', 'Please ensure your password meets all the requirements.');
    expect(navigate).not.toHaveBeenCalled();
  });

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






