let dataFunctions = [],
    apiCalls = {
      "categories": "data/categories.json",
      "types": "data/types.json",
      "products": "data/products.json"
    };

// Wanting getData.types to returns an object of types data.

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

console.log("Data Functions:", dataFunctions);

// do something after all promises complete. fails if all don't return
Promise.all([dataFunctions.categories(), dataFunctions.types(), dataFunctions.products()])
.then( arrayOfData => {
  parseData(arrayOfData);
  console.log("Array Of Data:", arrayOfData);
});

function parseData(arrayOfData) {
  let getData = {
    "categories": arrayOfData[0].categories,
    "types": arrayOfData[1].types,
    "products": arrayOfData[2].products
  };
  console.log("getData.categories:", getData.categories);
}






