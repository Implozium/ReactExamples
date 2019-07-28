import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';

import { FilteredList } from '../FilteredList';
import './style.css';

// const useStyles = theme => ({
//     head: {
//         display: 'flex',
//         flexDirection: 'row',
//     },
//     header: {

//     }
// });

const DataTableContext = React.createContext({});

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reinit: true,
            originData: props.data,
            filters: {},
            context: {},
            sorter: null,
        }

        this.applyFilter = this.applyFilter.bind(this);
        this.registerFilterComponent = this.registerFilterComponent.bind(this);
        this.registerSorterComponent = this.registerSorterComponent.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.applySorter = this.applySorter.bind(this);
        this.toPage = this.toPage.bind(this);

        this.state.context = {
            data: props.data,
            applyFilter: this.applyFilter,
            registerFilterComponent: this.registerFilterComponent,
            registerSorterComponent: this.registerSorterComponent,
            resetFilter: this.resetFilter,
            resetFilters: this.resetFilters,
            applySorter: this.applySorter,
            toPage: this.toPage,
            rowData: [],
            from: 0,
            to: props.pagination ? props.pagination : Number.MAX_SAFE_INTEGER,
            pagination: props.pagination,
        };

        this.filterComponents = {};
        this.sorterComponents = {};
    }

    applySorter(sorter) {
        Object.keys(this.sorterComponents)
            .filter(key => this.sorterComponents[key])
            .forEach(key => this.sorterComponents[key].reset(sorter));
        this.setState({
            reinit: true,
            sorter: sorter,
        });
    }

    applyFilter(name, values) {
        this.setState({
            reinit: true,
            filters: {
                ...this.state.filters,
                [name]: values,
            },
        });

        if (this.props.pagination) {
            this.toPage(0);
        }
    }

    toPage(number) {
        const {
            pagination,
        } = this.props;

        if (!pagination) {
            return;
        }

        const countOfPages = Math.ceil(this.state.context.rowData.length / pagination);
        //const filteredCountOfPages = Math.ceil(this.state.context.rowData.filter(row => row.isFiltered).length / pagination);

        if (number < 0) {
            number = 0;
        } else if (number >= countOfPages - 1) {
            number = countOfPages - 1;
        }

        this.setState({
            context: {
                ...this.state.context,
                from: number * pagination,
                to: number * pagination + pagination,
            }
        });
    }

    registerFilterComponent(name, aFilterComponent) {
        this.filterComponents[name] = aFilterComponent;
    }

    registerSorterComponent(name, aSorterComponent) {
        this.sorterComponents[name] = aSorterComponent;
    }

    resetFilter(name) {
        if (this.filterComponents[name]) {
            this.filterComponents[name].reset();
            this.applyFilter(name, []);
        }
    }

    resetFilters() {
        Object.keys(this.filterComponents)
            .filter(key => this.filterComponents[key])
            .forEach(key => this.filterComponents[key].reset());
        this.setState({
            reinit: true,
            filters: {},
        });
    }

    isPassedFilters(obj) {
        return Object.keys(this.state.filters)
            .every((key) => {
                const filter = this.state.filters[key];
                if (filter && filter.length) {
                    return filter.includes(String(obj[key] === 0 ? 0 : (obj[key]|| '')));
                }
                return true;
            });
    }

    applySettings(data) {
        let filteredI = 0;
        return data.concat([])
            .sort((a, b) => this.state.sorter ? this.state.sorter(a, b) : 0)
            .map((obj, i) => {
                const passed = this.isPassedFilters(obj);
                return {
                    i: i,
                    obj: obj,
                    isFiltered: passed,
                    filteredI: passed ? filteredI++ : filteredI,
                };
            });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data !== state.originData) {
            console.log('render 1');
            return {
                originData: props.data,
                reinit: true,
            };
        }
        return null;
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextState.reinit);
    //     if (this.state.reinit === false && nextState.reinit) {
    //         return false;
    //     }
    //     return true;
    // }

    componentDidUpdate() {
        // console.log('render 2');
        if (this.state.reinit) {
            // console.log('render 2');
            const {
                map = (v) => v,
            } = this.props;
            const mappedData = this.state.originData.map(map);
            this.setState({
                reinit: false,
                context: {
                    ...this.state.context,
                    data: mappedData,
                    rowData: this.applySettings(mappedData),
                }
            });
        }
    }

    render() {
        const {
            children,
            className = '',
        } = this.props;

        return <DataTableContext.Provider value={this.state.context}>
            <div className={className}>
                {children}
            </div>
        </DataTableContext.Provider>
    }
}

