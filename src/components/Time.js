import React from 'react'

const Time = (props) => {
    let inSessionText = props.data.inSession ? "Session" : 'Break' // Displays session or break
    let playButtonText = props.data.play ? "Pause" : "Play"   // changes display depending if app is running
    
    let mm = Math.floor(props.data.timeLeft / 60)
    let ss = props.data.timeLeft % 60

    // add leading zero if under 10 for minutes or seconds
    mm = mm < 10 ? '0' + mm : mm
    ss = ss < 10 ? '0' + ss : ss

    const alertColor = mm === '00' ? 'red' : 'black' // when we reach to 00 minutes, turn timeLeft display red

    return(
        <div>
            <h3 id='session-label' className='label' style={{color: alertColor}}>{inSessionText}</h3>
            <div id='time-left' style={{color: alertColor}}>{`${mm}:${ss}`}</div>
            <button 
                id='start_stop'
                className=''
                name='play'
                onClick={props.handleClick}
            >
               {playButtonText}
            </button>
            <button 
                id='reset'
                className=''
                name='reset'
                onClick={props.handleClick}
            >
                Reset
            </button>
        </div>    
    )
}

export default Time