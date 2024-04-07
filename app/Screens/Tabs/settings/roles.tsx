import React from "react"
import { StyleSheet, Text } from "react-native"
import LinearGradient from "react-native-linear-gradient"



const Roles = () => {
    const colors = ['#37D5D6', '#36096D']

    return(
        <LinearGradient colors={colors} style={{...styles.container}}>
            <Text>it works</Text>
        </LinearGradient>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: '#f5e1c9', // Sandy beige background color
      width: '100%'
      
    },

    input: {
      fontSize: 20,
      marginVertical: 8,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      padding: 10,
      margin: 25,
      backgroundColor: '#faf3f2', // Lighter beige for input background
      
    },

    buttonContainer: {
      backgroundColor: '#003F79', // Sandy brown button color
      padding: 12,
      borderRadius: 15,
      borderWidth: 2,
      marginTop: 15,
      width: '95%',
      alignSelf: "center"
    },
    buttonText: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 5
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

export default Roles