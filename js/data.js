var Acme = ( Acme => {

let allData = {},
  dataFunctions = [],
  apiCalls = {
    "categories": "data/categories.json",
    "types": "data/types.json",
    "products": "data/products.json"
  };

//getter for data we're collecting
Acme.getData = () => {
  return allData;
};

// Looks at apiCalls object and creates promises for each call
Acme.callAPIs = () => {

  for (var prop in apiCalls) {

    dataFunctions[prop] = ( prop => { // iife allows prop to not have closure in loop
      return () => {
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

  // Push data to parser
  Promise.all([dataFunctions.categories(), dataFunctions.types(), dataFunctions.products()])
  .then( arrayOfData => {
    Acme.parseData(arrayOfData);
  });

};

// Parse and push data to page
Acme.parseData = arrayOfData => {

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

Acme.callAPIs(); // get the data
