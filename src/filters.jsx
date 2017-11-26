import React, { Component } from 'react'
import { Dropdown, Grid, Header } from 'semantic-ui-react'

const language = 'en-US';
const api_key = '09e4cc13c99312bf18cad8339e83bc82';

const pop_asc = 'popularity.asc';
const pop_des = 'popularity.desc';
const title_asc = 'original_title.asc';
const title_des = 'original_title.desc';


export default class Filters extends Component {

    constructor(props) {
        super(props)
        this.state = {
            years: [],
            sorts: [],
            genres: [],
            loading: true,
            filter: {
                year: (new Date()).getFullYear(),
                sort: pop_des,
                genres: []
            }
        }
    }

    async componentWillMount() {
        await this.loadYears();
        await this.loadSorts();
        await this.loadGenres();
    }

    async loadYears() {
        let years = []
        for (let i = (new Date()).getFullYear(); i >= 1990; i--) {
            years.push({
                text: i,
                value: i,
            })
        }
        this.setState({
            years
        });
    }

    async loadSorts() {
        let sort_options = [
            {
                text: 'Popularity Descending',
                value: pop_des
            },
            {
                text: 'Popularity Ascending ',
                value: pop_asc
            },
            {
                text: 'Title (A-Z)',
                value: title_asc
            },
            {
                text: 'Title (Z-A)',
                value: title_des
            }
        ]
        this.setState({
            sorts: sort_options
        })
    }

    async loadGenres() {
        const genre_api_url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=${language}`;
        let result = await fetch(genre_api_url);
        let data = await result.json();

        let genres = data.genres;
        let genre_list = []
        genres.map((genre) =>
            genre_list.push({
                text: genre.name,
                value: genre.id,
                key: genre.id
            })
        )
        this.setState({
            genres: genre_list
        })
    }

    handleYearFilter(e, { value }) {
        this.setState({
            filter: {
                year: value,
                sort: this.state.filter.sort,
                genre: this.state.filter.genres
            }
        }, function () {
            this.props.filter(this.state.filter);
        })
    }
    handleSortFilter(e, { value }) {
        this.setState({
            filter: {
                sort: value,
                year: this.state.filter.year,
                genre: this.state.filter.genres
            }
        }, function () {
            this.props.filter(this.state.filter);
        })
    }
    handleGenreFilter(e, { value }) {
        this.setState({
            filter: {
                genres: value,
                year: this.state.filter.year,
                sort: this.state.filter.sort
            }
        }, function () {
            this.props.filter(this.state.filter);
        })
    }

    render() {
        return (
            <Grid columns={3} stackable style={{ marginBottom: 15 + 'px' }}>
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h4">Year</Header>
                        <Dropdown options={this.state.years} fluid selection onChange={this.handleYearFilter.bind(this)} ref="filter"></Dropdown>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as="h4">Sort By</Header>
                        <Dropdown options={this.state.sorts} fluid selection onChange={this.handleSortFilter.bind(this)} ref="filter"></Dropdown>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as="h4">Genre</Header>
                        <Dropdown options={this.state.genres} fluid selection multiple onChange={this.handleGenreFilter.bind(this)} ref="filter"></Dropdown>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
