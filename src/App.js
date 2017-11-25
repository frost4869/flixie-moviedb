import React, { Component } from 'react';
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
  Loader,
  Grid,
  Tab
} from 'semantic-ui-react'
import Logo from './movie.png'
import InfiniteScroll from './infinite-scroll'
import Filters from './filters'

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
      keyword: '',
      filter: {
        year: (new Date()).getFullYear(),
        sort: 'popularity.desc',
        genres: []
      },
      type: 'movie'
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async LoadDiscover(page, type) {
    //const now_playing_uri = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=${language}&page=${page}`;
    const discover_uri = `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&language=${language}&sort_by=${this.state.filter.sort}&include_adult=false&page=${page}&primary_release_year=${this.state.filter.year}`;
    const search_uri = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=${language}&query=${this.state.keyword}&page=${page}&include_adult=false`;

    let uri;

    if (this.state.isSearching) {
      uri = search_uri;
    } else {
      uri = discover_uri;
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
      let newMovies = await this.LoadDiscover(page);

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
        await this.setState({
          keyword: keyword.target.value,
          isSearching: true,
          isLoading: true
        })
      } else {
        await this.setState({
          keyword: '',
          isSearching: false,
          isLoading: true
        })
      }
      let movies = await this.LoadDiscover(this.state.page);

      this.setState({
        movies: movies,
        isLoading: false
      })
    }
  }

  async showMovie() {
    const page = 1;
    const type = 'movie';
    let movies = await this.LoadDiscover(page, type);
    this.setState({
      page,
      type,
      movies: movies,
      isLoading: false
    })
  }

  async showTv() {
    const page = 1;
    const type = 'tv';
    let movies = await this.LoadDiscover(page, type);
    this.setState({
      page,
      type,
      movies: movies,
      isLoading: false
    })
  }

  async componentDidMount() {
    let movies = await this.LoadDiscover(this.state.page, this.state.type);
    this.setState({
      movies: movies,
      isLoading: false
    })
  }

  filter(filter) {
    this.setState({
      filter,
    }, async function () {
      let movies = await this.LoadDiscover(this.state.page);
      this.setState({
        movies: movies,
        isLoading: false
      })
    })
  }

  render() {
    console.log('render')
    return (
      <div>
        <FixMenu logo={Logo} />
        <Container style={{ marginTop: '7em' }}>

          <Container>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <h1>Discover Movies & TV Shows</h1>
                </Grid.Column>
                <Grid.Column textAlign='right'>
                  <h3>
                    <a href='#' onClick={this.showMovie.bind(this)}>Movies  </a> | <a href='#' onClick={this.showTv.bind(this)}>  TV Shows</a>
                  </h3>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>

          <Input icon='search' iconPosition='left' placeholder='Search...'
            loading={this.state.isLoading}
            className='search-box' fluid={true}
            onKeyPress={this.handleSearch.bind(this)} />

          <Filters filter={this.filter.bind(this)} />

          <InfiniteScroll onLoadMore={this.LoadMore.bind(this)}
            hasMore={this.state.hasMore}
            movies={this.state.movies}
            type={this.state.type} />
        </Container>
        <Footer logo={Logo} />
      </div>
    );
  }
}

export default App;