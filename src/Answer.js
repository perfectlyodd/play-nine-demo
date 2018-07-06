import React from 'react';

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map((n, i) =>
                <span key={i} onClick={() => props.unselectNumber(n)} className='untested'>
                    {n}
                </span>
            )}
        </div>
    );
}

// Answer.propTypes = {
//     unselectNumber: PropTypes.func,
//     selectedNumbers: PropTypes.array
// }

export default Answer;