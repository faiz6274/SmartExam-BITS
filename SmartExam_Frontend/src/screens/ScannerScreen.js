import React, { useState } from 'react';
import { View, Button, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import api from '../api/axios';

export default function ScannerScreen({ route, navigation }) {
  const { examId } = route.params || { examId: 1 };
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Camera access is required to scan pages');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: false, quality: 1 });
    if (!result.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(result.uri, [{ resize: { width: 1600 } }], { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG });
      setImages(prev => [...prev, manipResult.uri]);
    }
  };

  const upload = async () => {
    if (images.length === 0) { Alert.alert('No pages', 'Please capture at least one page'); return; }
    try {
      const subRes = await api.post('submissions/', { exam: examId });
      const submissionId = subRes.data.id;

      const form = new FormData();
      images.forEach((uri, i) => {
        form.append('files', {
          uri,
          name: `page_${i+1}.jpg`,
          type: 'image/jpeg',
        });
      });

      await api.post(`submissions/${submissionId}/upload_files/`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      Alert.alert('Success', 'Submission uploaded');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Upload failed');
    }
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Button title="Capture Page" onPress={pickImage} />
      <Button title="Upload Submission" onPress={upload} />
      <ScrollView horizontal>
        {images.map((uri, i) => <Image key={i} source={{ uri }} style={{ width: 200, height: 280, margin: 8 }} />)}
      </ScrollView>
    </View>
  );
}
