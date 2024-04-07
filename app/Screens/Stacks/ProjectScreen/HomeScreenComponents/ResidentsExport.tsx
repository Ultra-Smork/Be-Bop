import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { doc, setDoc, collection, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { getPostCrypt } from '../../ProjectChoose/PostCryptVar';
import { FIRESTORE_DB } from '../../../../../FireBaseConfig';
import { setResidentId } from './ResidentIdVar';

const ResidentsExportComponent = ({ residents, navigation }: {residents: number, navigation: any}) => {
  const [residentData, setResidentData] = useState(
    Array.from({ length: residents }, () => ({ current: '', submitted: false }))
  );
  const PROJECTS = collection(FIRESTORE_DB, "PROJECTS");
  const [CREATEDRESIDENTS, setCREATEDRESIDENTS] = useState(false)
  const [COUNTRESIDENTS, setCOUNTRESIDENTS] = useState(0)
  const [ResidentNames, setResidentNames] = useState([])
  const fetch_resident_states = async () => {
    const thing = await getDoc(doc(PROJECTS, getPostCrypt()))
    const thing_data = thing.data()
    return thing_data?.residents
  }
  const fetch_resident_names = async () => {
    const residentsDoc = await getDoc(doc(CONTENT_PATH, "RESIDENTS"));
    const residentsData = residentsDoc.data();
    return residentsData?.items;
  }
  useEffect(() => {
  
    const fetchData = async () => {

      if (await fetch_resident_states()) {
        setCREATEDRESIDENTS(true)
        let b = await fetch_resident_names();
        setResidentNames(b);
      }
    };

    fetchData();

  }, []);
  

  const CONTENT_PATH = collection(FIRESTORE_DB, `PROJECTS/${getPostCrypt()}/${getPostCrypt()}_CONTENT`);
  console.log(getPostCrypt())

  const navigateToNextScreen = (residentNumber: number) => {
    const fetch_residents = async () => {
      const usersData = await getDoc(doc(CONTENT_PATH, 'RESIDENTS'))
      const usersListData = usersData.data();
      console.log(usersListData)  
    }
    fetch_residents()
    setResidentId(residentNumber)

    navigation.navigate(`NewScreen${residentNumber}`);
  };

  const handleInputChange = (index: number,input  : string) => {
    setResidentData((prevData) => {
      const newData = [...prevData];
      newData[index].current = input;
      return newData;
    });
  };

  const fetch_residents_amount = async () => {
    const residentsDoc = await getDoc(doc(CONTENT_PATH, "RESIDENTS"))
    const residentsData = residentsDoc.data()
    return residentsData?.residents
  }

  const handleSubmission = async (index: number) => {
    setResidentData((prevData) => {
      const newData = [...prevData];
      newData[index].submitted = true;
      return newData;
    });
  
    const residentsCount = await fetch_residents_amount();
  
    if (COUNTRESIDENTS + 1 === residentsCount) {
      setCREATEDRESIDENTS(true);
      updateDoc(doc(PROJECTS, getPostCrypt()), {residents: true})
      const residentsDoc = await getDoc(doc(CONTENT_PATH, "RESIDENTS"));
      const residentsData = residentsDoc.data();
      const names = residentsData?.items;
      setResidentNames(names);
      console.log(names);
    }
  
    setCOUNTRESIDENTS(COUNTRESIDENTS + 1);
    console.log(COUNTRESIDENTS)
  };

  useEffect(() => {
    residentData.forEach((resident, index) => {
      if (resident.submitted) {
        const updateFirebase = async () => {
          const docRef = doc(CONTENT_PATH, `${index}_RESIDENT/`);
          updateDoc(doc(CONTENT_PATH, 'RESIDENTS'), { [`${index}`]: resident.current, items: arrayUnion(resident.current)})
          try {
            await setDoc(docRef, { curr: `${resident.current}`, tasked: false});

          } catch (error) {
            console.error("Error updating document: ", error);
          }
        };
        index++;
        updateFirebase();
      }
    });
  }, [residentData]);
  



/*
<View style={styles.buttonContainer}>
    <TouchableOpacity onPress={signIn} disabled={loading}>
        <View style={{justifyContent: "space-around"}}>
            <Text style={styles.buttonText}>Войти</Text>
        </View>
    </TouchableOpacity>
</View>
*/ 
/*
        <View style={{...styles.buttonContainer, backgroundColor:"#fad57f"}}>
          <Button title={`Go to ${residentName}'s screen`} onPress={() => navigateToNextScreen(index + 1)} />
        </View>
*/


  return ( 
    <View >
  {CREATEDRESIDENTS && (
  <View>
    <Text style={{...styles.buttonText, fontSize: 40, marginBottom: 30, fontFamily:"kenyan coffee bd"}}>Ветки</Text>
    {ResidentNames.map((residentName, index) => (
      <View key={index} style={{...styles.buttonContainer}}>
        <View>
          <Text style={{
            ...styles.buttonText,
            margin: 15,
            fontSize: 35
          }}>{residentName}</Text>
        </View>
        <View style={{...styles.buttonContainer, backgroundColor: "#806952"}}>
            <TouchableOpacity onPress={() => navigateToNextScreen(index + 1)}>
                <View style={{justifyContent: "space-around"}}>
                    <Text style={styles.buttonText}>Войти в ветку</Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
    ))}
  </View>
)}

    {!CREATEDRESIDENTS && (
      <View>
        <Text style={{...styles.buttonText, fontSize: 40, fontFamily: "kenyan coffee bd"}}>Введите название веток</Text>
        {residentData.map((resident, index) => (
          <View key={index + 1} style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignContent: 'space-between', margin: 15 }}>
            {!resident.submitted && (
              <View style={{...styles.buttonContainer, marginBottom: 15, }}>
                <TextInput
                  style={{
                    ...styles.input,
                  }}
                  value={resident.current}
                  placeholder={`Ветка ${index + 1}`}
                  onChangeText={(input) => handleInputChange(index, input)}
                />
                <View style={{...styles.buttonContainer, backgroundColor: '#806952', marginTop: 20}}>
                    <TouchableOpacity onPress={() => handleSubmission(index)}>
                        <View style={{justifyContent: "space-around"}}>
                            <Text style={styles.buttonText}>Подтвердить название</Text>
                        </View>
                    </TouchableOpacity>
                </View>
              </View>
            )}

            {resident.submitted && (
              <View style={{...styles.buttonContainer}}>
                <Text style={{
                  ...styles.buttonText,
                  margin: 15,
                  fontSize: 35,
                }}>{resident.current}</Text>
                <View style={{...styles.buttonContainer, backgroundColor: "#806952"}}>
                    <TouchableOpacity onPress={() => navigateToNextScreen(index + 1)}>
                        <View style={{justifyContent: "space-around"}}>
                            <Text style={styles.buttonText}>Войти в ветку {resident.current}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
  )}
    </View>
    
  );
  
};



/*
                <View style={{...styles.buttonContainer, backgroundColor:"#fad57f"}}>
                  <Button title={`Войти в ветку ${resident.current}`} onPress={() => navigateToNextScreen(index + 1)}/>
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
    borderRadius: 15,
    padding: 12.5,
    margin: 25,
    backgroundColor: '#faf3f2', // Lighter beige for input background
    
  },

  buttonContainer: {
    backgroundColor: '#b8a28d', // Sandy brown button color
    padding: 12,
    borderRadius: 15,
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


export default ResidentsExportComponent;
