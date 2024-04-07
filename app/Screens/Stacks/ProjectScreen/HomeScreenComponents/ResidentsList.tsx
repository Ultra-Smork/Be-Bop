import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Dropdown from 'react-native-input-select';
import ResidentsExportComponent from './ResidentsExport';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getPostCrypt } from '../../ProjectChoose/PostCryptVar';
import { FIRESTORE_DB } from '../../../../../FireBaseConfig';
import LinearGradient from 'react-native-linear-gradient';

const ResidentsList = ({ navigation }: any) => {
  const [residents, setResidents] = useState<number>(2);
  const [pressed, setPressed] = useState<boolean>(false); // Changed the state name to setPressed
  const colors = ['#F53803', '#F5D020']
  const CONTENT_PATH = collection(FIRESTORE_DB, `PROJECTS/${getPostCrypt()}/${getPostCrypt()}_CONTENT`);
  const PROJECTS = collection(FIRESTORE_DB, "PROJECTS");
  const items = [
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
  ];

  const handleButtonBeingPressed = async () => {
    setPressed(true);
  };

  const fetch_residents = async () => {
    const docs = await getDoc(doc(PROJECTS, getPostCrypt()))
    const data = docs.data()
    return data?.residents
  }

  useEffect(() => {
    const fetching = async () => {
      if (await fetch_residents()){
        setPressed(true)
      }
    }
    
    updateDoc(doc(CONTENT_PATH, 'RESIDENTS'), { residents: residents });
    fetching()
  }, [residents]); // Include residents in the dependency array


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
            <Button title={'Submit'} onPress={handleButtonBeingPressed} />
          </View>


*/

  return (
    <View style={{...styles.container, backgroundColor: '#664f38'}}>
      {!pressed && (
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <Text style={{...styles.buttonText, fontSize: 40, fontFamily: "kenyan coffee bd"}}>Выберите количество веток</Text>
          <View style={{...styles.buttonContainer, marginBottom: 25}}>
          <Dropdown
            options={items}
            selectedValue={residents}
            onValueChange={(value: React.SetStateAction<number>) => setResidents(value)}
            primaryColor={'green'}
          />
          <View style={{...styles.buttonContainer, backgroundColor: '#806952'}}>
              <TouchableOpacity onPress={handleButtonBeingPressed}>
                  <View style={{justifyContent: "space-around"}}>
                      <Text style={styles.buttonText}>Подтвердить количество веток</Text>
                  </View>
              </TouchableOpacity>
          </View>
          </View>
        </View>
      )}
      {pressed && (
        <ScrollView nestedScrollEnabled={true}>
          <ResidentsExportComponent residents={residents} navigation={navigation} />
        </ScrollView>
      )}
      <View style={{height: 600}}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f5e1c9', // Sandy beige background color
      width: '100%',
      height: '100%'
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
})

export default ResidentsList;
