import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { FIRESTORE_DB } from '../../../../../FireBaseConfig';
import { getPostCrypt } from '../../ProjectChoose/PostCryptVar';

const DeadLine = () => {
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(true);
  const [showChange, setShowChange] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [deadline, setDeadline] = useState<any>(null);
  const PROJECTS = collection(FIRESTORE_DB, "PROJECTS");
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})/;

  useEffect(() => {
    const fetchDocumentInfo = async () => {
      try {
        const docRef = doc(PROJECTS, getPostCrypt());
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const fetchedDeadline = data?.DeadLine;

        // Check if the fetched deadline is a valid date
        if (fetchedDeadline instanceof Date && !isNaN(fetchedDeadline.getTime())) {
          setDeadline(fetchedDeadline);
        } else {
          console.error("Invalid deadline format:", fetchedDeadline);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocumentInfo();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  useEffect(() => {
    let interval: any;

    const calculateDelta = () => {
      if (deadline) {
        const now: any = new Date();
        const deltaTime = deadline - now;

        const deltaHours = Math.floor(deltaTime / (1000 * 60 * 60));
        const deltaMinutes = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));
        const deltaSeconds = Math.floor((deltaTime % (1000 * 60)) / 1000);

        setHours(deltaHours < 0 ? 0 : deltaHours);
        setMins(deltaMinutes < 0 ? 0 : deltaMinutes);
        setSecs(deltaSeconds < 0 ? 0 : deltaSeconds);

        if (showChange === false) {
          setShowInput(false);
          setShowChange(true);
        }
      }
    };

    if (timerRunning) {
      interval = setInterval(() => {
        calculateDelta();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerRunning, showChange, deadline]); // Include deadline as a dependency

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  return (
    <View>
      <View style={styles.timebox}>
        <View style={styles.flexitem}>
          <Text style={styles.bigtext}>{hours}</Text>
          <Text style={styles.biggertext}>Hours</Text>
        </View>
        <View style={styles.flexitem}>
          <Text style={styles.bigtext}>{mins}</Text>
          <Text style={styles.biggertext}>minutes</Text>
        </View>
        <View style={styles.flexitem}>
          <Text style={styles.bigtext}>{secs}</Text>
          <Text style={styles.biggertext}>seconds</Text>
        </View>
      </View>

      {showChange && (
        <View>
          <Button
            title="Change Deadline"
            onPress={() => {
              stopTimer();
              setShowChange(false);
              setShowInput(true);
            }}
          />
        </View>
      )}

      {showInput && (
        <View>
          <Button title="Set Deadline" onPress={startTimer} />
          <TextInput
            placeholder="DD/MM/YYYY"
            style={styles.container}
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flexitem: {
    flex: 1,
  },
  timebox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bigtext: {
    fontSize: 50,
  },
  biggertext: {
    fontSize: 35,
  },
  container: {
    padding: 20,
    textAlign: 'center',
    borderRadius: 5,
    borderColor: 'grey',
  },
});


export default DeadLine;