class Head extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            children,
            className = '',
        } = this.props;

        return <div className={className}>
            {children}
        </div>
    }
}

//Head = withStyles(useStyles)(Head);

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], // this.context.data,
            filterArr: [], // this.props.filter ? this.extractValuesByKey(this.context.data, this.props.name) : [],
        };

        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.registerFilter = this.registerFilter.bind(this);
    }

    registerFilter(aFilterComponent) {
        this.context.registerFilterComponent(this.props.name, aFilterComponent);
    }

    onChangeFilter(name, values) {
        this.context.applyFilter(name, values);
    }

    extractValuesByKey(data, key) {
        return data.map(obj => obj[key]);
    }

    componentDidUpdate() {
        if (this.context.data !== this.state.data) {
            this.setState({
                data: this.context.data,
                filterArr: this.extractValuesByKey(this.context.data, this.props.name),
            });
        }
    }

    render() {
        const {
            name,
            className = '',
        } = this.props;

        return <div className={'adaptive-table__filter ' + className}>
            <FilteredList data={this.state.filterArr} name={name} onChange={this.onChangeFilter} onRef={this.registerFilter}></FilteredList>
        </div>
    }
}
Filter.contextType = DataTableContext;

class Sorter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortType: this.props.sort || '',
            ascSorter: this.props.sorter,
            descSorter: (a, b) => -this.props.sorter(a, b),
        };

        this.onClickSort = this.onClickSort.bind(this);
    }

    onClickSort() {
        this.setState({
            sortType: this.state.sortType === 'desc' ? 'asc' : 'desc',
        });
        this.context.applySorter(this.state.sortType === 'desc' ? this.state.descSorter : this.state.ascSorter);
    }

    componentDidMount() {
        if (this.context.registerSorterComponent) {
            this.context.registerSorterComponent(this.props.name, this);
        }
    }

    componentWillUnmount() {
        if (this.context.registerSorterComponent) {
            this.context.registerSorterComponent(this.props.name, undefined);
        }
    }

    reset(newSorter) {
        console.log(newSorter);
        if (newSorter !== this.state.ascSorter && newSorter !== this.state.descSorter)
        this.setState({
            sortType: '',
        });
    }

    render() {
        const {
            name,
            className = '',
            sorter,
            children,
        } = this.props;

        const {
            sortType,
        } = this.state;

        return <span className={'adaptive-table__header-sorter' + (sortType ? ' adaptive-table__header-sorter_' + sortType : '') + ' ' + className} onClick={this.onClickSort}>{children}</span>
    }
}
Sorter.contextType = DataTableContext;

class Paginator extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            className = '',
            pagesFrom = 2,
            pagesAround = 1,
            pagesTo = 2,
            filtered = false,
        } = this.props;

        const {
            pagination,
            from,
            to,
            rowData,
            toPage,
        } = this.context;

        if (!pagination) {
            return null;
        }

        const count = filtered ? rowData.filter(row => row.isFiltered).length : rowData.length;

        const countOfPages = Math.ceil(count / pagination);
        const currentPage = from / pagination;

        let pages = Array.from({length: countOfPages}, (v, i) => {
            if (i <= pagesFrom - 1) {
                return i + 1;
            }
            if (currentPage - pagesAround <= i && i <= currentPage + pagesAround) {
                return i + 1;
            }
            if (i >= countOfPages - pagesTo) {
                return i + 1;
            }
            return false;
        });

        if (pages[pagesFrom] === false) {
            pages[pagesFrom] = '...';
        }

        if (pages[countOfPages - pagesTo - 1] === false && pages[countOfPages - pagesTo - 2] !== '...' && currentPage < countOfPages - pagesTo - 1) {
            pages[countOfPages - pagesTo - 1] = '...';
        }

        return <div className={'adaptive-table__paginator' + ' ' + className}>
            {pages.filter(Boolean).map((aPage, i) => {
                if (aPage === '...') {
                    return <span key={i} className={'adaptive-table__paginator-item'}>{aPage}</span>
                }
                return <span key={i} className={'adaptive-table__paginator-item adaptive-table__paginator-item_page' + (aPage === currentPage + 1 ? ' adaptive-table__paginator-item_active' : '')} onClick={() => toPage(aPage - 1)}>{aPage}</span>
            })}
        </div>;
    }
}
Paginator.contextType = DataTableContext;

