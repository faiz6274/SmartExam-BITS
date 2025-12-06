import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
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
  listContainer: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(100, 200, 255, 0.2)",
    backgroundColor: "#1a1a2e",
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statusPending: {
    backgroundColor: "rgba(255, 193, 7, 0.2)",
    borderWidth: 1,
    borderColor: "#FFC107",
  },
  statusPendingText: {
    color: "#FFC107",
  },
  statusReviewed: {
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  statusReviewedText: {
    color: "#4CAF50",
  },
  statusRejected: {
    backgroundColor: "rgba(244, 67, 54, 0.2)",
    borderWidth: 1,
    borderColor: "#F44336",
  },
  statusRejectedText: {
    color: "#F44336",
  },
  cardDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailIcon: {
    width: 20,
    alignItems: "center",
  },
  detailText: {
    fontSize: 12,
    color: "#bbb",
    flex: 1,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: "rgba(100, 200, 255, 0.1)",
    paddingTop: 12,
  },
  viewButton: {
    borderRadius: 8,
    overflow: "hidden",
  },
  viewButtonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: "rgba(100, 200, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(100, 200, 255, 0.2)",
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
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
});

export default function SubmissionsListScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadSubmissions = async () => {
    try {
      const res = await api.get("submissions/");
      setItems(res.data);
    } catch (e) {
      console.error("Failed to load submissions:", e);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadSubmissions();
  };

  const getStatusBadge = (status) => {
    const statuses = {
      pending: {
        badge: styles.statusPending,
        text: styles.statusPendingText,
        label: "Pending",
      },
      reviewed: {
        badge: styles.statusReviewed,
        text: styles.statusReviewedText,
        label: "Reviewed",
      },
      rejected: {
        badge: styles.statusRejected,
        text: styles.statusRejectedText,
        label: "Rejected",
      },
    };
    return statuses[status] || statuses.pending;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderSubmissionCard = ({ item }) => {
    const statusInfo = getStatusBadge(item.status || "pending");
    const totalPages = item.page_count || 0;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Instructor", { submission: item })}
        activeOpacity={0.8}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Submission #{item.id}</Text>
            <View style={[styles.badge, statusInfo.badge]}>
              <Text style={[styles.badgeText, statusInfo.text]}>
                {statusInfo.label}
              </Text>
            </View>
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={16}
                  color="#64c8ff"
                />
              </View>
              <Text style={styles.detailText}>
                {formatDate(item.submitted_at || new Date())}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <MaterialCommunityIcons
                  name="file-document-multiple"
                  size={16}
                  color="#64c8ff"
                />
              </View>
              <Text style={styles.detailText}>{totalPages} Page(s)</Text>
            </View>

            {item.reviewed_at && (
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={16}
                    color="#4CAF50"
                  />
                </View>
                <Text style={styles.detailText}>
                  Reviewed on {formatDate(item.reviewed_at)}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.cardFooter}>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() =>
                navigation.navigate("Instructor", { submission: item })
              }
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#1a4d7f", "#0d2a4a"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.viewButtonGradient}
              >
                <MaterialCommunityIcons name="eye" size={16} color="#64c8ff" />
                <Text style={styles.viewButtonText}>View Details</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Submissions</Text>
          <Text style={styles.subtitle}>Track your exam paper submissions</Text>
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
        <Text style={styles.title}>My Submissions</Text>
        <Text style={styles.subtitle}>Track your exam paper submissions</Text>
      </View>

      {items.length > 0 ? (
        <>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{items.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {items.filter((i) => i.status === "pending").length}
              </Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {items.filter((i) => i.status === "reviewed").length}
              </Text>
              <Text style={styles.statLabel}>Reviewed</Text>
            </View>
          </View>

          <FlatList
            data={items}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderSubmissionCard}
            contentContainerStyle={styles.listContainer}
            scrollIndicatorInsets={{ right: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#64c8ff"
              />
            }
          />
        </>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#64c8ff"
            />
          }
        >
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <MaterialCommunityIcons
                name="inbox-multiple"
                size={64}
                color="#666"
              />
            </View>
            <Text style={styles.emptyTitle}>No Submissions Yet</Text>
            <Text style={styles.emptyText}>
              Start by scanning and submitting your exam papers from the home
              screen
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
