import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

class ReadMore extends React.Component {
  constructor(props) {
    super(props);
    this.resetData();

    this.state = {
      numberOfLines: null,
      opacity: 0,
    }
  }

  componentWillReceiveProps() {
    this.resetData()

    this.setState({
      numberOfLines: null,
      opacity: 0,
    })
  }

  componentDidUpdate() {
    if (this.state.numberOfLines === null) {
      this.props.afterExpand()
    } else {
      this.props.afterCollapse()
    }
  }

  onLayout = (event) => {
    const {
      height,
      } = event.nativeEvent.layout

    if (height === 0 || this.state.opacity === 1) return false

    this.setOriginalHeight(height)
    this.checkTextTruncated(height)
    if (this.state.numberOfLines === this.props.numberOfLines) {
      this.setState({
        opacity: 1,
      })
    }
    return null
  }

  onPressMore = () => {
    this.setState({
      numberOfLines: null,
    });
  }

  onPressLess = () => {
    this.setState({
      numberOfLines: this.props.numberOfLines,
    });
  }

  setOriginalHeight = (height) => {
    if (this.originalHeight === 0) {
      this.originalHeight = height

      this.setState({
        numberOfLines: this.props.numberOfLines,
      });
    }
  }

  resetData = () => {
    this.isTruncated = false
    this.originalHeight = 0
    this.shouldShowMore = false
    this.isInit = false
  }

  checkTextTruncated = (height) => {
    if (height < this.originalHeight) {
      this.shouldShowMore = true
    }
  }


  renderReadMore = () => (
    <View style={styles.readMoreWrapper}>
      <Text style={[styles.readMore, styles.readText]} onPress={this.onPressMore}>
        ...read more
      </Text>
    </View>
  )

  renderReadLess = () => (
    <Text style={styles.readText} onPress={this.onPressLess}>
      ..read less
    </Text>
  )

  renderFooter = () => {
    const {
      numberOfLines,
      } = this.state

    if (this.shouldShowMore === true) {
      if (numberOfLines > 0) {
        return (this.props.renderReadMore || this.renderReadMore)(this.onPressMore)
      }
      return (this.props.renderReadLess || this.renderReadLess)(this.onPressLess)
    }
    return null
  }

  render() {
    return (
      <View onLayout={this.onLayout} style={{ opacity: this.state.opacity }}>
        <Text
        style={this.props.textStyle}
        numberOfLines={this.state.numberOfLines}
        >
          {this.props.children}

        </Text>

        {this.renderFooter()}

      </View>
    )
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
    position: 'absolute',
    right: 0,
    bottom: 0,
    opacity: 1,
    backgroundColor: 'white'
  },


  readMore: {

  },

  readText: {
    color: '#b4b4b4',
    fontSize: 12,
  }

})

export default ReadMore;
