import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';

import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../context/auth-context';
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
      console.log(authCtx.token);
    } catch (error) {
      Alert.alert('Invalid input', 'invalid input,please try again later!');
    }
    setIsAuthenticating(false);
  }
  if (isAuthenticating) {
    return <LoadingOverlay message='Creating a user' />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
