import { StyleSheet, Text, View, Alert } from 'react-native';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';
function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const [message, setMessage] = useState();
  const token = authCtx.token;
  useEffect(() => {
    async function getMessage() {
      try {
        const response = await axios.get(
          'https://react-native-test-fb759-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=' +
            token
        );
        const data = response.data;
        setMessage(data);
      } catch (error) {
        Alert.alert('invalid', 'try it later!');
      }
    }
    getMessage();
  }, [token]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
