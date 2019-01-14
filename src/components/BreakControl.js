import React from 'react'

const BreakControl = (props) => {
    const decrDisable = (props.data.breakLen <= 1 || props.data.play) ? 'disable' : null   // min value of 0 before disabling decrement button
    const incDisable = (props.data.breakLen > 58 || props.data.play) ? 'disable' : null    // max value of 59 before disabling increment button

    return(
        <div className='break-session'>
            <h4 id='break-label' className='label'>Break Length</h4>
            <button 
                id='break-decrement'
                className='decrease-btn'
                name='breakLen'
                value={-1}
                onClick={props.handleClick}
                disabled={decrDisable}
            >    
                Decrease
            </button>
            <h5 id='break-length'>{props.data.breakLen}</h5>
            <button
                id='break-increment'
                className='increase-btn'
                name='breakLen'
                value={1}
                onClick={props.handleClick}
                disabled={incDisable}
            >
                Increase
            </button>
        </div>
    )
}

export default BreakControl