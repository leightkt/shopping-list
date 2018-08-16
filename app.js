//single state object
var state = {
    items: []
};
//functions that modify state
var addItem = function(state, item) {
    state.items.push({
    	itemDisplay: item,
    	checked: false
    });
};

var removeItem = function(state, item) {
	state.items.splice(item, 1);
}

var checkIt = function(state, itemIndex){
	if (state.items[itemIndex].checked === true){
		state.items[itemIndex].checked = false; 
	} else {
		state.items[itemIndex].checked = true
	};	
}

var renderCheck = function(state){
	state.items.map(function(item){
		if(item.checked === true){
			var indexItem = state.items.indexOf(item);
			$('#'+indexItem).closest("li").children().first().addClass('shopping-item__checked');
		}
	});
}

//functions that render state
var renderList = function(state, element) {
    var itemsHTML = state.items.map(function(item) {
    	var indexItem = state.items.indexOf(item);
        return '<li id='+ indexItem +'> <span class="shopping-item">' + item.itemDisplay + '</span>\
			        <div class="shopping-item-controls">\
	          		<button class="shopping-item-toggle js-shopping-item-toggle">\
	            	<span class="button-label">check</span>\
	          		</button>\
	          		<button class="shopping-item-delete js-shopping-item-delete">\
	           		<span class="button-label">delete</span>\
	          			</button>\
	        		</div>\
      			</li>';
    	});
    element.html(itemsHTML);  
    renderCheck(state); 
};

//event listeners
//clear out existing content
function emtpyExisting () {
	$('.shopping-list').empty();
}
//add an item
function addNewItem () {
$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
    this.reset();
    });
}

//uncheck/check button
function checkItem () {
	$(document).on('click', "button.js-shopping-item-toggle", function() {
		checkIt(state, $(this).closest("li").attr("id"));
		renderList(state, $('.shopping-list'));
	});
}


// delete button
function deleteItem () {
	$(document).on('click', "button.js-shopping-item-delete", function() {
		removeItem(state, $(this).closest("li").attr("id"));  
	    renderList(state, $('.shopping-list'));
	});
}

//get rid of example text

	emtpyExisting();
	addNewItem();
	checkItem();
	deleteItem();
