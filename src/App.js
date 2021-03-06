import React, { Component } from 'react';
import classes from './App.module.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
class App extends Component {


  state = {
    persons: [
      {id: 'fsdgs', name: 'Max', age: 28},
      {id: 'dsgsh', name: 'Justin', age: 25},
      {id: 'fesfs', name: 'Cameron', age: 25}
    ],
    otherState: "Some other value",
    showPersons: false
  }

  

  nameChangeHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  deletePersonHandler = (personIndex) => {

    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});

  }
  
  togglePersonHandler = () => {
    
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});

  }

  render() {
    console.log(this.state);



    let persons = null;
    let btnClass = '';

    if(this.state.showPersons) {

      persons = (
        <div >
          {
            this.state.persons.map((person, index) => {
              return <ErrorBoundary key = {person.id}>
                <Person  
                    click = {() => this.deletePersonHandler(index)}
                    name = {person.name}
                    age = {person.age}  
                    changed = {(event) => this.nameChangeHandler(event, person.id)}
                    />
                    </ErrorBoundary>
            })

          }
    
        </div> 
   
      );
      
      btnClass = classes.Red;
    }

    const asignedClasses = [];

    if(this.state.persons.length <= 2) {
      asignedClasses.push(classes.red);  //classes = ['red']
    } 

    if(this.state.persons.length <= 1) {
      asignedClasses.push(classes.bold);
    }



    return (
       <div className={classes.App}>
         <h1>Hi, I'm a React App</h1>

         <p className={asignedClasses.join(' ')}>This is really working!</p>
         
         <button 
            className={btnClass}
            onClick={this.togglePersonHandler}>Switch Name</button>
         {persons}

       </div>

    );
    //return React.createElement('div',null,'h1','Hi, I\'m a React App!!!');
  }
}

export default App;
