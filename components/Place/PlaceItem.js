import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable onPress={onSelect} style={{ backgroundColor: 'white' }}>
      <Image
        source={{ uri: place.imageUrl }}
        style={{ width: 50, height: 50 }}
      />
      <View>
        <Text style={{ color: 'black' }}>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({});
