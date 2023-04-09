import { Alert, Image, StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { OutLineButton } from '../ui/OutLineButton';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

export const LocationPicker = ({ onPickLocation }) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [address, setAddress] = useState();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const getAddress = async () => {
    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;

    const response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    for (let item of response) {
      let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
      setAddress(address);
    }
  };

  useEffect(() => {
    getAddress();
    if (isFocused && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
      getAddress();
    }
  }, [isFocused, route]);

  useEffect(() => {
    onPickLocation({ location: { ...pickedLocation }, address });
  }, [pickedLocation, onPickLocation]);

  const [locationPermissionInfo, requestPermission] =
    Location.useForegroundPermissions();
  const verifyPermission = async () => {
    if (
      locationPermissionInfo.status === Location.PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (locationPermissionInfo.status == Location.PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app'
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const location = await Location.getCurrentPositionAsync();

    await setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    await getAddress();
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  let locationPreview = <Text>No location picked yet</Text>;

  if (pickedLocation) {
    locationPreview = (
      <MapView
        style={styles.mapPreview}
        camera={{
          center: {
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
          },
        }}
        initialRegion={{
          latitude: pickedLocation.lat,
          longitude: pickedLocation.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
          }}
        />
      </MapView>
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutLineButton onPress={getLocationHandler} icon="location">
          Locate User
        </OutLineButton>
        <OutLineButton onPress={pickOnMapHandler} icon="map">
          Pick on map
        </OutLineButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});
