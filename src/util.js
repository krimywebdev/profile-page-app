// return parsed bio
export const getParsedBio = function(bioString) {
  // split the bio based on spaces
  return bioString.replace(/\r?\n|\r/g, ' ')

}