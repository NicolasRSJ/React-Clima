import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

export default function ClimaSevero({navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text> Clima Severo</Text>
            <Icon name="cloud" size={30} color="black" />
        </View>
    )
}
