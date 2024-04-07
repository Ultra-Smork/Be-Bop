import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { ActivityIndicator, Button, StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../../FireBaseConfig";
import { useState, useEffect } from "react";
import { setPostCrypt, getPostCrypt } from "./PostCryptVar";
import { getProjectId, setProjectId } from "./ProjectIdVar";
import LinearGradient from "react-native-linear-gradient";

const USERS = collection(FIRESTORE_DB, 'USERS');
const PROJECTS = collection(FIRESTORE_DB, "PROJECTS");
const ChooseScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [projectEnter, setProjectEnter] = useState('');
    const colors = ['#F53803', '#F5D020']
    const colors2 = ['#2C69D1', '#0ABCF9']
    const [PROJECTSTATUS, setProjectStatus] = useState(false);

    
    const fetch_data_project = async () => {
        let b = getPostCrypt();
        const userData = await getDoc(doc(PROJECTS, b));
        const UserCurrentData = userData.data();
        return UserCurrentData?.projectId;
    };
    useEffect(() => {
        const fetchUserEmail = async () => {
            const userEmail = FIREBASE_AUTH.currentUser?.email;
            if (userEmail) {
                const preCrypt = userEmail.slice(0, -10);
                const userLength = preCrypt.length;
                let updatedPostCrypt = "";
                    
                for (let i = 0; i < userLength; i++) {
                    updatedPostCrypt += preCrypt.charCodeAt(i);
                }
                setPostCrypt(updatedPostCrypt);
            }
        };
        const fetch_project_state = async () => {
            //@ts-ignore
            const thing = await getDoc(doc(USERS, FIREBASE_AUTH.currentUser?.email));
            const thing_data = thing.data();
            setProjectStatus(thing_data?.project);
        }
        fetch_project_state();
        fetchUserEmail();
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    const handleAddButtonPressing = async () => {
        if (FIREBASE_AUTH.currentUser?.email && name){
        setDoc(doc(PROJECTS, getPostCrypt()), { Owner: FIREBASE_AUTH.currentUser?.email, projectId: getPostCrypt(), projectName: name, residents: false, DeadLine: "" });
        updateDoc(doc(USERS, FIREBASE_AUTH.currentUser?.email), {project: true})
        const USERCONTENT = collection(FIRESTORE_DB, `PROJECTS/${getPostCrypt()}/${getPostCrypt()}_CONTENT`);
        setDoc(doc(USERCONTENT, `RESIDENTS`), {items: []});
        setProjectStatus(await fetch_data_project());
        setName('');
    }  
    };

    const handleDelButtonPressing = () => {
        deleteDoc(doc(PROJECTS, `${FIREBASE_AUTH.currentUser?.email}`));
        setProjectStatus(false)
    };

    const handleHomeProjectButton = () => {
        const userEmail = FIREBASE_AUTH.currentUser?.email;
        let double_checked1 = ""
        if (userEmail) {
            const preCrypt = userEmail.slice(0, -10);
            const userLength = preCrypt.length;
            let updatedPostCrypt = "";
                
            for (let i = 0; i < userLength; i++) {
                updatedPostCrypt += preCrypt.charCodeAt(i);
            }
            double_checked1 = updatedPostCrypt
        }
        setPostCrypt(double_checked1)
        setPostCrypt(double_checked1)
        navigation.navigate('TabNavigator')

    }
    const handleEnterButtonPressing = () => {
        setProjectId(projectEnter)
        setPostCrypt(projectEnter) // shared variable to load proper data
        console.log(getProjectId())
        navigation.navigate('TabNavigator');
    };

    const GotoMyProject = () => {
        const userEmail = FIREBASE_AUTH.currentUser?.email;
        let double_checked = ""
        if (userEmail) {
            const preCrypt = userEmail.slice(0, -10);
            const userLength = preCrypt.length;
            let updatedPostCrypt = "";
                
            for (let i = 0; i < userLength; i++) {
                updatedPostCrypt += preCrypt.charCodeAt(i);
            }
            double_checked = updatedPostCrypt
        }
        console.log(getProjectId())
        setProjectId(double_checked)
        console.log(getProjectId())

        navigation.navigate('TabNavigator')
    }
/*
<View style={styles.buttonContainer}>
    <TouchableOpacity onPress={signIn} disabled={loading}>
        <View style={{justifyContent: "space-around"}}>
            <Text style={styles.buttonText}>Войти</Text>
        </View>
    </TouchableOpacity>
</View>
*/ 
// 

    return (
        <View style={{...styles.container, backgroundColor: '#664f38' }}>
            <Text style={{...styles.buttonText, fontSize: 60, fontFamily: "kenyan coffee bd", marginBottom: 35}}>Выберите Проект</Text>

            <View style={{...styles.buttonContainer, marginBottom: 55}}>
                <Text style={{...styles.buttonText, textShadowRadius: 15}}>Управление своим проектом</Text>
                
                {!PROJECTSTATUS ? (
                    <>  
                    <TextInput value={name} onChangeText={(text) => setName(text)} style={styles.input} placeholder="Введите название проекта"/>
                        <View style={{...styles.buttonContainer, backgroundColor: '#806952'}}>
                            <TouchableOpacity onPress={handleAddButtonPressing}>
                                <View style={{justifyContent: "space-around"}}>
                                    <Text style={{...styles.buttonText}}>Создать проект</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                ):
                <View style={{...styles.buttonContainer, backgroundColor: '#806952'}}>
                    <TouchableOpacity onPress={handleHomeProjectButton}>
                        <View style={{justifyContent: "space-around"}}>
                            <Text style={styles.buttonText}>Войти в мой проект</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                }
                
                <View style={{...styles.buttonContainer, backgroundColor: '#806952'}}>
                    <TouchableOpacity onPress={handleDelButtonPressing}>
                        <View style={{justifyContent: "space-around"}}>
                            <Text style={styles.buttonText}>Удалить мой Проект</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={{...styles.buttonContainer, marginBottom: 25}}>
            <Text style={{...styles.buttonText, textShadowRadius: 15}}>Войти в существующий проект</Text>
                <View>
                    <TextInput value={projectEnter} onChangeText={(id: string) => setProjectEnter(id)} style={styles.input} placeholder="Введите id проекта"/>
                </View> 
                <View style={{...styles.buttonContainer, backgroundColor: '#806952'}}>
                    <TouchableOpacity onPress={handleEnterButtonPressing}>
                        <View style={{justifyContent: "space-around"}}>
                            <Text style={styles.buttonText}>Войти</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{...styles.buttonContainer, backgroundColor: '#806952'}}>
                    <TouchableOpacity onPress={GotoMyProject}>
                        <View style={{justifyContent: "space-around"}}>
                            <Text style={styles.buttonText}>Войти в последний проект</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

/*

<View style={{...styles.buttonContainer, backgroundColor:"#fad57f"}}>
    <Button title="Go to this project" onPress={handleEnterButtonPressing} />
</View>


*/

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
      padding: 10,
      margin: 25,
      backgroundColor: '#faf3f2', // Lighter beige for input background
      
    },

    buttonContainer: {
      backgroundColor: '#b8a28d', // Sandy brown button color
      padding: 12,
      borderRadius: 15,

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

export default ChooseScreen;
