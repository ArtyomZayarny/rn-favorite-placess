import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from 'expo-image-picker';
import { useState } from 'react';
import { StyleSheet, Button, View, Alert, Image, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { OutLineButton } from '../ui/OutLineButton';

export const ImagePicker = ({ onImageTaken }) => {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState();

  const verifyPermissions = async () => {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInfo.status == PermissionStatus.DENIED) {
      const permissionResponse = await requestPermission();
      if (permissionResponse) {
        return permissionResponse.granted;
      }
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app'
      );
      return false;
    }
    return true;
  };

  const takeImage = async () => {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(image.assets[0].uri);
    onImageTaken(image.assets[0].uri);
  };

  let imagePreview = <Text>No image taken yet</Text>;
  if (image) {
    imagePreview = <Image style={styles.image} source={{ uri: image }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutLineButton icon="camera" onPress={takeImage}>
        Take Image
      </OutLineButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
