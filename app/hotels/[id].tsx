import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button, ActivityIndicator } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchHotelById } from '../../services/hotelService';

export default function HotelDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [hotel, setHotel] = useState<any>(null);

  useEffect(() => { fetchHotelById(id).then(setHotel); }, [id]);
  if (!hotel) return <ActivityIndicator style={styles.loader} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card.Cover source={{ uri: hotel.image }} />
      <Card.Content>
        <Text variant="headlineSmall">{hotel.name}</Text>
        <Text>{hotel.description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => router.push(`/hotels/${id}/rooms`)}>
          Odaları Gör
        </Button>
      </Card.Actions>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container: { padding: 16 }, loader: { flex: 1, justifyContent: 'center', alignItems: 'center' } });