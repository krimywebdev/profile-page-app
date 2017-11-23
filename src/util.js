import React from 'react'
import { Text, Linking, } from 'react-native'

/**
 * Takes in a string and returns an array of <Text> components
 * after parsing out # and @ and eliminating extra carriage returns
 */
export const getParsedBio = function(bioString, hashTagTarget) {

  // exclude carriage returns
  const str = bioString.replace(/\r?\n|\r/g, ' ')

  // split the string into words
  let strArr = str.split(' ')
  const newArr = []

  strArr.forEach((str, i) => {
    let strComp

    if(str[0] === '#') {

      strComp = <Text key={`word${i}`} style={{color: 'blue'}} onPress={() =>
        Linking.openURL(hashTagTarget)}>{str} </Text>

    } else if(str[0] === '@') {

      strComp = <Text key={`word${i}`} style={{color: 'blue'}} onPress={() =>
        Linking.openURL('https://twitter.com/PumpUp')}>{str} </Text>

    } else {

      strComp = <Text key={`word${i}`}>{str} </Text>

    }

    newArr.push(strComp)

  })

  return newArr

}


