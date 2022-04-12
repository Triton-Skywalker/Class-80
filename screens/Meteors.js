import React, { Component } from 'react'
import { Text, View, Alert, StyleSheet, SafeAreaView, Platform, StatusBar, FlatList, ImageBackground, Image} from 'react-native'
import axios from 'axios'
import { Dimensions } from 'react-native-web'

export default class MeteorScreen extends Component 
{
    constructor()
    {
        super()
        this.state =
        {
            meteors: {}
        }
    }

    getMeteors = async() => 
    {
        await axios.get('https://api.nasa.gov/neo/rest/v1/feed?api_key=b9SwEu6NXDGU5ZBEhm1kW6cR0oJ0hfqsrLgn3nc2')
        .then(response => 
        {
            this.setState({
                meteors:response.data.near_earth_objects
            })
            .catch(error => {Alert.alert(error.message)})
        })

    }

    keyExtractor = (item,index) => index.toString()

    renderItem = ({item}) => 
    {
        var backgroundImg, speed, size;
        var meteor = item;

        if (meteor.threatScore <= 30)
        {
            backgroundImg = require('../assets/meteor_bg1.png')
            speed = require('../assets/meteor_speed3.gif')
            size = 100
        }
        else if ( meteor.threatScore >= 30 && meteor.threatScore <= 75)
        {
            backgroundImg = require('../assets/meteor_bg2.png')
            speed = require('../assets/meteor_speed3.gif')
            size = 150
        }
        else
        {
            backgroundImg = require('../assets/meteor_bg3.png')
            speed = require('../assets/meteor_speed3.gif')
            size = 200
        }

        return (
            <View>
                <ImageBackground source={backgroundImg} style={styles.bgImg}>
                    <View style={styles.gifContainer}>
                        <Image source={speed} style={{
                            width: size,
                            height: size,
                            alignSelf: 'center'
                        }}>
                        </Image>
                        <View>
                            <Text style={[styles.cardTitle,
                            {
                                marginTop: 400,
                                marginLeft: 50
                            }]}>
                                {item.name}
                            </Text>

                            <Text style={[styles.cardText,
                            {
                                marginTop: 20,
                                marginLeft: 50
                            }]}>
                                Close to Earth - {item.close_approach_data[0].close_approach_date_full}
                            </Text>

                            <Text style={[styles.cardText,
                            {
                                marginTop: 5,
                                marginLeft: 50
                            }]}>
                                Minimum Diameter[KM] - 
                                {item.estimated_diameter.kilometers.estimated_diameter_min}
                            </Text>

                            <Text style={[styles.cardText,
                             {
                                marginTop: 5,
                                marginLeft: 50
                            }]}>
                                Maximum Diameter[KM] - 
                                {item.estimated_diameter.kilometers.estimated_diameter_max}
                            </Text>

                            <Text style={[styles.cardText,
                            {
                                marginTop: 5,
                                marginLeft: 50
                            }]}>
                                Velocity[KM/H] - 
                                {item.close_approach_data[0].relative_velocity.kilometers_per_hour}
                            </Text>

                            <Text style={[styles.cardText,
                            {
                                marginTop: 5,
                                marginLeft: 50
                            }]}>
                                Missing Earth by[KM] -
                                {item.close_approach_data[0].miss_distance_kilometers}
                            </Text>

                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    componentDidMount()
    {
        this.getMeteors()
    }

    render() 
    {
        if(Object.keys(this.state.meteors).length == 0)
        {
            return (
                <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        else
        {
            var meteorDataArray = Object.keys(this.state.meteors).map(meteor_date => 
            {
                return this.state.meteors[meteor_date]
            })
            var meteors = [].concat.apply([],meteorDataArray)

            meteors.forEach(function(element)
            {
                var diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + 
                element.estimated_diameter.kilometers.estimated_diameter_max)/2

                var threatScore = diameter/element.close_approach_data[0].miss_distance_kilometers
                element.threatScore = threatScore
            })

            meteors.sort(function(a,b)
            {
                return b.threatScore - a.threatScore
            })

            meteors.slice(0,5)

            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.androidSafeArea}/>
                    <FlatList 
                    keyExtractor={this.keyExtractor}
                    data={meteors}
                    renderItem={this.renderItem}
                    horizontal={true}/>
                </View>
            )  
        }
        
    }
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
    },

    androidSafeArea:
    {
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
    },

    bgImg: 
    {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    cardText:
    {
        color: 'white'
    },

    cardTitle:
    {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'white'
    },

    gifContainer:
    {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})