import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from 'app/utils/apiClient';

const BlogPage = () => {
  const [blogData, setBlogData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get('/blog/getblogs');
        console.log('Blog Data:', response.data);
        setBlogData(response.data);
      } catch (error) {
        console.error('Error fetching Blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!blogData || blogData.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No blog data available.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {blogData.map((blog, index) => (
          <View key={blog._id || index}>
            {blog.blogimage && (
              <Image
                source={{ uri: blog.blogimage }}
                style={styles.headerImage}
              />
            )}

            <Text style={styles.title}>{blog.blogTitle}</Text>
            <Text style={styles.bodyText}>{blog.blogPostContent}</Text>

            {blog.faq?.length > 0 && (
              <>
                <Text style={styles.faqHeading}>FAQs</Text>
                {blog.faq.map((faq: any, i: number) => (
                  <View key={i} style={styles.faqCard}>
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,


  },
  headerImage: {
    width: '100%',

    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    paddingTop: "10%"

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    paddingHorizontal: 20,
    color: '#333',
  },
  bodyText: {
    fontSize: 16,
    color: '#555',
    paddingHorizontal: 20,
    marginTop: 10,
    lineHeight: 24,
    marginBottom: 20,

  },
  faqHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    paddingHorizontal: 20,
    color: '#1f2937',
  },
  faqCard: {
    backgroundColor: '#f3f4f6',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
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
