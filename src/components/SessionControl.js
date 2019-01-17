import React from 'react'

const SessionControl = (props) => {

    const decrDisable = (props.data.sessionLen <= 1 || props.data.play) ? 'disable' : null   // min value of 0 before disabling decrement button
    const incDisable = (props.data.sessionLen > 59 || props.data.play) ? 'disable' : null    // max value of 59 before disabling increment button
    /**Both buttons are disabled if timer is running */

    const adjButtonTheme = 'btn btn-floating waves-effect waves-light indigo darken-2'  // added to inc/dec button class for styling

    return(
        <div className='break-session col s12 m6'>
            <h4 id='session-label' className='label'>Session Length</h4>

            <div className='row'>
                <button 
                    id='session-decrement'
                    className={adjButtonTheme}
                    name='sessionLen'
                    value={-1}
                    onClick={props.handleClick}
                    disabled={decrDisable}
                >    
                    <i className='material-icons' onClick={(e)=>{e.preventDefault()}}>remove</i>
                </button>
                <h5 id='session-length' style={{display:'inline-block', width: '50px'}}>{props.data.sessionLen}</h5>
                <button
                    id='session-increment'
                    className={adjButtonTheme}
                    name='sessionLen'
                    value={1}
                    onClick={props.handleClick}
                    disabled={incDisable}
                >
                    <i className='material-icons'>add</i>
                </button>
            </div>
        </div>
    )
}

export default SessionControl