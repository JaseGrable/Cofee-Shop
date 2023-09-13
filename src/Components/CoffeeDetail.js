import React from "react";
import PropTypes from "prop-types";

function CoffeeDetail(props){
    const { coffee, onClickingDelete } = props;
    return (
        <React.Fragment>
            <h1>Coffee Detail</h1>
            <h3>{coffee.name} - <em>{coffee.origin}</em></h3>
            <p>{coffee.description}</p>
            <p><em>{coffee.roast} roast</em></p>
            <p><em>${coffee.price} per pound</em></p>
            <p><em>{coffee.available} pounds available</em></p>

            <button onClick={ props.onClickingEdit }>Edit</button> 
            <button onClick={ props.onCoffeeSale }>Sell</button> 
            <button onClick= { props.onCoffeeRestock }>Restock</button>
            <button onClick={()=> onClickingDelete(coffee.id) }>Delete</button>
            <hr/>
        </React.Fragment>
    );
}
CoffeeDetail.propTypes = {
    coffee: PropTypes.object,
    onClickingDelete: PropTypes.func,
    onClickingEdit: PropTypes.func,
    onCoffeeSale: PropTypes.func
};  

export default CoffeeDetail;