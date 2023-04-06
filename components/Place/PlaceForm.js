import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Colors } from '../../constants/colors';
import { ImagePicker } from './ImagePicker';
import { LocationPicker } from './LocationPicker';
import { Button } from '../ui/Button';

export const PlaceForm = () => {
  const [title, setTitle] = useState('');
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();

  const changeTitle = (title) => setTitle(title);

  const onImageTaken = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const onPickLocation = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    console.log('title', title);
    console.log('pickedLocation', pickedLocation);
    console.log('selectedImage', selectedImage);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitle} />
      </View>
      <ImagePicker onImageTaken={onImageTaken} />
      <LocationPicker onPickLocation={onPickLocation} />
      <Button onPress={savePlaceHandler}>Add place</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: { fontWeight: 'bold', marginBottom: 4, color: Colors.primary500 },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
