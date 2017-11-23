import { createSelector } from 'reselect'

/**
 * selector for Header component
 */
const getUser = (state) => state.userDetails.user

export const getUserState = createSelector(
  [ getUser ],
  (user) => user
)


/**
 * selector for ImageSlider component
 */
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


/**
 * selector for ImagesGrid component
 */
const getPopularFeedImages = (state) => state.userDetails.popularFeedImages

export const getPopularFeedImagesState = createSelector(
  [ getPopularFeedImages ],
  (popularFeedImages) => popularFeedImages
)
