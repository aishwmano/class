'use strict';
let state = {};

// Function to render an item
function renderItem(item, parent) {
    let li = $('<li>');
    let a = $(`<a href="${item.url}">${item.title}</a>`);
    li.append(a);
    li.append(`<span>: ${item.description}</span>`)
    parent.append(li);
}

// Load data
d3.csv("data/websites.csv").then(function(data) {    
    state.data = data;    
    updatePage();
})

// Function to render list of items
function renderList() {
    $("ul").empty();
    state.data.map(function(d){
        renderItem(d, $('ul'))
    })
}

// Track input state
$("input").on("input", function() {
    let id = $(this).attr("id");
    state[id] = $(this).val();
    updateButton();
})

// Event (push in data, update page)
$("form").on("submit", function() {
    event.preventDefault();
    state.data.push({url:state.url, description:state.description, title:state.title});
    updatePage();    
})


// Update page
function updatePage() {
    // Clear values
    $("input").val("");
    state.url = '';
    state.description = '';
    state.title = '';
    $("#page_title").text("Top " + state.data.length + " Blogs")
    renderList();
    updateButton();
}

// Toggle button class
function updateButton() {
    let klass = state.input == "" | state.url == "" | state.title == "" ? true : false; 
    $("button").attr("disabled", klass);
}