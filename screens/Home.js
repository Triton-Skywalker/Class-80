import React, { Component } from 'react'
import {Text, View, TouchableOpacity, 
        StyleSheet, ImageBackground, Image, 
        SafeAreaView, StatusBar} from 'react-native'
import { Platform } from 'react-native-web'

export default class HomeScreen extends Component 
{
    render() 
    {
        return (
            <View>
                <SafeAreaView style={styles.androidSafeArea}/>
                <ImageBackground style={styles.backgroundImage} source={require('../assets/bg_image.png')}>
                    
                    <View style={styles.titleBar}>
                        <Text style={styles.titleText}>ISS Tracker App</Text>
                    </View>

                    <TouchableOpacity 
                    style={styles.routeCard}
                    onPress={() => {
                        this.props.navigation.navigate('ISSLocation')
                    }}>
                        <Text style={styles.routeText}>ISS Location</Text>
                        <Text style={styles.knowMore}>{'Know More.... ->'}</Text>
                        <Text style={styles.bgDigit}>1</Text>
                        <Image style={styles.iconImage} source={require('../assets/iss_icon.png')}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.routeCard}
                    onPress={() => {
                        this.props.navigation.navigate('Meteors')
                    }}>
                        <Text style={styles.routeText}>Meteors</Text>
                        <Text style={styles.knowMore}>{'Know More.... ->'}</Text>
                        <Text style={styles.bgDigit}>2</Text>
                        <Image style={styles.iconImage} source={require('../assets/meteor_icon.png')}></Image>
                    </TouchableOpacity>

                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        titleBar:
        {
            flex:.15,
            justifyContent:'center',
            alignItems:'center',
        },

        titleText:
        {
            fontSize:40,
            fontWeight:'bold',
            color:'black'
        },

        routeCard:
        {
            borderRadius:5,
            flex:.25,
            marginLeft:50,
            marginRight:50,
            marginTop:50,
            backgroundColor:'white'
        },

        routeText:
        {
            fontSize:35,
            fontWeight:'bold',
            color:'black',
            marginTop:75,
            paddingLeft:30
        },

        backgroundImage:
        {
            flex:1,
            resizeMode:'cover',
        },

        iconImage:
        {
            position:'absolute',
            height:200,
            width:200,
            resizeMode:'contain',
            right:20,
            top:-80
        },

        knowMore:
        {
            paddingLeft:30,
            color:'red',
            fontSize:15
        },

        bgDigit:
        {
            position:'absolute',
            color:'blue',
            fontSize:150,
            right:20,
            bottom:-15
        },

        androidSafeArea:
        {
            marginTop: Platform.OS == 'Android'? statusbar.currentHeight : 0,
        }
    }
)