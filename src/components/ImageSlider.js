import React, { Component } from 'react'
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
    super(props);
    this.loadUserFeedImages = this.loadUserFeedImages.bind(this);
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

    this.refs.scrollView.scrollTo({x: i*deviceWidth, y: 0, animated: true});
  }

  /**
   * Calls the redux function to fetch user feed images from the server
   */
  loadUserFeedImages() {
    this.props.fetchUserFeedImages()
  }

  render() {

    console.log("length:" + this.props.userFeedImages.length)


    let images

    if(this.props.userFeedImages.length > 0) {
      images = this.props.userFeedImages
//      images = [
//        'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
//        'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
//        'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
//      ]
    } else {

        images = []

//      images = [
//        'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
//        'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
//        'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
//      ]
    }



    if(images.length <= 0) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    } else {

      const numItems = images.length
      const itemWidth = (FIXED_BAR_WIDTH / numItems) - ((numItems - 1) * BAR_SPACE)
      const animVal = new Animated.Value(0)

      console.log("itemWidth = " + itemWidth )

      let imageArray = []
      let barArray = []
      images.forEach((image, i) => {
        console.log(image, i)
        const thisImage = (
          <Image
          key={`image${i}`}
          source={{uri: image.thumbnail}}
          resizeMode="contain"
          style={{ width: deviceWidth }}
          />
          )
        imageArray.push(thisImage)

        const scrollBarVal = animVal.interpolate({
          inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
          outputRange: [-itemWidth, itemWidth],
          extrapolate: 'clamp',
        })

        const thisBar = (
          <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: itemWidth/1.5,
              height: itemWidth/1.5,
              borderRadius: itemWidth/1.5,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
          >
            <TouchableOpacity onPress={this.onSliderDotTapped.bind(this, i)}>
            <Animated.View

              style={[
                styles.bar,
                {
                  width: itemWidth/1.5,
                  height: itemWidth/1.5,
                  borderRadius: itemWidth/1.5,
                  border: 1,
                  transform: [
                    { translateX: scrollBarVal },
                  ],
                },
              ]}
            />
            </TouchableOpacity>

          </View>
        )
        barArray.push(thisBar)
      }) // end of foreach

      return (
        <View
        style={styles.container}
        >

          <ScrollView
          ref="scrollView" horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: animVal } } }]
            )
          }
          >

              {imageArray}

            </ScrollView>
              <View
              style={styles.barContainer}
              >
              {barArray}
              </View>
            </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  barContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },

  track: {
    backgroundColor: 'lightgray',
    overflow: 'hidden',
    height: 20,

  },

  bar: {
    backgroundColor: 'darkgray',
    height: 20,
  },
})

function mapStateToProps(state) {
  return ({
    userFeedImages: getUserFeedImagesState(state) || [],
    selectedImageIndex: getSelectedImageIndexState(state) > 0 || 0,
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserFeedImages: () => {
      dispatch(fetchUserFeedImages())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageSlider);
