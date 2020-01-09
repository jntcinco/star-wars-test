// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Flag from 'react-flags';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

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
        text: 'Title',
        filter: textFilter({
          placeholder: 'Search by title...',  // custom the input placeholder
          className: 'my-custom-text-filter', // custom classname on input
          defaultValue: '', // default filtering value
          comparator: Comparator.EQ, // default is Comparator.LIKE
          caseSensitive: true, // default is false, and true will only work when comparator is LIKE
          style: { "width" : "200px", "float" : "left" }, // your custom styles on input
        })
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
                 pagination={ paginationFactory() } />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FilmTable;