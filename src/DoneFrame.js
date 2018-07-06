import React from 'react';

const DoneFrame = (props) => {
    return (
        <div className='text-center'>
            <h2>{props.status}</h2>
            <button className='btn btn-secondary'
                    onClick={props.handleClick}>
                Play Again?
            </button>
        </div>
    );
}

export default DoneFrame;