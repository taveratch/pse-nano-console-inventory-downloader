import parseDomain from 'parse-domain';

let vm = (state, action) => {
	switch (action.type) {
    case 'init':
      return {
        error: false,
        inventories: [],
        downloadedInventories: [],
        downloading: false,
        downloadAllButtonDisabled: true,
        isLocal: false
      };
		case 'load_inventory':
      state.error = false;
      state.downloadAllButtonDisabled = false;
      state.inventories = dataFormatter(action.data, action.url);
      return state;
    case 'downloaded_inventory':
      state.downloading = true;
      state.downloadedInventories.push(action.data);
      return state;
    case 'use_local':
      state.isLocal = action.data;
      return state;
    case 'error':
      state.downloadAllButtonDisabled = true;
      state.error = true;
      state.inventories = [];
      return state;
	}
};


const dataFormatter = (raw, domain) => {
  let data = [];
  let lines = raw.split('\n');
  lines.splice(0,2);
  _.map(lines, (line, i) => {
    let url = line.substring(6);
    data.push({
      url: getDomain(domain) + url,
      name: url.substring(11)
    });
  });
  data.pop();
  return data;
};

const getDomain = (url) => {
  let first = url.indexOf('/');
  let third = url.indexOf('/', first+2);
  return url.substring(0,third);
};

const insertHeader = (url) => {
  return 'http://user:pass@' + url.substring(7);
}

vm.insertHeader = insertHeader;
export default vm;
