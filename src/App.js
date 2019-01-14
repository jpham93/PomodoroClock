import React, { Component } from 'react'
import soundFile from './metal-metronome.mp3'

// Component Imports 
import Time from './components/Time'
import SessionControl from './components/SessionControl'
import BreakControl from './components/BreakControl'

// Note: for timer, I am not using the JS Date object. Keeping track of timer through state and setTimeout

class App extends Component {
  state = {
    timeLeft: 25 * 60,   // default time is 25 minutes
    inSession: true,
    play: false,
    breakLen: 5,
    sessionLen: 25, 
  }

  startTimer = () => { // method to decrement when active
    // const audio = new Audio(soundFile)

    this.timer = setInterval(() => {
      // ternary statement for when timer hits zero. Checking if timeLeft is not truthy
      !this.state.timeLeft ? 

        this.setState(prevState => { // when timer hits zero
          // audio.play()
          
          // change type of timer. restart timer
          let newLen  // new length of break or session
          prevState.inSession ? newLen = prevState.breakLen : newLen = prevState.sessionLen

          return {
            inSession: !prevState.inSession,
            timeLeft: newLen * 60
          }
        }) :  

            this.setState(prevState => {
              prevState.timeLeft === 1 ? this.audio.play() : null  // play audio right before change to 00:00
              return {timeLeft: prevState.timeLeft - 1} // not mutating state here. Pulling value off first
            })

    }, 1000)

  }

  pauseTimer = () => {
    clearInterval(this.timer)
  }

  handleClick = (event) => { // handle button clicks
    const {name, value} = event.target

    if (name === 'reset' ) {
      this.pauseTimer() // stop timer on reset
      this.setState({ // if reset, set playing to false and default time. Behavior: stop playing, timer back to 25:00
        timeLeft: 25 * 60,
        play: false,
        inSession: true,
      }) 
    
    } else if (name === 'play') {

      this.setState( prevState => {
        // run timer if play is True. else stop
        prevState.play ? this.pauseTimer() : this.startTimer()

        return {play: !prevState.play}
      })        
      
    } else {  // handle session/break increments and decrements buttons
      
      this.setState( prevState => {
          let newLen = prevState[name] + Number(value)  //  save in var if timeLeft needs to be updated as well

          // only update timeLeft if it is inSession for sessionLen and vice versa
          if ((name === 'sessionLen' && prevState.inSession) || (name ==='breakLen' && !prevState.inSession)) {
            return {[name] : newLen, timeLeft: newLen * 60}
          }

          return {[name]: newLen}    
      })

    } 
        
  }
  
  render() {
    return(
      <div id='app'>
        <Time
          data={this.state}
          handleClick={this.handleClick}
        />
        <SessionControl
          data={this.state}
          handleClick={this.handleClick}
        />
        <BreakControl
          data={this.state}
          handleClick={this.handleClick}
        />
        
        <audio src={soundFile} ref={(audio) => { this.audio = audio }}></audio>
      </div>
    )
  }
}

export default App