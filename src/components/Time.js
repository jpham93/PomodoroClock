import React from 'react'

const Time = (props) => {
    const inSessionText = props.data.inSession ? "Session" : 'Break' // Displays session or break
    const playButtonText = props.data.play ? "Pause" : "Play"   // changes display depending if app is running
    
    let mm = Math.floor(props.data.timeLeft / 60)
    let ss = props.data.timeLeft % 60

    // add leading zero if under 10 for minutes or seconds
    mm = mm < 10 ? '0' + mm : mm
    ss = ss < 10 ? '0' + ss : ss

    const alertColor = mm === '00' ? 'red' : 'black' // when we reach to 00 minutes, turn timeLeft display red
    const timeAlert = mm === '00' ? {color: 'red', textShadow: '2px 4px 3px rgba(0, 0, 0, 0.2)'} : {color: '#45CE30', textShadow: '2px 4px 3px rgba(0, 0, 0, 0.2)'} 
    const playButtonStyle = !props.data.play ? 
        'btn-large waves-effect waves-light pulse red darken-4' : 
            'btn-large waves-effect waves-light green darken-2' 

    return(
        <div id='time-left-container' className='center'>
            <hr />
            <h2 id='timer-label' style={{color: alertColor}}>{inSessionText}</h2>
            <h3 id='time-left' style={timeAlert}>{`${mm}:${ss}`}</h3>
            <button 
                id='start_stop'
                className={playButtonStyle}
                style={{width: '104.8px'}}
                name='play'
                onClick={props.handleClick}
            >
               {playButtonText}
            </button>
            <button 
                id='reset'
                className='btn-large waves-effect waves-light orange darken-2'
                name='reset'
                onClick={props.handleClick}
            >
                Reset
            </button>
            <hr style={{marginTop: '50px'}} />
        </div>    
    )
}

export default Time