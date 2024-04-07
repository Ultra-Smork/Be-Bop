import { createStackNavigator } from "@react-navigation/stack" 
import NewScreen from "../NewScreen/NewScreen";
import HomeScreen from "../ProjectScreen/HomeScreened";


const ResidentsBranchNavigator = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{headerShown: false}}/>            
            <Stack.Screen name="NewScreen" component={NewScreen} options={{headerShown: false}}/>
            <Stack.Screen name="NewScreen1" component={NewScreen} options={{headerShown: false}}/>
            <Stack.Screen name="NewScreen2" component={NewScreen} options={{headerShown: false}}/>
            <Stack.Screen name="NewScreen3" component={NewScreen} options={{headerShown: false}}/>
            <Stack.Screen name="NewScreen4" component={NewScreen} options={{headerShown: false}}/>
            <Stack.Screen name="NewScreen5" component={NewScreen} options={{headerShown: false}}/>
            <Stack.Screen name="NewScreen6" component={NewScreen} options={{headerShown: false}}/>
            <Stack.Screen name="NewScreen7" component={NewScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default ResidentsBranchNavigator;