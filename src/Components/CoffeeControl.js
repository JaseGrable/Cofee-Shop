import React from 'react';
import NewCoffeeForm from './NewCoffeeForm';
import CoffeeList from './CoffeeList';
import CoffeeDetail from './CoffeeDetail';
import EditCoffeeForm from './EditCoffeeForm';
import { v4 } from 'uuid';

class CoffeeControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        formVisibleOnPage: false,
        mainCoffeeList: [],
        selectedCoffee: null,
        editing: false,
        mainCoffeeList: [
            {
              name: "Cinnamon Roast",
              origin: "Colombia",
              description: " ",
              roast: "Cinnamon Roast",
              price: 8.99,
              available: 130,
              id: v4()
            },
            {
              name: "Blonde roast",
              origin: "Italy",
              description: " ",
              roast: "Blonde Roast",
              price: 9.99,
              available: 90,
              id: v4()
            },
            {
              name: "Breakfast Roast",
              description: " ",
              origin: "Costa Rica",
              roast: "Breakfast roast",
              price: 7.99,
              available: 50,
              id: v4()
            },
            {
              name: "Espresso roast",
              description: " ",
              origin: "Brazil",
              roast: "Espresso roast",
              price: 10.99,
              available: 25,
              id: v4()
            },
            {
              name: "French roast",
              description: " ",
              origin: "Ethiopia",
              roast: "French roast",
              price: 11.99,
              available: 10,
              id: v4()
            }
          ]
    };
  }

  handleClick = () => {
    if (this.state.selectedCoffee != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedCoffee: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  handleAddingNewCoffeeToList = (newCoffee) => {
    const newMainCoffeeList = this.state.mainCoffeeList.concat(newCoffee);
    this.setState({mainCoffeeList: newMainCoffeeList, formVisibleOnPage: false });
  }

  handleChangingSelectedCoffee = (id) => { 
    const selectedCoffee = this.state.mainCoffeeList.filter(coffee => coffee.id === id)[0];
    this.setState({selectedCoffee: selectedCoffee});
}

  handleDeletingCoffee = (id) => {
    const newMainCoffeeList = this.state.mainCoffeeList.filter(coffee => coffee.id !== id);
    this.setState({
      mainCoffeeList: newMainCoffeeList,
      selectedCoffee: null 
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }
  handleEditingCoffeeInList = (coffeeToEdit) => {
    const editedMainCoffeeList = this.state.mainCoffeeList
      .filter(coffee => coffee.id !== this.state.selectedCoffee.id)
      .concat(coffeeToEdit);
    this.setState({
        mainCoffeeList: editedMainCoffeeList,
        editing: false,
        selectedCoffee: null
      });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing ) {      
      currentlyVisibleState = <EditCoffeeForm coffee = {this.state.selectedCoffee} onEditCoffee = {this.handleEditingCoffeeInList} />
      buttonText = "Return to Coffee List";

    } else if (this.state.selectedCoffee != null) {
      currentlyVisibleState = <CoffeeDetail 
        coffee = {this.state.selectedCoffee} onClickingDelete = {this.handleDeletingCoffee}
        onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Coffee List";
    }
    else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewCoffeeForm onNewCoffeeCreation={this.handleAddingNewCoffeeToList}/>
      buttonText = "Return to Coffee List"; 
    } else {
      currentlyVisibleState = <CoffeeList coffeeList={this.state.mainCoffeeList} onCoffeeSelection={this.handleChangingSElectedCoffee} />;
      buttonText = "Add Coffee";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }


}

export default CoffeeControl;