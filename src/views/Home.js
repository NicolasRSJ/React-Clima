import React, {useState, useEffect} from 'react'
import { View, StyleSheet, ImageBackground, Text, ScrollView, SafeAreaView } from 'react-native'
import Images from '../components/ImagesBackground'
import * as Location from 'expo-location'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Home() {

    const [hasPermission, setHasPermission] = useState(null)
    const [cidade,setCidade] = useState(null)
    const [temperatura,setTemperatura] = useState(null)
    const [umidade, setUmidade] = useState(null)
    const [velociadeDoVento, setVelociadeDoVento] = useState(null)

    const [image,setImage] = useState(null)
    const [key] = useState('f68d6577 ')
    const [latitude,setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)

    const [primeiro, setPrimeiro] = useState(null)
    const [segundo, setSegundo] = useState(null)
    const [terceiro, setTerceiro] = useState(null)
    const [quarto, setQuarto] = useState(null)
    const [quinto, setQuinto] = useState(null)
    const [sexto, setSexto] = useState(null)
    const [setimo, setSetimo] = useState(null)
    

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            setHasPermission( status === 'granted' )

            let location = await Location.getCurrentPositionAsync();
            setLatitude(JSON.stringify(location.coords.latitude))
            setLongitude(JSON.stringify(location.coords.longitude))
        })();

        (async () => {
            try{  
                await fetch('https://api.hgbrasil.com/weather?key='+key+'&lat='+latitude+'&lon='+longitude+'&user_ip=remote', {
                    mode: 'no-cors'
                })
                .then(response => response.json())
                .then(json => {
                    const data = json
                    if( data.results.description === 'Tempo Limpo' && data.results.currently === 'dia' || data.results.description === 'Ensolarado' ){
                        setImage({ uri: Images.dia_limpo.uri_Img })
                    } else if( data.results.description === 'Tempo Limpo' && data.results.currently === 'noite' || data.results.description === 'Estrelado'){
                        setImage({ uri: Images.noite_limpa.uri_Img })
                    } else if( data.results.description === 'Chuva' && data.results.currently === 'dia' || data.results.description === 'Chuviscos' && data.results.currently === 'dia' ){
                        setImage({ uri: Images.dia_chuvoso.uri_Img })
                    } else if( data.results.description === 'Chuva' && data.results.currently === 'noite' || data.results.description === 'Chuviscos' && data.results.currently === 'noite' ){
                        setImage({ uri: Images.noite_chuvosa.uri_Img })
                    } else if( data.results.description === 'Tempo nublado' || data.results.description === 'Parcialmente nublado' ){
                        setImage({ uri: Images.dia_nublado.uri_Img })
                    } else if( data.results.description === 'Neve' || data.results.description === 'Gelo' || data.results.description === 'Geada fina' || data.results.description === 'Neve baixa' || data.results.description === 'Tempestade com neve' || data.results.description === 'Ventania com neve' || data.results.description === 'Granizo' ){
                        setImage({ uri: Images.nevando.uri_Img })
                    } else if( data.results.description === 'Ensolarado com muitas nuvens' ){
                        setImage({ uri: Images.parcialmente_Ensolarado.uri_Img })
                    }
                    setPrimeiro(data.results.forecast[1])
                    setSegundo(data.results.forecast[2])
                    setTerceiro(data.results.forecast[3])
                    setQuarto(data.results.forecast[4])
                    setQuinto(data.results.forecast[5])
                    setSexto(data.results.forecast[6])
                    setSetimo(data.results.forecast[7])
                    setCidade(data.results.city)
                    setTemperatura(data.results.temp)
                    setUmidade(data.results.humidity)
                    setVelociadeDoVento(data.results.wind_speedy)
                })
                .catch(error => {
                    console.error('Error na Requisição: ', error)
                })
            }catch(err){
                console.error('Error na tentativa: ',err)
            };
        })();

    }, []);
    

    if(hasPermission === null){
        <View/>
      }
    if(hasPermission === false){
        return alert('Acesso Negado!')
    }


    return (
        <ImageBackground source={image} style={styles.backgroundImage}>
            <View styles={styles.container}>
                <View style={styles.containerLocation}>
                    <Text style={stylesText.textoLocalizacao}>{cidade}</Text>
                </View>
                <View style={styles.containerTemperatura}>
                    <Text style={stylesText.textoTemperatura}>{temperatura+'º'} </Text> 
                </View>
                <View style={styles.containerVentoUmidade}>
                    <View 
                        style={styles.componenteVentoUmidade}
                    >
                        <Entypo name="water" color="#364E6E" size={20} />
                        <Text>Umidade</Text>
                        <Text>{umidade}</Text>
                    </View>
                    <View
                        style={styles.componenteVentoUmidade}
                    >
                        <Feather name="wind" color="#364E6E" size={23}/>
                        <Text>Vento</Text>
                        <Text>{velociadeDoVento}</Text>
                    </View>
                </View>
                <View style={styles.containerSemana}>
                    <SafeAreaView style={styles.componenteSemmana}>
                        <ScrollView 
                            horizontal={true}
                            style={styles.containerScrollView}
                        > 
                            
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </View>
        </ImageBackground>       
    )
}

