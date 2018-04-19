import React from "react";
import { render } from "react-dom";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

// make a new context
const MyContext = React.createContext();
const MyNewContext = React.createContext();

// make a Provider Component
// this is where the data you wanna share across components will exist
class MyProvider extends React.Component {
  defaultProps = {
    name: this.props.name
  };
  state = {
    name: this.defaultProps.name,
    age: 100,
    mood: "😀",
    showPetName: false
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          toggleName: () => {
            !this.state.showPetName
              ? this.setState({
                  name: "Kaku",
                  showPetName: !this.state.showPetName
                })
              : this.setState({
                  name: this.defaultProps.name,
                  showPetName: !this.state.showPetName
                });
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class MyNewProvider extends React.Component {
  state = {
    wife: "Manisha"
  };

  render() {
    return (
      <MyNewContext.Provider value={this.state}>
        {this.props.children}
      </MyNewContext.Provider>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div style={styles}>
          <MyProvider name="Tushar">
            <Family />
            <MyNewProvider>
              <NewComponent />
            </MyNewProvider>
            <OtherComponent />
          </MyProvider>
        </div>
      </React.Fragment>
    );
  }
}

const Family = () => (
  <div>
    <Person />
  </div>
);

const NewComponent = () => (
  <MyNewContext.Consumer>
    {context => <p>My wife's name is {context.wife}</p>}
  </MyNewContext.Consumer>
);

const OtherComponent = () => (
  <div>
    <MyContext.Consumer>
      {context => (
        <React.Fragment>
          <p>My age is {context.state.age}</p>
          <p>My mood is {context.state.mood}</p>
          <button onClick={context.toggleName}>
            {!context.state.showPetName
              ? "Click to know my pet Name"
              : "Ok, thats embarrasing enough. Revert Back!"}
          </button>
        </React.Fragment>
      )}
    </MyContext.Consumer>
  </div>
);

class Person extends React.Component {
  render() {
    return (
      <div className="person">
        <MyContext.Consumer>
          {context => <p>Hey my name is {context.state.name}</p>}
        </MyContext.Consumer>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
