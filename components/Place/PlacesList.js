import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PlaceItem } from './PlaceItem';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

export const PlacesList = ({ places }) => {
  const nav = useNavigation();
  const selectPlace = (id) => {
    nav.navigate('PlaceDetails', {
      placeId: id,
    });
  };
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ padding: 8 }}
      keyExtractor={(item) => item.id}
      data={places}
      renderItem={(data) => (
        <PlaceItem place={data.item} onSelect={selectPlace} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
