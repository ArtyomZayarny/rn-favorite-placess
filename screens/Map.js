import { Alert, StyleSheet, Text } from 'react-native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from '../components/ui/IconButton';

export const Map = () => {
  const [location, setLocation] = useState();
  const navigation = useNavigation();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const selectLocation = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setLocation({ lat, lng });
  };

  const savePickedLocation = useCallback(() => {
    if (!location) {
      Alert.alert(
        'No location picked',
        'You have to pick a location (by taping on the map) first'
      );
      return;
    }
    navigation.navigate('AddPlace', {
      pickedLat: location.lat,
      pickedLng: location.lng,
    });
  }, [location, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocation}
        />
      ),
    });
  }, [savePickedLocation, navigation]);

  return (
    <MapView onPress={selectLocation} initialRegion={region} style={styles.map}>
      {location && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: location.lat,
            longitude: location.lng,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
