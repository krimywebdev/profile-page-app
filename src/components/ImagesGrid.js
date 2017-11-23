import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Text
} from 'react-native'

import {
  fetchPopularFeedImages,
} from '../redux'

import {
  getPopularFeedImagesState,
} from '../selectors'


export class ImagesGrid extends React.Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props)
    this.loadPopularFeedImages = this.loadPopularFeedImages.bind(this)
  }

  /**
   * Fetch the data after the component has mounted
   */
  componentDidMount() {
    this.loadPopularFeedImages()
  }

  /**
   * Calls the redux function to fetch user details from the server
   */
  loadPopularFeedImages() {
    this.props.fetchPopularFeedImages()
  }

  /**
   * Render the component
   */
  render() {

    let images

    if(this.props.popularFeedImages.length > 0) {
      images = this.props.popularFeedImages
    } else {
      images = []
    }

    if(images.length <= 0) {
      return (
        <View style={styles.imagesGridContainer}>
          <Text>Loading...</Text>
        </View>
      )
    } else {

      if(images[0].error) {
        return (
          <View style={[styles.imagesGridContainer, styles.errorContainer]}>
            <Text style={styles.gridError}>There was an error loading popular images feed</Text>
          </View>
        )
      }

      let imageArray = []
      images.forEach((image, i) => {
        const thisImage = (
          <View key={`viewpopimages${i}`} style={styles.photoWrap}>
            <Image key={`popimage${i}`} style={styles.photo}
              source={{uri: image.thumbnail}}
            />
          </View>
        )
        imageArray.push(thisImage)
      })

      // main JSX
      return (
        <View style={[styles.imagesGridContainer, styles.loadingContainer]}>
          <ScrollView>
            <View style={styles.imagesGrid}>
              {imageArray}
            </View>
          </ScrollView>
        </View>
      )
    }
  }
}

/**
 * Define propTypes
 */
ImagesGrid.propTypes = {
  fetchPopularFeedImages : PropTypes.func.isRequired,
  popularFeedImages      : PropTypes.array.isRequired,
}



const styles = StyleSheet.create({
  imagesGridContainer: {
    flex           : 4,
    flexDirection  : 'column',
    justifyContent : 'center',
  },
  errorContainer: {
    flex : 1
  },
  gridError: {
    backgroundColor : 'pink',
    padding         : 10,
    color           : '#800000'
  },
  loadingContainer: {
    alignItems     : 'center',
    justifyContent : 'center',
  },
  imagesGrid: {
    flexDirection : 'row',
    flexWrap      : 'wrap',
  },
  photoWrap: {
    margin : 2,
    height : 120,
    width  : (Dimensions.get('window').width / 3) - 6,
  },
  photo: {
    flex      : 1,
    width     : null,
    alignSelf : 'stretch',
  }

})


/**
 * Necessary for Redux-Thunk
 * @param state
 * @returns {{popularFeedImages: (*|Array)}}
 */

function mapStateToProps(state) {
  return ({
    popularFeedImages: getPopularFeedImagesState(state) || [],
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPopularFeedImages: () => {
      dispatch(fetchPopularFeedImages())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesGrid)
