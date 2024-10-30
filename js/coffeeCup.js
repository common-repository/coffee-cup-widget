jQuery(document).ready(function() {

  jQuery(this).coffeeTable({
    //text: 'Hola, el mundo!',
  });

});


(function(jQuery) {
  jQuery.fn.coffeeTable = function(options) {
    var drinks = [{
      name: "main",
      beans: "0",
      coffee: "1",
      milk: "0",
      foam: 0,
      description: "Main",
      addition: {
        unit: 0,
        amount: 0,
        type: 0
      },
      status: "main"
    }, {
      name: "coffee",
      beans: 3.25,
      coffee: 1,
      milk: 0,
      foam: 0,
      description: "Regular Coffee",
      addition: {
        unit: 0,
        amount: 0,
        type: 0
      },
      status: "active"
    }, {
      name: "cappuccino",
      beans: 1.5,
      coffee: 0.5,
      milk: 0.25,
      foam: 0.25,
      description: "Cappuccino",
      addition: {
        unit: 0,
        amount: 0,
        type: 0
      },
      status: "active"
    }, {
      name: "latte",
      beans: 1,
      coffee: 0.66,
      milk: 0.33,
      foam: 0,
      description: "Caffè Latte",
      addition: {
        unit: 0,
        amount: 0,
        type: 0
      },
      status: "active"
    }, {
      name: "cortado",
      beans: 1,
      coffee: 0.66,
      milk: 0,
      foam: 0.33,
      description: "Cortado",
      addition: {
        unit: 0,
        amount: 0,
        type: 0
      },
      status: "active"
    }, {
      name: "galao",
      beans: 0.75,
      coffee: 0.25,
      milk: 0.75,
      foam: 0,
      description: "Caffè Galão",
      addition: {
        unit: 0,
        amount: 0,
        type: 0
      },
      status: "active"
    }, {
      name: "americano",
      beans: 1.5,
      coffee: 0.33,
      milk: 0,
      foam: 0,
      description: "Americano",
      addition: {
        unit: "cup",
        amount: 0.66,
        type: "Hot Water"
      },
      status: "active"
    }, {
      name: "mocha",
      beans: 1,
      coffee: 0.25,
      milk: 0.25,
      foam: 0.25,
      description: "Caffè Mocha",
      addition: {
        unit: "tbsp",
        amount: 0.25,
        type: "Chocolate"
      },
      status: "active"
    }, {
      name: "affogato",
      beans: 1,
      coffee: 0.33,
      milk: 0,
      foam: 0,
      description: "Affogato",
      addition: {
        unit: "cup",
        amount: 0.66,
        type: "Ice Creme"
      },
      status: "active"
    }];

    var is_iPhone = navigator.userAgent.match(/(iPod|iPhone|iPad)/);
    var is_mac = navigator.userAgent.indexOf('Mac') > 1;


    drawCup();
    setTheme();
    
    function setTheme() {
      var theme = (jQuery('#coffeeCup').data('theme'));
      if (theme == 'light') {
        jQuery('.coffee-container').css("background-color", "#F5F5F5");
        jQuery('.coffee-container').css("border", "4px solid #D3D3D3");

        jQuery('.coffee-header, .coffee-footer').css("color", "#3b3b3b");
        jQuery('.coffee-header, .coffee-footer').css("background", "#D3D3D3");

        jQuery('.square').attr("style", "--square-color: #D3D3D3");
        jQuery('.drink-text').attr("style", "--text-color: #3b3b3b; --text-bg: #F5F5F5");

        jQuery('.steam').attr("style", "--steam-color: #D3D3D3");

        // Glass
        jQuery('.coffee-icon-1 .coffee-cup').attr("style", "--rgba-color: rgba(116,173,191, .4)");


      } else {
        return;
      }
    }

    function drawCup() {
      jQuery('#coffeeCup').append("<div class='coffee-container'><div class='coffee-header'>COFFEE CUP RATIO</div><div class='coffee-select'></div></div>");

      jQuery('.coffee-select').append("<label class='dropdown'><select id='coffeeSelect'></select></label>");

      jQuery('.coffee-container').append("<div class='steam' id='steam-one'></div><div class='steam' id='steam-two'></div><div class='steam' id='steam-three'></div><div class='steam' id='steam-four'></div>");

      // Add Drinks from object     
      for (var key in drinks) {
        if (drinks[key].status == "active") {
          var drink = drinks[key].name;
          var description = drinks[key].description;
          jQuery('select').append("<option value='" + drink + "'>" + description + "</option>");
        }
      }

      jQuery('.coffee-container').append("<div class='icons-container'></div>");
      jQuery('.icons-container').append("<div class='coffee-icon coffee-icon-1'></div>");

      jQuery('.coffee-icon').append("<div class='coffee-cup'><div class='cup-lifter'></div></div>");
      jQuery('.coffee-cup').append("<div class='coffee'></div>");

      // Fill the cup
      jQuery('.coffee').append("<div class='coffee-part coffee-part-4'></div><div class='coffee-part coffee-part-3'></div><div class='coffee-part coffee-part-2'></div><div class='coffee-part coffee-part-1'></div>");
      jQuery('.coffee-cup').append("<div class='cream'></div>");
      jQuery('.cream').append("<div class='cream-part cream-part-1'></div><div class='cream-part cream-part-2'></div><div class='cream-part cream-part-3'></div>");
      jQuery('.cream').append("<div class='choco'></div>");
      jQuery('.choco').append("<div class='choco-item choco-item-1'></div><div class='choco-item choco-item-2'></div><div class='choco-item choco-item-3'></div><div class='choco-item choco-item-4'></div><div class='choco-item choco-item-5'></div>");

      // Ingridients
      jQuery('.coffee-container').append("<div class='ingredients'></div>");
      ingridientsCalc({
        "coffee": "1"
      });


      var credit = (jQuery('#coffeeCup').data('credit'));     
      if (credit == "yes") {
        jQuery('.coffee-container').append("<div class='coffee-footer'>MADE BY: <a href='https://www.coffeetravelr.com'>Coffeetravelr</a></div>");
      }

     if (is_mac && !is_iPhone) {
        $('.coffee-icon-1 .coffee-cup').attr("style", "--cup-bottom-left: -1px;");
      }

    }

    function fillCup(drink) {

      // Clear foam height
      jQuery('.coffee-icon-1 .cream .cream-part-1').css("height", "38px");

      // Clear Ingridients
      jQuery(".ingredients").empty();

      // Deafault - steam
      jQuery('.steam').css({
        "display": "block"
      });

      // Default - No cream
      jQuery('.coffee-icon-1 .cream').css({
        "display": "none"
      });

      // Default - no choco
      jQuery('.coffee-icon-1 .cream .choco').css({
        "display": "none"
      });

      // Remove coco bars
      jQuery('.choco-bars').remove();

      var part;
      var ingredients = {};
      var ingredientsName = [];
      var ingredientsValue = [];
      var milkStart, foamStart, additionStart;
      var valueMilk, valueFoam, valueAddition;

      for (var key in drinks) {

        if (drinks[key].name == drink) {

          if ((drinks[key].coffee == 0.33) || (drinks[key].coffee == 0.66)) {
            part = 3;
          } else {
            part = 4;
          }

          valueMilk = drinks[key].coffee;
          valueAddition = valueMilk + drinks[key].milk;
          valueFoam = valueAddition + drinks[key].addition.amount;

          array = [Object.keys(drinks[key])];


          if (drinks[key].coffee != 0) {
            // Coffee
            liquid(array[0][2], drinks[key].coffee, 1, part);
            ingredientsName.push(array[0][2]);
            ingredientsValue.push(drinks[key].coffee);
            ingredients[array[0][2]] = drinks[key].coffee;

          }
          if (drinks[key].milk != 0) {
            // Milk
            milkStart = startValue(valueMilk.toFixed(2));
            liquid(array[0][3], drinks[key].milk, milkStart, part);
            ingredientsName.push(array[0][3]);
            ingredientsValue.push(drinks[key].milk);
            ingredients[array[0][3]] = drinks[key].milk;
          }
          if (drinks[key].addition.amount != 0) {
            // Foam
            additionStart = startValue(valueAddition.toFixed(2));
            liquid(drinks[key].addition.type, drinks[key].addition.amount, additionStart, part);
            ingredientsName.push(drinks[key].addition.type);
            ingredientsValue.push(drinks[key].addition.amount);
            ingredients[drinks[key].addition.type] = drinks[key].addition.amount;
          }

          if (drinks[key].foam != 0) {
            // Foam
            foamStart = startValue(valueFoam.toFixed(2));
            liquid(array[0][4], drinks[key].foam, foamStart, part);
            ingredientsName.push(array[0][4]);
            ingredientsValue.push(drinks[key].foam);
            ingredients[array[0][4]] = drinks[key].foam;
          }

          ingridientsCalc(ingredients);

        }
      }

      if ((jQuery('#coffeeCup').data('theme')) == 'light') {
        jQuery('.drink-text').attr("style", "--text-color: #3b3b3b; --text-bg: #F5F5F5");
      }
    }

    function startValue(value) {

      if (value == 0.25) {
        return 2;
      } else if (value == 0.33) {
        return 2;
      } else if (value == 0.50) {
        return 3;
      } else if (value == 0.66) {
        return 3;
      } else if (value == 0.75) {
        return 4;
      }
    }

    function ingridientsCalc(obj) {
      var colorArr = [];
      var textArr = [];
      var keys = Object.keys(obj);

      for (var i = 0; i < keys.length; i++) {
        var value = obj[keys[i]];
        var color = ingredientsColor(keys[i]);
        var textColor = ingredientsText(keys[i]);
        var name = keys[i].toUpperCase();
        var fraction = decimalToFraction(value);

        // call Mac - safari Workaround
        appleWorkaround(keys[i]);

        colorArr.push(color);
        textArr.push(textColor);

        jQuery('.ingredients').css("grid-template-columns", "repeat(" + keys.length + ",1fr)");
        if (keys.length == 2) {
          jQuery('.ingredients').css("margin", "0 75px 0 75px");
        } else {
          jQuery('.ingredients').css("margin", "0 0 0 0");
        }

        jQuery('.ingredients').append("<div class='ingredients-inner'><span class='drink-text'>" + name + "</span><div class='square s" + i + "'>" + fraction + "</div></div>");
        jQuery('.s' + i).css("background", colorArr[i]);
        jQuery('.s' + i).css("color", textArr[i]);

        if ((jQuery('#coffeeCup').data('theme')) == 'light') {
          jQuery('.square').css("box-shadow", "0 0 0 2.5px #D3D3D3");
        }
      }
    }

    function decimalToFraction(value) {
      var fraction;

      if (value == 0.25) {
        fraction = "1/4";
        return fraction;
      } else if (value == 0.33) {
        fraction = "1/3";
        return fraction;
      } else if (value == 0.50) {
        fraction = "2/4";
        return fraction;
      } else if (value == 0.66) {
        fraction = "2/3";
        return fraction;
      } else if (value == 0.75) {
        fraction = "3/4";
        return fraction;
      } else {
        fraction = "";
        return fraction;
      }
    }

    function liquid(type, value, start, part) {
      var border, top, x, color;

      color = ingredientsColor(type);

      if (part == 3) {
        border = 29.3;
        top = -87.8;
        x = 4;
      } else {
        border = 22;
        top = -66;
        x = 5;
      }

      for (var i = start; i < x; i++) {

        if (part == 3) {
          if ((i == 2)) {
            top = -58.6;
          } else if (i == 3) {
            top = -29.3;
          }
        } else {
          if ((i == 2)) {
            top = -44;
          } else if (i == 3) {
            top = -22;
          } else if (i == 4) {
            top = 22;
          }
        }
        jQuery('.coffee-icon-1 .coffee-cup .coffee .coffee-part-' + i).css(
          "top", top + "px");
        jQuery('.coffee-icon-1 .coffee-cup .coffee .coffee-part-' + i).css(
          "border-bottom", border + "px" + " solid " + color);

        if (part == 3) {
          jQuery('.coffee-icon-1 .coffee-cup .coffee .coffee-part-4').css({
            "border-bottom": "0px solid #fff"
          });

          jQuery('.coffee-icon-1 .cream .cream-part-1').css("height", "38px");

        } else {
          jQuery('.coffee-icon-1 .cream .cream-part-1').css("height", "50px");

        }
      }
    }

    function appleWorkaround(type){
      if (type == 'foam' || type == 'Ice Creme') {
        if (is_mac && !is_iPhone) {
          $('.coffee-icon-1 .coffee-cup').attr("style", "--cup-bottom-left: 0px;");
        }
      } else  {
        if (is_mac && !is_iPhone) {
          $('.coffee-icon-1 .coffee-cup').attr("style", "--cup-bottom-left: -1px;");
        }
      }     
    }



    function ingredientsColor(type) {
      if (type == 'coffee') {
        color = "#49362f";
      } else if (type == 'milk') {
        color = "#FFFFFF";
      } else if (type == 'foam') {
        color = "#fffdd0";
        foamColor(color);
      } else if (type == 'Ice Creme') {
        color = "#D8F3C9";
        foamColor(color);
        jQuery('.coffee-icon-1 .cream .choco').css({
          "display": "block"
        });

        jQuery('.coffee-icon-1').append("<div class='choco-bars'></div>");

      } else if (type == 'Chocolate') {
        color = "#9a5e32";
      } else if (type == 'Hot Water') {
        color = "#0f5e9c";
      }

      return color;
    }

    function ingredientsText(type) {
      var text;
      if (type == 'coffee') {
        text = "white";
      } else if (type == 'milk') {
        text = "black";
      } else if (type == 'foam') { 
        text = "black";
        if (is_mac && !is_iPhone) {
          $('.coffee-icon-1 .coffee-cup').attr("style", "--cup-bottom-left: 0px;");
        }        
      } else if (type == 'Ice Creme') {
        text = "black";
        if (is_mac && !is_iPhone) {
          $('.coffee-icon-1 .coffee-cup').attr("style", "--cup-bottom-left: 0px;");
        }        
      } 
      else if (type == 'Chocolate') {
        text = "white";
      } else if (type == 'Hot Water') {
        text = "white";
      }
      return text;
    }

    function foamColor(color) {

      jQuery('.steam').css({
        "display": "none"
      });

      jQuery('.coffee-icon-1 .cream').css({
        "display": "block"
      });

      jQuery('.coffee-icon-1 .cream .cream-part-1').css("background-color", color);
      jQuery('.coffee-icon-1 .cream .cream-part-2').attr("style", "--background-color: " + color);
      /*jQuery('.coffee-icon-1 .cream .cream-part-3').css("border-top", "4px solid " + color);
      jQuery('.coffee-icon-1 .cream .cream-part-3').css("border-left", "21px solid " + color);*/

      jQuery('.coffee-icon-1 .cream .cream-part-3').attr("style", "--foam-color: -21px 0" + color);


    }

    // Get selected value
    jQuery(document).on('change', '#coffeeSelect', function() {
      fillCup(jQuery(this).val());
    });

  }

}(jQuery));
