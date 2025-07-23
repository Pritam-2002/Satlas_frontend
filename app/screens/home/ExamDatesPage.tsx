import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from 'app/utils/apiClient';

const ExamDatePage = () => {
    const [examData, setExamData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExamDates = async () => {
            try {
                const response = await apiClient.get('/examdates/getexamdate');
                const dataArray = response?.data?.ExamDatesresult || [];
                setExamData(dataArray);
            } catch (error) {
                console.error('Error fetching Exam Dates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExamDates();
    }, []);

    const formatExamField = (field: any) => {
        if (!field) return 'N/A';
        if (field.value) return new Date(field.value).toLocaleDateString();
        if (field.note) return field.note;
        return 'N/A';
    };

    const renderVideoLink = (url: string) => {
        if (!url) return null;
        return (
            <Text style={styles.videoLink} onPress={() => Linking.openURL(url)}>
                🎥 Watch Video
            </Text>
        );
    };

    const renderFAQ = (faq: any[]) => {
        if (!faq?.length) return null;
        return (
            <View style={styles.faqContainer}>
                <Text style={styles.subHeading}>FAQs:</Text>
                {faq.map((item, index) => (
                    <View key={index} style={styles.faqItem}>
                        <Text style={styles.faqQ}>Q: {item.question}</Text>
                        <Text style={styles.faqA}>A: {item.answer}</Text>
                    </View>
                ))}
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
            </View>
        );
    }

    if (!examData.length) {
        return (
            <View style={styles.loaderContainer}>
                <Text>No exam date data available.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={examData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {item.examDateimage && (
                            <Image source={{ uri: item.examDateimage }} style={styles.image} />
                        )}
                        <Text style={styles.examName}>{item.examName}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text>📅 Exam Date: {formatExamField(item.examDate)}</Text>
                        <Text>🎫 Admit Card: {formatExamField(item.admitCardReleaseDate)}</Text>
                        <Text>📢 Result Date: {formatExamField(item.resultDate)}</Text>
                        {renderVideoLink(item.videoEmbedLink)}
                        {renderFAQ(item.faq)}
                    </View>
                )}
                numColumns={1}
                contentContainerStyle={styles.gridContainer}
            />
        </SafeAreaView>
    );
};

export default ExamDatePage;

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridContainer: {
        padding: 12,
    },
    card: {
        flex: 1,
        marginVertical: 10,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        height: 180,
        width: '100%',
        borderRadius: 10,
        marginBottom: 12,
    },
    examName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e3a8a',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 10,
    },
    subHeading: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    videoLink: {
        color: '#2563eb',
        marginTop: 8,
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    faqContainer: {
        marginTop: 10,
        backgroundColor: '#f1f5f9',
        padding: 10,
        borderRadius: 8,
    },
    faqItem: {
        marginBottom: 8,
    },
    faqQ: {
        fontWeight: 'bold',
        color: '#111827',
    },
    faqA: {
        color: '#374151',
        marginLeft: 4,
    },
});
