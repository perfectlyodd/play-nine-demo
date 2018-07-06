import React from 'react';
import './App.css';


const Button = (props) => {
    let button;
    switch(props.answerIsCorrect) {
        case true:
            button =    (
                <button className='btn btn-success'
                        onClick={props.acceptAnswer}>
                    Accept answer
                </button>
            )
        break;
        case false:
            button =    (
                <button className='btn btn-danger'>
                    <i className='fa fa-times'></i>
                </button>
            )
        break;
        default:
            button =    (
                <button classname='btn btn-sm'
                        id='centerButton'
                        onClick={props.handleClick}
                        disabled={props.selectedNumbers.length === 0}>
                    Submit answer
                </button>
            )
        break;
    }
    return (
        <div className="col-2 text-center">
            {button}
            <br /> <br />
            <button className='btn btn-warning btn-sm'
                    onClick={props.redraw}
                    disabled={props.redraws === 0}>
                <i className='fa fa-bolt'>{props.redraws}</i>
            </button>
        </div>
    );
}

// Button.propTypes = {
//     selectedNumbers: PropTypes.array
// };

export default Button;