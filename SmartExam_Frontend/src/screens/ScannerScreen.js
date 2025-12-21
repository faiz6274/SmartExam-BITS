import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Slider from "@react-native-community/slider";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import api from "../api/axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1e",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(100, 200, 255, 0.2)",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#999",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#64c8ff",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  captureButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  imageGrid: {
    gap: 12,
  },
  imageCard: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "rgba(100, 200, 255, 0.2)",
  },
  imagePreview: {
    width: "100%",
    height: 180,
    backgroundColor: "#0f0f1e",
  },
  imageOverlay: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  submitButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 20,
  },
  submitButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  stats: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: "rgba(100, 200, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(100, 200, 255, 0.2)",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#64c8ff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  compressionSection: {
    backgroundColor: "rgba(100, 200, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(100, 200, 255, 0.2)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  compressionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64c8ff",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  compressionSlider: {
    marginVertical: 12,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#bbb",
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderInfo: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 8,
    padding: 10,
  },
  infoLabel: {
    fontSize: 10,
    color: "#999",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64c8ff",
  },
  examSelector: {
    backgroundColor: "rgba(100, 200, 255, 0.08)",
    borderWidth: 1.5,
    borderColor: "rgba(100, 200, 255, 0.3)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  examSelectorLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64c8ff",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  examList: {
    maxHeight: 120,
  },
  examOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "rgba(100, 200, 255, 0.1)",
    borderWidth: 1.5,
    borderColor: "rgba(100, 200, 255, 0.2)",
  },
  examOptionSelected: {
    backgroundColor: "rgba(100, 200, 255, 0.25)",
    borderColor: "#64c8ff",
  },
  examOptionText: {
    color: "#bbb",
    fontSize: 13,
    fontWeight: "600",
  },
  examOptionTextSelected: {
    color: "#64c8ff",
  },
  examOptionDuration: {
    color: "#999",
    fontSize: 11,
    marginTop: 4,
  },
});

