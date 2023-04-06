import { Alert, Image, StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { OutLineButton } from '../ui/OutLineButton';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useState } from 'react';

export const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState();

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

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {};

  let locationPreview = <Text>No location picked yet</Text>;

  if (pickedLocation) {
    locationPreview = (
      <MapView
        style={styles.mapPreview}
        initialRegion={{
          latitude: pickedLocation.lat,
          longitude: pickedLocation.lng,
        }}
      />
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});
