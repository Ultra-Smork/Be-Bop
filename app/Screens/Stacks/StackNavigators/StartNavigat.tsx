import TabNavigator from "../../Tabs/TabNavgiator/TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../../FireBaseConfig";
import ChooseScreen from "../ProjectChoose/ChooseScreen";
import AuthorizationScreen from "../AuthorizeScreen/AuthorizationScreen";


const Stack = createStackNavigator();

const StackNavigator = () => {
    const [user, setUser] = useState<User | null>(null)
    
    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('user: ', user)
            setUser(user)
        });
    }, [])

    return (
    <Stack.Navigator initialRouteName="Authorization"  screenOptions={{headerShown: false}}>
        {user ? (
        <Stack.Screen name="ChooseScreen" component={ChooseScreen} />
        ) : (
        <Stack.Screen name="Authorization" component={AuthorizationScreen}/>
        )}
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}}/>
    </Stack.Navigator>
    )
}

export default StackNavigator;