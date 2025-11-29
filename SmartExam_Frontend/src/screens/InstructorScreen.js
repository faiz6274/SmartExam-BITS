import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, Alert } from 'react-native';
import api from '../api/axios';

export default function InstructorScreen({ route, navigation }) {
  const submission = route.params?.submission;
  const [details, setDetails] = useState(null);
  const [comment, setComment] = useState('');

  const load = async () => {
    try {
      const res = await api.get(`submissions/${submission.id}/`);
      setDetails(res.data);
    } catch (e) { console.error(e); }
  };

  const postComment = async () => {
    if (!comment.trim()) return Alert.alert('Empty', 'Please enter a comment');
    try {
      await api.post('comments/', { submission: submission.id, text: comment });
      setComment('');
      load();
      Alert.alert('Saved', 'Comment added');
    } catch (e) { console.error(e); Alert.alert('Failed', 'Could not add comment.'); }
  };

  useEffect(() => { if (submission) load(); }, [submission]);

  if (!submission) return <View><Text style={{ padding: 16 }}>No submission selected</Text></View>;

  return (
    <View style={{ flex: 1, padding: 12 }}>
      {details ? (
        <>
          <Text style={{ fontWeight: '700' }}>Submission #{details.id}</Text>
          <Text>Student: {details.student}</Text>
          <Text>Files:</Text>
          <FlatList data={details.files} keyExtractor={(f) => String(f.id)} renderItem={({ item }) => (
            <View style={{ padding: 8 }}>
              <Button title={`Open file ${item.id}`} onPress={() => {
                // open S3 link in browser via Linking
                // import Linking from 'react-native' if you want to open
              }} />
            </View>
          )} />

          <Text style={{ marginTop: 12 }}>Comments</Text>
          <FlatList data={details.comments} keyExtractor={(c) => String(c.id)} renderItem={({ item }) => (
            <View style={{ padding: 8 }}>
              <Text style={{ fontWeight: '600' }}>{item.instructor}</Text>
              <Text>{item.text}</Text>
            </View>
          )} ListEmptyComponent={() => <Text style={{ padding: 8 }}>No comments yet</Text>} />

          <TextInput placeholder="Add comment" value={comment} onChangeText={setComment} style={{ borderWidth: 1, padding: 8, marginTop: 8 }} />
          <Button title="Save Comment" onPress={postComment} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
