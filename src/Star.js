import React from 'react';
//import FontAwesome from 'react-fontawesome';
import _ from 'lodash';

const Star = (props) => {  
	return (
  	<div className="col-5" id='starArray'>
    	{_.range(props.numberOfStars).map(i =>
      	<i key={i} className="fa fa-university"></i>
      )}
    </div>
  );
}

export default Star;
