//single state object
var state = {
    items: []
};
//functions that modify state
var addItem = function(state, item) {
    state.items.push(item);
};

var removeItem = function(state, item) {
	for(var i = 0; i < state.items.length; i++){
		if (state.items[i] === item) {
			state.items.splice(i, 1);
		} 
	}
}

//functions that render state
var renderList = function(state, element) {
    var itemsHTML = state.items.map(function(item) {
        return '<li id='+item+'> <span class="shopping-item">' + item + '</span>\
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
		$(this).closest("li").children().first().toggleClass('shopping-item__checked');
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
$(function(){
	emtpyExisting();
})

$(function(){
	addNewItem();
})

$(function(){
	checkItem();
})

$(function(){
	deleteItem();
})