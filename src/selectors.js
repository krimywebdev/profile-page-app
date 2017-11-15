import { createSelector } from 'reselect'

// selector
const getUser = (state) => state.userDetails.user

// reselect function
export const getUserState = createSelector(
  [ getUser ],
  (user) => user
)

const getUserFeedPhotos = (state) => state.userDetails.userFeedImages

export const getUserFeedImagesState = createSelector(
  [ getUserFeedPhotos ],
  (userFeedImages) => userFeedImages
)

const getSelectedImageIndex = (state) => state.userDetails.selectedImageIndex

export const getSelectedImageIndexState = createSelector(
  [ getSelectedImageIndex ],
  (selectedImageIndex) => selectedImageIndex
)