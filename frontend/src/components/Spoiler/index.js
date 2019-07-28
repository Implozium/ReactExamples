import React, { Component } from 'react';

import './style.css';

class Spoiler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };

        this.onExpand = this.onExpand.bind(this);
    }

    onExpand() {
        this.setState({
            expanded: !this.state.expanded,
        });
    }

    render() {
        const {
            title = '',
            className = '',
            type = 'in',
            children,
        } = this.props;

        const {
            expanded,
        } = this.state;

        return (
        <div className={'spoiler' + ' ' + className + (expanded ? ' spoiler_expanded' : '') + (type === 'over' ? ' spoiler_over': '')}>
            <div className={'spoiler__title'} onClick={this.onExpand}>
                {title}
            </div>
            <div className={'spoiler__body'}>
                {children}
            </div>
        </div>);
    }
}

export {
    Spoiler
}