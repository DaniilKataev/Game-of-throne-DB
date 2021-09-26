import React, {Component} from 'react';
import GotService from '../../services/script';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {
    gotService = new GotService();

    state = {
        selectedHouse: null, 
        error: false
    }

    componentDidCatch() {
        this.setState({error: true});
    }

    onItemSelected = (id) => {
        this.setState({selectedHouse: id})
    }
   
    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (  
            <ItemList 
                getData={this.gotService.getAllHouses}
                onItemSelected={this.onItemSelected}
                renderItem={({name}) => `${name}`}/>
        );

        const houseDetails = (
            <ItemDetails 
                itemID={this.state.selectedHouse}
                getData={this.gotService.getHouse}>
                <Field field="region" label='Region'/>
                <Field field="words" label='Words'/>
                <Field field="titles" label='Titles'/>
                <Field field="overlord" label='Overlord'/>
                <Field field="ancestralWeapons" label='Ancestral Weapons'/>
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={houseDetails}/>
        )
    }
}