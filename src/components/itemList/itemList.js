import React, {Component} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './itemList.css';
export default class ItemList extends Component {
    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState(({itemList}));
            })
    }
    
    componentDidCatch() {
        this.setState(({error: true}));
    }

    renderItems(arr) {
        return arr.map((item) => {
            const label = this.props.renderItem(item);
            return (
                <li 
                    key={item.url}
                    onClick={() => this.props.onItemSelected(item.url)}
                    className="list-group-item">
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList, error} = this.state;

        if (!itemList) {
            return <Spinner />
        }

        if (error) {
            return <ErrorMessage />
        }

        const items = this.renderItems(itemList);
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}