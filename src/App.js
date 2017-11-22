import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import FixMenu from './fix-menu'
import Footer from './footer'
import MovieList from './movie-list'
import {Container, Input} from 'semantic-ui-react'
import Logo from './movie.png'


const language = 'en-US';
const api_key = '09e4cc13c99312bf18cad8339e83bc82';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      movies:[],
      page: 1,
      isLoading: true
    }
  }

  async LoadMovie(page){
    const now_playing_uri = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=${language}&page=${this.state.page}`;

    let result = await fetch(now_playing_uri);
    let data = await result.json();

    this.setState({
      isLoading: true
    })

    return data.results;
  }

  async componentDidMount(){
    let movies = await this.LoadMovie(this.state.page);
    this.setState({
      movies: movies,
      isLoading: false
    })
  }

  render() {
    
    return (
      <div>
        <FixMenu logo={Logo}/>
        <Container style={{ marginTop: '7em' }}>
          <Input icon='search' placeholder='Search...' className='search-box' fluid='true'/>
          <MovieList movies={this.state.movies}/>
        </Container>
        <Footer logo={Logo}/>
      </div>
    );
  }
}

export default App;
