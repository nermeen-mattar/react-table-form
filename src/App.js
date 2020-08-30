import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import Table from "./components/Table";
import { BrowserRouter, Route } from "react-router-dom";
import Form from "./components/Form";
import productData from "./constants/productData.json";

class App extends Component {

  componentWillMount() {
    this.props.onInit();
  }

  render() {
    return (
      <BrowserRouter>
         <header class="header">
          <h1>
            Products
          </h1>
        </header>
      <div class="body"> 
        <Route path='/edit' component={Form}/>
        <Route path='/' component={Table}/>
      </div>
      </BrowserRouter>
    );
  }
}



const mapStateToProps = state => {
  return {
    age: state.age
  };
};

const mapDispachToProps = dispatch => {
  return {
    onInit: () => dispatch({ type: "INIT_OBJECTS", value: productData }),
  };
};
export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);
