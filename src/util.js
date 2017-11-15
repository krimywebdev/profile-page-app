// return parsed bio
export const getParsedBio = function(bioString, hashTagTarget) {
  // split the bio based on spaces
//  const hashParsed = bioString.replace(/#(\w+)/g,
//      "<Text style={{color: 'blue'}}" +
//        "onPress={() => Linking.openURL(" + hashTagTarget +")}>" +
//        "$&" +
//      "</Text>")
  const hashParsed = bioString
  return hashParsed.replace(/\r?\n|\r/g, ' ')

}