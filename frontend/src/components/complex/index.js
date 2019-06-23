import React, { Fragment, Component } from 'react';
import { Field, Fields, FormSection } from 'redux-form';
import Grid from '@material-ui/core/Grid';

import { TextField, Select } from '../index';
import ComplexComponent from './ComplexComponent';
import { getFieldProps, updateFieldProps, setFieldProps, initFieldProps } from '../../common/fields-manager';
import Rules from '../../common/Rules';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const StreetLoader = {
    loadStreets() {
        return sleep(1000)
            .then(() => {
                return [
                        {label: '', value: ''},
                        {label: '1st street', value: '1'},
                        {label: '2nd street', value: '2'},
                        {label: '3nd street', value: '3'},
                        {label: '4nd street', value: '4'},
                        {label: '5nd street', value: '5'},
                ];
            });
    },

    loadBuildingsByStreetId(id) {
        return sleep(2000)
            .then(() => {
                if (+id < 3) {
                    return [
                            {label: '', value: ''},
                            {label: 'building 1', value: '1'},
                            {label: 'building 1a', value: '1.2'},
                            {label: 'building 1b', value: '1.3'},
                    ];
                } else {
                    return [
                            {label: '', value: ''},
                            {label: 'building 2', value: '2'},
                            {label: 'building 4', value: '4'},
                            {label: 'building 8', value: '8'},
                    ];
                }
        });
    }
}

class Address extends ComplexComponent {

    constructor(props) {
        super(props);
        initFieldProps(this.state, 'street', {
            onChange: (event, newValue, previousValue) => {
                StreetLoader.loadBuildingsByStreetId(newValue)
                    .then((options) => {
                        this.change('building', '');
                        this.change('bti', newValue);
                        this.setState(updateFieldProps('building', {
                            options: options,
                        }));
                    });
                this.onChange('street', newValue);
            },
            options: [],
        });
        initFieldProps(this.state, 'building', {
            onChange: (event, newValue, previousValue) => {
                this.onChange('building', newValue);
            },
            options: [],
        });
        initFieldProps(this.state, 'flat', {
            onChange: (event, newValue, previousValue) => {
                this.onChange('flat', newValue);
                if (newValue) {
                    this.setState(updateFieldProps('zipCode', {
                        validate: [Rules.required()],
                    }));
                } else {
                    this.setState(updateFieldProps('zipCode', {
                        validate: [],
                    }));
                }
            },
        });
        initFieldProps(this.state, 'zipCode', {
            onChange: (event, newValue, previousValue) => {
                this.onChange('zipCode', newValue);
            },
        });
    }

    componentDidMount() {
        super.componentDidMount();
        // load street names
        StreetLoader.loadStreets()
            .then((options) => {
                this.setState(updateFieldProps('street', {
                    options: options,
                }));
            });
    }

    onGettingInitialValues(initialValues) {
        //console.error(initialValues);
        if (initialValues['street']) {
            StreetLoader.loadBuildingsByStreetId(initialValues['street'])
                .then((options) => {
                    this.setState(updateFieldProps('building', {
                        options: options,
                    }));
                });
        }
        if (initialValues['flat']) {
            this.setState(updateFieldProps('zipCode', {
                validate: [(value) => !value ? 'required' : ''],
            }));
        } else {
            this.setState(updateFieldProps('zipCode', {
                validate: [],
            }));
        }
    }

    onGettingSyncValues(syncValues) {
        this.onGettingInitialValues(syncValues);
    }

    renderBody() {
        return <Grid container>
            <Grid item xs={6}>
                <Field
                    {...getFieldProps(this.state, 'street')}
                    name="street"
                    component={Select}
                    label="Street"
                    validate={[Rules.required()]}
                />
            </Grid>
            <Grid item xs={6}>
                <Field
                    {...getFieldProps(this.state, 'building')}
                    name="building"
                    component={Select}
                    label="Building"
                />
            </Grid>
            <Grid item xs={6}>
                <Field
                    {...getFieldProps(this.state, 'flat')}
                    name="flat"
                    component={TextField}
                    label="Flat"
                />
            </Grid>
            <Grid item xs={6}>
                <Field
                    {...getFieldProps(this.state, 'zipCode')}
                    name="zipCode"
                    component={TextField}
                    label="zipCode"
                    format={(value = '', name) => {
                        //console.log('format', value, name);
                        return value.replace(/-/g, '').split('').join('-');
                    }}
                    parse={(value = '', name) => {
                        //console.log('parse', value, name);
                        return value.replace(/-/g, '');
                    }}
                    normalize={(value, previousValue) => {
                        const normValue = value.replace(/-/g, '').slice(0, 9);
                        if (/^[0-9]*$/.test(normValue)) {
                            return normValue.split('').join('-');
                        }
                        return previousValue;
                    }}
                />
            </Grid>
        </Grid>
    }
}

export {
    Address,
};