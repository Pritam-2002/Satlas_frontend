import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from 'app/utils/apiClient';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface Scholarship {
  _id: string;
  title: string;
  description: string;
  image: string;
  videoEmbedLink: string;
  eligibility: string;
  lastDateToApply: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

const ScholarshipPage = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  const extractYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await apiClient.get('/scholarship/getscholarship');
        console.log('Scholarship Data:', response.data);
        setScholarships(response.data.scholarships);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!scholarships || scholarships.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No scholarships available.</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {scholarships.map((scholarship, index) => (
          <View key={scholarship._id || index} style={styles.scholarshipCard}>
            {scholarship.image && (
              <Image
                source={{ uri: scholarship.image }}
                style={styles.headerImage}
              />
            )}

            <Text style={styles.title}>{scholarship.title}</Text>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.bodyText}>{scholarship.description}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Eligibility</Text>
              <Text style={styles.bodyText}>{scholarship.eligibility}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Last Date to Apply</Text>
              <Text style={styles.dateText}>{formatDate(scholarship.lastDateToApply)}</Text>
            </View>

            {scholarship.videoEmbedLink && (
              <View style={styles.videoSection}>
                <Text style={styles.sectionTitle}>Video Guide</Text>
                <View style={styles.videoContainer}>
                  <YoutubePlayer
                    height={200}
                    width={width - 52}
                    videoId={extractYouTubeVideoId(scholarship.videoEmbedLink)}
                  />
                </View>
              </View>
            )}

            {scholarship.faq?.length > 0 && (
              <View style={styles.faqSection}>
                <Text style={styles.faqHeading}>FAQs</Text>
                {scholarship.faq.map((faq, i) => (
                  <View key={i} style={styles.faqCard}>
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  scholarshipCard: {


    padding: 15,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  dateText: {
    fontSize: 16,
    color: '#E53E3E',
    fontWeight: '600',
  },
  videoSection: {
    marginBottom: 20,
  },
  videoContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  faqSection: {
    marginTop: 20,
  },
  faqHeading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
  },
  faqCard: {
    backgroundColor: '#f3f4f6',
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  faqAnswer: {
    marginTop: 5,
    fontSize: 14,
    color: '#444',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScholarshipPage; 