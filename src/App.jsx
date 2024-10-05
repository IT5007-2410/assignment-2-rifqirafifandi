/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555, seatNumber: 1,
    bookingTime: new Date()
  },
  {
    id: 2, name: 'Rose', phone: 88884444, seatNumber: 2,
    bookingTime: new Date()
  },
];

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const traveller = props.traveller;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.seatNumber}</td>
      <td>{traveller.bookingTime.toString()}</td>
    </tr>
  );
}

function Display(props) {
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const travellers = props.travellersProp;
  const travellerRows = travellers.map(traveller => <TravellerRow key={traveller.id} traveller={traveller} />);

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	        {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Seat Number</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellerRows}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    const name = form.travellerName.value;
    const phone = form.travellerPhone.value;
    const seat = form.seatSelection.value;
    const bookingTime = new Date();
    const ID = this.props.currMaxID + 1;
    /* Call bookTraveller() */
    this.props.addBooking({id: ID, name: name, phone: Number(phone), seatNumber: seat, bookingTime: bookingTime});
    /* Clear the form */
    form.travellerName.value = '';
    form.travellerPhone.value = '';
    form.seatSelection.value = '';
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellerName" placeholder="Name" /><br></br>
        <input type="text" name="travellerPhone" placeholder="Phone Number" /><br></br>
        <input type="text" name="seatSelection" placeholder="Seat Number" /><br></br>
        <button>Add</button>
      </form>
    );
  }
}

class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    const name = form.travellerName.value;
    const phone = form.travellerPhone.value;
    /* Call deleteTraveller() */
    this.props.deleteBooking({name: name, phone: Number(phone)});
    /* Clear the form */
    form.travellerName.value = '';
    form.travellerPhone.value = '';
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
      {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellerName" placeholder="Name" /><br></br>
        <input type="text" name="travellerPhone" placeholder="Phone Number" /><br></br>
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	  super();
	}
	render(){
    const buttonRows = this.props.availableSeatsProp.map((isAvailable, index) => <button key={index} className={`seat-${isAvailable ? 'available' : 'unavailable'}`} disabled>{index + 1}</button>);
	  return (
      <div>
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        <h2>Homepage</h2>
        <div className="seat-assignment-group">
          {/* Placeholder for button objects */}
          {buttonRows}
        </div>
        <p>Seats Available: {this.props.emptySeatsProp} seats</p>
      </div>
    );
	}
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.maxPassengers = 10;
    this.state = { 
      travellers: [], 
      selector: 1, 
      maxID: 0,
      addError: false, 
      deleteError: false, 
      isTrainFull: false,
      emptySeats: this.maxPassengers,
      /* Assume 10 seats in a row, seats defined properly at booking time, no duplicates */
      availableSeats: Array(this.maxPassengers).fill(true), // For Q6
    };
  }

  setSelector(value) {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    switch (value) {
      case 1:
        this.setState({selector: 1}); /* Display Homepage */
        break;
      case 2:
        this.setState({selector: 2}); /* Display Travellers */
        break;
      case 3:
        this.setState({selector: 3}); /* Add Traveller */
        break;
      case 4:
        this.setState({selector: 4}); /* Delete Traveller */
        break;
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers});
    }, 500);

    /* Compute Maximum ID, Empty Seats, and Update State */
    let maxID = 0;
    let initialPassengers = this.state.travellers.length;
    const tempAvailableSeats = this.state.availableSeats.slice();
    initialTravellers.forEach((traveller) => {
      maxID = Math.max(maxID, traveller.id);
      tempAvailableSeats[traveller.seatNumber - 1] = false;
    });
    this.setState({ maxID: maxID, emptySeats: this.maxPassengers - initialPassengers, availableSeats: tempAvailableSeats});
  }

  releaseDeleteError() {
    setTimeout(() => {
      this.setState({deleteError: false});
    }, 2000);
  }

  releaseAddError() {
    setTimeout(() => {
      this.setState({addError: false});
    }, 2000);
  }

  bookTraveller(passenger) {
	  /*Q4. Write code to add a passenger to the traveller state variable.*/
    const temp = this.state.travellers.slice();
    const currentMaxID = this.state.maxID;
    const tempAvailableSeats = this.state.availableSeats.slice();
    /* Check if the seat is already taken */
    if (!tempAvailableSeats[passenger.seatNumber - 1] || passenger.seatNumber < 1 || passenger.seatNumber > this.maxPassengers) {
      this.setState({addError: true});
      this.releaseAddError();
      return;
    }

    tempAvailableSeats[passenger.seatNumber - 1] = false;
    temp.push(passenger);
    this.setState({travellers: temp, maxID: currentMaxID + 1, emptySeats: this.maxPassengers - temp.length, availableSeats: tempAvailableSeats});
    /* Check if the train is full */
    if (temp.length === this.maxPassengers) {
      this.setState({isTrainFull: true});
    }
    else {
      this.setState({isTrainFull: false});
    }
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    const temp = this.state.travellers.slice();
    const tempAvailableSeats = this.state.availableSeats.slice();
    var isFound = false;
    /* Look for the passenger to delete */
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].name === passenger.name && temp[i].phone === passenger.phone) {
        isFound = true;
        tempAvailableSeats[temp[i].seatNumber - 1] = true;
        temp.splice(i, 1);
        break;
      }
    }
    if (!isFound) {
      this.setState({deleteError: true});
      this.releaseDeleteError();
    }
    else {
      this.setState({travellers: temp, deleteError: false, isTrainFull: false, emptySeats: this.maxPassengers - temp.length, availableSeats: tempAvailableSeats});
    }
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <nav>
            <ul>
              <li><a href="#" onClick={() => this.setSelector(1)}>Homepage</a></li>
              <li><a href="#" onClick={() => this.setSelector(2)}>Display Travellers</a></li>
              <li><a href="#" onClick={() => this.setSelector(3)}>Add Traveller</a></li>
              <li><a href="#" onClick={() => this.setSelector(4)}>Delete Traveller</a></li>
            </ul>
          </nav>
        </div>
        <div>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {this.state.selector==1 ? <Homepage emptySeatsProp={this.state.emptySeats} availableSeatsProp={this.state.availableSeats}/> : null}

          {/*Q3. Code to call component that Displays Travellers.*/}
          {this.state.selector==2 ? <Display travellersProp={this.state.travellers} /> : null}

          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector==3 ? <h2>Add a Traveller</h2> : null} {/*Debug*/}
          {!this.state.isTrainFull && this.state.selector==3 ? <Add addBooking={this.bookTraveller} currMaxID={this.state.maxID}/> : null}
          {this.state.isTrainFull && this.state.selector==3 ? <p>Train is Full</p> : null}
          {this.state.addError && this.state.selector==3 ? <p>Invalid Seat Number</p> : null}

          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {this.state.selector==4 ? <h2>Delete a Traveller</h2> : null} {/*Debug*/}
          {this.state.selector==4 ?<Delete deleteBooking={this.deleteTraveller} /> : null}
          {this.state.deleteError ? <p>Passenger Not Found</p> : null}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
