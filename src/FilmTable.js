// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Flag from 'react-flags';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

const ADD_TO_FAVORITE_URL = 'http://localhost:4000/favorites/add';
const GET_FAVORITES_URL = 'http://localhost:4000/favorites/get_by/';
const API_URL = 'https://swapi.co/api/films/';

class FilmTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFavFilm: false,
      films: [],
      columns: [
        {
          dataField: 'episode_id',
          text: 'Episode ID',
          sort: true
        },
        {
          dataField: 'title',
          text: 'Title',
          filter: textFilter({
            placeholder: 'Search by title...',  // custom the input placeholder
            className: 'my-custom-text-filter', // custom classname on input
            defaultValue: '', // default filtering value
            comparator: Comparator.LIKE, // default is Comparator.LIKE
            caseSensitive: true, // default is false, and true will only work when comparator is LIKE
            style: { "width" : "200px", "float" : "left" }, // your custom styles on input
          })
        },
        {
          dataField: 'actions',
          text: 'Actions'
        }
      ]
    }
  }

  addToFavorite(episode_id) {
    var favorite = {"episode_id":episode_id.toString(), "is_favorite":true};
    axios.post( ADD_TO_FAVORITE_URL, favorite).then(function(response) {
      console.debug("naruto: "+response.data.message);
      document.getElementById("favAlert").style.display = "block";
      document.getElementById("span-"+episode_id).className = "glyphicon glyphicon-star";
    })
    .catch(function(error) {
      console.error("naruto error: "+error);
    });
  }

  async getStarwarsFilm() {
    const favFilms = await axios.get(API_URL);
    let films = await favFilms.data.results;
    let finalFilms = [];
    films.map((film, index) => {
      let tempFilm = film;
      var episode_id = film.episode_id;
      const final_url = GET_FAVORITES_URL + episode_id;
      let data = [];
      axios.get(final_url).then(res => { 
        data = res.data;
        let length = data.length;
        if(length > 0) {
          tempFilm.actions = <button type="button" id={episode_id} className="btn btn-default btn-sm" onClick={this.addToFavorite.bind(this, episode_id)}>
                          <span id={"span-"+episode_id} className="glyphicon glyphicon-star"></span> Add to Favourite
                        </button>;
        } else {
          tempFilm.actions = <button type="button" id={episode_id} className="btn btn-default btn-sm" onClick={this.addToFavorite.bind(this, episode_id)}>
                          <span id={"span-"+episode_id} className="glyphicon glyphicon-star-empty"></span> Add to Favourite
                        </button>;
        }
        finalFilms.push(tempFilm);
        this.setState({ films: finalFilms });
      });
    });
  }

  componentDidMount() {
    this.getStarwarsFilm();
    console.debug("film.actions: "+JSON.stringify(this.state.films));
  }

	render() {
		return (
			<div className="container">
				<div className="col-xs-8">
					<h1>Starwars Films</h1>
					<div className="card">
						<div className="card-body">
                <BootstrapTable 
                 striped
                 hover
                 keyField='episode_id' 
                 data={ this.state.films } 
                 columns={ this.state.columns } 
                 filter={ filterFactory() } 
                 pagination={ paginationFactory() } 
                 sort={ { dataField: 'episode_id', order: 'asc' } } />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FilmTable;