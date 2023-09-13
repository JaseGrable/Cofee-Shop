import React from "react";
import PropTypes from "prop-types";


function Coffee(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenCoffeeClicked(props.id)}>
        <h3>{props.name} - <em>{props.origin}</em></h3>
        {/* <p>{props.description}</p> */}
        <p><em>{props.roast} roast</em></p>
        <p><em>{props.price} per pound</em></p>
        <p><em>{props.available} pounds available</em></p>
    
      <hr/>
      </div>
    </React.Fragment>
  );
}

Coffee.propTypes = {
  name: PropTypes.string,
  origin: PropTypes.string,
  description: PropTypes.string,
  roast: PropTypes.string,
  price: PropTypes.number,
  available: PropTypes.number,
  id: PropTypes.string,
  whenCoffeeClicked: PropTypes.func,
  whenBuyClicked: PropTypes.func,
  whenEditClicked: PropTypes.func,
  whenDeleteClicked: PropTypes.func
  };
  

export default Coffee;