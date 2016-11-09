var Acme = (function (Acme) {

let allData = {},
  dataFunctions = [],
  apiCalls = {
    "categories": "data/categories.json",
    "types": "data/types.json",
    "products": "data/products.json"
  };

//getter for data we're collecting
Acme.getData = function () {
  return allData;
};

// Looks at apiCalls object and creates promises for each call
Acme.callAPIs = function () {

  for (var prop in apiCalls) {
    console.log("apiCalls." + prop + " = " + apiCalls[prop]);

    dataFunctions[prop] = (function (prop) { // iife allows prop to not have closure in loop
      return function () {
        return new Promise((resolve, reject) => {
          $.ajax({
            url: apiCalls[prop]
          }).done(data => {
            resolve(data);
          }).fail(error => {
            reject(error);
          });
        });
      };
    })(prop);
  }

  // Push data to get
  Promise.all([dataFunctions.categories(), dataFunctions.types(), dataFunctions.products()])
  .then( arrayOfData => {
    Acme.parseData(arrayOfData);
  });

};

Acme.parseData = function (arrayOfData) {

    allData = {
      "categories": arrayOfData[0].categories,
      "types": arrayOfData[1].types,
      "products": arrayOfData[2].products[0]
    };

    // After Data is pushed, setup listeners on page
    Acme.listenToPage();

};

return Acme;

})(Acme || {});

Acme.callAPIs();
