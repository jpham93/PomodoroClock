import React from 'react'

const BreakControl = (props) => {
    const decrDisable = (props.data.breakLen <= 1 || props.data.play) ? 'disable' : null   // min value of 0 before disabling decrement button
    const incDisable = (props.data.breakLen > 59 || props.data.play) ? 'disable' : null    // max value of 59 before disabling increment button

    const adjButtonTheme = 'btn-floating btn waves-effect waves-light indigo darken-2'  // added to inc/dec button class for styling

    return(
        <div className='break-session col s12 m6'>
            <h4 id='break-label' className='label'>Break Length</h4>
            <button 
                id='break-decrement'
                className={adjButtonTheme}
                name='breakLen'
                value={-1}
                onClick={props.handleClick}
                disabled={decrDisable}
            >    
                <i className='material-icons'>remove</i>
            </button>
            <h5 id='break-length' style={{display:'inline-block', width: '50px'}}>{props.data.breakLen}</h5>
            <button
                id='break-increment'
                className={adjButtonTheme}
                name='breakLen'
                value={1}
                onClick={props.handleClick}
                disabled={incDisable}
            >
                <i className='material-icons'>add</i>
            </button>
        </div>
    )
}

export default BreakControl