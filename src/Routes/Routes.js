import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../views/Home'
import Localizacao from '../views/Localização'
import ClimaSevero from '../views/ClimaSevero'

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

export default function Routes() {
    return (
        <Tab.Navigator
            initialRouteName="Clima"
            tabBarOptions={{
                style:{
                    backgroundColor: "#134F65",
                    borderTopColor: "transparent"
                },
                activeTintColor: "white",
                tabStyle:{
                    paddingBottom: 5,
                    paddingTop: 5,
                }
            }}

            screenOptions={ 
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if(route.name === 'Mapa Climático'){
                            iconName = focused
                                ? 'map'
                                : 'map-outline'
                            ;
                        } else if ( route.name === 'Clima' ){
                            iconName = focused
                                ? 'cloud'
                                : 'cloud-outline'
                            ;
                        } else if (route.name === 'Infos Adicionais'){
                            iconName = focused
                                ? 'ios-cloud-circle'
                                : 'ios-cloud-circle-outline'
                            ; 
                        }
                        return <Icon name={iconName} size={size} color={color} />
                    },          
                })
            }
            
        >
            <Tab.Screen 
                name="Mapa Climático" 
                component={Localizacao}
                
            />
            <Tab.Screen 
                name="Clima" 
                component={Home} 
            />
            <Tab.Screen 
                name="Infos Adicionais" 
                component={ClimaSevero} 
            />
        </Tab.Navigator>
    )
}
