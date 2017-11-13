import React from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'

import {
  fetchUser,
} from '../redux'

import {
  getUserState,
} from '../selectors'

import {
  getParsedBio,
} from '../util'

import ReadMore from '../common_components/ReadMore'

export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.loadUserData = this.loadUserData.bind(this);

  }

  componentDidMount() {
    this.loadUserData()
  }

  loadUserData() {
    this.props.fetchUser()
  }

  render() {

    if(Object.keys(this.props.user).length > 0) {

      const user = this.props.user
      const bio = getParsedBio(this.props.user.bio)
      const profilePicObj = {
        uri: user.profileThumbnail
      }
      console.log("bio = " + bio)
      console.log("bioserver = " + this.props.user.bio)
      // show data loaded from the server
      return (
        <View style={styles.headerBackground}>
          <View style={styles.header}>

            <View style={styles.profilepicWrap}>
              <Image style={styles.profilepic} source={profilePicObj} />
            </View>

            <View style={styles.bioWrap}>
              <Text style={styles.name}>{user.name}</Text>
              <ReadMore numberOfLines={3}>
                <Text style={styles.bio} >
                  {bio}
                </Text>
              </ReadMore>
            </View>

          </View>
        </View>
        )

    } else {

      // show loading status
      return (
        <View style={styles.headerBackground}>
          <Text>Loading ...
          </Text>
        </View>
      )

    }

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
    zIndex: 1,
  },
  name: {
    fontSize: 16,
    marginBottom: 10,
  }

})

function mapStateToProps(state) {
  return ({
    user: getUserState(state) || {}
  });
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => {
      dispatch(fetchUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


