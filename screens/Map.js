import { Alert, StyleSheet, Text } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { IconButton } from '../components/ui/IconButton';

export const Map = () => {
  const [location, setLocation] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const delta = {
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  useEffect(() => {
    if (isFocused && route.params && !location) {
      const { latitude, longitude } = route.params;
      setLocation((prevState) => ({
        ...prevState,
        latitude,
        longitude,
        ...delta,
      }));
    }
  }, [isFocused, route]);

  const selectLocation = (event) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setLocation((prevState) => ({ ...prevState, latitude, longitude }));
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
      pickedLat: location.latitude,
      pickedLng: location.longitude,
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
    <MapView
      onPress={selectLocation}
      initialRegion={location}
      style={styles.map}
    >
      {location && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
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
