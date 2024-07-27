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

    // Purpose:
    // To verify that the GettingStartedScreen component renders the expected UI elements correctly when it is loaded.
    
    // What It Tests:
    // The presence of the text "Already have an account?".
    // The presence of the link text "Sign In Here".
    // The presence of the welcoming text "Warmest Welcome to,".
    // The presence of the button text "GET STARTED".
    
    // Expected Outcome:
    // The test checks that these elements are rendered and visible on the screen, ensuring the UI is as expected.

  it('should render correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText('Already have an account?')).toBeTruthy();
    expect(getByText('Sign In Here')).toBeTruthy();
    expect(getByText('Warmest Welcome to,')).toBeTruthy();
    expect(getByText('GET STARTED')).toBeTruthy();
  });

// Purpose:
// To ensure that pressing the "GET STARTED" button triggers navigation to the "Name Input" screen.

// What It Tests:
// Finds the "GET STARTED" button by its text.
// Simulates a press event on the "GET STARTED" button.
// Verifies that the navigation function is called with the argument 'Name Input', indicating successful navigation.

// Expected Outcome:
// The test checks that pressing the "GET STARTED" button navigates the user to the "Name Input" screen.

  it('should navigate to Name Input screen when GET STARTED is pressed', () => {
    const { getByText } = renderComponent();

    const getStartedButton = getByText('GET STARTED');
    fireEvent.press(getStartedButton);

    expect(navigate).toHaveBeenCalledWith('Name Input');
  });

// Purpose:
// To ensure that pressing the "Sign In Here" link triggers navigation to the "Login" screen.

// What It Tests:
// Finds the "Sign In Here" link by its text.
// Simulates a press event on the "Sign In Here" link.
// Verifies that the navigation function is called with the argument 'Login', indicating successful navigation.

// Expected Outcome:
// The test checks that pressing the "Sign In Here" link navigates the user to the "Login" screen.

  it('should navigate to Login screen when Sign In Here is pressed', () => {
    const { getByText } = renderComponent();

    const signInLink = getByText('Sign In Here');
    fireEvent.press(signInLink);

    expect(navigate).toHaveBeenCalledWith('Login');
  });
});

  