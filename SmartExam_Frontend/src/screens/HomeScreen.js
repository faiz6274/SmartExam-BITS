import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1e",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    letterSpacing: 0.5,
  },
  cardContainer: {
    gap: 16,
    marginBottom: 20,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  cardGradient: {
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
  cardIcon: {
    marginLeft: 16,
  },
  instructorCard: {
    marginTop: 8,
  },
  glowBorder: {
    borderWidth: 1.5,
    borderColor: "rgba(100, 200, 255, 0.3)",
  },
});

export default function HomeScreen({ navigation }) {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("User");

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "accessToken",
        "refreshToken",
        "userRole",
        "userName",
      ]);
      navigation.replace("Login");
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const role = await AsyncStorage.getItem("userRole");
        const name = await AsyncStorage.getItem("userName");
        setUserRole(role);
        setUserName(
          name ? name.charAt(0).toUpperCase() + name.slice(1) : "User"
        );
      } catch (e) {
        console.error("Error fetching user info:", e);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Welcome back,{"\n"}
            {userName}! 👋
          </Text>
          <Text style={styles.subtitle}>Ready to ace your exams?</Text>

          <TouchableOpacity
            onPress={logout}
            style={{ marginTop: 12, alignSelf: "flex-start" }}
            activeOpacity={0.7}
          >
            <Text style={{ color: "#64c8ff", fontWeight: "700" }}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          {/* Scan & Submit Card - Only for Students */}
          {userRole === "student" && (
            <TouchableOpacity
              style={[styles.card, styles.glowBorder]}
              onPress={() => navigation.navigate("Scanner", { examId: 1 })}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#1a4d7f", "#0d2a4a"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Scan & Submit</Text>
                  <Text style={styles.cardDescription}>
                    Capture and submit your exam papers
                  </Text>
                </View>
                <View style={styles.cardIcon}>
                  <MaterialCommunityIcons
                    name="camera-plus"
                    size={32}
                    color="#64c8ff"
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {/* My Submissions Card - Only for Students */}
          {userRole === "student" && (
            <TouchableOpacity
              style={[styles.card, styles.glowBorder]}
              onPress={() => navigation.navigate("Submissions")}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#2d5a3d", "#1a3a24"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>My Submissions</Text>
                  <Text style={styles.cardDescription}>
                    View your submitted exams and grades
                  </Text>
                </View>
                <View style={styles.cardIcon}>
                  <MaterialCommunityIcons
                    name="file-document-outline"
                    size={32}
                    color="#7cff7c"
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {/* Instructor View Card */}
          {userRole === "instructor" && (
            <TouchableOpacity
              style={[styles.card, styles.instructorCard, styles.glowBorder]}
              onPress={() => navigation.navigate("Instructor")}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#7a3f7f", "#4a1f5a"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Instructor Panel</Text>
                  <Text style={styles.cardDescription}>
                    Manage exams and view student submissions
                  </Text>
                </View>
                <View style={styles.cardIcon}>
                  <MaterialCommunityIcons
                    name="shield-account"
                    size={32}
                    color="#ff7cdd"
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
