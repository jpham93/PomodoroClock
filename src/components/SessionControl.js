import React from 'react'

const SessionControl = (props) => {

    const decrDisable = (props.data.sessionLen <= 1 || props.data.play) ? 'disable' : null   // min value of 0 before disabling decrement button
    const incDisable = (props.data.sessionLen > 58 || props.data.play) ? 'disable' : null    // max value of 59 before disabling increment button
    /**Both buttons are disabled if timer is running */

    return(
        <div className='break-session'>
            <h4 id='session-label' className='label'>Session Length</h4>
            <button 
                id='session-decrement'
                className='decrease-btn'
                name='sessionLen'
                value={-1}
                onClick={props.handleClick}
                disabled={decrDisable}
            >    
                Decrease
            </button>
            <h5 id='session-length'>{props.data.sessionLen}</h5>
            <button
                id='session-increment'
                className='increase-btn'
                name='sessionLen'
                value={1}
                onClick={props.handleClick}
                disabled={incDisable}
            >
                Increase
            </button>
        </div>
    )
}

export default SessionControl