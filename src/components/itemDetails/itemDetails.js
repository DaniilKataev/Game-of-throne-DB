import React, {Component} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
};

export default class ItemDetails extends Component {
    state = {
        item: null, 
        loading: false,
        noSelected: true, 
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemID !== prevProps.itemID) {
            this.updateItem();
        }
    }

    onItemLoaded = (item) => {
        this.setState({item, noSelected: false, loading: false});
    }

    updateItem() {
        const {itemID, getData} = this.props;
        if (!itemID) {
            return;
        }
        this.setState({loading: true, noSelected: false});

        getData(itemID)
            .then(this.onItemLoaded);
            
    }
    
    render() {
        
        if (this.state.noSelected) {
            return <span className='select-error'>Please, select character</span>
        }
        const {item, loading, error} = this.state;
    
        const spinner = loading? <Spinner/> : null;
        const errorMessage = error? <ErrorMessage/> : null;
        let content = null;

        if (!(loading || error)) {
            const {name} = item;
            content = (
                <>
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, child => {
                                return React.cloneElement(child, {item})
                            })
                        }
                    </ul>
                </>
            )
        } 

        return (
            <div className="char-details rounded">
                {spinner}
                {errorMessage}
                {content}
            </div>
        );
    }
}

