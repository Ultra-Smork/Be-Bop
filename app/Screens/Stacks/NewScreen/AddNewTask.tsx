import { FieldValue, arrayRemove, arrayUnion, collection, deleteDoc, deleteField, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, FlatList, Modal, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { getPostCrypt } from '../ProjectChoose/PostCryptVar';
import { FIRESTORE_DB } from '../../../../FireBaseConfig';
import { getResidentId } from '../ProjectScreen/HomeScreenComponents/ResidentIdVar';
import { RotationGestureHandler, ScrollView } from 'react-native-gesture-handler';
import { RotateInUpLeft } from 'react-native-reanimated';

interface MyComponentProps {}

const MyComponent: React.FC<MyComponentProps> = ({route} : any) => {
  const [mainInputValue, setMainInputValue] = useState<string>('');
  const [views, setViews] = useState<{ id: number; name: string; items: string[]; settings: ViewSettings }[]>([]);
  const [counter, setCounter] = useState<number>(1);
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedViewId, setSelectedViewId] = useState<number | null>(null);
  const [newPriority, setNewPriority] = useState<string>('');
  const [newColor, setNewColor] = useState<string>('');
  const [modalType, setModalType] = useState<'priority' | 'color' | null>(null);
  const [CURR, setCURR] = useState(0)
  const colors = ['#F53803', '#F5D020']
  interface ViewSettings {
    color: string;
    priority: number;
  }


  const fetch_size = async () => {
    const docs = await getDocs(collection(CURRENT_RESIDENT_PATH, 'Tasks'))
    return docs.size
  }
  
  
  const CURRENT_RESIDENT_PATH = doc(FIRESTORE_DB, `PROJECTS/${getPostCrypt()}/${getPostCrypt()}_CONTENT/${getResidentId()}_RESIDENT/`) 
  const handleAddViewButtonPress = () => {
    if (mainInputValue.trim() !== '') {
      
      setViews([...views, { id: CURR + 1, name: mainInputValue, items: [], settings: { color: 'white', priority: 1 } }]);
      setInputValues({ ...inputValues, [CURR + 1]: '' });
      setDoc(doc(CURRENT_RESIDENT_PATH, `Tasks/Task${CURR + 1}`), { id: CURR + 1, name: mainInputValue, items: {}, color: 'white', priority: 1 })
      updateDoc(CURRENT_RESIDENT_PATH, {tasked: true})
      setCURR(CURR + counter);
      setCounter(counter + 1)
      setMainInputValue('');
    }
  };

  const handleDeleteItem = async (taskId: number) => {
    try {
      // Delete the task from Firestore
      await deleteDoc(doc(CURRENT_RESIDENT_PATH, `Tasks/Task${taskId}`));
  
      // Update the local state (React state) to remove the deleted task
      const updatedViews = views.filter((view) => view.id !== taskId);
      setViews(updatedViews);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  



  const handleDeleteViewButtonPress = async () => {
    try {
      const querySnapshot = await getDocs(collection(CURRENT_RESIDENT_PATH, 'Tasks'));
  
      if (querySnapshot.size > 0) {
        const lastDoc = querySnapshot.docs[querySnapshot.size - 1];
        await deleteDoc(doc(CURRENT_RESIDENT_PATH, `Tasks/${lastDoc.id}`));
        setViews((prevViews) => prevViews.slice(0, -1));
      } else {
        console.log('No documents to delete in the Tasks collection.');
      }
    } catch (error) {
      console.error('Error deleting document from Firestore:', error);
    }
  };
  


  useEffect(() => {
    const fetching = async () => {
      setCURR(await fetch_size())
    }
    const fetchViewsFromFirestore = async () => {
      try {
        // Assuming 'getDocs' and 'collection' are correctly defined
        const querySnapshot = await getDocs(collection(CURRENT_RESIDENT_PATH, 'Tasks'));
  
        const loadedViews: any = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          loadedViews.push({
            id: data.id,
            name: data.name,
            items: data.items,
            settings: { color: data.color || 'white', priority: data.priority || 1 },
          });
        });
        
        setViews(loadedViews);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }

    };
    fetching()
    fetchViewsFromFirestore();
  }, []);
  
  
  

  const handleAddItemButtonPress = (id: number) => {
    inputValues[id] = `• ${inputValues[id]}`
    if (inputValues[id].trim() !== '') {
      const updatedViews = views.map((view) =>
        view.id === id ? { ...view, items: Array.isArray(view.items) ? [...view.items, `${inputValues[id]}`] : [inputValues[id]] } : view
      );
  
      updateDoc(doc(CURRENT_RESIDENT_PATH, `Tasks/Task${id}`), {
        items: arrayUnion(inputValues[id]),
      });
  
      setViews(updatedViews);
      setInputValues({...inputValues, [id]: '' });
    }
  };
  
  

  const handleDeleteLastItemButtonPress = async (id: number) => {
    // Assuming 'views', 'updateDoc', 'doc', 'CURRENT_RESIDENT_PATH', and 'arrayRemove' are correctly defined
  
    // First, update the local state (React state)
    const updatedViews = views.map((view) =>
      view.id === id ? { ...view, items: view.items.slice(0, -1) } : view
    );
    setViews(updatedViews);
  
    // Then, update the Firestore database
    try {
      const docRef = doc(CURRENT_RESIDENT_PATH, `Tasks/Task${id}`);
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        const itemsArray = docSnapshot.data().items || [];
        const updatedItemsArray = itemsArray.slice(0, -1);
  
        // Use updateDoc to update only the 'items' field in the document
        await updateDoc(docRef, { items: updatedItemsArray });
      } else {
        // Handle case where the document doesn't exist
        console.error(`Document with ID ${id} does not exist.`);
      }
    } catch (error) {
      // Handle any errors that might occur during the Firestore update
      console.error('Error updating Firestore document:', error);
    }
  };

  const handleChangePriority = async () => {
    if (selectedViewId !== null && !isNaN(parseInt(newPriority))) {
      const updatedViews = views.map((view) =>
        view.id === selectedViewId ? { ...view, settings: { ...view.settings, priority: parseInt(newPriority) } } : view
      );
      setViews(updatedViews);
      await updateDoc(doc(CURRENT_RESIDENT_PATH, `Tasks/Task${selectedViewId}`), {priority: parseInt(newPriority)})
      setNewPriority('');
      setModalVisible(false);
    }
  };

  const handleChangeColor = async () => {
    if (selectedViewId !== null) {
      const updatedViews = views.map((view) =>
        view.id === selectedViewId ? { ...view, settings: { ...view.settings, color: newColor } } : view
      );
      await updateDoc(doc(CURRENT_RESIDENT_PATH, `Tasks/Task${selectedViewId}`), {color: newColor})
      setViews(updatedViews);
      setNewColor('');  
      setModalVisible(false);
    }
  };



  
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

          <View style={{...styles.buttonContainer, backgroundColor: "#2081f9"}}>
            <Button title="Change Priority" onPress={() => {
              setSelectedViewId(item.id);
              setModalVisible(true);
              setModalType('priority');
            }} />
        </View>
        <View style={{...styles.buttonContainer, backgroundColor: "#2081f9"}}>
          <Button title="Change Color" onPress={() => {
            setSelectedViewId(item.id);
            setModalVisible(true);
            setModalType('color');
          }} />
        </View>

