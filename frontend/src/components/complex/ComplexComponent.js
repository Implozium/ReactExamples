import React, { Component } from 'react';
import { FormSection } from 'redux-form';

class ComplexComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            synchronized: false,
            fields: {},
        };

        this.change = this.change.bind(this);
        this.blur = this.blur.bind(this);
        this.touch = this.touch.bind(this);
        this.untouch = this.untouch.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onGettingInitialValues(initialValues) {
        return null;
    }

    onGettingSyncValues(syncValues) {
        return null;
    }

    getFullName(name) {
        return [this.props.name, name].filter(Boolean).join('.');
    }

    onChange(name, value) {
        if (this.props.onChange) {
            setTimeout(() => this.props.onChange(this.getFullName(name), value), 0);
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.initialValues && Object.keys(props.initialValues).length && props.initialValues !== state.initialValues) {
            return {
                initialized: false,
                initialValues: props.initialValues,
            }
        }
        if (props.syncValues && Object.keys(props.syncValues).length && props.syncValues !== state.syncValues) {
            return {
                synchronized: false,
                syncValues: props.syncValues,
            }
        }
        return null;
    }

    componentDidMount() {
        if (!this.state.initialized && this.state.initialValues && Object.keys(this.state.initialValues).length) {
            this.setState({
                initialized: true,
            }, () => this.onGettingInitialValues(this.state.initialValues))
        }
        if (!this.state.synchronized && this.state.syncValues && Object.keys(this.state.syncValues).length) {
            this.setState({
                synchronized: true,
            }, () => this.onGettingSyncValues(this.state.syncValues))
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.initialized && this.state.initialValues && Object.keys(this.state.initialValues).length) {
            this.setState({
                initialized: true,
            }, () => this.onGettingInitialValues(this.state.initialValues))
        }
        if (!this.state.synchronized && this.state.syncValues && Object.keys(this.state.syncValues).length) {
            this.setState({
                synchronized: true,
            }, () => this.onGettingSyncValues(this.state.syncValues))
        }
    }

    sendError(action) {
        console.error(`${action} for ${this.props.name} is not passed`);
    }

    change(field, value) {
        if (this.props.change) {
            this.props.change(this.getFullName(field), value);
        } else {
            this.sendError('change');
        }
    }

    blur(field, value) {
        if (this.props.blur) {
            this.props.blur(this.getFullName(field), value);
        } else {
            this.sendError('blur');
        }
    }

    touch(field, value) {
        if (this.props.touch) {
            this.props.touch(this.getFullName(field), value);
        } else {
            this.sendError('touch');
        }
    }

    untouch(field, value) {
        if (this.props.untouch) {
            this.props.untouch(this.getFullName(field), value);
        } else {
            this.sendError('untouch');
        }
    }

    render() {
        return <FormSection name={this.props.name}>
            {this.renderBody()}
        </FormSection>
    }

    renderBody() {
        return null;
    }
}

export default ComplexComponent;