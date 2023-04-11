import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { createProblem, fetchAllProblems } from './problemsSlice'
import { ProblemEntity } from './problemEntity'
import { View, Text, TextInput, StyleSheet, Button, Image } from 'react-native'
import { Picture } from './picture'
import * as ImagePicker from 'expo-image-picker';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";



export function Problems() {
  const count = useSelector((state: RootState) => state.counter.value)
  const problems: ProblemEntity[] = useSelector((state: RootState) => state.problems.problems)
  const [camera, setCamera] = useState(false);

  const dispatch = useDispatch<AppDispatch>()
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);


  useEffect(() => {
    (async () => {
      // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      // if (status !== 'granted') {
      //   alert('Sorry, we need camera roll permissions to make this work!');
      //   return;
      // }

      // const result = await ImagePicker.launchImageLibraryAsync();
      // if (!result.cancelled) {
      //   setImage(result.uri);
      // }

      // CameraRoll.getPhotos({
      //   first: 20,
      //   assetType: 'Photos',
      // })
      // .then(r => {
      //   console.log("photos", r);
        
      //   // setImage(r.edges);
      //   // this.setState({ photos: r.edges });
      // })
      // .catch((err) => {
      //    //Error Loading Images
      // });

    })();
  }, []);


  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(`subject: ${subject}, description: ${description}`);

    dispatch(createProblem(new ProblemEntity(subject, description)));
  }

  useEffect(() => {
    // dispatch(fetchAllProblems())
  }, [])

  return (
    
    <View style={{flex:1}}>
      {camera ? <Picture setCamera={setCamera}></Picture> : <>
          <TextInput
              style={styles.input}
              onChangeText={setSubject}
              value={subject}
          />
          <TextInput
              style={styles.input}
              onChangeText={setDescription}
              value={description}
          />
          
          <View style={styles.container}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {!image && <Text>No image selected</Text>}
          </View>
        
        <Button title="Open camera" onPress={() => setCamera(true)}/>
        <Button title="Create problem" onPress={handleSubmit}/>
        </>}

    </View>

       /* {problems.map((problem) => (
            <View key={problem?.id}>
                <Text>{problem?.subject} - {problem?.description}</Text>
            </View>
        ))} */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });