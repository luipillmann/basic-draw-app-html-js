var FormView = function(container,model) {

	// We store the list HTML object in the object (this.list)
	// and local (list) variable so we can both access 
	// them from the controller and use locally.
	var list = this.list = container.find("#shapeList");

	// Also, we want access to the container from the controller
	// so we store it in the object property
	this.container = container;

	var selectedShape;

	// Register to listen for updates from the model. We need
	// to also implement update method (see bellow) that will 
	// be called by the model on each change.
	model.addObserver(this);

	// Function for loading all the shapes to the list.
	var loadShapes = function() {
		// clear anything that's in the list
		list.html("");
		for (var i = 0; i<model.getShapes().length; i++) {
			var shape = model.getShapes()[i];
			var option = $("<option/>");
			option.text(shape.type + ":" + shape.x + ", " + shape.y + ", " + shape.h + ", " + shape.w);
			list.append(option);
		}

	}

	// Function that populates the form based on currently
	// selected shape.
	this.selectShape = function(index) {
		selectedShape = index;
		shape = model.getShapes()[index];
		container.find("#x").val(shape.x);
		container.find("#y").val(shape.y);
		container.find("#h").val(shape.h);
		container.find("#w").val(shape.w);
	}

	// The observer update function, triggered by the model when there are changes
	this.update = function() {
		loadShapes();
	}

	// Finally, we want to load all the shapes on initialization
	loadShapes();
};