import React from "react";
import PropTypes from "prop-types";
import { v4 } from 'uuid';
import ReusableForm from "./ReusableForm";

function NewCoffeeForm(props){
  
  function handleNewCoffeeFormSubmission(event) {
    event.preventDefault();
    const price = parseFloat(event.target.price.value); // Convert the price to a number
  
    props.onNewCoffeeCreation({
      name: event.target.name.value,
      origin: event.target.origin.value,
      description: event.target.description.value,
      roast: event.target.roast.value,
      price: price, // Pass the price as a number
      available: event.target.available.value, 
      id: v4()
    });
  }
  
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewCoffeeFormSubmission}
        buttonText="Add" />
    </React.Fragment>
  );
}
NewCoffeeForm.propTypes = {
  onNewCoffeeCreation: PropTypes.func
};

export default NewCoffeeForm;