export default function ScannerScreen({ route, navigation }) {
  const { examId: passedExamId } = route.params || { examId: null };
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState(passedExamId || null);
  const [loadingExams, setLoadingExams] = useState(true);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [compressionQuality, setCompressionQuality] = useState(0.75);
  const [compressionStats, setCompressionStats] = useState({});
  const scrollViewRef = useRef(null);

  // Fetch available exams on mount
  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoadingExams(true);
      const response = await api.get("exams/");
      const publishedExams = response.data.filter((exam) => exam.is_published);
      setExams(publishedExams);

      // If no exam was passed and there are exams, select the first one
      if (!passedExamId && publishedExams.length > 0) {
        setSelectedExamId(publishedExams[0].id);
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
      Alert.alert("Error", "Failed to load exams");
    } finally {
      setLoadingExams(false);
    }
  };

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission Denied",
          "Camera access is required to scan documents"
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [8.5, 11],
        quality: 0.8,
      });

      if (!result.canceled) {
        const newImages = result.assets.map((asset) => ({
          id: Date.now() + Math.random(),
          uri: asset.uri,
          timestamp: new Date().toLocaleTimeString(),
        }));

        setImages([...images, ...newImages]);
        setTimeout(
          () => scrollViewRef.current?.scrollToEnd({ animated: true }),
          100
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to capture image: " + error.message);
    }
  };

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const compressImage = async (imageUri) => {
    try {
      // Get original file size
      const originalFileInfo = await FileSystem.getInfoAsync(imageUri);
      const originalSize = originalFileInfo.size || 0;

      // Compress the image
      const compressed = await ImageManipulator.manipulateAsync(
        imageUri,
        [
          {
            resize: {
              width: 1920,
              height: 2560,
            },
          },
        ],
        {
          compress: compressionQuality,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      // Get compressed file size
      const compressedFileInfo = await FileSystem.getInfoAsync(compressed.uri);
      const compressedSize = compressedFileInfo.size || 0;

      // Calculate compression stats
      const compressionPercent = Math.round(
        ((originalSize - compressedSize) / originalSize) * 100
      );

      return {
        uri: compressed.uri,
        originalSize,
        compressedSize,
        compressionPercent,
      };
    } catch (error) {
      console.error("Compression error:", error);
      // Return original if compression fails
      return {
        uri: imageUri,
        originalSize: 0,
        compressedSize: 0,
        compressionPercent: 0,
      };
    }
  };

  const handleSubmit = async () => {
    if (!selectedExamId) {
      Alert.alert("Error", "Please select an exam before submitting.");
      return;
    }

    if (images.length === 0) {
      Alert.alert(
        "No Documents",
        "Please scan at least one document before submitting."
      );
      return;
    }

    Alert.alert(
      "Confirm Submission",
      `You are about to submit ${images.length} document(s). This action cannot be undone.`,
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Submit",
          onPress: async () => {
            await submitExamPapers();
          },
        },
      ]
    );
  };

  const submitExamPapers = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      const stats = {};

      // Compress and add each image to form data
      for (let i = 0; i < images.length; i++) {
        const image = images[i];

        // Compress image
        const compressedData = await compressImage(image.uri);

        // Store compression stats
        stats[`page_${i + 1}`] = {
          original: compressedData.originalSize,
          compressed: compressedData.compressedSize,
          percent: compressedData.compressionPercent,
        };

        formData.append("documents", {
          uri: compressedData.uri,
          type: "image/jpeg",
          name: `page_${i + 1}.jpg`,
        });
      }

      // Store compression stats for display
      setCompressionStats(stats);

      // Add metadata
      formData.append("page_count", images.length);
      // include exam id so backend can associate submission
      formData.append("exam", String(selectedExamId));
      formData.append("submitted_at", new Date().toISOString());
      formData.append("compression_quality", compressionQuality);

      const response = await api.post("submissions/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      Alert.alert(
        "Success",
        "Your exam papers have been submitted successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Submissions"),
          },
        ]
      );
      setImages([]);
    } catch (error) {
      setLoading(false);
      console.error("Submission error:", error);
      Alert.alert(
        "Submission Failed",
        error.response?.data?.detail ||
          error.message ||
          "Failed to submit papers"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan Documents</Text>
        <Text style={styles.subtitle}>
          Capture clear photos of all your exam sheets
        </Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Exam Selection Section */}
        {loadingExams ? (
          <View style={styles.examSelector}>
            <Text style={styles.examSelectorLabel}>Loading exams...</Text>
            <ActivityIndicator color="#64c8ff" size="small" />
          </View>
        ) : exams.length === 0 ? (
          <View style={styles.examSelector}>
            <Text style={styles.examSelectorLabel}>⚠️ No Exams Available</Text>
            <Text style={{ color: "#999", fontSize: 12, marginTop: 8 }}>
              Your instructor hasn't created any exams yet.
            </Text>
          </View>
        ) : (
          <View style={styles.examSelector}>
            <Text style={styles.examSelectorLabel}>📋 Select Exam</Text>
            <ScrollView
              style={styles.examList}
              scrollEnabled={exams.length > 3}
              showsVerticalScrollIndicator={false}
            >
              {exams.map((exam) => (
                <TouchableOpacity
                  key={exam.id}
                  style={[
                    styles.examOption,
                    selectedExamId === exam.id && styles.examOptionSelected,
                  ]}
                  onPress={() => setSelectedExamId(exam.id)}
                >
                  <Text
                    style={[
                      styles.examOptionText,
                      selectedExamId === exam.id &&
                        styles.examOptionTextSelected,
                    ]}
                  >
                    {exam.title}
                  </Text>
                  <Text style={styles.examOptionDuration}>
                    ⏱️ {exam.duration_minutes} min | ✅{" "}
                    {(exam.passing_score * 100).toFixed(0)}%
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Capture Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📸 Capture</Text>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => pickImage()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#1a4d7f", "#0d2a4a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <MaterialCommunityIcons name="camera" size={20} color="#64c8ff" />
              <Text style={styles.buttonText}>Take Photo</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        {images.length > 0 && (
          <View style={styles.stats}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{images.length}</Text>
              <Text style={styles.statLabel}>Pages Scanned</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {(images.length * 2.5).toFixed(1)}
              </Text>
              <Text style={styles.statLabel}>Est. MB</Text>
            </View>
          </View>
        )}

        {/* Compression Settings */}
        {images.length > 0 && (
          <View style={styles.compressionSection}>
            <Text style={styles.compressionTitle}>🗜️ Compression</Text>

            <View style={styles.sliderLabel}>
              <Text style={{ fontSize: 12, color: "#bbb" }}>Quality</Text>
              <Text
                style={{ fontSize: 12, color: "#64c8ff", fontWeight: "600" }}
              >
                {Math.round(compressionQuality * 100)}%
              </Text>
            </View>

            <Slider
              style={styles.compressionSlider}
              minimumValue={0.5}
              maximumValue={1}
              step={0.05}
              value={compressionQuality}
              onValueChange={setCompressionQuality}
              minimumTrackTintColor="#64c8ff"
              maximumTrackTintColor="rgba(100, 200, 255, 0.2)"
              thumbTintColor="#64c8ff"
            />

            <Text
              style={{
                fontSize: 10,
                color: "#999",
                textAlign: "center",
                marginTop: 8,
              }}
            >
              Lower = smaller files | Higher = better quality
            </Text>

            {Object.keys(compressionStats).length > 0 && (
              <View style={styles.sliderInfo}>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Total Saved</Text>
                  <Text style={styles.infoValue}>
                    {Object.values(compressionStats).reduce(
                      (sum, s) => sum + (s.original - s.compressed),
                      0
                    ) /
                      (1024 * 1024) >
                    0
                      ? (
                          Object.values(compressionStats).reduce(
                            (sum, s) => sum + (s.original - s.compressed),
                            0
                          ) /
                          (1024 * 1024)
                        ).toFixed(2)
                      : "0"}
                    MB
                  </Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>Avg. Compression</Text>
                  <Text style={styles.infoValue}>
                    {Object.values(compressionStats).length > 0
                      ? (
                          Object.values(compressionStats).reduce(
                            (sum, s) => sum + s.percent,
                            0
                          ) / Object.values(compressionStats).length
                        ).toFixed(0)
                      : "0"}
                    %
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Documents Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📄 Documents</Text>

          {images.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <MaterialCommunityIcons
                  name="folder-open"
                  size={48}
                  color="#666"
                />
              </View>
              <Text style={styles.emptyText}>
                No documents yet.{"\n"}
                Capture or import exam papers
              </Text>
            </View>
          ) : (
            <FlatList
              scrollEnabled={false}
              data={images}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.imageCard}>
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.imagePreview}
                  />
                  <TouchableOpacity
                    style={styles.imageOverlay}
                    onPress={() => removeImage(item.id)}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={20}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <View style={{ padding: 12, backgroundColor: "#1a1a2e" }}>
                    <Text style={{ color: "#999", fontSize: 12 }}>
                      Page {index + 1} • {item.timestamp}
                    </Text>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              contentContainerStyle={styles.imageGrid}
            />
          )}
        </View>

        {/* Submit Button */}
        {images.length > 0 && (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#c94f2e", "#8b3820"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.submitButtonGradient}
            >
              <MaterialCommunityIcons
                name="cloud-upload"
                size={22}
                color="#fff"
              />
              <Text style={styles.submitButtonText}>
                Submit {images.length} Page(s)
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={{ alignItems: "center" }}>
            <ActivityIndicator size="large" color="#64c8ff" />
            <Text style={{ color: "#fff", marginTop: 12, fontSize: 14 }}>
              Uploading documents...
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
