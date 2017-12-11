"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var FormControl = ReactBootstrap.FormControl;

var key = localStorage._key ? Number(localStorage._key) : 0;

var RecipeBox = function (_React$Component) {
  _inherits(RecipeBox, _React$Component);

  function RecipeBox() {
    _classCallCheck(this, RecipeBox);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      recipes: localStorage._my_recipes ? JSON.parse(localStorage._my_recipes) : [{
        recipeName: "Spaghetti",
        ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"],
        key: key++
      }, {
        recipeName: "Onion Pie",
        ingredients: ["Onion", "Pie Crust", ""],
        key: key++
      }, {
        recipeName: "Lasagna",
        ingredients: ["Lasagna", "Salt", "Pepper", "Water"],
        key: key++
      }]
    };
    return _this;
  }

  RecipeBox.prototype.addRecipe = function addRecipe(recipe) {
    this.setState({
      recipes: this.state.recipes.concat(recipe)
    }, function () {
      if (typeof Storage !== "undefined") localStorage._key = recipe.key + 1;
    });
  };

  RecipeBox.prototype.deleteRecipe = function deleteRecipe(recipe) {
    this.setState({
      recipes: this.state.recipes.filter(function (item) {
        return JSON.stringify(item) === JSON.stringify(recipe) ? false : true;
      })
    });
  };

  RecipeBox.prototype.editRecipe = function editRecipe(oldRecipe, newRecipe) {
    this.setState({
      recipes: this.state.recipes.map(function (item) {
        return JSON.stringify(item) === JSON.stringify(oldRecipe) ? newRecipe : item;
      })
    });
  };

  RecipeBox.prototype.render = function render() {
    if (typeof Storage !== "undefined") localStorage._my_recipes = JSON.stringify(this.state.recipes);else console.log("browser does not support local storage. Recipes wont be saved upon refresh!");
    return React.createElement(
      "div",
      { id: "recipe-box" },
      React.createElement(AddRecipe, { addRecipe: this.addRecipe.bind(this) }),
      React.createElement(
        "h2",
        { id: "title" },
        "A Recipe Box"
      ),
      React.createElement(RecipeList, {
        recipes: this.state.recipes,
        editRecipe: this.editRecipe.bind(this),
        deleteRecipe: this.deleteRecipe.bind(this) })
    );
  };

  return RecipeBox;
}(React.Component);

var AddRecipe = function (_React$Component2) {
  _inherits(AddRecipe, _React$Component2);

  function AddRecipe() {
    _classCallCheck(this, AddRecipe);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this));

    _this2.state = {
      showModal: false
    };
    _this2.open = _this2.open.bind(_this2);
    _this2.close = _this2.close.bind(_this2);
    return _this2;
  }

  AddRecipe.prototype.open = function open() {
    this.setState({
      showModal: true
    });
  };

  AddRecipe.prototype.close = function close() {
    this.setState({
      showModal: false
    });
  };

  AddRecipe.prototype.addRecipe = function addRecipe(e) {
    e.preventDefault();
    if (ReactDOM.findDOMNode(this.refs.recipeName).value) {
      this.props.addRecipe({
        recipeName: ReactDOM.findDOMNode(this.refs.recipeName).value,
        ingredients: ReactDOM.findDOMNode(this.refs.ingredients).value.split(/ *,|, *|,/),
        key: key++
      });
      this.close();
    } else alert("You need to enter a recipe name!");
  };

  AddRecipe.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "add-recipe" },
      React.createElement(
        Button,
        { bsSize: "large", bsStyle: "success", onClick: this.open },
        React.createElement("span", { className: "fa fa-plus" })
      ),
      React.createElement(
        Modal,
        { show: this.state.showModal, onHide: this.close },
        React.createElement(
          "form",
          { onSubmit: this.addRecipe.bind(this) },
          React.createElement(
            Modal.Header,
            { closeButton: true },
            React.createElement(
              Modal.Title,
              null,
              "Enter a Recipe"
            )
          ),
          React.createElement(
            Modal.Body,
            null,
            "Recipe Name: ",
            React.createElement(FormControl, { ref: "recipeName" }),
            React.createElement("br", null),
            "Ingredients: ",
            React.createElement(FormControl, { ref: "ingredients", placeholder: "seperated by commas" }),
            React.createElement("br", null)
          ),
          React.createElement(
            Modal.Footer,
            null,
            React.createElement(
              Button,
              { type: "reset" },
              "Clear"
            ),
            React.createElement(
              Button,
              { type: "submit", bsStyle: "primary" },
              "Confirm"
            )
          )
        )
      )
    );
  };

  return AddRecipe;
}(React.Component);

