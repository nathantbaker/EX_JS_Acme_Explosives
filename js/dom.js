// ### User interface

// Create a simple user interface for your product catalog where a user can select a category from a dropdown. When a category is selected, you must use Promises to read, first, from the `categories.json` to load that array of objects, then load `types.json`, then `products.json`.

// Once all data is loaded, you need to display the products in a Bootstrap grid. Each product must display the string name of its product type, and product category. Not the integer id value.

var Acme = (function (Acme) {

  Acme.listenToPage = function () {
    $("#menu").on('change', function() {
      // pass category to show
      switch($(this).val()) {
        case "fireworks": Acme.showItems(0); break;
        case "demolition": Acme.showItems(1); break;
      }
    });
  };

  Acme.showItems = function (targetCat) {
    let dataToShow = [],
        data = Acme.getData(),
        acceptedTypes = [],
        htmlString = "";

    // Populate acceptedTypes array with type ids if they match correct category
    for (let i = 0; i < Object.keys(data.types).length; i++) {
      let type = data.types[Object.keys(data.types)[i]];
      if (type.categoryId === targetCat) {
        acceptedTypes.push(type.id);
      }
    }

    // Populate dataToShow array with products if they have an accepted type
    for (let i = 0; i < Object.keys(data.products).length; i++) {
      let product = data.products[Object.keys(data.products)[i]];
      if ($.inArray(product.typeId, acceptedTypes) !== -1) {
        dataToShow.push(product);
      }
    }

    // Build HTML to push to page
    for (var i = 0; i < dataToShow.length; i++) {
      htmlString += `
       <div class="col-md-4" >
          <div class="card">
            <h2>${dataToShow[i].name}</h2>
            <p>${dataToShow[i].description}</p>
          </div>
        </div>
    `;
    }

    // Push HTML to page
    targetEl = $("#showData");
    targetEl.empty();
    targetEl.append(htmlString);
    console.log("dataToShow:", dataToShow);

  };

return Acme;

})(Acme || {});

