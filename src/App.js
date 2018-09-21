import React, { Component } from 'react';
import './App.css';

//For Setting the time for Break and Session
function SetLength (props) {
  return(
    <div className='lenContainer'>
      <h2>{props.title}</h2>
      {props.length}
    </div>
  );
}

function Timer (props) {
  return(
    <div className='timerDisplay' style={props.style}>
      <h2 id='display-title'>{props.title}</h2>
      <span id='time-left'>{props.timeLeft}</span>
    </div>
  );
}

function Increase (props) {
  return(
    <button className='increase' onClick={props.onClick} disabled={props.disabled}>+1</button>
  );
}

function Decrease (props) {
  return(
    <button className='decrease' onClick={props.onClick} disabled={props.disabled}>-1</button>
  );
}

function PlayPause (props) {
  return(
    <button class='main-buttons' onClick={props.onClick}>Start/Stop</button>
  );
}

function Reset (props) {
  return(
    <button class='main-buttons' onClick={props.onClick}>Reset</button>
  );
}


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inSession: true,
      breakLen: 5,
      sessionLen: 25,
      timeLeft : 1000 * 60 * 25,    //timeLeft is measured in milliseconds. for built JS functions
      playing: false,
    };

    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);

    this.increaseSes = this.increaseSes.bind(this);
    this.decreaseSes = this.decreaseSes.bind(this);

    this.runTimer = this.runTimer.bind(this);
    this.tick = this.tick.bind(this);

    this.resetTimer = this.resetTimer.bind(this);
  }


  //increasing break length
  increaseBreak() {

    let prevLen  = this.state.breakLen;

    this.setState({
      breakLen: prevLen + 1
    });

  }

  //decreasing break length
  decreaseBreak() {

    let prevLen  = this.state.breakLen;

    if(prevLen > 1) {

      this.setState({
        breakLen: prevLen - 1
      });

    }
  }

  //increasing session time
  increaseSes() {

    let prevLen = this.state.sessionLen;

    this.setState({
      sessionLen: prevLen + 1,
      timeLeft: 1000 * 60 * (prevLen + 1),
    });

  }

  //decrease session time
  decreaseSes() {

    let prevLen = this.state.sessionLen;

    if(prevLen > 1) {
      this.setState({
        sessionLen: prevLen - 1,
        timeLeft: 1000 * 60 * (prevLen - 1),
      });
    }

  }

  //callback for setInterval
  tick() {

    this.setState({
      timeLeft: this.state.timeLeft - 1000,
    })

    // set the switch to -1, so that timer can reach 0 before switching
    if (this.state.timeLeft === -1000) {

      var horn = new Audio("https:\/\/upload.wikimedia.org\/wikipedia\/commons\/5\/51\/Music_loop_168bpm_%28Still_frivolous%29.ogg");

      horn.play();

      //switch from session to break and vice versa
      this.switchTimers();

    }

  }

  switchTimers() {

    if (this.state.inSession) {

      this.setState({
        timeLeft: 1000 * 60 * this.state.breakLen,
        inSession: false,
      });

    } else {

      this.setState({
        timeLeft: 1000 * 60 * this.state.sessionLen,
        inSession: true,
      });

    }

  }

  //starts and stops time
  runTimer() {

    let currentPlaying = this.state.playing;

    this.setState({playing: !currentPlaying}, () => {

      if (this.state.playing) {

        clearInterval(this.timerInterval);
        this.timerInterval =  setInterval(this.tick.bind(this), 1000);

      } else {

        clearInterval(this.timerInterval);

      }
    });

  }

  //resets back to default state
  resetTimer() {

    //if previously playing, will remove interval so timer can stop.
    clearInterval(this.timerInterval);
    //make a copy of the object
    let defaultState = {
      inSession: true,
      breakLen: 5,
      sessionLen: 25,
      timeLeft : 1000 * 60 * 25,
      playing: false,
    };

    this.setState(defaultState);

  }

  render() {

    let mm = Math.floor(this.state.timeLeft / 60 / 1000);     //minutes display
    let ss = (this.state.timeLeft - (mm * 60 * 1000) ) / 1000;//seconds display

    mm = mm < 10 ? '0' + mm : mm;
    ss = ss < 10 ? '0' + ss : ss;

    let ifPlaying = this.state.playing ? true : false;

    let sessionType = this.state.inSession ? 'Session' : 'Break';

    //Maybe render these smaller components separately for performance
    return (
      <div id='main'>

        <h1 id='title'>Pomodoro Clock</h1>

        <div className='row'>

          <div className='row'>
            <div className='button-group'>
              <Increase onClick={this.increaseBreak} disabled={ifPlaying} />
              <Decrease onClick={this.decreaseBreak} disabled={ifPlaying} />
            </div>

            <SetLength title='Break Length' length={this.state.breakLen} />
          </div>

          <div className='row'>
            <SetLength title='Session Length' length={this.state.sessionLen} />

            <div className='button-group'>
              <Increase onClick={this.increaseSes} disabled={ifPlaying} />
              <Decrease onClick={this.decreaseSes} disabled={ifPlaying} />
            </div>
          </div>

        </div>

        <Timer title={sessionType} timeLeft={mm + ':' + ss} style={mm == '00' ? {color: 'red'} : {color: 'white'}}/>

        <div class='row'>
          <PlayPause onClick={this.runTimer} />
          <Reset onClick={this.resetTimer} />
        </div>

        <div id='footer'>
          Designed and Coded by <br></br>
          <span id='myName'>James Pham</span>
        </div>

      </div>
    );
  }

}

export default App;
