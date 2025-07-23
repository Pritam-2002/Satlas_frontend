import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import apiClient from '../../../../utils/apiClient';

interface Banner {
  _id: string;
  url: string;
  createdAt: string;
}

const AutoSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await apiClient.get('/banner/getbanner');
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        showsPagination={true}
        dotColor="#ccc"
        activeDotColor="#000"
      >
        {banners.map((banner) => (
          <Image
            key={banner._id}
            source={{ uri: banner.url }}
            style={styles.image}
            resizeMode="stretch"
          />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200, // Adjust height as needed
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default AutoSlider;
