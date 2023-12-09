import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import auth, { firebase } from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyByIzOvkEmht1IVZ_gK3EZxq9-TroA-5P0",
  authDomain: "",
  databaseURL: "",
  projectId: "foodzone-15127",
  storageBucket: "foodzone-15127.appspot.com",
  messagingSenderId: "",
  appId: "1:659520781638:android:21aac1c5b31ac91a913947",
  measurementId: ""
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()



const LoginScreen = ({ navigation } : { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  const loginUser = async () => {
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setSnackbarText('Signup successful');
          setSnackbarVisible(true);
          navigation.replace("Home")
        })
        .catch(error => {
          
          if (error.code === 'auth/email-already-in-use') {
            auth().signInWithEmailAndPassword(email, password)
            .then(()=> {
              setSnackbarText('Login successful');
              setSnackbarVisible(true);
              navigation.replace("Home")
            })
            .catch(error => {
              console.log("🚀 ~ file: Login.tsx:45 ~ loginUser ~ error:", error)
              setSnackbarText(error?.message);
              setSnackbarVisible(true);
            })
          }
          if (error.code === 'auth/invalid-email') {
            setSnackbarText('That email address is invalid!');
            setSnackbarVisible(true);
          }
          // setSnackbarText(error?.message);
        });
    } catch (error) {
      console.log("🚀 ~ file: Login.tsx:33 ~ loginUser ~ error:", error)
    }
  }

  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button disabled={!(email.length > 0 && password.length > 0)} mode="contained" onPress={loginUser} style={styles.button}>
        Login
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
      >
        {snackbarText}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default LoginScreen;
