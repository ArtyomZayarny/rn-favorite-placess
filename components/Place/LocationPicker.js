import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { OutLineButton } from '../ui/OutLineButton';

export const LocationPicker = () => {
  const getLocationHandler = () => {};

  const pickOnMapHandler = () => {};

  return (
    <View>
      <View style={styles.mapPreview}>{/* <Map /> */}</View>
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
});
