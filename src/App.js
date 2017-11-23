import React, {
  Component
} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import FixMenu from './fix-menu'
import Footer from './footer'
import MovieList from './movie-list'
import {
  Container,
  Input,
  Segment,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import Logo from './movie.png'
import InfiniteScroll from './infinite-scroll'

const language = 'en-US';
const api_key = '09e4cc13c99312bf18cad8339e83bc82';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page: 1,
      isLoading: false,
      hasMore: true,
      isSearching: false,
      keyword: ''
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async LoadMovie(page) {
    this.setState({
      isLoading: true
    })

    const now_playing_uri = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=${language}&page=${page}`;
    const search_uri = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=${language}&query=${this.state.keyword}&page=${page}&include_adult=false`;

    let uri;

    console.log("IsSearching: " + this.state.isSearching);

    if (this.state.isSearching) {
      uri = search_uri;
    } else {
      uri = now_playing_uri;
    }
    

    let result = await fetch(uri);
    let data = await result.json();

    if (data.page === data.total_pages) {
      this.setState({
        hasMore: false
      })
    }

    return data.results;
  }

  async LoadMore() {
    const hasMore = this.state.hasMore;
    if (hasMore) {
      const page = this.state.page + 1;
      let newMovies = await this.LoadMovie(page);

      this.setState({
        page,
        movies: this.state.movies.concat(newMovies),
        isLoading: false
      });
    }
  }

  async handleSearch(keyword) {
    if (keyword.key == 'Enter') {
      if (keyword.target.value != '') {
        this.setState({
          keyword: keyword.target.value,
          isSearching: true,
          isLoading: true
        })
      } else {
        this.setState({
          keyword: '',
          isSearching: false,
          isLoading: true
        })
      }
      await this.sleep(1500)
      let movies = await this.LoadMovie(this.state.page);
      this.setState({
        movies: movies,
        isLoading: false
      })
    }
  }

  async componentDidMount() {
    let movies = await this.LoadMovie(this.state.page);
    this.setState({
      movies: movies,
      isLoading: false
    })
  }

  render() {
    console.log(this.state.isSearching)
    return (
      <div>
        <FixMenu logo={Logo}/>
        <Container style={{ marginTop: '7em' }}>

          <Input icon='search' iconPosition='left' placeholder='Search...' loading={this.state.isLoading}
              className='search-box' fluid={true}
              onKeyPress={this.handleSearch.bind(this)}/>

          <InfiniteScroll onLoadMore={this.LoadMore.bind(this)} 
              hasMore={this.state.hasMore}
              movies={this.state.movies}/>
        </Container>
        <Footer logo={Logo}/>
      </div>
    );
  }
}

export default App;