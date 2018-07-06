import React from 'react';
import _ from 'lodash';
import './App.css';

const Numbers = (props) => {
    const numberClassName = (num) => {
        if (props.selectedNumbers.indexOf(num) >= 0) {
            return 'selected';
        }
        if (props.usedNumbers !== undefined && props.usedNumbers.indexOf(num) >= 0) {
            return 'used';
        }
    }
    return (
        <div className="card text-center"> 
            <div> 
                {Numbers.nums.map((n,i) => 
                    (
                     <span  key={i}
                            className={numberClassName(n)}
                            onClick={() => props.selectNumber(n)}>
                            {n}
                     </span>                           
                    )
                )}
            </div>
        </div>
    )
}

Numbers.nums = _.range(1,10);

export default Numbers;