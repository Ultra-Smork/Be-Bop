import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ResidentsBranchNavigator from "../../Stacks/StackNavigators/ResidentsBranchNavigator";
import Info from "../ProjectInfo/Info";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import Roles from "../settings/roles";
import { getPostCrypt } from "../../Stacks/ProjectChoose/PostCryptVar";
import { collection, doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../../FireBaseConfig";


const TabNavigator = () => {
    const FIRE_OWNER = FIREBASE_AUTH.currentUser?.email

    const PROJECTS = collection(FIRESTORE_DB, "PROJECTS");
    const Tab = createBottomTabNavigator();
    const [currentUser, setCurrentUser] = useState("")
    const [owner, setOwner] = useState(false)

    useEffect(() => {
        const fetch_data_project = async () => {
            let thing = await getDoc(doc(PROJECTS, getPostCrypt()))
            const thingdata = thing.data()
            if (thingdata){
                setCurrentUser(thingdata.Owner)
            }
        }

        fetch_data_project()
        console.log(currentUser, FIRE_OWNER)
        if (currentUser === FIRE_OWNER){
            setOwner(true)
        }
    }, [currentUser])

    
    return (
        <>
        { owner ? (
        <Tab.Navigator initialRouteName="ResidentBranchNavigator" >
            <Tab.Screen name="Project" component={ResidentsBranchNavigator} options={{headerShown: false, tabBarIcon: () => <Image source={require('./Project.png')} style={styles.image}/>}} />
            <Tab.Screen name="Info" component={Info} options={{tabBarIcon: () => <Image source={require('./info-icon.png')} style={styles.image}/>, headerShown: false}} />
        </Tab.Navigator>
        ):
        (
        <Tab.Navigator initialRouteName="ResidentBranchNavigator" >
            <Tab.Screen name="Project" component={ResidentsBranchNavigator} options={{headerShown: false, tabBarIcon: () => <Image source={require('./Project.png')} style={styles.image}/>}} />
        </Tab.Navigator>
        )
    }
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 20,
        width: 20
    }
})

export default TabNavigator;    