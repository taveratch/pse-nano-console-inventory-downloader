import ReactDOM from 'react-dom';
window.$ = require('jquery');
window._ = require('lodash');
import './stylesheets';
import Root from 'container/root';

ReactDOM.render( <Root />, document.getElementById('app'));
