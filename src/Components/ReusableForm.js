import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
    return (
        <React.Fragment>
            <form onSubmit={props.formSubmissionHandler}>
            <div className="form-control">
                <input 
                    type='text'
                    name='name'
                    placeholder='Coffee Name' required />
            </div>
            <div className="form-control">
                <input
                    type='text'
                    name='origin'
                    placeholder='Country of Origin' required />
            </div>
            <div className="form-control">
                <input
                    type='text'
                    name='description'
                    placeholder='Description' required /> 
            </div>
            <div className="form-control"> 
                <input
                    type='text'
                    name='roast'
                    placeholder='Roast' required />
            </div>
            <div className="form-control">
                <input
                    type='number'
                    name='price'
                    min='0'
                    step="0.01"
                    placeholder='Price per pound' required />
            </div>
            <div className="form-control">
                <input
                    type='number'
                    name='available'
                    min='0'
                    max='130'
                    placeholder='Pounds available' required
                    />
            </div>
               
                <button className="btn btn-black" type="submit">{props.buttonText}</button>
            </form>
        </React.Fragment>
    );
}

ReusableForm.propTypes = {
    formSubmissionHandler: PropTypes.func,
    buttonText: PropTypes.string
};

export default ReusableForm;