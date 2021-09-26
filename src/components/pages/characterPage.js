import React, {Component} from 'react';
import GotService from '../../services/script';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';


export default class CharacterPage extends Component {
    gotService = new GotService();

    state = {
        selectedChar: null, 
        error: false
    }

    componentDidCatch() {
        this.setState({error: true});
    }

    onItemSelected = (id) => {
        this.setState({selectedChar: id})
    }
   
    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (  
            <ItemList 
                getData={this.gotService.getAllCharacters}
                onItemSelected={this.onItemSelected}
                renderItem={({name, gender}) => `${name} (${gender})`}/>
        );

        const charDetails = (
            <ItemDetails 
                itemID={this.state.selectedChar}
                getData={this.gotService.getCharacter}>
                <Field field="gender" label='Gender'/>
                <Field field="born" label='Born'/>
                <Field field="died" label='Died'/>
                <Field field="culture" label='Culture'/>
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}

