// from data.js
var tableData = data;

// function to populate the table with data.
function populateTable(tableData) {
    //find the table body element, using d3 select
    var tableBody = d3.select("tbody");

    //clear the table body before populating. 
    tableBody.html("");

    // populate the table, using the data provided
    tableData.forEach((UFOSighting) => {
        var tableRow = tableBody.append("tr");
        Object.entries(UFOSighting).forEach(([key, value]) => {
            var rowCell = tableRow.append("td");
            rowCell.text(value);
        });
    });
};

// populate initial data
populateTable(tableData);

// Filter button event
var filterButton = d3.select("#filter-btn");

// Filter button event
filterButton.on("click", function() {
    // select the data input field, and the value
    var filterDate = d3.select("#datetime").property("value");

    //given UFO data, filtered by the passed filter date value
    var filteredData = tableData.filter(ufo => ufo.datetime === filterDate);

    //Call function to populate the table.
    populateTable(filteredData);
    
});
