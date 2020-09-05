import React from "react";
import { connect } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import productData from "./constants/productData.json";

import "./App.css";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";

function App (props) {
  props.onInit(productData);
  return (
      <HashRouter>
         <header class="header">
         <div id="logo"></div>
          <h1>
            Table and Form Builder
          </h1>
        </header>
      <div class="body"> 
        <Route path='/create' component={ProductForm}/>
        <Route path='/edit' component={ProductForm}/>
        <Route exact path='/' component={ProductList}/>
      </div>
      </HashRouter>
    );
}

const mapStateToProps = state => {
  return {
    objects: state.objects,
    rows: state.rows
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
