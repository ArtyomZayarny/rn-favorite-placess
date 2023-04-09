import React from 'react';
import { PlaceForm } from '../components/Place/PlaceForm';
import { insertPlace } from '../util/database';

export const AddPlace = ({ navigation }) => {
  const createPlace = async (place) => {
    await insertPlace(place);
    navigation.navigate('AllPlaces', {
      place,
    });
  };

  return <PlaceForm onCreatePlace={createPlace} />;
};
