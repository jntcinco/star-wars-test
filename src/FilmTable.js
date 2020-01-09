// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Flag from 'react-flags';

const API_URL = 'https://swapi.co/api/films/';

class FilmTable extends React.Component {
	state = {
    	films: []
  	}

  	componentDidMount() {
    	axios.get(API_URL).then(res => {
        	const films = res.data.results;
        	this.setState({ films });
        	console.debug("response: "+this.state.films);
      	})
  	}

	render() {
		return (
			<div className="container">
				<div className="col-xs-8">
					<h1>Starwars Test</h1>
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">Films</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <td>Episode Id</td>
                      <td>Title</td>
                    </tr>
                  </thead>
                  <tbody>
        					{
        						this.state.films.map((film, index) => {
        							return (
        								<tr key={film.episode_id}>
                          <td>{film.episode_id}</td>
        								  <td>{film.title}</td>
        								</tr>
        							);
        						})
        					}
                  </tbody>
                </table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FilmTable;