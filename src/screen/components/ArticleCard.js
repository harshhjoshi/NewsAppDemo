import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image'; // Fast Image Loading
import moment from 'moment'; // For Time Formating

// HOC Function for ArticleCard
const ArticleCard = ({item}) => {
  return (
    //Card For Article
    <TouchableOpacity
      onPress={() => Linking.openURL(item.item.url)}
      style={styles.mainCard}>
      {/* Image of Article */}
      <ImageBackground
        style={{
          width: '100%',
          height: 210,
          justifyContent: 'flex-end',
        }}
        borderTopLeftRadius={12}
        borderTopRightRadius={12}
        source={{
          uri: item.item.urlToImage, // Source URL for Article
          priority: FastImage.priority.high,
        }}>
        {/* Source Name of Article */}
        <View style={styles.sourceNameContainer}>
          <Text numberOfLines={1} style={styles.sourceNameText}>
            {item.item.source.name}
          </Text>
        </View>

        {/* Source Title Of Article */}
        <Text numberOfLines={2} style={styles.articleTitle}>
          {item.item.title}
        </Text>
        <View style={styles.shadowBackground}></View>
      </ImageBackground>

      {/* Source Description For Article */}
      <View style={{padding: 12, height: 165}}>
        <Text style={{color: 'black', fontSize: 16}}>
          {item.item.description}
        </Text>
      </View>
      {/* Author & Time of Publish Container */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 5,
        }}>
        <View style={styles.authorTimeContainer}>
          {item.item.author === null ? null : (
            <Image
              style={{height: 25, width: 25, resizeMode: 'cover'}}
              source={require('../../assets/author.png')}></Image>
          )}
          {/* Author Name Text */}
          <Text
            numberOfLines={1}
            style={{
              color: 'black',
              marginStart: 7,
              fontWeight: '600',
              maxWidth: 130,
            }}>
            {item.item.author}
          </Text>
        </View>
        {/* Publish Timing Container */}
        <View style={styles.authorTimeContainer}>
          <Image
            style={{height: 25, width: 25, resizeMode: 'cover'}}
            source={require('../../assets/calendars.png')}></Image>
          <Text style={{color: 'black', marginStart: 7, fontWeight: '600'}}>
            {moment(item.item.publishedAt).format('DD-MMM-YYYY hh:mm')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  // Styles Of Activity Indecator
  mainCard: {
    height: 425,
    width: '90%',
    elevation: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 12,
  },
  // Styles Of Main Container
  sourceNameContainer: {
    alignSelf: 'flex-end',
    end: 10,
    position: 'absolute',
    top: 10,
    backgroundColor: 'orange',
    borderRadius: 100,
    width: 100,
  },
  // Styles Of Top Bar Container
  sourceNameText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'center',
    padding: 5,
  },
  articleTitle: {
    color: 'white',
    marginStart: 15,
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
  },
  shadowBackground: {
    backgroundColor: '#000',
    opacity: 0.5,
    height: 75,
    zIndex: 1,
  },
  authorTimeContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingEnd: 6,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
