import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import api from "../api/axios";

const { width, height } = Dimensions.get("window");

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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#64c8ff",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(100, 200, 255, 0.1)",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#64c8ff",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999",
  },
  activeTabText: {
    color: "#64c8ff",
  },
  submissionCard: {
    backgroundColor: "rgba(100, 200, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(100, 200, 255, 0.2)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  submissionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  studentName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "rgba(124, 255, 124, 0.2)",
    borderWidth: 1,
    borderColor: "#7cff7c",
  },
  statusText: {
    fontSize: 11,
    color: "#7cff7c",
    fontWeight: "600",
  },
  submissionInfo: {
    fontSize: 12,
    color: "#bbb",
    marginBottom: 8,
  },
  fileCount: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64c8ff",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "rgba(100, 200, 255, 0.15)",
    borderWidth: 1.5,
    borderColor: "#64c8ff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#64c8ff",
    fontSize: 12,
    fontWeight: "600",
  },
  createButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  createButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  examCard: {
    backgroundColor: "rgba(124, 255, 124, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(124, 255, 124, 0.3)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  examTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#7cff7c",
    marginBottom: 8,
  },
  examInfo: {
    fontSize: 12,
    color: "#bbb",
    marginBottom: 6,
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#0f0f1e",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(100, 200, 255, 0.2)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  closeButton: {
    padding: 8,
  },
  filePreview: {
    width: "100%",
    height: 300,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    marginBottom: 16,
  },
  fileName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },
  commentsSection: {
    marginTop: 16,
  },
  commentsTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64c8ff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  commentCard: {
    backgroundColor: "rgba(100, 200, 255, 0.08)",
    borderLeftWidth: 3,
    borderLeftColor: "#64c8ff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64c8ff",
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 10,
    color: "#999",
    marginBottom: 6,
  },
  commentText: {
    fontSize: 13,
    color: "#ddd",
    lineHeight: 18,
  },
  commentInput: {
    backgroundColor: "rgba(100, 200, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(100, 200, 255, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 13,
    marginBottom: 12,
    maxHeight: 100,
  },
  submitCommentButton: {
    height: 44,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 12,
  },
  submitCommentGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  submitCommentText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyIcon: {
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64c8ff",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  textInput: {
    backgroundColor: "rgba(100, 200, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(100, 200, 255, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 13,
    marginBottom: 12,
  },
  numberInput: {
    backgroundColor: "rgba(100, 200, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(100, 200, 255, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 13,
  },
  createExamButton: {
    height: 48,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 12,
  },
  createExamGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  createExamText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },
});

