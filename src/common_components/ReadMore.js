import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

class ReadMore extends React.Component {
  constructor(props) {
    super(props)
    this.resetData()

    this.state = {
      numberOfLines : null,
      opacity       : 0,
    }

    this.onLayout           = this.onLayout.bind(this)
    this.onPressMore        = this.onPressMore.bind(this)
    this.onPressLess        = this.onPressLess.bind(this)
    this.setOriginalHeight  = this.setOriginalHeight.bind(this)
    this.resetData          = this.resetData.bind(this)
    this.checkTextTruncated = this.checkTextTruncated.bind(this)
    this.renderReadMore     = this.renderReadMore.bind(this)
    this.renderReadLess     = this.renderReadLess.bind(this)
    this.renderFooter       = this.renderFooter.bind(this)

  }

  componentWillReceiveProps() {
    this.resetData()

    this.setState({
      numberOfLines : null,
      opacity       : 0,
    })
  }

  componentDidUpdate() {
    if (this.state.numberOfLines === null) {
      this.props.afterExpand()
    } else {
      this.props.afterCollapse()
    }
  }

  onLayout(event) {
    const {
      height,
    } = event.nativeEvent.layout

    if (height === 0 || this.state.opacity === 1) {
      return false
    }

    this.setOriginalHeight(height)
    this.checkTextTruncated(height)
    if (this.state.numberOfLines === this.props.numberOfLines) {
      this.setState({
        opacity: 1,
      })
    }
    return null
  }

  onPressMore() {
    this.setState({
      numberOfLines: null,
    })
  }

  onPressLess() {
    this.setState({
      numberOfLines: this.props.numberOfLines,
    })
  }

  setOriginalHeight(height) {
    if (this.originalHeight === 0) {
      this.originalHeight = height

      this.setState({
        numberOfLines: this.props.numberOfLines,
      })
    }
  }

  resetData() {
    this.isTruncated = false
    this.originalHeight = 0
    this.shouldShowMore = false
    this.isInit = false
  }

  /**
   * determine whether text is clipped or not
   */
  checkTextTruncated(height){
    if (height < this.originalHeight) {
      this.shouldShowMore = true
    }
  }

  renderReadMore(){

    return (
      <View style={styles.readMoreWrapper}>
        <Text style={[styles.readMore, styles.readText]} onPress={this.onPressMore}>
        ...read more
        </Text>
      </View>
    )

  }

  renderReadLess(){

    return (
      <Text style={[styles.readText, styles.readLess]} onPress={this.onPressLess}>
      ...read less
      </Text>
    )

  }

  /**
   * Renders "...read more or ...read less" appropriately
   */
  renderFooter() {
    const {
      numberOfLines,
    } = this.state

    // decide whether to show "read more" or "read less"
    if (this.shouldShowMore === true) {
      if (numberOfLines > 0) {
        return (this.renderReadMore)(this.onPressMore)
      }
      return (this.renderReadLess)(this.onPressLess)
    }
    return null
  }

  /**
   * main render function
   */
  render() {
    /* eslint-disable react/prop-types */
    return (
      <View onLayout={this.onLayout} style={{ opacity: this.state.opacity }}>
        <Text numberOfLines={this.state.numberOfLines}>
          {this.props.children}
        </Text>
        {this.renderFooter()}
      </View>
    )
    /* eslint-enable react/prop-types */
  }
}

ReadMore.propTypes = {
  renderReadMore: PropTypes.func,
  renderReadLess: PropTypes.func,
  afterCollapse: PropTypes.func,
  afterExpand: PropTypes.func,
  numberOfLines: PropTypes.number.isRequired,
  textStyle: Text.propTypes.style,
}

ReadMore.defaultProps = {
  afterCollapse: () => {},
  afterExpand: () => {},
}

const styles = StyleSheet.create({
  readMoreWrapper: {
    position        : 'absolute',
    right           : 0,
    bottom          : 0,
    backgroundColor : '#f0f8ff'
  },

  readMore: {

  },

  readLess: {
    marginBottom : 10
  },

  readText: {
    color    : '#b4b4b4',
    fontSize : 12,
  }

})

export default ReadMore
