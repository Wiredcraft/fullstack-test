import { NAVIGATE, REPLACE } from 'constants/route'

export default function (route = {}, action) {
  switch (action.type) {
    case NAVIGATE:
    case REPLACE:
      return {
        href: action.href,
        location: action.location,
        query: action.query
      }

    default:
      return route
  }
}
