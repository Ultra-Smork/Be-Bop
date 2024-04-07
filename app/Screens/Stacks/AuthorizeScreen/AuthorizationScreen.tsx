import React, { useState } from 'react';
import { Button, View, TextInput, StyleSheet, ActivityIndicator, Text, Image, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../FireBaseConfig';
import { STYLESFORTHINGS } from '../../../styles';
import { LinearGradient } from 'react-native-linear-gradient';

const AuthorizationScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = FIREBASE_AUTH;
  const USERS = collection(FIRESTORE_DB, 'USERS')
  const colors = ['#FFC719', '#BF033B']
  const colors1 = ['#003F79', '#130F40']
  const signUp = async () => {

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, `${email}@gmail.com`, password);
      console.log(response);
      setDoc(doc(USERS, email), { name: email, project: false }); // Note: Avoid storing passwords in clear text
    } catch (error) {
      console.log(error);
      setError('Failed to sign up. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, `${email}@gmail.com`, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ ...STYLESFORTHINGS.container, backgroundColor: '#b8a28d', justifyContent: "center"}}>
      
      <Text style={{...styles.buttonText, fontSize: 120, fontFamily: "kenyan coffee bd"}}>Be Bop</Text>
      <View style={{paddingTop: 120}}>
        <TextInput
          style={{...styles.input, fontFamily: "", borderRadius: 15}}
          value={email}
          placeholder="Имя пользователя"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          editable={!loading} // Disable input when loading
        />
        <TextInput
          style={{...styles.input, fontFamily: "", borderRadius: 15}}
          secureTextEntry={true}
          value={password}
          placeholder="Пароль"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          editable={!loading} // Disable input when loading
        />

      {loading ? (
        <ActivityIndicator size="large" color="#d39353" />
      ) : (
        <View style={{paddingTop: 13.75}}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={signIn} disabled={loading}>
              <View style={{justifyContent: "space-around"}}>
                <Text style={{...styles.buttonText, fontFamily: ""}}>Войти</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={signUp} disabled={loading}>
              <View style={{justifyContent: "space-around"}}>
                <Text style={{...styles.buttonText, fontFamily: ""}}>Создать Аккаунт</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: '#f5e1c9', // Sandy beige background color
      width: '80%',
      
    },

    input: {
      fontSize: 20,
      marginVertical: 8,
      height: 50,
      borderRadius: 4,
      padding: 10,
      backgroundColor: '#faf3f2', // Lighter beige for input background
      
    },

    buttonContainer: {
      backgroundColor: '#664f38', // Sandy brown button color
      padding: 12,
      borderRadius: 15,
      marginTop: 15,
      width: '100%',
    },
    buttonText: {
      fontFamily: "Reef",
      color: '#fff', // White button text
      textAlign: 'center',
      fontSize: 18,
      letterSpacing: 3
    },
    errorText: {
      color: '#ff0000', // Red error text
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 10,
      fontFamily: "kenyan coffee bd"
    },
    logo: {
      width: 500,
      margin: 20,
      flex: 1,
      alignSelf: "center",
      justifyContent: "center",
      resizeMode: "contain",
    }
  });  

export default AuthorizationScreen;
