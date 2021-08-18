import  React, {useState, useEffect} from 'react';
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps';
import mapStyle from '../components/MapStyle'
import { StyleSheet, View, Dimensions } from 'react-native';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null) 
    const [latitude,setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null) 
    
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            setHasPermission( status === 'granted' )

            let location = await Location.getCurrentPositionAsync();
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude)
        })();
    },[])

    if(hasPermission === null){
        <View/>
      }
    if(hasPermission === false){
        return alert('Acesso Negado!')
    }

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                region={{
                    latitude: -16.535216,
                    longitude: -43.9370581,
                    latitudeDelta: 30.0000,
                    longitudeDelta: 30.0000
                }}
                customMapStyle={mapStyle}
                
            >
                <Marker
                    title= 'Vitória/ES'
                    coordinate={{
                        latitude: -20.3211515,
                        longitude: -40.3405716
                    }}
                >
                   <Text></Text>
                </Marker> 
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
