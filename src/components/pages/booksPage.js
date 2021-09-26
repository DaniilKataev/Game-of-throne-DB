import React, {Component} from 'react';
import GotService from '../../services/script';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import {withRouter} from 'react-router-dom';


class BooksPage extends Component {
    gotService = new GotService();

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({error: true});
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <ItemList 
                getData={this.gotService.getAllBooks}
                onItemSelected={(itemID) => {
                    this.props.history.push(itemID);
                }}
                renderItem={({name}) => `${name}`}/>
        )
    }
}

export default withRouter(BooksPage);