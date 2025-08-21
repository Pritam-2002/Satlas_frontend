import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import apiClient from '../../../../utils/apiClient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Banner {
  _id: string;
  url: string;
  createdAt: string;
}

const AutoSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await apiClient.get('/banner/getbanner');
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Don't render Swiper until banners are loaded
  if (loading || banners.length === 0) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true}
        autoplayTimeout={3}
        showsPagination={true}
        dotColor="#ccc"
        activeDotColor="#000"
        paginationStyle={styles.pagination}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        loop={true}
        removeClippedSubviews={false}
      >
        {banners.map((banner) => (
          <View key={banner._id} style={styles.slide}>
            <Image
              source={{ uri: banner.url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('25%'),
    marginVertical: hp('1.5%'),
  },
  slide: {
    flex: 1,
  },
  image: {
    width: wp('100%'),
    height: hp('25%'),
  },
  pagination: {
    bottom: hp('1.5%'),
  },
  dot: {
    backgroundColor: '#ccc',
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    marginLeft: wp('0.8%'),
    marginRight: wp('0.8%'),
  },
  activeDot: {
    backgroundColor: '#000',
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    marginLeft: wp('0.8%'),
    marginRight: wp('0.8%'),
  },
});

export default AutoSlider;