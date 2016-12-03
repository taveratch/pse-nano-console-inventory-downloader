import {Well, Label, Row, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import vm from './viewmodel';
import service from '../js/service';
export default class Wrapper extends React.Component {
	constructor(props) {
		super(props);
    /* binding functions */
		this.dispatch = this.dispatch.bind(this);
    this.read = this.read.bind(this);
    /* set initial state */
    this.state = vm({}, {type: 'init'});
	}
	dispatch(action) {
		this.setState(vm(this.state, action));
	}
  read() {
    let url = $('#url')[0].value;
    service.getInventoryList(url)
    .then((res) => {
      this.dispatch({ type: 'load_inventory', data: res, url: service.urlValidator(url)});
    })
    .catch((err) => {
      this.dispatch({ type: 'error' });
    });
  }
	render() {
    let errorView;
    if(this.state.error) {
      let url = $('#url')[0].value;
      errorView =
        <div>
          <Label bsStyle="danger">An error occurs, Please make sure you are following these steps</Label>
          <p className="margin-top">1. Insert the correct url</p>
          <p>2. <a href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en" target="_blank">Chrome Cors Plugin</a> is installed</p>
          <p>3. Login to nano console (If not <a href={url} target="_blank">Click here</a>)</p>
        </div>;
    }
		return (
			<div className="padding-all">
        <h1>Inventory Downloader</h1>
        <Row>
          <Well className="flex flex-column">
            <div className="margin-bottom"><Label bsStyle="danger">Caution</Label></div>
            <span>1. Install <a href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en" target="_blank">Chrome Cors Plugin</a> </span>
            <span>2. Login to nano console first.</span>
          </Well>
        </Row>
				<Row className="flex margin-bottom">
					<input id="url" className="form-control"/>
					<button className="btn btn-default margin-left" onClick={this.read}>Read</button>
				</Row>
        { errorView }
        <Row>
          <ListGroup>
            {
              _.map(this.state.inventories, (item) => {
                return <ListGroupItem>
                  {item.name}
                  <div className="pull-right pull-top full-height flex flex-center flex-middle margin-right">
                    <a href={item.url} download >Download</a>
                  </div>
                </ListGroupItem>;
              })
            }
          </ListGroup>
        </Row>
			</div>
		);
	}
}
ReactDOM.render(
	<Wrapper/>, document.getElementById('app'));
