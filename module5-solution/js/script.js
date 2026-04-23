(function (window) {
  'use strict';

  // Firebase base URL used in the course
  var baseUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/";

  // ========================================================
  // TODO: STEP 0
  // Declare the DataCaller (dc) object on the window so that
  // onclick handlers in the home snippet can call $dc.loadMenuItems()
  // ========================================================
  function DataCaller() {}

  // ========================================================
  // TODO: STEP 1
  // loadMenuItems(categoryShortName): fetch menu items for a
  // given category short_name and display them on the page.
  // ========================================================
  DataCaller.prototype.loadMenuItems = function (categoryShortName) {
    $.ajax({
      url: baseUrl + "menu_items/" + categoryShortName + ".json",
      type: "GET",
      success: function (data) {
        displayMenuItems(data);
      },
      error: function () {
        $("#main-content").html(
          '<p class="text-danger text-center">Could not load menu items. Please try again.</p>'
        );
      }
    });
  };

  // ========================================================
  // TODO: STEP 2
  // loadHome(): fetch all categories, pick a RANDOM one for
  // the Specials tile, then render the home page snippet.
  // ========================================================
  DataCaller.prototype.loadHome = function () {
    $.ajax({
      url: baseUrl + "categories.json",
      type: "GET",
      success: function (data) {

        // =====================================================
        // TODO: STEP 3
        // Pick a random category short_name from the returned
        // categories array and store it so we can inject it
        // into the home snippet's onclick handler.
        // =====================================================
        var categories = data.categories;
        var randomIndex = Math.floor(Math.random() * categories.length);

        // Wrap short_name in quotes so it becomes a valid JS
        // string literal inside the onclick attribute.
        var randomCategoryShortName = "'" + categories[randomIndex].short_name + "'";

        // =====================================================
        // TODO: STEP 4
        // Build and inject the home snippet HTML, replacing
        // {{randomCategoryShortName}} with our random value.
        // =====================================================
        var homeHtml = buildHomeHtml(categories, randomCategoryShortName);
        $("#main-content").html(homeHtml);
      },
      error: function () {
        $("#main-content").html(
          '<p class="text-danger text-center">Could not load categories. Please try again.</p>'
        );
      }
    });
  };

  // Expose $dc globally
  window.$dc = new DataCaller();

  // ---- Helper: build home page tiles ----
  function buildHomeHtml(categories, randomCategoryShortName) {
    var html = '<h2 class="text-center">Our Menu</h2>';
    html += '<div class="row">';

    for (var i = 0; i < categories.length; i++) {
      var cat = categories[i];
      var onclickVal;

      // The "Specials" tile (SP) gets a random category
      if (cat.short_name === "SP") {
        onclickVal = "$dc.loadMenuItems(" + randomCategoryShortName + ");";
      } else {
        onclickVal = "$dc.loadMenuItems('" + cat.short_name + "');";
      }

      html += '<div class="col-md-4 col-sm-6 col-xs-12">';
      html += '<div class="category-tile" onclick="' + onclickVal + '">';
      html += cat.name;
      html += '</div>';
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  // ---- Helper: display menu items ----
  function displayMenuItems(data) {
    if (!data || !data.menu_items) {
      $("#main-content").html('<p class="text-center text-muted">No items found.</p>');
      return;
    }

    var items = data.menu_items;
    var html = '';

    // Back button
    html += '<button id="back-btn" class="btn btn-default" onclick="$dc.loadHome();">';
    html += '&larr; Back to Menu';
    html += '</button>';

    html += '<h3 class="text-center">' + (data.category ? data.category.name : 'Menu Items') + '</h3>';
    html += '<div class="row">';

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      html += '<div class="col-md-4 col-sm-6 col-xs-12">';
      html += '<div class="menu-item-tile">';
      if (item.image_url) {
        html += '<img src="' + item.image_url + '" alt="' + item.name + '">';
      }
      html += '<h4>' + item.name + '</h4>';
      if (item.description) {
        html += '<p>' + item.description + '</p>';
      }
      if (item.price_small) {
        html += '<p><strong>Small:</strong> $' + item.price_small + '</p>';
      }
      if (item.price_large) {
        html += '<p><strong>Large:</strong> $' + item.price_large + '</p>';
      }
      html += '</div>';
      html += '</div>';
    }

    html += '</div>';
    $("#main-content").html(html);
  }

  // ---- Start the app: load home on page load ----
  $(document).ready(function () {
    $dc.loadHome();

    // Clicking the logo always returns to home
    $("#logo").on("click", function (event) {
      event.preventDefault();
      $dc.loadHome();
    });
  });

})(window);