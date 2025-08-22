import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MenuGrid from 'app/components/main/home/TopMenu';
import { LinearGradient } from 'expo-linear-gradient';
import PracticeCard from 'app/components/main/home/card/CourseCard';
import AutoSlider from 'app/components/main/home/slider/HomeSlider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomestackNavigator';

const topMenuItems = [
  { label: 'SAT Library', icon: 'book' },
  { label: 'Exam Dates', icon: 'calendar' },
  { label: 'Registration', icon: 'person-add' },
  { label: 'Scholarships', icon: 'trophy' },
  { label: 'Daily Quiz', icon: 'help-circle' },
  { label: 'Book Demo', icon: 'videocam' },
  { label: 'All Reports', icon: 'document-text' },
];

const Dashboard = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <LinearGradient
      colors={['#dbe6ff', '#ffffff']} // light blue to white
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000"  />
      <SafeAreaView style={styles.container}>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
            
            
              <Text style={styles.title}>SAT Dashboard</Text>
            </View>

            <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
          </View>

          {/* Hero Banner */}

          <AutoSlider />
          {/* separator */}
          <View style={styles.separator} />
          {/* Top Menu */}
          <MenuGrid />

          <View style={styles.separator} />




          {/* Free Practice & Courses */}
          <View style={styles.sectionRow}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Free Practice</Text>
              <View style={[styles.underline, { backgroundColor: "#612EF7" }]} />

              <PracticeCard
                actionbtntext={"Start Now"}
                cardTitle='SAT Practice'
                cardTitle2='Paper-1'
                paperInfo='📚 Paper 2 of 8'
                progressText='44%'
                Progresspercentage={0.44}
                ProgressBarColor='#FF6B2C'
                onPress={() => navigation.navigate('Test')}
              />
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Courses</Text>
              <View style={[styles.underline, { backgroundColor: "#34C759" }]} />
              <PracticeCard
                actionbtntext={"View All"}
                cardTitle='Course Progress'
                cardTitle2=''
                paperInfo='📚 Paper 2 of 8'
                progressText='15%'
                Progresspercentage={0.15}
                ProgressBarColor='#2CA6FF'
                onPress={() => navigation.navigate('SatLibaryPage')}
              />
            </View>
          </View>

          {/* Live Sessions */}
          <View style={styles.liveSection}>
            <View style={styles.liveHeader}>
              <View style={styles.liveTitleContainer}>
                <Text style={styles.liveTitle}>Recent Live Sessions</Text>
                <View style={[styles.underline, { backgroundColor: "#34C759", width: "60%" }]} />
              </View>

              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.liveCard}>
                <Image
                  style={styles.liveImage}
                  source={{ uri: 'https://beaconedu.com.np/wp-content/uploads/2019/08/SAT.png' }}
                />

              </View>

              <View style={styles.liveCard}>
                <Image
                  style={styles.liveImage}
                  source={{ uri: 'https://beaconedu.com.np/wp-content/uploads/2019/08/SAT.png' }}
                />

              </View>
            </ScrollView>
          </View>

        </ScrollView>

      </SafeAreaView>
    </LinearGradient>
    // </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4%'),
  },
  scrollContainer: {
    paddingBottom: hp('10%'),
  },
  separator: {
    height: hp('0.1%'),
    width: wp('100%'),
    backgroundColor: '#C9C9C9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  gradient: {
    flex: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  title: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: '#000000', 
  },
  avatar: {
    height: wp('9%'),
    width: wp('9%'),
    borderRadius: wp('5%'),
  },
  gridContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    marginVertical: hp('1.2%'),
    minWidth: wp('25%'),
  },
  banner: {
    backgroundColor: '#DDEAFE',
    borderRadius: wp('4%'),
    padding: wp('5%'),
    marginTop: hp('3%'),
    alignItems: 'center',
  },
  bannerText: {
    fontSize: RFValue(18),
    fontWeight: '700',
    color: '#4A90E2',
  },
  bannerSub: {
    fontSize: RFValue(14),
    marginTop: hp('0.5%'),
    color: '#666666',
  },
  bannerImage: {
    height: wp('15%'),
    width: wp('15%'),
    marginTop: hp('1.5%'),
  },
  topMenu: {
    marginTop: hp('3%'),
  },
  menuItem: {
    alignItems: 'center',
    marginHorizontal: wp('3%'),
  },
  menuText: {
    fontSize: RFValue(10),
    marginTop: hp('0.5%'),
    color: '#666666',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp('2%'),
    marginTop: hp('4%'),
    
  },
  sectionContainer: {
    flex: 1,
    
  },
  underline: {
    height: hp('0.4%'),
    width: wp('20%'),
    marginTop: hp('0.8%'),
    marginBottom: hp('2%'),
  },
 
  sectionTitle: {
    fontWeight: "bold",
    fontSize: RFValue(14),
    color: 'black', 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('4%'),
    padding: wp('4%'),
    width: wp('45%'),
    elevation: 2,
  },
  cardTitle: {
    fontSize: RFValue(12),
    fontWeight: '600',
    color: '#000000',
  },
  cardSubtitle: {
    fontSize: RFValue(10),
    marginVertical: hp('1%'),
    color: '#666666', 
  },
  startBtn: {
    backgroundColor: '#4A90E2',
    padding: wp('2%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  startText: {
    color: '#fff',
    fontSize: RFValue(10),
  },
  viewBtn: {
    backgroundColor: '#E0D5F6',
    padding: wp('2%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  viewText: {
    color: '#6A38B1',
    fontSize: RFValue(10),
  },
  progress: {
    fontSize: RFValue(10),
    color: '#888',
  },
  liveSection: {
    marginTop: hp('5%'),
  },
  liveTitleContainer: {
    flex: 1,
  },
  viewAllButton: {
    backgroundColor: '#34C759',
    height: hp('4%'),
    paddingHorizontal: wp('4%'),
    minWidth: wp('20%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp('2%'),
  },
  liveTitle: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#000000',
  },
  viewAll: {
    color: '#fff',
    fontSize: RFValue(12),
  },
  liveCard: {
    width: wp('45%'),
    marginRight: wp('4%'),
  },
  liveImage: {
    height: hp('12%'),
    borderRadius: wp('3%'),
  },
  liveText: {
    fontSize: RFValue(10),
    marginTop: hp('0.5%'),
    color: '#666666', 
  },
});