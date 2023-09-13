import React from "react";
import Coffee from "./Coffee";
import PropTypes from "prop-types";

function CoffeeList(props){
    if (!props.coffeeList || !Array.isArray(props.coffeeList)) {
        return <div>No coffee available.</div>;
    }
    return (
    <React.Fragment>
        <hr/>
        {props.coffeeList.map((coffee) =>
        <Coffee 
            whenCoffeeClicked = { props.whenCoffeeClicked}
            name={coffee.name}
            origin={coffee.origin}
            description={coffee.description}
            roast={coffee.roast}
            price={coffee.price}
            available={coffee.available}
            id={coffee.id}
            key={coffee.id}/>
        )}
    </React.Fragment>
);
}
CoffeeList.propTypes = {
coffeeList: PropTypes.array, 
onCoffeeSelection: PropTypes.func
};

export default CoffeeList;