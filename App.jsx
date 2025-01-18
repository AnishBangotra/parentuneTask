import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import axios from 'axios';
import Title from './src/components/Title';
import Upload from './src/components/Upload';
import UserInfo from './src/components/UserInfo';
import ExpandableList from './src/components/ExpandableList';
import PreviewButton from './src/components/PreviewButton';

const App = () => {
  const [image, setImage] = useState(null);
  const [formValues, setFormValues] = useState({
    fullName: '',
    date: '',
    month: '',
    year: '',
  });

  const isFormValid = () => {
    const { fullName, date, month, year } = formValues;
    return fullName.trim() && date.trim() && month.trim() && year.trim();
  };

  const requestPermissions = async () => {
    try {
      Alert.alert(
        'Permission Required',
        'This app needs access to your photos to upload an image. Do you want to allow this?',
        [
          {
            text: 'No',
            onPress: () => console.log('Permission denied by user'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              const result = await Permissions.request('photo');
              if (result === 'granted') {
                selectImage();
              } else {
                Alert.alert(
                  'Permission Denied',
                  'You need to grant photo access to upload images.'
                );
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  const selectImage = () => {
    const options = {
      storageOptions: {
        // maxSize: 5120,
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.error) {
        console.error('ImagePicker error: ', response.error);
      } else if (response.uri) {
        setImage(response.uri);
        uploadImage(response.uri);
      }
    });
  };

  const uploadImage = (uri) => {
    const formData = new FormData();
    formData.append('image', {
      uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    axios.post('YOUR_API_ENDPOINT', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log('Image uploaded:', response.data);
    })
    .catch(error => {
      console.error('Upload error:', error);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Title />
        {!image ? (
          <Upload request={requestPermissions}/>
        ) : <Image source={{ uri: image }} style={styles.imagePreview} />}
        <UserInfo onInputChange={(values) => setFormValues(values)} />
        <Text style={{marginTop: "20", marginBottom: "20"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, iste! Ipsa obcaecati sequi sed facilis officiis! Soluta perspiciatis architecto magni.</Text>
        <ExpandableList title={'Rules of the Game'} />
        <ExpandableList title={'The Final Print'} />
        <PreviewButton isDisabled={!isFormValid()} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexGrow: 1,
    padding: 30,
  },
  imagePreview: {
    width: 327,
    height: 327,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default App;