class Next extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            className = '',
            children,
            filtered = false,
        } = this.props;

        const {
            pagination,
            from,
            to,
            rowData,
            toPage,
        } = this.context;

        if (!pagination) {
            return null;
        }

        const count = filtered ? rowData.filter(row => row.isFiltered).length : rowData.length;

        const countOfPages = Math.ceil(count / pagination);
        const currentPage = from / pagination;

        return <div className={'adaptive-table__next' + (currentPage >= countOfPages - 1 ? ' adaptive-table__next_disabled' : '') + ' ' + className} onClick={() => currentPage < countOfPages - 1 && toPage(currentPage + 1)}>
            {children}
        </div>;
    }
}
Next.contextType = DataTableContext;

class Prev extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            className = '',
            children,
            filtered = false,
        } = this.props;

        const {
            pagination,
            from,
            to,
            rowData,
            toPage,
        } = this.context;

        if (!pagination) {
            return null;
        }

        const count = filtered ? rowData.filter(row => row.isFiltered).length : rowData.length;

        const countOfPages = Math.ceil(count / pagination);
        const currentPage = from / pagination;

        return <div className={'adaptive-table__next' + (currentPage < 1 ? ' adaptive-table__next_disabled' : '') + ' ' + className} onClick={() => currentPage > 0 && toPage(currentPage - 1)}>
            {children}
        </div>;
    }
}
Prev.contextType = DataTableContext;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], // this.context.data,
            isOpenedFilter: false,
        };
        
        this.headerElement = React.createRef();
        this.onClickFilter = this.onClickFilter.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
    }

    toggleFilter(e) {
        if (this.headerElement.current) {
            if (this.state.isOpenedFilter && !this.headerElement.current.contains(e.target)) {
                this.setState({
                    isOpenedFilter: false,
                });
            }
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.toggleFilter);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.toggleFilter);
    }

    componentDidUpdate() {
        if (this.context.data !== this.state.data) {
            if (this.props.filter) {
                this.setState({
                    data: this.context.data,
                });
            }
        }
    }

    onClickFilter() {
        this.setState({
            isOpenedFilter: !this.state.isOpenedFilter,
        });
    }

    render() {
        const {
            children,
            name,
            filter,
            sorter,
            sort,
            className = '',
        } = this.props;

        const {
            isOpenedFilter,
        } = this.state;

        return <div className={'adaptive-table__header' + ' ' + className} ref={this.headerElement}>
            <div className={'adaptive-table__header-title'}>
                {children}
            </div>
            <div className={'adaptive-table__header-options'}>
                {filter
                    && <span className={'adaptive-table__header-filter'} onClick={this.onClickFilter}></span>}
                {sorter
                    && <Sorter sorter={sorter} sort={sort} name={name}/>}
            </div>
            {filter
                && <div className={'adaptive-table__header-filter-body'} hidden={!isOpenedFilter}>
                    <Filter name={name}/>
                </div>}
        </div>
    }
}

class Body extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.context.rowData);
        const {
            className = '',
            renderRow,
        } = this.props;

        return <div className={className}>
            {this.context.rowData.map((row) => renderRow(row, {from: this.context.from, to: this.context.to}))}
        </div>
    }
}
Body.contextType = DataTableContext;

class Counter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            render,
        } = this.props;

        const length = this.context.rowData.length;
        const filteredLength = this.context.rowData.filter(row => row.isFiltered).length;

        return render(length, filteredLength)
    }
}
Counter.contextType = DataTableContext;

class ResetFilter extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.context.resetFilter(this.props.name);
    }

    render() {
        const {
            name,
            children,
            className = '',
        } = this.props;

        return <div className={className} onClick={this.onClick}>
            {children}
        </div>
    }
}
ResetFilter.contextType = DataTableContext;

class ResetFilters extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.context.resetFilters();
    }

    render() {
        const {
            name,
            children,
            className = '',
        } = this.props;

        return <div className={className} onClick={this.onClick}>
            {children}
        </div>
    }
}
ResetFilters.contextType = DataTableContext;

export default {
    Table,
    Head,
    Body,
    Header,
    Filter,
    ResetFilter,
    ResetFilters,
    Sorter,
    Counter,
    Paginator,
    Next,
    Prev,
}