import React, { Component } from "react";
import { connect } from "react-redux";

import ExampleForm from "../forms/ExampleForm/index";
import "../styles/common.css";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ExampleForm/>
        );
    }
}

export default connect()(App);