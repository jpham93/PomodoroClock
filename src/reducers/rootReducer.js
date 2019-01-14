const initialState = {  // intial state to pass to reducer
    timeLeft: 25 * 60,  // default time is 25 minutes
    inSession: true,
    play: false,
    breakLen: 5,
    sessionLen: 25, 
}
  
const rootReducer = (state = initialState, action) => {
    return state
}

export default rootReducer

