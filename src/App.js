import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";

import "./App.css";
import Form from "./components/Form";
import ProductList from "./pages/ProductList";

export default class App extends Component {

  render() {
    return (
      <HashRouter>
         <header class="header">
          <h1>
            Products
          </h1>
        </header>
      <div class="body"> 
        <Route path='/edit' component={Form}/>
        <Route exact path='/' component={ProductList}/>
      </div>
      </HashRouter>
    );
  }
}
