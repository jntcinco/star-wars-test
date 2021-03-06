//import 'bootstrap/dist/css/bootstrap.min.css'; 
//import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FilmTable from './FilmTable';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<FilmTable />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
