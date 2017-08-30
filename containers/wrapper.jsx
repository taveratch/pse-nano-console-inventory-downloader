import {Well, Label, Row, Col, Button, ListGroup, ListGroupItem, ProgressBar} from 'react-bootstrap';
import vm from './viewmodel';
import write from 'write';
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

  download(url) {
    service.downloadInventory(url);
  }

  downloadAll() {
    this.dispatch({type: 'start_downloading_all_inventory'});
    service.downloadAllInventories(this.state.inventories, this.dispatch);
  }

  onCheckboxChange(event) {
    let checked = event.target.checked;
    this.dispatch({type: 'to_local', data: checked});
    service.enableProxy(checked);
  }

  renderProgressbar(name) {
    if(this.state.downloadedInventories.indexOf(name) < 0 && this.state.downloading)
      return <ProgressBar active now={100} id={`progress-${name}`} label="Downloading..." />;
    else if(this.state.downloadedInventories.indexOf(name) >= 0 && this.state.downloading)
      return <ProgressBar bsStyle="success" now={100} id={`progress-${name}`} label="Downloaded" />;
  }

	render() {
    let errorView;
    let self = this;
    if(this.state.error) {
      let url = $('#url')[0].value;
      errorView =
        <div>
          <Label bsStyle="danger">Url is incorrect.</Label>
          <p className="margin-top">Please insert a correct url with port</p>
        </div>;
    }
		return (
			<div className="padding-all" style={{position: 'relative', minHeight: '100%'}}>
        <h1>Inventory Downloader</h1>
				<Row className="flex margin-bottom">
          <input id="url" className="form-control" placeholder="http://sysinto999.true.in.th:7878"/>
          <div className="checkbox-container">
            <input type="checkbox" onChange={this.onCheckboxChange.bind(this)}/><span>LAN</span>
          </div>
					<button className="btn btn-default margin-left" onClick={this.read}>Read</button>
          <button className="btn btn-default margin-left" disabled={this.state.downloadAllButtonDisabled} onClick={this.downloadAll.bind(this)}>Download all</button>
				</Row>
        { errorView }
        <Row>
          <ul className="list-group">
            {
              _.map(this.state.inventories, (item, i) => {
                return <ul className="list-group-item">
                  {item.name}
                  <div className="pull-right pull-top full-height flex flex-center flex-middle margin-right">
                  { self.renderProgressbar(item.name) }
                    <a href={vm.insertHeader(item.url)} download >Download</a>
                  </div>
                </ul>;
              })
            }
          </ul>
        </Row>
        <footer className="footer">
          <div className="container">
            <p className="text-muted">This software is a property of Padungsilpa Group.<br></br>© Copyright 2017 PADUNGSILPA GROUP All right reserved.</p>
          </div>
        </footer>
			</div>
		);
	}
}
ReactDOM.render(
	<Wrapper/>, document.getElementById('app'));
