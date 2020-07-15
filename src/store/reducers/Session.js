const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';

const initialState = {
    user: JSON.parse(localStorage.getItem("user"))
}

export default function session(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case SIGN_IN:
          return {...state, user: action.payload}
        case SIGN_OUT:
            return {...state, user: null}
        default:
          return state
      }
  }