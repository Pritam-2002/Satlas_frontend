import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function BookDemoScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [demoDate, setDemoDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [subject, setSubject] = useState('');
    const [timeSlot, setTimeSlot] = useState('');

    const handleBookDemo = () => {
        if (!name || !email || !phone || !subject || !timeSlot) {
            Alert.alert('Please fill all fields!');
            return;
        }

        Alert.alert('Demo Booked!', `Thank you ${name}, demo for ${subject} is booked on ${demoDate.toDateString()} at ${timeSlot}`);
        // Clear fields
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setTimeSlot('');
        setDemoDate(new Date());
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Book Your Free SAT Demo Class</Text>

            <TextInput
                style={styles.input}
                placeholder="Your Full Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="black"
            />

            <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="black"
            />

            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor="black"
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text>{demoDate.toDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={demoDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setDemoDate(selectedDate);
                    }}
                    style={{ color: 'black' }}
                />
            )}

            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Select Subject</Text>
                <Picker
                    selectedValue={subject}
                    onValueChange={(itemValue) => setSubject(itemValue)}
                    style={{ color: 'black' }}
                >
                    <Picker.Item label="-- Select Subject --" value="" />
                    <Picker.Item label="Math" value="Math" />
                    <Picker.Item label="Reading" value="Reading" />
                    <Picker.Item label="Writing" value="Writing" />
                </Picker>
            </View>

            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Select Time Slot</Text>
                <Picker
                    selectedValue={timeSlot}
                    onValueChange={(itemValue) => setTimeSlot(itemValue)}
                    style={{ color: 'black' }}
                >
                    <Picker.Item label="-- Select Slot --" value="" />
                    <Picker.Item label="10:00 AM - 11:00 AM" value="10:00 AM - 11:00 AM" />
                    <Picker.Item label="2:00 PM - 3:00 PM" value="2:00 PM - 3:00 PM" />
                    <Picker.Item label="6:00 PM - 7:00 PM" value="6:00 PM - 7:00 PM" />
                </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleBookDemo}>
                <Text style={styles.buttonText}>Book Demo</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 24,
        color: 'black',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
        fontSize: 16,
        color: 'black',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 16,
    },
    pickerLabel: {
        padding: 8,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        
    },
    button: {
        backgroundColor: '#4F46E5',
        padding: 16,
        borderRadius: 10,
        marginTop: 12,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
