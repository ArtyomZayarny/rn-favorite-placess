import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PlacesList } from '../components/Place/PlacesList';
import { useIsFocused } from '@react-navigation/native';

export const AllPlaces = ({ route }) => {
  const [loadedPLaces, seLoadedPLaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      seLoadedPLaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);
  return <PlacesList places={loadedPLaces} />;
};
