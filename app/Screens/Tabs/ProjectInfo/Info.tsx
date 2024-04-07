import { StyleSheet, Text, View } from "react-native"
import { getProjectId } from "../../Stacks/ProjectChoose/ProjectIdVar"
import LinearGradient from "react-native-linear-gradient"
import { getPostCrypt } from "../../Stacks/ProjectChoose/PostCryptVar"

/*
<View style={styles.buttonContainer}>
    <TouchableOpacity onPress={signIn} disabled={loading}>
        <View style={{justifyContent: "space-around"}}>
            <Text style={styles.buttonText}>Войти</Text>
        </View>
    </TouchableOpacity>
</View>
*/ 


const Info = () => {
    const CurrentProjectInformation = getPostCrypt()
    const colors = ['#F53803', '#F5D020']
    return(
        <View style={{...styles.container, backgroundColor: '#b8a28d' }}>
            <Text selectable={true} style={{...styles.buttonText, fontSize:40, fontFamily:"Reef"}}>id Вашего проекта: {CurrentProjectInformation} </Text>
        </View>
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
    backgroundColor: '#dfd1b0', // Lighter beige for input background
    
  },

  buttonContainer: {
    backgroundColor: '#003F79', // Sandy brown button color
    padding: 12,
    borderRadius: 15,
    borderWidth: 2,
    marginTop: 15,
    width: '100%',
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

export default Info;