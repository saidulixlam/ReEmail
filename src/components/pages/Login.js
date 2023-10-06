import React, { useRef, useState } from 'react';
import { Form, Button, Col, NavLink } from 'react-bootstrap';
import Layout from '../../ui/Layout';
import { bgurl } from '../../ui/background';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();

  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false); // Track login state

  // Define isLoading as a constant if it's always false
  const isLoading = false;

  const backgroundStyle = {
    backgroundImage: `url(${bgurl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  async function submitHandler(event) {
    event.preventDefault(); // Prevent the default form submission

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (!isLogin) {
      const confirmpassword = confirmpasswordRef.current.value;

      if (enteredPassword !== confirmpassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    let url;
    if (isLogin) {
      // Handle login
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgGnMLqkFKJf5KduGtLESSQoaaEzpd4sM';
    } else {
      // Handle signup
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgGnMLqkFKJf5KduGtLESSQoaaEzpd4sM';
    }

    // Now authenticating with firebase

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = 'Authentication Failed';

        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }

        throw new Error(errorMessage);
      }
    //  
      const data = await response.json();
      const email = data.email;
      const token = data.idToken;
      // console.log(token);
      const endpoint = `${email.replace(/\.|@/g, '')}`;
      localStorage.setItem('endpoint', endpoint);
      // Redirect to Home component after successful login
      history.replace('/home');
      // Set the login state to true
      setLoggedIn(true);
    } catch (err) {
      alert(err.message);
    } finally {
      console.log('done');
    }
    setError('');
  }

  function switchAuthModeHandler() {
    setIsLogin((prev) => !prev);
  }

  function forgetPasswordHandler() {
    console.log('Forget password');
  }

  return (
    <Layout>
      {!isLoggedIn && (
        <div style={backgroundStyle} className="d-flex justify-content-center align-items-center min-vh-100">
          <Col md={3} lg={3} className="border p-3 my-1 rounded bg-info text-light shadow mx-1">
            <h1 className="text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
            {error && <h5 className="text-danger text-center">{error}</h5>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required ref={emailRef} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" required ref={passwordRef} />
              </Form.Group>
              {!isLogin && (
                <Form.Group controlId="confirmpassword">
                  <Form.Label>Confirm Password:</Form.Label>
                  <Form.Control type="password" placeholder="Confirm your password" required ref={confirmpasswordRef} />
                </Form.Group>
              )}
              <div className="text-center">
                {!isLoading && (
                  <NavLink
                    variant="light"
                    className="mt-2 px-2 rounded btn-sm text-danger"
                    onClick={forgetPasswordHandler}
                  >
                    Forget Password?
                  </NavLink>
                )}
              </div>
              <div className="text-center mt-1">
                {!isLoading && (
                  <Button type="submit" variant="primary" className="px-2 w-100 rounded">
                    {isLogin ? 'Login' : 'Create Account'}
                  </Button>
                )}
                {isLoading && <p>Sending request...</p>}
              </div>
            </Form>
            <div className="text-center border my-2">
              <Button
                variant="light"
                onClick={switchAuthModeHandler}
                className="w-100 rounded btn-sm"
              >
                {isLogin ? 'New here? Sign Up' : 'Have an account? Login'}
              </Button>
            </div>
          </Col>
        </div>
      )}
    </Layout>
  );
};

export default Login;