/*
                            <View style={styles.containerDiaSemana}>
                                <Text style={stylesText.textoDiaSemana}> 
                                    {primeiro.weekday} 
                                </Text>
                                <View style={styles.containerMinMax}>
                                    <Text style={stylesText.textoMinMax} >MIN</Text>
                                    <Text style={stylesText.textoMinMax}  >MAX</Text>
                                </View>
                                <View style={styles.containerMinMax2}>
                                    <Text style={stylesText.textoMinMax}  >{primeiro.min}</Text>
                                    <Text style={stylesText.textoMinMax}  >{primeiro.max}</Text>
                                </View>
                                <Text style={stylesText.textoCondicaoDia}>
                                    {primeiro.description}
                                </Text>
                            </View>

                            <View style={styles.containerDiaSemana}>
                                <Text style={stylesText.textoDiaSemana}> 
                                    {segundo.weekday} 
                                </Text>
                                <View style={styles.containerMinMax}>
                                    <Text style={stylesText.textoMinMax}  >MIN</Text>
                                    <Text style={stylesText.textoMinMax}  >MAX</Text>
                                </View>
                                <View style={styles.containerMinMax2}>
                                    <Text style={stylesText.textoMinMax}  >{segundo.min}</Text>
                                    <Text style={stylesText.textoMinMax}  >{segundo.max}</Text>
                                </View>
                                <Text style={stylesText.textoCondicaoDia}>
                                    {segundo.description}
                                </Text>
                            </View>

                            <View style={styles.containerDiaSemana}>
                                <Text style={stylesText.textoDiaSemana}> 
                                    {terceiro.weekday} 
                                </Text>
                                <View style={styles.containerMinMax}>
                                    <Text style={stylesText.textoMinMax}  >MIN</Text>
                                    <Text style={stylesText.textoMinMax}  >MAX</Text>
                                </View>
                                <View style={styles.containerMinMax2}>
                                    <Text style={stylesText.textoMinMax}  >{terceiro.min}</Text>
                                    <Text style={stylesText.textoMinMax}  >{terceiro.max}</Text>
                                </View>
                                <Text style={stylesText.textoCondicaoDia}>
                                    {terceiro.description}
                                </Text>
                            </View>

                            <View style={styles.containerDiaSemana}>
                                <Text style={stylesText.textoDiaSemana}> 
                                    {quarto.weekday} 
                                </Text>
                                <View style={styles.containerMinMax}>
                                    <Text style={stylesText.textoMinMax}  >MIN</Text>
                                    <Text style={stylesText.textoMinMax}  >MAX</Text>
                                </View>
                                <View style={styles.containerMinMax2}>
                                    <Text style={stylesText.textoMinMax}  >{quarto.min}</Text>
                                    <Text style={stylesText.textoMinMax}  >{quarto.max}</Text>
                                </View>
                                <Text style={stylesText.textoCondicaoDia}>
                                    {quarto.description}
                                </Text>
                            </View>

                            <View style={styles.containerDiaSemana}>
                                <Text style={stylesText.textoDiaSemana}> 
                                    {quinto.weekday} 
                                </Text>
                                <View style={styles.containerMinMax}>
                                    <Text style={stylesText.textoMinMax}  >MIN</Text>
                                    <Text style={stylesText.textoMinMax}  >MAX</Text>
                                </View>
                                <View style={styles.containerMinMax2}>
                                    <Text style={stylesText.textoMinMax}  >{quinto.min}</Text>
                                    <Text style={stylesText.textoMinMax}  >{quinto.max}</Text>
                                </View>
                                <Text style={stylesText.textoCondicaoDia}>
                                    {quinto.description}
                                </Text>
                            </View>

                            <View style={styles.containerDiaSemana}>
                                <Text style={stylesText.textoDiaSemana}> 
                                    {sexto.weekday} 
                                </Text>
                                <View style={styles.containerMinMax}>
                                    <Text style={stylesText.textoMinMax}  >MIN</Text>
                                    <Text style={stylesText.textoMinMax}  >MAX</Text>
                                </View>
                                <View style={styles.containerMinMax2}>
                                    <Text style={stylesText.textoMinMax}  >{sexto.min}</Text>
                                    <Text style={stylesText.textoMinMax}  >{sexto.max}</Text>
                                </View>
                                <Text style={stylesText.textoCondicaoDia}>
                                    {sexto.description}
                                </Text>
                            </View>

                            <View style={styles.containerDiaSemana}>
                                <Text style={stylesText.textoDiaSemana}> 
                                    {setimo.weekday} 
                                </Text>
                                <View style={styles.containerMinMax}>
                                    <Text style={stylesText.textoMinMax}  >MIN</Text>
                                    <Text style={stylesText.textoMinMax}  >MAX</Text>
                                </View>
                                <View style={styles.containerMinMax2}>
                                    <Text style={stylesText.textoMinMax}  >{setimo.min}</Text>
                                    <Text style={stylesText.textoMinMax}  >{setimo.max}</Text>
                                </View>
                                <Text style={stylesText.textoCondicaoDia}>
                                    {setimo.description}
                                </Text>
                            </View>
*/ 

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1, 
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        padding: 0,
        margin: 0,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',

    },
    containerLocation: {
        width: '100%',
        height: '10%',
        marginTop: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTemperatura:{
        width: '100%',
        height: '40%' ,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerVentoUmidade:{
        width: '100%',
        height: '12%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    containerSemana:{
        width: '100%',
        height: '34%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    componenteVentoUmidade:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    componenteSemmana:{
        width: '95%',
        height: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerScrollView:{
        width: '100%',
    },
    containerDiaSemana:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 40,
        marginLeft: 30,
        marginRight: 20,
        width: 100,
        height: 150,
        borderRadius: 5,
        backgroundColor: '#97F5F5',
        elevation: 10,
    },
    containerMinMax:{
        width: '100%',
        height: '20%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    containerMinMax2:{
        width: '100%',
        height: '20%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        flexDirection: 'row',
    }
})

const stylesText = StyleSheet.create({
    textoLocalizacao:{
        fontSize: 25,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: '#364E6E'
    },
    textoTemperatura:{
        fontSize: 80,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: '#364E6E'
    },
    textoDiaSemana:{
        marginTop: 20,
        color: '#364E6E',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    textoCondicaoDia:{
        marginBottom: 20,
        color: '#364E6E',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    textoMinMax:{
        color: '#364E6E',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    }
})