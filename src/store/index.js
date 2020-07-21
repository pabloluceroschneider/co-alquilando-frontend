import React from 'react'

export const SessionContext = React.createContext();

export const initialState = {
    user: JSON.parse(localStorage.getItem("user"))
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "SIGN_IN": 
			localStorage.setItem("user", JSON.stringify(action.payload))
            return {...state, user: action.payload }
        case "SIGN_OUT": 
            localStorage.removeItem('user');
            return {...state, user: null }
        default:
            break;
    }
}

export const SIGN_IN = item => {
    return { type: "SIGN_IN", payload: item }
}

export const SIGN_OUT = () => {
    return { type: "SIGN_OUT" }
}