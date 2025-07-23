import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import registrationService, { RegistrationData } from '../../services/registrationService';
import apiClient from 'app/utils/apiClient';

const RegistrationScreen = () => {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await apiClient.get('/registration/getregistrations');
        console.log("Here is the response", + response);

        setRegistrations(response.data.registrations);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await registrationService.getRegistrations();
      setRegistrations(response.registrations);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      Alert.alert('Error', 'Failed to fetch registration information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRegistrations();
    setRefreshing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const openRegistrationLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open registration link');
    });
  };

  const openVideoLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open video link');
    });
  };

  const toggleFAQ = (registrationId: string, questionIndex: number) => {
    const key = `${registrationId}-${questionIndex}`;
    setExpandedFAQ(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderRegistrationCard = (registration: RegistrationData) => {
    const startDate = new Date(registration.registrationStart.value);
    const endDate = new Date(registration.registrationEnd.value);
    const currentDate = new Date();
    const isRegistrationOpen = currentDate >= startDate && currentDate <= endDate;
    const isUpcoming = currentDate < startDate;
    const isClosed = currentDate > endDate;

    return (
      <View key={registration._id} style={styles.registrationCard}>
        {/* Header Image */}
        {registration.image && (
          <Image source={{ uri: registration.image }} style={styles.registrationImage} />
        )}

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.title}>{registration.title}</Text>

          {/* Status Badge */}
          <View style={[
            styles.statusBadge,
            {
              backgroundColor: isRegistrationOpen
                ? '#34C759'
                : isUpcoming
                  ? '#FF9500'
                  : '#FF3B30'
            }
          ]}>
            <Text style={styles.statusText}>
              {isRegistrationOpen ? 'Open Now' : isUpcoming ? 'Upcoming' : 'Closed'}
            </Text>
          </View>

          {/* Content */}
          <Text style={styles.content}>{registration.content}</Text>

          {/* Registration Dates */}
          <View style={styles.datesContainer}>
            <View style={styles.dateItem}>
              <Icon name="calendar-outline" size={20} color="#666" />
              <View style={styles.dateContent}>
                <Text style={styles.dateLabel}>Registration Start</Text>
                <Text style={styles.dateValue}>{formatDate(registration.registrationStart.value)}</Text>
                {registration.registrationStart.note && (
                  <Text style={styles.dateNote}>{registration.registrationStart.note}</Text>
                )}
              </View>
            </View>

            <View style={styles.dateItem}>
              <Icon name="calendar-outline" size={20} color="#666" />
              <View style={styles.dateContent}>
                <Text style={styles.dateLabel}>Registration End</Text>
                <Text style={styles.dateValue}>{formatDate(registration.registrationEnd.value)}</Text>
                {registration.registrationEnd.note && (
                  <Text style={styles.dateNote}>{registration.registrationEnd.note}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.registerButton]}
              onPress={() => openRegistrationLink(registration.registrationLink)}
            >
              <Icon name="person-add-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Register Now</Text>
            </TouchableOpacity>

            {registration.videoEmbedLink && (
              <TouchableOpacity
                style={[styles.button, styles.videoButton]}
                onPress={() => openVideoLink(registration.videoEmbedLink)}
              >
                <Icon name="play-circle-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Watch Video</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* FAQ Section */}
          {registration.faq && registration.faq.length > 0 && (
            <View style={styles.faqContainer}>
              <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
              {registration.faq.map((faqItem, index) => {
                const faqKey = `${registration._id}-${index}`;
                const isExpanded = expandedFAQ[faqKey];

                return (
                  <View key={index} style={styles.faqItem}>
                    <TouchableOpacity
                      style={styles.faqQuestion}
                      onPress={() => toggleFAQ(registration._id, index)}
                    >
                      <Text style={styles.faqQuestionText}>{faqItem.question}</Text>
                      <Icon
                        name={isExpanded ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#666"
                      />
                    </TouchableOpacity>
                    {isExpanded && (
                      <View style={styles.faqAnswer}>
                        <Text style={styles.faqAnswerText}>{faqItem.answer}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <LinearGradient
        colors={['#dbe6ff', '#ffffff']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#612EF7" />
          <Text style={styles.loadingText}>Loading registrations...</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#dbe6ff', '#ffffff']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SAT Registration</Text>
          <TouchableOpacity onPress={fetchRegistrations}>
            <Icon name="refresh-outline" size={24} color="#612EF7" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {registrations.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="document-text-outline" size={80} color="#ccc" />
              <Text style={styles.emptyText}>No registration information available</Text>
              <Text style={styles.emptySubText}>Check back later for updates</Text>
            </View>
          ) : (
            registrations.map(renderRegistrationCard)
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: RFValue(16),
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: RFValue(20),
    fontWeight: '700',
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  registrationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  registrationImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: RFValue(12),
    fontWeight: '600',
  },
  content: {
    fontSize: RFValue(14),
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  datesContainer: {
    marginBottom: 20,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dateContent: {
    marginLeft: 12,
    flex: 1,
  },
  dateLabel: {
    fontSize: RFValue(12),
    color: '#999',
    fontWeight: '500',
  },
  dateValue: {
    fontSize: RFValue(14),
    color: '#333',
    fontWeight: '600',
    marginTop: 2,
  },
  dateNote: {
    fontSize: RFValue(12),
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  registerButton: {
    backgroundColor: '#612EF7',
  },
  videoButton: {
    backgroundColor: '#FF6B2C',
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(14),
    fontWeight: '600',
  },
  faqContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  faqTitle: {
    fontSize: RFValue(16),
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 12,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  faqQuestionText: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  faqAnswer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f1f3f4',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  faqAnswerText: {
    fontSize: RFValue(13),
    color: '#666',
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: RFValue(18),
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: RFValue(14),
    color: '#ccc',
    marginTop: 8,
  },
});

export default RegistrationScreen; 