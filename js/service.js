import {USER, PASS} from './constants';
let services = {
  getInventoryList: (url) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: urlValidator(url)
      })
      .done((res) => {
        resolve(res);
      })
      .fail((err) => {
        console.log(err);
        reject(err);
      });
    });

  }
};

const urlValidator = (url) => {
  let validatedUrl = "";
  if(url.endsWith('/')) {
    url = url.substring(0,url.length-1);
  }
  if(url.indexOf('http://') === 0) {
    validatedUrl = `http://${url.substring(7)}/inventory/filesrecord.txt`;
  } else {
    validatedUrl = `http://${url.substring(0)}/inventory/filesrecord.txt`;
  }
  console.log(validatedUrl);
  return validatedUrl;
};

services.urlValidator = urlValidator;

export default services;
