import React from 'react';
import { View, Button, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Welcome to SmartExam</Text>
      <Button title="Scan & Submit" onPress={() => navigation.navigate('Scanner', { examId: 1 })} />
      <View style={{ height: 8 }} />
      <Button title="My Submissions" onPress={() => navigation.navigate('Submissions')} />
      <View style={{ height: 8 }} />
      <Button title="Instructor View" onPress={() => navigation.navigate('Instructor')} />
    </View>
  );
}
