import { createSelector } from 'reselect'

// selector
const getUser = (state) => state.userDetails.user

// reselect function
export const getUserState = createSelector(
  [ getUser ],
  (user) => user
)