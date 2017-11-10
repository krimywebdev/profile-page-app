import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'

export default class Header extends React.Component {

  render() {
    return (
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          
          <View style={styles.profilepicWrap}>
            <Image style={styles.profilepic} source={{uri: 'https://d1m37qdzmw041i.cloudfront.net/photos/users/profile/thumbnail/318381-1505247817815.jpg'}} />
          </View>
          
          <View style={styles.bioWrap}>
            <Text style={styles.name}>pumpup</Text>
            <Text style={styles.bio} numberOfLines={3}>

              Motivation to become the best version of you!  
              💙💪🌎\n\nIt's #HealthyHolidays ❄️🏋️\u200d♀️\n\n
              Share your photos all month long to be featured!\n\n
              👻 Snapchat @PumpUp\n\nGet your #TeamPumpUp gear ⬇            
            </Text>
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerBackground: {
    paddingTop    : 50,
    paddingLeft   : 10,
    paddingRight  : 10,
    flex          : 1,
    width         : null,
    alignSelf     : 'stretch',
    flexDirection : 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    flex:            1,
    flexDirection:   'row',
  },
  profilepicWrap: {
    flex: 0.3,
    height: 200,
    alignItems: 'center',
  },
  profilepic: {
    borderRadius: 45,
    borderColor: 'slategray',
    borderWidth: 1,
    height: 90,
    width: 90,
  },
  bioWrap: {
    flex: 0.7,
    height: 200,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  bio: {
    color: '#484848',
  },
  name: {
    fontSize: 16,
    marginBottom: 10,
  }

})

