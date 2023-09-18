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
              name: "Morning Bliss",
              origin: "Colombia",
              description: "A medium roast coffee from Colombia that delivers a smooth and energizing start to your day.",
              roast: "Medium",
              price: 8.99,
              available: 130,
              id: v4()
            },
            {
              name: "Espresso Delight",
              origin: "Italy",
              description:"Indulge in the bold and rich flavors of Italy with this dark roast espresso that's perfect for espresso lovers.",
              roast: "Dark",
              price: 9.99,
              available: 90,
              id: v4()
            },
            {
              name: "Tropical Sunrise",
              origin: "Costa Rica",
              description: "Experience the light and fruity notes of Costa Rican coffee, reminiscent of a tropical sunrise in a cup.",
              roast: "Light",
              price: 7.99,
              available: 50,
              id: v4()
            },
            {
              name: "Caramel Macchiato",
              origin: "Brazil",
              description: "Brazilian medium roast coffee infused with creamy caramel flavors, offering a delightful and sweet coffee experience.",
              roast: "Medium",
              price: 10.99,
              available: 25,
              id: v4()
            },
            {
              name: "Mocha Madness",
              origin: "Ethiopia",
              description:"Dive into the intense and chocolaty depths of Ethiopian dark roast coffee, a true delight for chocolate and coffee enthusiasts alike.",
              roast: "Dark",
              price: 11.99,
              available: 10,
              id: v4()
            }
          ]
    };
  }

handleAddButtonClick = () => { 
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

    if (typeof selectedCoffee.available === 'string') {
      // Convert to a number before incrementing
      selectedCoffee.available = parseInt(selectedCoffee.available, 10);
    }

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
    let buttonText = "Return to Coffee List";

    if (this.state.editing ) {      
      currentlyVisibleState = <EditCoffeeForm coffee = {this.state.selectedCoffee} onEditCoffee = {this.handleEditingCoffeeInList} />

    } else if (this.state.selectedCoffee != null) {
      currentlyVisibleState = <CoffeeDetail 
        coffee = {this.state.selectedCoffee} 
        onClickingDelete = {this.handleDeletingCoffee}
        onClickingEdit = {this.handleEditClick} 
        onCoffeeSale={this.handleSellingCoffee}
        onCoffeeRestock={this.handleStockingCoffee}
        />
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewCoffeeForm onNewCoffeeCreation={this.handleAddingNewCoffeeToList}/>

    } else {
      currentlyVisibleState = <CoffeeList coffeeList={this.state.mainCoffeeList} onCoffeeSelection={this.handleChangingSelectedCoffee} />;
      buttonText = "Add Coffee";
    }

    return (
      <React.Fragment>
        <Header onAddButtonClick={this.handleAddButtonClick} buttonText={buttonText}/>
        {currentlyVisibleState}
      </React.Fragment>
    );
  }
}

export default CoffeeControl;