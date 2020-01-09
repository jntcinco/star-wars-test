// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Flag from 'react-flags';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const API_URL = 'https://swapi.co/api/films/';

class FilmTable extends React.Component {
	state = {
    films: [],
    columns: [
      {
        dataField: 'episode_id',
        text: 'Episode ID',
        sort: true
      },
      {
        dataField: 'title',
        text: 'Film Title',
        filter: textFilter()
      }
    ]
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
                <BootstrapTable 
                 striped
                 hover
                 keyField='episode_id' 
                 data={ this.state.films } 
                 columns={ this.state.columns } 
                 filter={ filterFactory() } />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FilmTable;