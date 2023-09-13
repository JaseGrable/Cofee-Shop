import React from 'react';
import NewCoffeeForm from './NewCoffeeForm';
import CoffeeList from './CoffeeList';
import CoffeeDetail from './CoffeeDetail';
import EditCoffeeForm from './EditCoffeeForm';
import Header from './Header';
import { v4 } from 'uuid';

class CoffeeControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        formVisibleOnPage: false,
        selectedCoffee: null,
        editing: false,
        mainCoffeeList: [
            {
                name: "Dark Roast 12oz Ground* For Coffee Maker",
                origin: "Guatemala",
                description: "Coffee Directly sourced from the Mountains of El Bosque, Santa Cruz Naranjo, Santa Rosa, Guatemala.",
                roast: "Dark",
                price: 8.99,
                available: 130,
                id: v4()
            },
            {
                name: "Dark Roast 12oz Whole Beans",
                origin: "Guatemala",
                description:"Coffee Directly sourced from the Mountains of El Bosque, Santa Cruz Naranjo, Santa Rosa, Guatemala.",
                roast: "Dark",
                price: 9.99,
                available: 90,
                id: v4()
            },
            {
                name: "Medium Roast 12oz Ground* For Coffee Maker",
                origin: "Guatemala",
                description: "Coffee Directly sourced from the Mountains of El Bosque, Santa Cruz Naranjo, Santa Rosa, Guatemala",
                roast: "Medium",
                price: 7.99,
                available: 50,
                id: v4()
            },
            {
                name: "Medium Roast 12oz Whole Beans",
                origin: "Guatemala",
                description: "Coffee Directly sourced from the Mountains of El Bosque, Santa Cruz Naranjo, Santa Rosa, Guatemala",
                roast: "Medium",
                price: 10.99,
                available: 25,
                id: v4()
            },
            {
                name: "Strong Dark Roast 12oz Whole Bean",
                origin: "Guatemala",
                description:"Coffee Directly sourced from the Mountains of El Bosque, Santa Cruz Naranjo, Santa Rosa, Guatemala",
                roast: "Dark",
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



  handleEditClick = () => {
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

  handleDeletingCoffee = (id) => {
    const newMainCoffeeList = this.state.mainCoffeeList.filter(coffee => coffee.id !== id);
    this.setState({
      mainCoffeeList: newMainCoffeeList,
      selectedCoffee: null 
    });
  }

  handleSellingCoffee = (id) => {  
    const {selectedCoffee, mainCoffeeList} = this.state;
    if (selectedCoffee.available > 0) {
      selectedCoffee.available -= 1;
    } else {
        selectedCoffee.available = 0;
    }
    const index = mainCoffeeList.indexOf(selectedCoffee);
    const newMainCoffeeList = [...mainCoffeeList];
    newMainCoffeeList[index] = selectedCoffee;
    this.setState({
        mainCoffeeList: newMainCoffeeList,
    }); 
  }

  handleStockingCoffee = (id) => {
    const {selectedCoffee, mainCoffeeList} = this.state;
    const index = mainCoffeeList.indexOf(selectedCoffee);

        if (selectedCoffee.available < 130) {
        selectedCoffee.available += 1;
        const newMainCoffeeList = [...mainCoffeeList];
        newMainCoffeeList[index] = selectedCoffee;
        this.setState({
            mainCoffeeList: newMainCoffeeList,
            });
        }
    }   

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing ) {      
      currentlyVisibleState = <EditCoffeeForm coffee = {this.state.selectedCoffee} onEditCoffee = {this.handleEditingCoffeeInList} />
      buttonText = "Return to Coffee List";

    } else if (this.state.selectedCoffee != null) {
      currentlyVisibleState = <CoffeeDetail 
        coffee = {this.state.selectedCoffee} 
        onClickingDelete = {this.handleDeletingCoffee}
        onClickingEdit = {this.handleEditClick} 
        onCoffeeSale={this.handleSellingCoffee}
        onCoffeeRestock={this.handleStockingCoffee}
        />
        buttonText = "Return to Coffee List";
    }
    else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewCoffeeForm onNewCoffeeCreation={this.handleAddingNewCoffeeToList}/>
      buttonText = "Return to Coffee List"; 
    } else {
      currentlyVisibleState = <CoffeeList coffeeList={this.state.mainCoffeeList} onCoffeeSelection={this.handleChangingSelectedCoffee} />;
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