import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ExampleForm from "../forms/ExampleForm/index";
import SimpleKitForm from "../forms/SimpleKitForm/index";
import ComplexKitForm from "../forms/ComplexKitForm/index";
import Navigation from "./Navigation";
import "../styles/common.css";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation>
                        <Route path="/" exact component={ExampleForm} />
                        <Route path="/example-form" exact component={ExampleForm} />
                        <Route path="/simple-kit-form/" component={SimpleKitForm} />
                        <Route path="/complex-kit-form/" component={ComplexKitForm} />
                    </Navigation>
                </div>
            </Router>
        );
    }
}

export default connect()(App);