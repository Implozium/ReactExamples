import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, FormSection, reduxForm, getFormValues } from 'redux-form';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';

import { TextField, RadioGroup, Checkbox, Button, Header } from '../../components';
import { Address } from '../../components/complex';
import ComplexComponent from '../../components/complex/ComplexComponent';
import { getFieldProps, updateFieldProps, initFieldProps, setFieldProps } from '../../common/fields-manager';
import Rules from '../../common/Rules';

class AddressBlock extends ComplexComponent {
    constructor(props) {
        super(props);
        this.state['defaultSyncValues'] = {};
        this.state['isSync'] = false;
        initFieldProps(this.state, 'isSync', {
            onChange: (event, newValue, previousValue, name) => {
                if (newValue === 'true') {
                    const { name, syncValues, change } = this.props;
                    /*this.setState(updateFieldProps('address', {
                        syncValues: this.props.syncValues,
                    }));*/
                    this.setState({
                        'isSync': true,
                    });
                    change(name, {...syncValues, isSync: 'true'});
                } else {
                    /*this.setState(updateFieldProps('address', {
                        syncValues: {},
                    }));*/
                    this.setState({
                        'isSync': false,
                    });
                }
            },
            validate: [Rules.required()],
        });
    }

    onGettingSyncValues(syncValues) {
        const { name, /*syncValues,*/ change } = this.props;
        if (this.state.isSync) {
            change(name, {...syncValues, isSync: 'true'});
        }
    }

    render() {
        const { name, change, syncValues, values } = this.props;
        return (
            <div>
                <Address
                    {...getFieldProps(this.state, 'address')}
                    name={`${name}`}
                    change={change}
                    syncValues={this.state.isSync ? syncValues : this.state.defaultSyncValues}
                />
                <Field
                    {...getFieldProps(this.state, 'isSync')}
                    name={`${name}.isSync`}
                    component={RadioGroup}
                    label="Sync"
                    options={[{label: 'yes', value: 'true'}, {label: 'no', value: 'false'}]}
                />
            </div>
        );
    }
}

class Addresses extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { fields, change, syncValues, values } = this.props;
        return (
        <div>
            {fields.map((address, i) => (
                <div key={i}>
                    <AddressBlock
                        name={`${address}`}
                        change={change}
                        syncValues={syncValues}
                    />
                    <Button color={'link'} onClick={() => fields.remove(i)}>Remove</Button>
                    <hr/>
                </div>
            ))}
            <div>
                <Button onClick={() => fields.push({})}>
                Add Address
                </Button>
            </div>
        </div>
        );
    }
}

class ExampleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
        };
        initFieldProps(this.state, 'isDuplicated', {
            onChange: (event, newValue, previousValue) => {
                const field = getFieldProps(this.state, 'clearLastName');
                if (newValue === 'true') {
                    const { formValues, change } = this.props;
                    change('clearLastName', (formValues['lastName'] || '').split('').join(' '));
                    field.disabled = true;
                } else {
                    field.disabled = false;
                }
                this.setState(updateFieldProps('clearLastName', field));
            },
            validate: [],
        });
        initFieldProps(this.state, 'lastName', {
            onChange: (event, newValue, previousValue) => {
                const { formValues, change } = this.props;
                if (formValues['isDuplicated'] === 'true') {
                    change('clearLastName', (newValue || '').split('').join(' '));
                }
            },
            validate: [Rules.required()],
        });
        initFieldProps(this.state, 'isSync', {
            onChange: (event, newValue, previousValue) => {
                if (newValue === 'true') {
                    const { formValues, change } = this.props;
                    change('secondAddress', formValues['firstAddress'] || {});
                    this.setState(updateFieldProps('secondAddress', {
                        syncValues: formValues['firstAddress'],
                    }));
                }
            },
            validate: [],
        });
        initFieldProps(this.state, 'firstAddress', {
            onChange: (name, value) => {
                const { formValues, change } = this.props;
                if (formValues['isSync'] === 'true') {
                    change('secondAddress', formValues['firstAddress'] || {});
                    this.setState(updateFieldProps('secondAddress', {
                        syncValues: formValues['firstAddress'],
                    }));
                }
                this.setState(updateFieldProps('addresses', {
                    syncValues: formValues['firstAddress'],
                }));
            },
        });
        initFieldProps(this.state, 'secondAddress', {
            syncValues: {},
        });
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
                <Header type={'big'}>Example form</Header>
                <Grid container>
                    <Grid item xs={6}>
                        <Field
                            name="firstName"
                            component={TextField}
                            label="First Name"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            {...getFieldProps(this.state, 'lastName')}
                            name="lastName"
                            component={TextField}
                            label="Last Name"
                            mask={{
                                mask: 'BBB BB BB',
                                maskChar: '',
                                alwaysShowMask: false,
                                formatChars: {
                                    'B': '[a-zA-Z]',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="display"
                            component={Checkbox}
                            label="Display"
                        />
                    </Grid>
                </Grid>
                <Field
                    {...getFieldProps(this.state, 'isDuplicated')}
                    name="isDuplicated"
                    component={RadioGroup}
                    label="Duplicated"
                    options={[{label: 'yes', value: 'true'}, {label: 'no', value: 'false'}]}
                />
                <Field
                    {...getFieldProps(this.state, 'clearLastName')}
                    name="clearLastName"
                    component={TextField}
                    label="Clear Last Name"
                    tooltip={'Hello'}
                />
                <hr/>
                <Address
                    {...getFieldProps(this.state, 'firstAddress')}
                    name="firstAddress"
                    change={change}
                    initialValues={initialValues && initialValues["firstAddress"] || {}}
                />
                <hr/>
                <Field
                    {...getFieldProps(this.state, 'isSync')}
                    name="isSync"
                    component={RadioGroup}
                    label="Sync"
                    options={[{label: 'yes', value: 'true'}, {label: 'no', value: 'false'}]}
                />
                <hr/>
                <Address
                    {...getFieldProps(this.state, 'secondAddress')}
                    name="secondAddress"
                    change={change}
                    initialValues={initialValues && initialValues["secondAddress"] || {}}
                />
                <hr/>
                <hr/>
                <hr/>
                <FieldArray
                    {...getFieldProps(this.state, 'addresses')}
                    name={'addresses'}
                    component={Addresses}
                    change={change}
                />
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
    lastName: 'One',
    secondAddress: {
        street: '1',
        building: '1.2',
        zipCode: '1234',
    },
};

export default connect((store) => {
    return {
        formValues: getFormValues('example')(store) || {},
        initialValues: initialValues,
    };
}
)(reduxForm({
    form: 'example',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate: (values) => {
        const errors = {};
        return errors;
    },
})(ExampleForm));
