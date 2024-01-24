import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getDetailByUser } from '../utils/api';

const DetailScreen = ({ route }) => {
  const { userName } = route.params;
  const [userInfo, setUserInfo] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetailByUser(userName);
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, [userName]); 

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const openProfileLink = () => {
    if (userInfo && userInfo.html_url) {
      Linking.openURL(userInfo.html_url);
    }
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <>
          <Text style={styles.userName}>{userInfo.login}</Text>
          {!isImageLoaded && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
          <Image
            style={[styles.tinyLogo, isImageLoaded ? {} : { display: 'none' }]}
            source={{ uri: userInfo.avatar_url }}
            onLoad={handleImageLoad}
          />
          <TouchableOpacity onPress={openProfileLink}>
            <Text style={styles.profileLink}>See profile</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  loader: {
    marginBottom: 10,
  },
  profileLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default DetailScreen;
