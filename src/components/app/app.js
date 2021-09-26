import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './app.css';


export default class App extends Component {
    state = {
        showRandomChar: false,
        error: false
    }

    componentDidCatch() {
        console.log('Error');
        this.setState({error: true});
    }

    onToogleRandomChar = () => {
        this.setState({showRandomChar: !this.state.showRandomChar});
    }
    
    onItemSelected = (id) => {
        this.setState({selectedChar: id})
    }

    render() {
        const randomCharacter = !this.state.showRandomChar? <RandomChar />: null;

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <Router> 
                <div className="app" >
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {randomCharacter}
                                <Button onClick={this.onToogleRandomChar} color="primary">Toggle random chracter</Button>
                            </Col>
                        </Row>

                        <Switch>
                            <Route path="/characters" exact component={CharacterPage}/>
                            <Route path="/houses" exact component={HousesPage}/>
                            <Route path="/books" exact component={BooksPage}/>
                            <Route path="/books/:id" render={
                                ({match}) => {
                                    const {id} = match.params;
                                    return <BooksItem bookId={id}/>
                                }
                            }/>
                        </Switch>
                        
                    </Container>
                </div>
                
            </Router>
        );
    }
};

