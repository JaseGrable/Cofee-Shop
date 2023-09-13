import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
    return (
        <React.Fragment>
            <form onSubmit={props.formSubmissionHandler}>
                <input
                    type='text'
                    name='name'
                    placeholder='Coffee Name' required />
                <input
                    type='text'
                    name='origin'
                    placeholder='Country of Origin' required />
                <input
                    type='text'
                    name='description'
                    placeholder='Description' required />  
                <input
                    type='text'
                    name='roast'
                    placeholder='Roast' required />
                <input
                    type='number'
                    name='price'
                    min='0'
                    placeholder='Price per pound' required />
                <input
                    type='number'
                    name='available'
                    min='0'
                    max='130'
                    placeholder='Pounds available' required
                    />

                <button type="submit">{props.buttonText}</button>
            </form>
        </React.Fragment>
    );
}

ReusableForm.propTypes = {
    formSubmissionHandler: PropTypes.func,
    buttonText: PropTypes.string
};

export default ReusableForm;