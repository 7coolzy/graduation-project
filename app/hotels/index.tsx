import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { fetchHotels } from '../../services/hotelService';

export default function HotelsScreen() {
  const router = useRouter();
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels('Istanbul').then(data => { setHotels(data); setLoading(false); });
  }, []);

  if (loading) return <ActivityIndicator style={styles.loader} />;

  return (
    <FlatList
      data={hotels}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Card style={styles.card} onPress={() => router.push(`/hotels/${item.id}`)}>
          <Card.Cover source={{ uri: item.image || 'placeholder.png' }} />
          <Card.Title title={item.name} subtitle={`${item.price}₺/gece`} />
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({ loader: { flex: 1, justifyContent: 'center', alignItems: 'center' }, list: { padding: 16 }, card: { marginBottom: 12 } });