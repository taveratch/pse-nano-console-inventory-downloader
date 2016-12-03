import parseDomain from 'parse-domain';

let vm = (state, action) => {
	switch (action.type) {
    case 'init':
      return {
        error: false,
        inventories: []
      };
		case 'load_inventory':
      state.error = false;
      state.inventories = dataFormatter(action.data, action.url);
      return state;
    case 'error':
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

export default vm;
