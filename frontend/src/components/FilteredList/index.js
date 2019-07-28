import React, { Component } from 'react';

import './style.css';

function FilteredListCheckbox(props) {
    const {
        value,
        name,
        checked = false,
        label = '',
        onChange = (e) => {},
    } = props;

    return <label className={'filtered-list__checkbox'}>
        <input type={"checkbox"} value={value} onChange={onChange} checked={checked} name={name} className={'filtered-list__checkbox-input'}/>
        <span></span>
        {label}
    </label>;
}

function FilteredListTextField(props) {
    const {
        value,
        name,
        label = '',
        onChange = (e) => {},
    } = props;

    return <div className={'filtered-list__textfield'}>
        <input type={"text"} value={value} onChange={onChange} name={name || label} className={'filtered-list__textfield-input'}/>
    </div>;
}

function filterData(arr, substr) {
    return substr.length
        ? arr.filter(str => str.toLowerCase().includes(substr.toLowerCase()))
        : arr;
}

class FilteredList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            init: false,
            data: null,
            filter: '',
            uniqueData: [],
            filters: {},
            elements: [],
        };

        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined);
        }
    }

    reset() {
        this.setState({
            filters: {},
            filter: '',
            elements: filterData(this.state.uniqueData, ''),
        });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data !== state.data) {
            const uniqueData = props.data
                .filter(v => v === 0 || Boolean(v))
                .map(String)
                .reduce((arr, str) => {
                    if (!arr.includes(str)) {
                        arr.push(str);
                    }
                    return arr;
                }, []);

            return {
                init: false,
                data: props.data,
                //filters: {},
                uniqueData: uniqueData,
                elements: filterData(uniqueData, state.filter),
            };
        }
        return null;
    }

    onChangeCheckbox(e) {
        const newFilters = {
            ...this.state.filters,
            [e.target.name]: e.target.checked,
        };
        this.setState({
            filters: newFilters,
        });
        this.onChange(newFilters);
    }

    onChangeFilter(e) {
        this.setState({
            filter: e.target.value,
            elements: filterData(this.state.uniqueData, e.target.value),
        });
    }

    onChange(newFilters) {
        const checked = Object.keys(newFilters).filter(key => newFilters[key]);
        if (this.props.onChange) {
            this.props.onChange(this.props.name, checked);
        }
    }

    render() {
        const {
            filters,
            filter,
            elements,
        } = this.state;

        const filterRegExp = new RegExp(filter, 'gi');

        const checkboxes = elements.map((str, i) => {
            return <FilteredListCheckbox
                label={<span dangerouslySetInnerHTML={{__html: filter ? str.replace(filterRegExp, '<b>$&</b>') : str}}/>}
                key={str}
                name={str}
                value={str}
                checked={filters[str]}
                onChange={this.onChangeCheckbox}
            />
        });

        return <div className={'filtered-list'}>
            <FilteredListTextField
                value={this.state.filter}
                onChange={this.onChangeFilter}
            />
            <div className={'filtered-list__checkboxes'}>
                {checkboxes}
            </div>
        </div>
    }
}

export {
    FilteredList
}