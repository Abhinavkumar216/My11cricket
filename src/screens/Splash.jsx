import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Splash = () => {
  return (
    <View className="flex-1 bg-black justify-center items-center">
        <StatusBar animated backgroundColor={'transparent'} translucent/>
      <Text className="text-4xl text-white">My11Cricket</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})