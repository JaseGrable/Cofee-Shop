import React from "react";
import Coffee from "./Coffee";
import PropTypes from "prop-types";

function CoffeeList(props){
    //Error handling
    if (!Array.isArray(props.coffeeList) || props.coffeeList.length === 0) {
        return <div>
                    <h3>No Coffee Available.</h3>
                </div>
    }
      
      
  return (
    <React.Fragment>
        {props.coffeeList.map((coffee) =>
          <Coffee 
            whenCoffeeClicked = { props.onCoffeeSelection }
            name={coffee.name}
            origin={coffee.origin}
            description={coffee.description}
            roast={coffee.roast}
            price={coffee.price}
            available={coffee.available}
            id={coffee.id}
            key={coffee.id}/>
        )}
        <br />
      </React.Fragment>
  );
}
CoffeeList.propTypes = {
  coffeeList: PropTypes.array, 
  onCoffeeSelection: PropTypes.func
};

export default CoffeeList;