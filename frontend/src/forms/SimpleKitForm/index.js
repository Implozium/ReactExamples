import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, FormSection, reduxForm, getFormValues } from 'redux-form';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';

import { TextField, RadioGroup, Checkbox, Button, Header, Select } from '../../components';
import { Address } from '../../components/complex';
import ComplexComponent from '../../components/complex/ComplexComponent';
import { getFieldProps, updateFieldProps, initFieldProps, setFieldProps } from '../../common/fields-manager';
import Rules from '../../common/Rules';

class KitForm extends Component {
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
                <Header type={'big'}>Simple kit form</Header>
                <hr/>
                <Grid container>
                    <Header type={'medium'}>Headers:</Header>
                    <Header type={'big'}>Big Header</Header>
                    <Header type={'medium'}>Medium Header</Header>
                    <Header type={'small'}>Small Header</Header>
                </Grid>
                <hr/>
                <Grid container>
                    <Header type={'medium'}>TextFields:</Header>
                    <Grid item xs={12}>
                        <Field
                            name="text"
                            component={TextField}
                            label="Text Field"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="textDis"
                            component={TextField}
                            label="Text Field disabled"
                            disabled={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="textMask"
                            component={TextField}
                            label="Text Field with mask (only 6 lat symbols)"
                            mask={{
                                mask: 'BBBBBB',
                                maskChar: '',
                                alwaysShowMask: false,
                                formatChars: {
                                    'B': '[a-zA-Z]',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="textTooltip"
                            component={TextField}
                            label="Text Field with tooltip"
                            tooltip={'Tooltip'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="textError"
                            component={TextField}
                            label="Text Field with error"
                            validate={[Rules.required()]}
                        />
                    </Grid>
                </Grid>
                <hr/>
                <Grid container>
                    <Header type={'medium'}>Checkboxes:</Header>
                    <Grid item xs={12}>
                        <Field
                            name="checkbox"
                            component={Checkbox}
                            label="Checkbox"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="checkboxDis"
                            component={Checkbox}
                            label="Checkbox disabled"
                            disabled={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="checkboxTooltip"
                            component={Checkbox}
                            label="Checkbox with tooltip (make it)"
                            tooltip={'Tooltip'}
                        />
                    </Grid>
                </Grid>
                <hr/>
                <Grid container>
                    <Header type={'medium'}>RadioGroups:</Header>
                    <Grid item xs={12}>
                        <Field
                            name="radioGroup"
                            component={RadioGroup}
                            label="RadioGroup"
                            options={[{label: 'yes', value: 'true'}, {label: 'no', value: 'false'}]}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="radioGroupDis"
                            component={RadioGroup}
                            label="RadioGroup disabled"
                            options={[{label: 'yes', value: 'true'}, {label: 'no', value: 'false', disabled: true}]}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="radioGroupTooltip"
                            component={RadioGroup}
                            label="RadioGroup with tooltip (make it)"
                            options={[{label: 'yes', value: 'true'}, {label: 'no', value: 'false'}]}
                            tooltip={'Tooltip'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="radioGroupError"
                            component={RadioGroup}
                            label="RadioGroup with error"
                            options={[{label: 'yes', value: 'true'}, {label: 'no', value: 'false'}]}
                            validate={[Rules.required()]}
                        />
                    </Grid>
                </Grid>
                <hr/>
                <Grid container>
                    <Header type={'medium'}>Select:</Header>
                    <Grid item xs={12}>
                        <Field
                            name="select"
                            component={Select}
                            label="Select"
                            options={[{label: '1', value: '1'}, {label: '2', value: '2'}]}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="selectDis"
                            component={Select}
                            label="Select disabled"
                            options={[{label: '1', value: '1'}, {label: '2', value: '2', disabled: true}]}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="selectTooltip"
                            component={Select}
                            label="Select Field with tooltip"
                            options={[{label: '1', value: '1'}, {label: '2', value: '2'}]}
                            tooltip={'Tooltip'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="selectError"
                            component={Select}
                            label="Select Field with error"
                            options={[{label: '1', value: '1'}, {label: '2', value: '2'}]}
                            validate={[Rules.required()]}
                        />
                    </Grid>
                </Grid>
                <hr/>
                <Grid container>
                    <Header type={'medium'}>Buttons:</Header>
                    <Button color={'link'}>Link button</Button>
                    <Button color={'primary'}>Primary button</Button>
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

const initialValues = {};

export default connect((store) => {
    return {
        formValues: getFormValues('simplekit')(store) || {},
        initialValues: initialValues,
    };
}
)(reduxForm({
    form: 'simplekit',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate: (values) => {
        const errors = {};
        return errors;
    },
})(KitForm));
