import LinearGradient from "react-native-linear-gradient";
import AddNewTask from "./AddNewTask"
import { StyleSheet, View } from "react-native";
const NewScreen = () => {
    const colors = ['#F53803', '#F5D020']

    return (
      
      <View style={{...styles.container, backgroundColor: '#664f38'}}>
        <AddNewTask />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f5e1c9', // Sandy beige background color
      width: '100%'
    },
    input: {
      fontSize: 20,
      marginVertical: 8,
      height: 50,
      borderRadius: 4,
      borderWidth: 2,
      padding: 10,
      backgroundColor: '#faf3f2', // Lighter beige for input background
      
    },
    
    buttonContainer: {
      backgroundColor: '#e8cc89', // Sandy brown button color
      padding: 12,
      borderRadius: 15,
      borderWidth: 2,
      marginTop: 20,
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
})

export default NewScreen;