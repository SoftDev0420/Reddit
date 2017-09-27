import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import ImagePlaceholder from 'react-native-image-with-placeholder';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, width, backgroundColor: 'red' },
  image: { flex: 1, width },
});

const Card = ({ data }) => {
  const isImage = data.url.endsWith('png') || data.url.endsWith('jpg');
  let url = data.url;
  if (!isImage) {
    url = data.thumbnail;
  }
  return (
    <View style={styles.container}>
      <ImagePlaceholder 
        style={styles.image} 
        activityIndicatorProps={{
          size: 'large',
          color: 'green',
        }} 
        src={url}
      />
    </View>
  );
};

Card.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Card;
