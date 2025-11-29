import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import api from '../api/axios';
import SubmissionItem from '../components/SubmissionItem';

export default function SubmissionsListScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get('submissions/');
      setItems(res.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={items} keyExtractor={(i) => String(i.id)} renderItem={({ item }) => (
        <SubmissionItem item={item} onPress={(s) => navigation.navigate('Instructor', { submission: s })} />
      )} ListEmptyComponent={() => <Text style={{ padding: 16 }}>No submissions yet</Text>} />
    </View>
  );
}
