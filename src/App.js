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
import SideBar from './side-bar'
import MovieModal from './movie-modal'

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
      type: 'movie',
      movie: {},
      open: false
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async LoadDiscover(page, type) {
    //const now_playing_uri = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=${language}&page=${page}`;
    const discover_uri = `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&language=${language}&sort_by=${this.state.filter.sort}&include_adult=false&page=${page}&primary_release_year=${this.state.filter.year}&first_air_date_year=${this.state.filter.year}`;
    const search_uri = `https://api.themoviedb.org/3/search/${type}?api_key=${api_key}&language=${language}&query=${this.state.keyword}&page=${page}&include_adult=false&year=${this.state.filter.year}&first_air_date_year=${this.state.filter.year}`;

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
    const type = this.state.type;

    if (hasMore) {
      const page = this.state.page + 1;
      await this.LoadDiscover(page, type).then((newMovies) => {
        this.setState({
          page,
          movies: this.state.movies.concat(newMovies),
          isLoading: false
        });
      });
    }
  }

  handleSearch(keyword) {

    const page = this.state.page;
    const type = this.state.type;

    if (keyword.key == 'Enter') {
      if (keyword.target.value != '') {
        this.setState({
          keyword: keyword.target.value,
          isSearching: true,
          isLoading: true
        }, function () {
          this.LoadDiscover(page, type).then((movies) => {
            this.setState({
              movies: movies,
              isLoading: false
            })
          });
        })
      } else {
        this.setState({
          keyword: '',
          isSearching: false,
          isLoading: true
        }, function () {
          this.LoadDiscover(page, type).then((movies) => {
            this.setState({
              movies: movies,
              isLoading: false
            })
          });
        })
      }
    }
  }

  showMovie() {
    const page = 1;
    const type = 'movie';
    this.setState({
      movies: []
    }, async function () {
      await this.LoadDiscover(page, type).then((movies) => {
        this.setState({
          page,
          type,
          movies: movies,
          isLoading: false
        })
      });
    })
  }

  showTv() {
    const page = 1;
    const type = 'tv';
    this.setState({
      movies: []
    }, function () {
      this.LoadDiscover(page, type).then((tvShows) => {
        this.setState({
          page,
          type,
          movies: tvShows,
          isLoading: false
        })
      });
    })
  }

  async componentWillMount() {
    await this.LoadDiscover(this.state.page, this.state.type).then((movies) => {
      this.setState({
        movies: movies,
        isLoading: false
      })
    });
  }

  filter(filter) {
    this.setState({
      filter,
      movies: []
    }, function () {
      this.LoadDiscover(this.state.page, this.state.type).then((movies) => {
        this.setState({
          movies: movies,
          isLoading: false
        })
      });
    })
  }

  handleModal(movie) {
    this.setState({
      movie,
      open: true
    })
  }

  handleModalClose() {
    this.setState({
      open: false
    })
  }

  
  render() {
    let content = (
      <div>
        <Container style={{ marginTop: '7em' }}>
          <Input icon='search' iconPosition='left' placeholder='Search...'
            loading={this.state.isLoading}
            className='search-box' fluid={true}
            onKeyPress={this.handleSearch.bind(this)} />

          <Container>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <h1>Discover Movies & TV Shows</h1>
                </Grid.Column>
                <Grid.Column textAlign='right'>
                  <h2>
                    <a href='#' onClick={this.showMovie.bind(this)}>Movies  </a> | <a href='#' onClick={this.showTv.bind(this)}>  TV Shows</a>
                  </h2>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>

          <Filters filter={this.filter.bind(this)} />

          <InfiniteScroll onLoadMore={this.LoadMore.bind(this)}
            hasMore={this.state.hasMore}
            movies={this.state.movies}
            type={this.state.type}
            handleModal={this.handleModal.bind(this)} />

          <MovieModal movie={this.state.movie}
            open={this.state.open}
            handleModalClose={this.handleModalClose.bind(this)} />
        </Container>
        <Footer logo={Logo} />
      </div>
    )
    return (
      <div>
        <FixMenu logo={Logo} />
        <SideBar logo={Logo} content={content} />
      </div>
    );
  }
}

export default App;