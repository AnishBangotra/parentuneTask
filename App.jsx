import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert, Text, ScrollView, Platform } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import * as mime from 'mime';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'axios';
import Title from './src/components/Title';
import Upload from './src/components/Upload';
import UserInfo from './src/components/UserInfo';
import ExpandableList from './src/components/ExpandableList';
import PreviewButton from './src/components/PreviewButton';
import FlowButtons from './src/components/FlowButtons';
import GradientDisplay from './src/components/GradientDisplay';
import RowIcons from './src/components/RowIcons';

const App = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [age, setAge] = useState(null);
  const [formValues, setFormValues] = useState({
    fullName: '',
    date: '',
    month: '',
    year: '',
  });

  const isValidDate = (day, month, year) => {
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
  
    if (
      inputDate instanceof Date &&
      !isNaN(inputDate) &&
      inputDate <= today &&
      inputDate.getFullYear() > 1900 
    ) {
      return true;
    }
    return false;
  }

  const calculateAge = (day, month, year) => {
    if (isValidDate(day, month, year)) {
      const birthDate = new Date(year, month - 1, day); 
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    } else {
      return null;
    }
  }

  const handleSubmit = () => {
    const { date, month, year } = formValues;

    if (isValidDate(date, month, year) && isValidName(formValues.fullName)) {
      setAge(calculateAge(date, month, year));
      togglePreview();
    } else {
      alert('Please enter a valid date and name.');
      setAge(null);
    }
  };

  const isFormValid = () => {
    const { fullName, date, month, year } = formValues;
    return image && fullName.trim() && date.trim() && month.trim() && year.trim();
  };

  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  }

  const requestPermissions = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  
      const status = await check(permission);
  
      if (status === RESULTS.GRANTED) {
        selectImage();
      } else if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
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
                const result = await request(permission);
                if (result === RESULTS.GRANTED) {
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
      } else if (status === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'You have blocked this app from accessing photos. Please enable access in your device settings.'
        );
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo', 
      includeBase64: false, 
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.error) {
        console.error('ImagePicker error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        const { uri, fileSize, type, fileName } = image;

        if (fileSize > 5 * 1024 * 1024) {
          Alert.alert('Image Too Large', 'Please select an image under 5MB.');
          return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(type)) {
          Alert.alert(
            'Invalid File Type',
            'Please select a JPG or PNG image.'
          );
          return;
        }

        uploadImage(uri, type, fileName);
        setImage(uri); 
      } else {
        console.error('No image data found.');
      }
    });
  };

  const uploadImage = (uri, type, fileName) => {
    const formData = new FormData();
    formData.append('entryImage', {
      uri: uri,
      name: fileName,
      type: type,
    });
    formData.append('title', 'Default Title');
    formData.append('description', 'This is a sample description');

    axios.post(`${process.env.POST_URL}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'authToken': `${process.env.AUTH_TOKEN}`,
        'instanceid': `${process.env.INSTANCE_ID}`,
      },
    })
    .then(response => {
      console.log('Image uploaded:', response.data);
    })
    .catch(error => {
      console.error('Upload error:', error);
    });
  };

  const togglePreview = () => {
    setPreview(!preview);
  }

  const callSubmit = () => {
    setSubmit(true);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Title />
        {!image ? (
          <Upload request={requestPermissions}/>
        ) : <Image source={{ uri: image }} style={styles.imagePreview} />}
        {preview ? <RowIcons /> : null}
        {preview ?  <GradientDisplay name={formValues.fullName} age={age} /> : <UserInfo onInputChange={(values) => setFormValues(values)} /> }
        <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, iste! Ipsa obcaecati sequi sed facilis officiis! Soluta perspiciatis architecto magni.</Text>
        <ExpandableList title={'Rules of the Game'} />
        <ExpandableList title={'The Final Print'} />
        {!submit ? (
          <>
             {preview ? <FlowButtons toggle={togglePreview} submit={callSubmit} /> : <PreviewButton toggle={handleSubmit} isDisabled={!isFormValid()} />}
          </>
        ) : null}
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
    width: 'auto',
    height: 327,
    borderRadius: 10,
    marginTop: 20,
  },
  description: {
    marginTop: 30,
    marginBottom: 30
  }
});

export default App;
