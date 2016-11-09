// ### User interface

// Create a simple user interface for your product catalog where a user can select a category from a dropdown. When a category is selected, you must use Promises to read, first, from the `categories.json` to load that array of objects, then load `types.json`, then `products.json`.

// Once all data is loaded, you need to display the products in a Bootstrap grid. Each product must display the string name of its product type, and product category. Not the integer id value.

var Acme = (function (Acme) {


Acme.listenToPage = function () {
  console.log("listening");
  let test = Acme.getData();
  console.log("data appear here?", test);
};

return Acme;

})(Acme || {});