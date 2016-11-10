var Acme = ( Acme => {

  Acme.listenToPage = () => {
    $("#menu").on('change', function() {
      // build HMTL based on category selected
      switch($(this).val()) {
        case "fireworks": Acme.showItems(0, "Fireworks"); break;
        case "demolition": Acme.showItems(1, "Demolition"); break;
      }
    });
  };

  Acme.showItems = (catId, catString) => {
    let data = Acme.getData(),
        acceptedTypes = [],
        dataToShow = [],
        typeKey = {},
        htmlString = "";

    // Populate acceptedTypes array with type ids if they match correct category
    for (let i = 0; i < Object.keys(data.types).length; i++) {
      let type = data.types[Object.keys(data.types)[i]];
      if (type.categoryId === catId) {
        acceptedTypes.push(type.id);
        // reference type id's with names in easy to grab place
        typeKey[i] = { "typeid": type.id, "typename": type.name };
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
    for (let i = 0; i < dataToShow.length; i++) {
      let prodTypeNumber = dataToShow[i].typeId;
      let prodString = typeKey[prodTypeNumber].typename;

      htmlString += `
       <div class="col-md-4" >
          <div class="card">
            <h2>${dataToShow[i].name}</h2>
            <p>${dataToShow[i].description}</p>
            <h3>Product Category:</h3> ${catString}
            <h3>Product Type:</h3> ${prodString}
          </div>
        </div>
      `;
    }

    // Push HTML to page
    targetEl = $("#showData");
    targetEl.empty(); // clear page of results before adding new results
    targetEl.append(htmlString);

  };

return Acme;

})(Acme || {});

