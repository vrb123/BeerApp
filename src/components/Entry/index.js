import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MiniatureImage from '../../layout/MiniatureImage';
import ImagePreview from 'react-native-image-preview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8EE2B0',
    padding: 15,
  },
  entryItem: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 19,
    fontFamily: 'Lobster-Regular',
    color: '#158040',
  },
  description: {
    fontSize: 15,
    color: '#499467',
  },
  row: {
    flexDirection: 'row',
  },
});

export default props => {
  const {description, amountBeer, images} = props.data;
  const [imageToShow, setImageToShow] = useState(null);

  const onPreview = index => {
    setImageToShow(images[index]);
  };

  const _hidePreview = () => {
    setImageToShow(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entry #{props.number}</Text>
      <Text style={styles.description}>Drank {amountBeer}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.row}>
        {images.map((image, index) => (
          <View style={{padding: 5}}>
            <MiniatureImage uri={image} index={index} onPreview={onPreview} />
          </View>
        ))}
      </View>
      {imageToShow && (
        <ImagePreview
          visible={imageToShow != null}
          source={{uri: imageToShow}}
          close={_hidePreview}
        />
      )}
    </View>
  );
};
