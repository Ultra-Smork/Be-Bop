import React, { useEffect, useState } from 'react';
import { ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Text } from 'react-native';
import DeadLine from "./HomeScreenComponents/DeadLine";
import ResidentsList from "./HomeScreenComponents/ResidentsList";
import { collection, doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../../../FireBaseConfig';
import { getPostCrypt } from '../ProjectChoose/PostCryptVar';

const HomeScreen = ({ navigation }: any) => {
  
  const [CREATED, setCREATED] = useState<any | null>(null);
  const PROJECTS = collection(FIRESTORE_DB, "PROJECTS");

  useEffect(() => {
    const fetchData = async () => {
      const thing = await getDoc(doc(PROJECTS, getPostCrypt()));
      const thing_data = thing.data();
      setCREATED(thing_data?.residents);
    };

    fetchData();
  }, []); 

  return (
    <> 
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        >
          <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}> 
            <ResidentsList navigation={navigation} />
          </ScrollView>
        </KeyboardAvoidingView>
    </>
  );
};

export default HomeScreen;
