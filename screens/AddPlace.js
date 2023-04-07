import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PlaceForm } from '../components/Place/PlaceForm';

export const AddPlace = ({ navigation }) => {
  const createPlace = (place) => {
    navigation.navigate('AllPlaces', {
      place,
    });
  };

  return <PlaceForm onCreatePlace={createPlace} />;
};

const styles = StyleSheet.create({});
