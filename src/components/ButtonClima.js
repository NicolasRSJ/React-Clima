import React, {useState, useEffect} from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default function ButtonClima( { focused, size, color} ) {
    
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        let IconName = focused
            ? 'cloud'
            : 'cloud-outline'
        ;

        console.log(focused)
        console.log(IconName)

        setIcon(IconName)
    }, [])
    
    return (
        <View style={styles.container}>
            <Icon name={icon} size={size} color={color} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3eccf5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    }
})