import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, FormSection, reduxForm, getFormValues } from 'redux-form';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';

import { TextField, RadioGroup, Checkbox, Button, Header } from '../../components';
import { Address } from '../../components/complex';
import { getFieldProps, updateFieldProps, initFieldProps, setFieldProps } from '../../common/fields-manager';
import Rules from '../../common/Rules';

class ExampleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
        };
    }

    componentDidMount() {
    }

    submit(values) {
        console.log(values);
    }

    render() {
        const {
            handleSubmit,
            change,
            initialValues,
        } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Header type={'big'}>Complex kit form</Header>
                <hr/>
                <Grid container>
                    <Header type={'medium'}>Addresses:</Header>
                    <Grid item xs={12}>
                        <Address
                            name="address"
                            change={change}
                            initialValues={initialValues && initialValues["address"] || {}}
                        />
                    </Grid>
                </Grid>
                <hr/>
                <div>
                    <Button type="submit" color={'link'}>Submit</Button>
                </div>
                <pre>
                    {JSON.stringify(this.props.initialValues, null, 4)}
                </pre>
                <pre>
                    {JSON.stringify(this.props.formValues, null, 4)}
                </pre>
            </form>
        );
    }
}

const initialValues = {
};

export default connect((store) => {
    return {
        formValues: getFormValues('complexkit')(store) || {},
        initialValues: initialValues,
    };
}
)(reduxForm({
    form: 'complexkit',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate: (values) => {
        const errors = {};
        return errors;
    },
})(ExampleForm));
