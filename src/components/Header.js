import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Image,
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

  /**
   * Constructor
   */
  constructor(props) {
    super(props)
    this.loadUserData = this.loadUserData.bind(this)
    this.onBioTextExpanded = this.onBioTextExpanded(this)
  }

  /**
   * Fetch the data after component has mounted
   */
  componentDidMount() {
    this.loadUserData()
  }

  /**
   * Calls the redux function to fetch user details from the server
   */
  loadUserData() {
    this.props.fetchUser()
  }

  onBioTextExpanded() {
  }

  render() {

    if(Object.keys(this.props.user).length > 0) {

      const user = this.props.user

      const bioJSX =
        (<Text style={styles.bio}>
          {getParsedBio(user.bio, user.website)}
        </Text>)

      const profilePicObj = {
        uri: user.profileThumbnail
      }
      // show data loaded from the server
      return (
        <View style={styles.headerBackground}>
          <View style={styles.header}>

            <View style={styles.profilepicWrap}>
              <Image style={styles.profilepic} source={profilePicObj} />
            </View>
            <View style={styles.bioWrap}>
              <Text style={styles.name}>{user.name}</Text>
              <ReadMore numberOfLines={3} afterExpand={this.onBioTextExpanded}>

                {bioJSX}
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

/**
 * Define propTypes
 */
Header.propTypes = {
  fetchUser : PropTypes.func.isRequired,
  user      : PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  headerBackground: {
    flex:           1.5,
    paddingTop    : 20,
    marginTop     : 20,
    paddingLeft   : 10,
    paddingRight  : 10,
    marginBottom : 10,
    width         : null,
    alignSelf     : 'stretch',
    flexDirection : 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#f0f8ff',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  header: {
    flexDirection:   'row',
  },
  profilepicWrap: {
    flex: 0.3,
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
  })
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => {
      dispatch(fetchUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)


