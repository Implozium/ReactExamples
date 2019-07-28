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
import AdaptiveTable from '../../components/AdaptiveTable';
import {
    FilteredList,
} from '../../components/FilteredList';
import {
    Spoiler,
} from '../../components/Spoiler';

import './style.css';

function makeDocumentItem(i) {
    const types = ['Order', 'Bill', 'Pay', 'Notify', 'Etc'];
    const exts = ['svg', 'txt', 'doc', 'docx', 'xml', 'css'];
    const names = ['file', 'photo', 'table', 'document', 'task', 'order'];
    const sizes = [10, 100, 1000, 10000, 10000, 100000];
    const joineds = ['John', 'Jack', '', 'Jill', 'Mark', 'Terry'];
    const random = {
        documentId: i,
        type: types[Math.floor(Math.random() * types.length)],
        name: names[Math.floor(Math.random() * names.length)],
        ext: exts[Math.floor(Math.random() * exts.length)],
        size: sizes[Math.floor(Math.random() * sizes.length)],
        joined: joineds[Math.floor(Math.random() * joineds.length)]
    }
    random.name = random.name + '.' + random.ext;
    return random;
}

class KitForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            filteredListData: ['One', 'Two', 'Two', 'Three', '4', '5'],
            tableData: Array.from({length: 100}, (v, i) => makeDocumentItem(i))
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                tableData: this.state.tableData.concat(makeDocumentItem(this.state.tableData.length)),
            });
        }, 10000);
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
                    <Grid item xs={6}>
                        <Header type={'medium'}>Spoiler 1</Header>
                        <Spoiler title={'Spoiler'}>
                            Spoiler data
                        </Spoiler>
                    </Grid>
                    <Grid item xs={6}>
                        <Header type={'medium'}>Spoiler 2</Header>
                        <Spoiler title={'Spoiler'} type={'over'}>
                            <ul>
                                <li>Spoiler data 1</li>
                                <li>Spoiler data 2</li>
                                <li>Spoiler data 3</li>
                            </ul>
                        </Spoiler>
                    </Grid>
                    <Grid item xs={12}>
                        <Header type={'medium'}>Filtered List</Header>
                        <FilteredList
                            data={this.state.filteredListData}
                            name={"example-filter"}
                            onChange={(name, checkeds) => console.log('checkeds for', name, checkeds)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Header type={'medium'}>Adaptive Table</Header>
                        <AdaptiveTable.Table
                            data={this.state.tableData}
                            pagination={10}
                        >
                            <AdaptiveTable.Head
                                className={'adaptive-table__head'}
                            >
                                <AdaptiveTable.Header
                                    name={''}
                                >
                                    Order
                                </AdaptiveTable.Header>
                                <AdaptiveTable.Header
                                    name={'type'}
                                    filter={true}
                                    sorter={(a, b) => a.type.localeCompare(b.type)}
                                >
                                    type and for
                                </AdaptiveTable.Header>
                                <AdaptiveTable.Header
                                    name={'ext'}
                                    filter={true}
                                >
                                    name
                                </AdaptiveTable.Header>
                                <AdaptiveTable.Header
                                    name={'size'}
                                    filter={true}
                                    sorter={(a, b) => a.size - b.size}
                                >
                                    size
                                </AdaptiveTable.Header>
                            </AdaptiveTable.Head>
                            <AdaptiveTable.Body
                                renderRow={
                                    ({ obj, i, isFiltered, filteredI }, { from, to }) => {
                                        if (i < from || i >= to) {
                                            return null;
                                        }
                                        return <div key={obj.documentId} className={'adaptive-table__row ' + (!isFiltered ? 'adaptive-table__row_unfiltered' : '')}>
                                            <div className={'adaptive-table__item'}>{i + 1}({filteredI + 1})</div>
                                            <div className={'adaptive-table__item'}>{obj.type} <i>{obj.joined && ('(' + obj.joined + ')')}</i></div>
                                            <div className={'adaptive-table__item'}>{obj.name}</div>
                                            <div className={'adaptive-table__item'}>{obj.size}</div>
                                        </div>
                                    }
                                }
                            />
                            <AdaptiveTable.Counter
                                render={(length, filteredLength) => <div>{filteredLength} from {length}</div>}
                            />
                            <AdaptiveTable.Paginator/>
                            <AdaptiveTable.Paginator filtered={true}/>
                            <AdaptiveTable.Prev>{'<'}</AdaptiveTable.Prev>
                            <AdaptiveTable.Next>{'>'}</AdaptiveTable.Next>
                            <div className="adaptive-table__filters">
                                <AdaptiveTable.Filter name={'joined'}>Filter for joined</AdaptiveTable.Filter>
                            </div>
                            <div className="adaptive-table__filters">
                                <AdaptiveTable.Sorter name={'joined'} sorter={(a, b) => a.joined.localeCompare(b.joined)}>Sorter for joined</AdaptiveTable.Sorter>
                            </div>
                            <AdaptiveTable.ResetFilter name={'type'}>
                                <Button color={'link'}>reset filter type</Button>
                            </AdaptiveTable.ResetFilter>
                            <AdaptiveTable.ResetFilters name={'type'}>
                                <Button color={'primary'}>reset all filters</Button>
                            </AdaptiveTable.ResetFilters>
                        </AdaptiveTable.Table>

                        <Header type={'medium'}>Adaptive Table short</Header>

                        <AdaptiveTable.Table
                            data={this.state.tableData}
                            pagination={10}
                        >
                            <AdaptiveTable.Paginator filtered={true}/>
                            <AdaptiveTable.Counter
                                render={(length, filteredLength) => <div>{filteredLength} from {length}</div>}
                            />
                            <AdaptiveTable.Body
                                className={'adaptive-table__body-flex'}
                                renderRow={
                                    ({ obj, i, isFiltered, filteredI }, { from, to }) => {
                                        if (!isFiltered || filteredI < from || filteredI >= to) {
                                            return null;
                                        }
                                        return <div key={obj.documentId} className={'adaptive-table__body-flex-row ' + (!isFiltered ? 'adaptive-table__body-flex-row_unfiltered' : '')}>
                                            <div className={'adaptive-table__item'}>{i + 1}({filteredI + 1})</div>
                                            <div className={'adaptive-table__item'}>{obj.type} <i>{obj.joined && ('(' + obj.joined + ')')}</i></div>
                                            <div className={'adaptive-table__item'}>{obj.name}</div>
                                            <div className={'adaptive-table__item'}>{obj.size}</div>
                                        </div>
                                    }
                                }
                            />
                            <div className="adaptive-table__filters">
                                <AdaptiveTable.Filter name={'ext'}>Filter for joined</AdaptiveTable.Filter>
                                <AdaptiveTable.Sorter name={'joined'} sorter={(a, b) => a.joined.localeCompare(b.joined)}>Sorter for joined</AdaptiveTable.Sorter>
                            </div>
                        </AdaptiveTable.Table>
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