*/

  const renderNewView = ({ item }: { item: { id: number; name: string; items: string[]; settings: ViewSettings } }) => (
    <View style={{...styles.buttonContainer, backgroundColor: item.settings.color}}>
      <View style={{ backgroundColor: item.settings.color, padding: 8, marginBottom: 10 }}>
        <Text style={{...styles.buttonText, fontSize: 40, backgroundColor: item.settings.color , color:"#000000",  textShadowRadius: 0.35}}>
          {item.name}
        </Text>
        <Text style={{...styles.buttonText, fontSize: 20, backgroundColor: item.settings.color , color:"#000000",  textShadowRadius: 0.35}}>Priority: {item.settings.priority}</Text>
      </View>

      <View style={{...styles.cross1, borderWidth: 0}}>
          <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
            <View style={{...styles.cross1, top: -2, left:-2, transform: [{rotateZ: '45deg'}], borderColor: "#A4A4A4"}}>
              <Text style={styles.buttonText}></Text>
            </View>
            <View style={{...styles.cross1, top: -2, left: -2, transform: [{rotateZ: '-45deg'}],  borderColor: "#A4A4A4"}}/>
          </TouchableOpacity>
      </View>


      <TextInput
        style={{...styles.buttonText, ...styles.input,  height: 50, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8, color: "#000000", textShadowRadius: 0 }}
        value={inputValues[item.id]}
        onChangeText={(text) => setInputValues({ ...inputValues, [item.id]: text })}
      />
      <View style={{...styles.buttonContainer}}>
        <View style={{...styles.buttonContainer, backgroundColor: '#806952'}}>
          <TouchableOpacity onPress={() => item.name.length > 0 ? handleAddItemButtonPress(item.id) : null}>
              <View style={{justifyContent: "space-around"}}>
              <Text style={styles.buttonText}>Добавить Подзадачу</Text>
              </View>
          </TouchableOpacity>
        </View>
        <View style={{...styles.buttonContainer, backgroundColor: '#806952'}}>
          <TouchableOpacity onPress={() => item.items.length > 0 ? handleDeleteLastItemButtonPress(item.id) : null}>
              <View style={{justifyContent: "space-around"}}>
                  <Text style={styles.buttonText}>Удалить последнюю подзадачу</Text>
              </View>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{...styles.buttonContainer, backgroundColor: '#806952'}}>
          <TouchableOpacity onPress={() => {
              setSelectedViewId(item.id);
              setModalVisible(true);
              setModalType('priority');
            }}>
              <View style={{justifyContent: "space-around"}}>
                  <Text style={styles.buttonText}>Изменить приоритет</Text>
              </View>
          </TouchableOpacity>
        </View>
        <View style={{...styles.buttonContainer, backgroundColor: '#806952'}}>
          <TouchableOpacity onPress={() => {
            setSelectedViewId(item.id);
            setModalVisible(true);
            setModalType('color');
          }}>
              <View style={{justifyContent: "space-around"}}>
                  <Text style={styles.buttonText}>Изменить цвет</Text>
              </View>
          </TouchableOpacity>
        </View>



      </View>


      </View>



      <FlatList
        style={item.items.length ? {...styles.buttonContainer} : null}
        data={item.items}
        renderItem={({ item: listItem }) => (
            <Text 
            style={{
            ...styles.buttonText,
            textAlign: "left",
            fontSize: 25,
            margin: 10
          }}>{listItem}</Text>
        )}
        keyExtractor={(listItem, index) => index.toString()}
        nestedScrollEnabled={true}
      />
    </View>
  );


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>
      <View>
        <View style={{...styles.buttonContainer}}>
          <TextInput
            style={{...styles.input, ...styles.buttonText, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8, color: "black", textShadowRadius: 0 }}
            value={mainInputValue}
            onChangeText={(text) => setMainInputValue(text)}
            placeholder="Введите название задачи"
          />
          <View style={{...styles.buttonContainer, backgroundColor: '#806952'}}>
              <TouchableOpacity onPress={handleAddViewButtonPress}>
                  <View style={{justifyContent: "space-around"}}>
                      <Text style={styles.buttonText}>Добавить Задачу</Text>
                  </View>
              </TouchableOpacity>
          </View>
          <View style={{...styles.buttonContainer, backgroundColor: '#806952'}}>
              <TouchableOpacity onPress={handleDeleteViewButtonPress}>
                  <View style={{justifyContent: "space-around"}}>
                      <Text style={styles.buttonText}>Удалить последнюю задачу</Text>
                  </View>
              </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={views}
          renderItem={renderNewView}
          keyExtractor={(view) => view.id.toString()}
          nestedScrollEnabled={true}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          style={{width: "200%"}}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10, elevation: 5 }}>
              {modalType === 'priority' &&
                <>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
                    value={newPriority}
                    onChangeText={(text) => setNewPriority(text)}
                    placeholder="Новый приоритет"
                  />
                  <Button title="Применить" onPress={handleChangePriority} />
                </>
              }

              {modalType === 'color' &&
                <>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
                    value={newColor}
                    onChangeText={(text) => setNewColor(text)}
                    placeholder="Новый цвет"
                  />
                  <Button title="Применить" onPress={handleChangeColor} />
                </>
              }

              <Pressable onPress={() => setModalVisible(false)}>
                <View style={{alignItems: "center"}}>
                  <Text>отменить</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

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
  },

  cross1: {
    position: 'absolute',
    height: 22.5,
    width: 1.5,
    top: 10,
    left: 20,
    borderRadius: 100,  
    borderWidth: 2

  }
})

export default MyComponent;
