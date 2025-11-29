import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SubmissionItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={() => onPress(item)}>
      <View>
        <Text style={styles.title}>Submission #{item.id}</Text>
        <Text>Student: {item.student}</Text>
        <Text>Submitted: {new Date(item.submitted_at).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontWeight: '700' },
});