var RecipeList = function (_React$Component3) {
  _inherits(RecipeList, _React$Component3);

  function RecipeList() {
    _classCallCheck(this, RecipeList);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  RecipeList.prototype.render = function render() {
    var _this4 = this;

    return React.createElement(
      "div",
      { id: "recipe-list" },
      this.props.recipes.map(function (recipe) {
        return React.createElement(Recipe, {
          key: recipe.key,
          recipe: recipe,
          deleteRecipe: _this4.props.deleteRecipe,
          editRecipe: _this4.props.editRecipe });
      })
    );
  };

  return RecipeList;
}(React.Component);

var Recipe = function (_React$Component4) {
  _inherits(Recipe, _React$Component4);

  function Recipe() {
    _classCallCheck(this, Recipe);

    var _this5 = _possibleConstructorReturn(this, _React$Component4.call(this));

    _this5.state = {
      showIngredients: false
    };
    return _this5;
  }

  Recipe.prototype.showIngredients = function showIngredients() {
    var toggle = this.state.showIngredients ? false : true;
    this.setState({
      showIngredients: toggle
    }, function () {
      this.state.showIngredients ? $("#" + this.props.recipe.key).slideDown() : $("#" + this.props.recipe.key).slideUp();
    });
  };

  Recipe.prototype.deleteRecipe = function deleteRecipe() {
    this.props.deleteRecipe(this.props.recipe);
  };

  Recipe.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "recipe" },
      React.createElement(
        "p",
        { className: "recipe-header", onClick: this.showIngredients.bind(this) },
        React.createElement(
          "b",
          null,
          this.props.recipe.recipeName.toUpperCase()
        ),
        React.createElement(
          "span",
          { className: "settings" },
          React.createElement(EditRecipe, { recipe: this.props.recipe, editRecipe: this.props.editRecipe }),
          React.createElement("span", { className: "fa fa-times", onClick: this.deleteRecipe.bind(this) })
        )
      ),
      React.createElement(
        "div",
        { id: this.props.recipe.key, className: "ingredients" },
        this.props.recipe.ingredients.map(function (ingredient) {
          return React.createElement(
            "p",
            null,
            ingredient
          );
        })
      )
    );
  };

  return Recipe;
}(React.Component);

var EditRecipe = function (_React$Component5) {
  _inherits(EditRecipe, _React$Component5);

  function EditRecipe(props) {
    _classCallCheck(this, EditRecipe);

    var _this6 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

    _this6.state = {
      showModal: false,
      recipeName: _this6.props.recipe.recipeName,
      ingredients: _this6.props.recipe.ingredients.join(", ")
    };
    _this6.open = _this6.open.bind(_this6);
    _this6.close = _this6.close.bind(_this6);
    return _this6;
  }

  EditRecipe.prototype.open = function open() {
    this.setState({
      showModal: true
    });
  };

  EditRecipe.prototype.close = function close() {
    this.setState({
      showModal: false
    });
  };

  EditRecipe.prototype.reset = function reset(e) {
    e.preventDefault();
    this.setState({
      recipeName: this.props.recipe.recipeName,
      ingredients: this.props.recipe.ingredients.join(", ")
    });
  };

  EditRecipe.prototype.updateRecipeName = function updateRecipeName(e) {
    this.setState({
      recipeName: e.target.value
    });
  };

  EditRecipe.prototype.updateIngredients = function updateIngredients(e) {
    this.setState({
      ingredients: e.target.value
    });
  };

  EditRecipe.prototype.editRecipe = function editRecipe(e) {
    e.preventDefault();
    if (this.state.recipeName) {
      this.props.editRecipe(this.props.recipe, {
        recipeName: this.state.recipeName,
        ingredients: this.state.ingredients.split(/ *,|, *|,/),
        key: this.props.recipe.key
      });
      this.close();
    } else alert("You must enter a recipe name!");
  };

  EditRecipe.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "add-recipe" },
      React.createElement("span", { className: "fa fa-pencil", onClick: this.open }),
      React.createElement(
        Modal,
        { show: this.state.showModal, onHide: this.close },
        React.createElement(
          "form",
          { onSubmit: this.editRecipe.bind(this) },
          React.createElement(
            Modal.Header,
            { closeButton: true },
            React.createElement(
              Modal.Title,
              null,
              "Edit ",
              this.props.recipe.recipeName
            )
          ),
          React.createElement(
            Modal.Body,
            null,
            "Recipe Name: ",
            React.createElement(FormControl, {
              ref: "recipeName",
              value: this.state.recipeName,
              onChange: this.updateRecipeName.bind(this) }),
            React.createElement("br", null),
            "Ingredients: ",
            React.createElement(FormControl, {
              ref: "ingredients",
              value: this.state.ingredients,
              onChange: this.updateIngredients.bind(this),
              placeholder: "seperated by commas" }),
            React.createElement("br", null)
          ),
          React.createElement(
            Modal.Footer,
            null,
            React.createElement(
              Button,
              { type: "reset", onClick: this.reset.bind(this) },
              "Reset"
            ),
            React.createElement(
              Button,
              { type: "submit", bsStyle: "primary" },
              "Confirm"
            )
          )
        )
      )
    );
  };

  return EditRecipe;
}(React.Component);

ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById('app'));