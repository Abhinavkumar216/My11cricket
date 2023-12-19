import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const CenterIcon = () => {
  return (
    <View className="w-12 h-12">
      <Image
        source={require('../../../../assets/icons/round.png')}
        style={{height: 50, width: 50}}
      />
    </View>
  );
};

export default CenterIcon;

const styles = StyleSheet.create({});
