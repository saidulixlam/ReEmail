import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login'; // Update the import path to your component

describe('Login Component', () => {
  it('renders the login form', () => {
    const {getByLabelText } = render(<Login />);
    
    // Check if the login form elements are present
    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
  });

  it('displays an error message when passwords do not match', () => {
    const { getByText, getByLabelText } = render(<Login />);
    const passwordInput = getByLabelText('Password:');
    const confirmPasswordInput = getByLabelText('Confirm Password:');

    // Simulate entering different passwords
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'mismatchedpassword' } });

    // Submit the form
    fireEvent.click(getByText('Create Account'));

    // Check if the error message is displayed
    expect(getByText('Passwords do not match.')).toBeInTheDocument();
  });

  it('handles form submission for login', () => {
    const { getByLabelText} = render(<Login />);
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');

    // Simulate entering email and password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    });

  it('handles form submission for signup', () => {
    const { getByLabelText, getByText } = render(<Login />);
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    const confirmPasswordInput = getByLabelText('Confirm Password:');
  
    // Simulate entering email, password, and confirm password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
  
    // Switch to signup mode
    fireEvent.click(getByText('Forget Password?'));
  
    // Submit the form
    fireEvent.click(getByText('Create Account'));
  
  });

  it('handles "Forget Password" button click', () => {
    const { getByText } = render(<Login />);
    const forgetPasswordButton = getByText('Forget Password?');

    // Simulate clicking the "Forget Password" button
    fireEvent.click(forgetPasswordButton);

  });
});