export default function InstructorScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("submissions"); // 'submissions' or 'exams'
  const [submissions, setSubmissions] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showCreateExamModal, setShowCreateExamModal] = useState(false);
  const [creatingExam, setCreatingExam] = useState(false);
  const [newExam, setNewExam] = useState({
    title: "",
    description: "",
    duration_minutes: "60",
    passing_score: "0.6",
  });

  const fetchSubmissions = async () => {
    try {
      const res = await api.get("submissions/");
      setSubmissions(res.data);
    } catch (e) {
      console.error("Error fetching submissions:", e);
    }
  };

  const fetchExams = async () => {
    try {
      const res = await api.get("exams/");
      setExams(res.data);
    } catch (e) {
      console.error("Error fetching exams:", e);
    }
  };

  const loadInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchSubmissions(), fetchExams()]);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    if (activeTab === "submissions") {
      await fetchSubmissions();
    } else {
      await fetchExams();
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleCreateExam = async () => {
    if (!newExam.title.trim()) {
      Alert.alert("Error", "Please enter exam title");
      return;
    }

    setCreatingExam(true);
    try {
      await api.post("exams/create/", {
        title: newExam.title,
        description: newExam.description,
        duration_minutes: parseInt(newExam.duration_minutes),
        passing_score: parseFloat(newExam.passing_score),
      });

      Alert.alert("Success", "Exam created successfully!");
      setNewExam({
        title: "",
        description: "",
        duration_minutes: "60",
        passing_score: "0.6",
      });
      setShowCreateExamModal(false);
      await fetchExams();
    } catch (e) {
      console.error("Error creating exam:", e);
      Alert.alert("Error", e.response?.data?.detail || "Failed to create exam");
    } finally {
      setCreatingExam(false);
    }
  };

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
    if (submission.files && submission.files.length > 0) {
      setCurrentFile(submission.files[0]);
    }
    setShowModal(true);
  };

  const handleAddComment = async () => {
    if (!comment.trim()) {
      Alert.alert("Empty", "Please enter a comment");
      return;
    }

    setSubmittingComment(true);
    try {
      await api.post("comments/", {
        submission: selectedSubmission.id,
        text: comment,
      });

      setComment("");
      // Refresh submission details
      const res = await api.get(`submissions/${selectedSubmission.id}/`);
      setSelectedSubmission(res.data);
      Alert.alert("Success", "Comment added successfully");
    } catch (e) {
      console.error("Error adding comment:", e);
      Alert.alert("Error", "Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Instructor Panel</Text>
          <Text style={styles.subtitle}>Manage exams and submissions</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#64c8ff" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Instructor Panel</Text>
        <Text style={styles.subtitle}>Manage exams and submissions</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "submissions" && styles.activeTab]}
          onPress={() => {
            setActiveTab("submissions");
            fetchSubmissions();
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "submissions" && styles.activeTabText,
            ]}
          >
            📋 Submissions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "exams" && styles.activeTab]}
          onPress={() => {
            setActiveTab("exams");
            fetchExams();
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "exams" && styles.activeTabText,
            ]}
          >
            📝 Exams
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={refreshData}
      >
        {activeTab === "submissions" ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              📋 Student Submissions ({submissions.length})
            </Text>

            {submissions.length === 0 ? (
              <View style={styles.emptyState}>
                <View style={styles.emptyIcon}>
                  <MaterialCommunityIcons
                    name="folder-open"
                    size={48}
                    color="#666"
                  />
                </View>
                <Text style={styles.emptyText}>No submissions yet</Text>
              </View>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={submissions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.submissionCard}>
                    <View style={styles.submissionHeader}>
                      <Text style={styles.studentName}>
                        {item.student_name || `Student #${item.student}`}
                      </Text>
                      <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{item.status}</Text>
                      </View>
                    </View>

                    <Text style={styles.submissionInfo}>
                      📄 {item.page_count || 0} pages
                    </Text>
                    <Text style={styles.submissionInfo}>
                      🕒{" "}
                      {item.submitted_at
                        ? new Date(item.submitted_at).toLocaleDateString() +
                          " " +
                          new Date(item.submitted_at).toLocaleTimeString()
                        : "Not submitted"}
                    </Text>

                    {item.files && item.files.length > 0 && (
                      <Text style={styles.fileCount}>
                        📎 {item.files.length} file(s) attached
                      </Text>
                    )}

                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleViewSubmission(item)}
                      >
                        <MaterialCommunityIcons
                          name="eye"
                          size={14}
                          color="#64c8ff"
                        />
                        <Text style={[styles.buttonText, { marginLeft: 4 }]}>
                          Review
                        </Text>
                      </TouchableOpacity>

                      {item.comments && item.comments.length > 0 && (
                        <TouchableOpacity
                          style={[
                            styles.button,
                            {
                              borderColor: "#7cff7c",
                              backgroundColor: "rgba(124, 255, 124, 0.1)",
                            },
                          ]}
                        >
                          <MaterialCommunityIcons
                            name="comment-multiple"
                            size={14}
                            color="#7cff7c"
                          />
                          <Text
                            style={[
                              styles.buttonText,
                              { color: "#7cff7c", marginLeft: 4 },
                            ]}
                          >
                            {item.comments.length}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              📝 Published Exams ({exams.length})
            </Text>

            <TouchableOpacity
              style={styles.createButton}
              onPress={() => setShowCreateExamModal(true)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#1a4d7f", "#0d2a4a"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.createButtonGradient}
              >
                <MaterialCommunityIcons
                  name="plus-circle"
                  size={20}
                  color="#64c8ff"
                />
                <Text style={styles.createButtonText}>Create New Exam</Text>
              </LinearGradient>
            </TouchableOpacity>

            {exams.length === 0 ? (
              <View style={styles.emptyState}>
                <View style={styles.emptyIcon}>
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={48}
                    color="#666"
                  />
                </View>
                <Text style={styles.emptyText}>
                  No exams created yet.{"\n"}
                  Create an exam for your students
                </Text>
              </View>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={exams}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.examCard}>
                    <Text style={styles.examTitle}>{item.title}</Text>
                    <Text style={styles.examInfo}>
                      📝 {item.description || "No description"}
                    </Text>
                    <Text style={styles.examInfo}>
                      ⏱️ Duration: {item.duration_minutes} minutes
                    </Text>
                    <Text style={styles.examInfo}>
                      ✅ Passing Score: {(item.passing_score * 100).toFixed(0)}%
                    </Text>
                    <Text style={styles.examInfo}>
                      📊 Status: {item.is_published ? "Published" : "Draft"}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>
        )}
      </ScrollView>

      {/* Submission Review Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowModal(false);
          setSelectedSubmission(null);
          setCurrentFile(null);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedSubmission?.student_name || "Submission"}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setShowModal(false);
                  setSelectedSubmission(null);
                  setCurrentFile(null);
                }}
              >
                <MaterialCommunityIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {selectedSubmission && (
                <>
                  {/* File Pages */}
                  {selectedSubmission.files &&
                    selectedSubmission.files.length > 0 && (
                      <View>
                        <ScrollView
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          style={{ marginBottom: 16 }}
                        >
                          {selectedSubmission.files.map((file, idx) => (
                            <TouchableOpacity
                              key={file.id}
                              style={[
                                styles.button,
                                {
                                  marginRight: 8,
                                  backgroundColor:
                                    currentFile?.id === file.id
                                      ? "rgba(100, 200, 255, 0.2)"
                                      : "rgba(100, 200, 255, 0.08)",
                                  borderColor:
                                    currentFile?.id === file.id
                                      ? "#64c8ff"
                                      : "rgba(100, 200, 255, 0.2)",
                                },
                              ]}
                              onPress={() => setCurrentFile(file)}
                            >
                              <Text style={styles.buttonText}>
                                Page {idx + 1}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>

                        {currentFile && (
                          <>
                            <Text style={styles.fileName}>
                              📄{" "}
                              {currentFile.file?.split("/").pop() ||
                                "Submitted file"}
                            </Text>
                            {currentFile.file && (
                              <Image
                                source={{ uri: currentFile.file }}
                                style={styles.filePreview}
                                resizeMode="contain"
                              />
                            )}
                          </>
                        )}
                      </View>
                    )}

                  {/* Comments Section */}
                  <View style={styles.commentsSection}>
                    <Text style={styles.commentsTitle}>
                      💬 Comments ({selectedSubmission?.comments?.length || 0})
                    </Text>

                    {selectedSubmission?.comments &&
                    selectedSubmission.comments.length > 0 ? (
                      <FlatList
                        scrollEnabled={false}
                        data={selectedSubmission.comments}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                          <View style={styles.commentCard}>
                            <Text style={styles.commentAuthor}>
                              {item.author_name || "Instructor"}
                            </Text>
                            <Text style={styles.commentTime}>
                              {new Date(item.created_at).toLocaleDateString() +
                                " " +
                                new Date(item.created_at).toLocaleTimeString()}
                            </Text>
                            <Text style={styles.commentText}>{item.text}</Text>
                          </View>
                        )}
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#999",
                          fontStyle: "italic",
                        }}
                      >
                        No comments yet
                      </Text>
                    )}

                    {/* Comment Input */}
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Add a review comment..."
                      placeholderTextColor="#666"
                      multiline
                      value={comment}
                      onChangeText={setComment}
                      editable={!submittingComment}
                    />

                    <TouchableOpacity
                      style={styles.submitCommentButton}
                      onPress={handleAddComment}
                      disabled={submittingComment}
                    >
                      <LinearGradient
                        colors={["#1a4d7f", "#0d2a4a"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.submitCommentGradient}
                      >
                        {submittingComment ? (
                          <ActivityIndicator color="#fff" size="small" />
                        ) : (
                          <>
                            <MaterialCommunityIcons
                              name="send"
                              size={18}
                              color="#fff"
                            />
                            <Text style={styles.submitCommentText}>
                              Post Comment
                            </Text>
                          </>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <View style={{ height: 20 }} />
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Create Exam Modal */}
      <Modal
        visible={showCreateExamModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowCreateExamModal(false);
          setNewExam({
            title: "",
            description: "",
            duration_minutes: "60",
            passing_score: "0.6",
          });
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Exam</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setShowCreateExamModal(false);
                  setNewExam({
                    title: "",
                    description: "",
                    duration_minutes: "60",
                    passing_score: "0.6",
                  });
                }}
              >
                <MaterialCommunityIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ flex: 1, width: "100%" }}
              contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Exam Title</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g., Midterm Exam"
                  placeholderTextColor="#666"
                  value={newExam.title}
                  onChangeText={(val) => setNewExam({ ...newExam, title: val })}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Description</Text>
                <TextInput
                  style={[styles.textInput, { minHeight: 80 }]}
                  placeholder="Exam description (optional)"
                  placeholderTextColor="#666"
                  multiline
                  value={newExam.description}
                  onChangeText={(val) =>
                    setNewExam({ ...newExam, description: val })
                  }
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Duration (minutes)</Text>
                <TextInput
                  style={styles.numberInput}
                  placeholder="60"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={newExam.duration_minutes}
                  onChangeText={(val) =>
                    setNewExam({ ...newExam, duration_minutes: val })
                  }
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Passing Score (0-1)</Text>
                <TextInput
                  style={styles.numberInput}
                  placeholder="0.6"
                  placeholderTextColor="#666"
                  keyboardType="decimal-pad"
                  value={newExam.passing_score}
                  onChangeText={(val) =>
                    setNewExam({ ...newExam, passing_score: val })
                  }
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: "#999",
                    marginTop: 6,
                  }}
                >
                  Enter as decimal (e.g., 0.6 = 60%, 0.7 = 70%)
                </Text>
              </View>

              <TouchableOpacity
                style={styles.createExamButton}
                onPress={handleCreateExam}
                disabled={creatingExam}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#c94f2e", "#8b3820"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.createExamGradient}
                >
                  {creatingExam ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <>
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={20}
                        color="#fff"
                      />
                      <Text style={styles.createExamText}>Create Exam</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
