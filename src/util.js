import React from 'react'
import { Text, Linking, } from 'react-native'
// return parsed bio
export const getParsedBio = function(bioString, hashTagTarget) {

  //exclude carriage returns
  const str = bioString.replace(/\r?\n|\r/g, ' ')

  let strArr = str.split(" ")
  const newArr = []
  strArr.forEach((str, i) => {
    let strComp
    if(str[0] === "#") {
      strComp = <Text key={`word${i}`} style={{color: 'blue'}} onPress={() => Linking.openURL(hashTagTarget)}>{str} </Text>
    } else if(str[0] === "@") {
      strComp = <Text key={`word${i}`} style={{color: 'blue'}} onPress={() => Linking.openURL("https://twitter.com/PumpUp")}>{str} </Text>
    } else {
      strComp = <Text key={`word${i}`}>{str} </Text>
    }
    newArr.push(strComp)
  })
  return newArr
}


