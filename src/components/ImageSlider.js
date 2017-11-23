import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Animated, View, StyleSheet,
  Image, Dimensions, ScrollView,
  Text, TouchableOpacity } from 'react-native'

import {
  fetchUserFeedImages,
} from '../redux'

import {
  getUserFeedImagesState,
  getSelectedImageIndexState
} from '../selectors'

const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 400
const BAR_SPACE = 15

export class ImageSlider extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props)
    this.loadUserFeedImages = this.loadUserFeedImages.bind(this)
  }

  /**
   * Fetch the data after component has mounted
   */
  componentDidMount() {
    this.loadUserFeedImages()
  }

  /**
   * When a user clicks on the dot to change the image in the slider
   */
  onSliderDotTapped(i) {

    this.scrollView.scrollTo({x : i*deviceWidth, y : 0, animated : true})
  }

  /**
   * Calls the redux function to fetch user feed images from the server
   */
  loadUserFeedImages() {
    this.props.fetchUserFeedImages()
  }

  /**
   * Render function
   */
  render() {

    let images

    if(this.props.userFeedImages.length > 0) {
      images = this.props.userFeedImages
    } else {
      images = []
    }
    // show Loading message when fetching from the server
    if(images.length <= 0) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    } else {
      // show error when fetching of images fails
      if(images[0].error) {
        const errorMessage = 'There was an error loading user\'s images feed'
        return (
          <View style={[styles.container, styles.errorContainer]}>
            <Text style={styles.sliderError}>{errorMessage}</Text>
          </View>
        )
      }

      // fetching of images successful, show the slider
      const numItems = images.length
      const itemWidth = (FIXED_BAR_WIDTH / numItems) - ((numItems - 1) * BAR_SPACE)
      const animVal = new Animated.Value(0)


      let imageArray = []
      let barArray = []
      /** begin forEach **/
      images.forEach((image, i) => {
        const thisImage = (
          <Image key={`image${i}`}
            source={{uri: image.thumbnail}}
            resizeMode="contain"
            style={{ width: deviceWidth }}
          />
        )
        imageArray.push(thisImage)

        const scrollBarVal = animVal.interpolate({
          inputRange  : [deviceWidth * (i - 1), deviceWidth * (i + 1)],
          outputRange : [-itemWidth, itemWidth],
          extrapolate : 'clamp',
        })

        // one dot per image
        const thisBar = (
          <View key={`bar${i}`}
            style={[
              styles.track,
              {
                width        : itemWidth/1.5,
                height       : itemWidth/1.5,
                borderRadius : itemWidth/1.5,
                marginLeft   : i === 0 ? 0 : BAR_SPACE,
              },
            ]}
          >
            <TouchableOpacity onPress={this.onSliderDotTapped.bind(this, i)}>
              <Animated.View

                style={[
                  styles.bar,
                  {
                    width        : itemWidth/1.5,
                    height       : itemWidth/1.5,
                    borderRadius : itemWidth/1.5,
                    transform    : [
                      { translateX: scrollBarVal },
                    ],
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        )
        barArray.push(thisBar)
      })
      /** end forEach **/

      return (
        <View style={styles.container}>
          <ScrollView ref={(c) => { this.scrollView = c }} horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
            onScroll={
              Animated.event(
                [{ nativeEvent: { contentOffset: { x: animVal } } }]
              )
            }>
            {imageArray}
          </ScrollView>
          <View style={styles.barContainer}>
            {barArray}
          </View>
        </View>
      )
    }
  }
}


/**
 * Define propTypes
 */
ImageSlider.propTypes = {
  fetchUserFeedImages : PropTypes.func.isRequired,
  userFeedImages      : PropTypes.array.isRequired,
}


const styles = StyleSheet.create({
  container: {
    flex              : 5,
    alignItems        : 'center',
    justifyContent    : 'center',
    paddingBottom     : 20,
    borderBottomWidth : 1,
    borderColor       : 'lightgray',
  },

  errorContainer: {
    flex : 1
  },

  sliderError: {
    backgroundColor : 'pink',
    padding         : 10,
    color           : '#800000'
  },

  barContainer: {
    marginTop     : 10,
    flexDirection : 'row',
  },

  track: {
    backgroundColor : 'lightgray',
    overflow        : 'hidden',
    height          : 20,

  },

  bar: {
    backgroundColor : 'slategray',
    height          : 20,
  },
})



/**
 * Necessary for Redux
 */
function mapStateToProps(state) {
  return ({
    userFeedImages     : getUserFeedImagesState(state) || [],
    selectedImageIndex : getSelectedImageIndexState(state) > 0 || 0,
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserFeedImages: () => {
      dispatch(fetchUserFeedImages())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageSlider)
