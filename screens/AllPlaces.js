import React, { useEffect, useState } from 'react';
import { PlacesList } from '../components/Place/PlacesList';
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from '../util/database';

export const AllPlaces = ({ route }) => {
  const [loadedPLaces, setLoadedPLaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPLaces(places);
    };

    if (isFocused) {
      loadPlaces();
    }
  }, []);

  return <PlacesList places={loadedPLaces} />;
};
