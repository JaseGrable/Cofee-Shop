import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditCoffeeForm(props) {
    const { coffee } = props;
    function handleEditCoffeeFormSubmission(event) {
        event.preventDefault();
        props.onEditCoffee({
            name: event.target.name.value,
            origin: event.target.origin.value,
            description: event.target.description.value,
            roast: event.target.roast.value,
            price: event.target.price.value,
            available: event.target.available.value,
            id: coffee.id
        });
      }
    return ( 
        
        <React.Fragment>
            <div className="edit-coffee-form">
        <ReusableForm 
            formSubmissionHandler={handleEditCoffeeFormSubmission} 
            buttonText="Update Coffee" />
           </div> 
        </React.Fragment>
        
    );
}
export default EditCoffeeForm;

EditCoffeeForm.propTypes = {
    coffee: PropTypes.object,
    onEditCoffee: PropTypes.func
};