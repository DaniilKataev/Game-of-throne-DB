import React, {Component} from 'react';
import GotService from '../../services/script';
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {
    gotService = new GotService();

    render() {
        return(
            <ItemDetails 
                itemID={this.props.bookId}
                getData={this.gotService.getBook}>
                <Field field="numberOfPages" label='Number of Pages'/>
                <Field field="publiser" label='Publiser'/>
                <Field field="released" label='Released'/>
                <Field field="culture" label='Culture'/>
            </ItemDetails>
        )
    }
}