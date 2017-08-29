import {USER, PASS} from './constants';
let services = {
  getInventoryList: (url) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + urlValidator(url),
        headers: {
        'Authorization' : 'Basic dXNlcjpwYXNz'
        } 
      })
      .done((res) => {
        resolve(res);
      })
      .fail((err) => {
        console.log(err);
        reject(err);
      });
    });
  },
  downloadInventory: (url) => {
    return new Promise((resolve, reject) => {
      $.ajax({
                // `url` 
                url: url,
                type: "GET",
                // `custom header`
                headers: {
                  'Authorization' : 'Basic dXNlcjpwYXNz'
                },
                success: function (data) {
                    // `file download`
                    $("a")
                        .attr({
                        "href": data.file,
                            "download": "file.txt"
                    })
                        .html($("a").attr("download"))
                        .get(0).click();
                },
                error: function (jqxhr, textStatus, errorThrown) {
                  console.log(textStatus, errorThrown)
                }
            });
    })
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
  console.log("Hello " + validatedUrl);
  return validatedUrl;
};

services.urlValidator = urlValidator;

export default services;
