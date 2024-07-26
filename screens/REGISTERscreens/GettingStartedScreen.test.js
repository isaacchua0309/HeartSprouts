import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GettingStartedScreen from './GettingStartedScreen';
import { NavigationContainer } from '@react-navigation/native';

describe('GettingStartedScreen', () => {
  const navigate = jest.fn();

  const mockNavigation = {
    navigate,
  };

  const renderComponent = () =>
    render(
      <NavigationContainer>
        <GettingStartedScreen navigation={mockNavigation} />
      </NavigationContainer>
    );

  it('should render correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText('Already have an account?')).toBeTruthy();
    expect(getByText('Sign In Here')).toBeTruthy();
    expect(getByText('Warmest Welcome to,')).toBeTruthy();
    expect(getByText('GET STARTED')).toBeTruthy();
  });

  it('should navigate to Name Input screen when GET STARTED is pressed', () => {
    const { getByText } = renderComponent();

    const getStartedButton = getByText('GET STARTED');
    fireEvent.press(getStartedButton);

    expect(navigate).toHaveBeenCalledWith('Name Input');
  });

  it('should navigate to Login screen when Sign In Here is pressed', () => {
    const { getByText } = renderComponent();

    const signInLink = getByText('Sign In Here');
    fireEvent.press(signInLink);

    expect(navigate).toHaveBeenCalledWith('Login');
  });
});

  