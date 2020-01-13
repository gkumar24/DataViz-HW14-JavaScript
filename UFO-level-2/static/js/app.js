// from data.js
//----------------------------
var tData = data.map(function (info) {
    return {
        "datetime": info.datetime,
        "city": info.city,
        "state": info.state.toUpperCase(),
        "country":info.country.toUpperCase(),
        "shape":info.shape,
        "durationMinutes":info.durationMinutes,
        "comments":info.comments
    }
});

//Get list of unique Countries
//----------------------------
var countryUniqueList = [""];
var countryList = tData.map(function(info) {
    return info.country
});
//List of Unique Countries
countryUnique = countryList.filter(UniqueFilter);
//Create the final list of sorted country list
countryUniqueList = countryUniqueList.concat(countryUnique.sort());
//console.log(countryUnique);


//Get list of unique states
//----------------------------
var stateUniqueList = [{"country":"","state":""}];

countryUnique.forEach((country) => {
    countryData = tData.filter(ufo => ufo.country === country)

    var stateList = countryData.map(function(info) {
        return info.state
    });

    //Create the list of sorted state list
    var stateUnique = stateList.filter(UniqueFilter).sort();

    //final list of state list
    stateUnique.forEach((state) => {
        stateUniqueList.push({"country":country,"state":state});
    });        
});
// console.log(stateUniqueList)

//Get list of unique shape
//----------------------------
var shapeUniqueList = [""];
var shapeList = tData.map(function(info) {
    return info.shape
});
//List of Unique shapes
shapeUnique = shapeList.filter(UniqueFilter);
//Create the final list of sorted shape list
shapeUniqueList = shapeUniqueList.concat(shapeUnique.sort());



/*------------------Function to get index of value -----------------------------------------------*/
function UniqueFilter(value, index, self){
    return self.indexOf(value) === index
};
/*-------------------------------------------------------------------------------------------------*/

/*------------------Filter drop down for Country -----------------------------------------------*/
function dropdownCountry(countryList) {
    //Populate dropdown for each of the country
    var countryDropdown = d3.select("#country")

    countryDropdown.selectAll("option")
        .data(countryList)
        .enter()
        .append("option")
        .attr("value",function(d){return d})
        .text(function(d){return d})
};
/*-------------------------------------------------------------------------------------------------*/


/*------------------Filter drop down for state -----------------------------------------------*/
function dropDownState(stateListDict){
    //Populate dropdown for each of the country
    var countryDropdown = d3.select("#state")
    countryDropdown.html("")
    countryDropdown.selectAll("option")
        .data(stateListDict)
        .enter()
        .append("option")
        .attr("value",function(d){return d.state})
        .text(function(d){return d.state})
};
/*---------------------------------------------------------------------------------*/

/*------------------Filter drop down for Country -----------------------------------------------*/
function dropdownshape(shapeList) {
    //Populate dropdown for each of the country
    var shapeDropdown = d3.select("#shape")

    shapeDropdown.selectAll("option")
        .data(shapeList)
        .enter()
        .append("option")
        .attr("value",function(d){return d})
        .text(function(d){return d})
};
/*-------------------------------------------------------------------------------------------------*/


/*------------------Populate Table -----------------------------------------------*/
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
/*-------------------------------------------------------------------------------*/


/*------------------Populate initial data -----------------------------------------------*/
populateTable(tData);
dropdownCountry(countryUniqueList)
dropDownState(stateUniqueList)
dropdownshape(shapeUniqueList)
/*---------------------------------------------------------------------------------------*/





/*------------------Filter Event Handling -----------------------------------------------*/
// Filter button event
var filterButton = d3.select("#filter-btn");
// Filter button event
filterButton.on("click", function () {

    filteredData = tData

    // Get filter values
    var filterDate = d3.select("#datetime").property("value");
    var filterCity = d3.select("#city").property("value");
    var filterState = d3.select("#state").node().value;
    var filterCountry = d3.select("#country").node().value;
    var filterShape = d3.select("#shape").node().value;
    var filterDuration = d3.select("#duration").property("value");
    var filterComments = d3.select("#comments").property("value");


    if (filterDate != "") {
        //filtered data by the passed filter date value
        var filteredData = filteredData.filter(ufo => ufo.datetime === filterDate);
    }

    if (filterCountry != "") {
        //filtered data by the passed filter date value
        var filteredData = filteredData.filter(ufo => ufo.country === filterCountry);
    }

    if (filterState != "") {
        //filtered data by the passed filter date value
        var filteredData = filteredData.filter(ufo => ufo.state === filterState);
    }

    if (filterCity != "") {
        //filtered data by the passed filter date value
        var filteredData = filteredData.filter(ufo => {
            return ufo.city.search(new RegExp(filterCity, "i")) >= 0
        });
    }

    if (filterShape != "") {
        //filtered data by the passed filter date value
        var filteredData = filteredData.filter(ufo => ufo.shape === filterShape);
    }

    if (filterComments != "") {
        // given UFO data, filtered by the passed filter date value
        var filteredData = filteredData.filter(ufo => {
            return ufo.comments.search(new RegExp(filterComments, "i")) >= 0
        });
    };

    //Call function to populate the table.
    populateTable(filteredData);

});
/*-------------------------------------------------------------------------------*/


/*------------------reset Section -----------------------------------------------*/
// reset button event
var resetButton = d3.select("#reset-btn");
//  button event
resetButton.on("click", function () {
    //Clear Search Field
    d3.select("#datetime").property("value", "")
    d3.select("#comments").property("value", "")
    d3.select("#city").property("value", "")

    var countryEle = document.getElementById("country")
    countryEle.selectedIndex = 0;

    var stateEle = document.getElementById("state")
    stateEle.selectedIndex = 0;

    var shapeEle = document.getElementById("shape")
    shapeEle.selectedIndex = 0;

    //Call function to populate the table.    
    populateTable(tData);
});
/*-------------------------------------------------------------------------------*/


/*------------------change state list when country is selected-------------------*/
d3.select("#country").on("change", function(){
    countrySelected = this.options[this.selectedIndex].value;
    
    stateSubset = [{"country":"","state":""}];
    stateSubset = stateSubset.concat(stateUniqueList.filter(s => s.country == countrySelected))

    dropDownState(stateSubset);
});

/*-------------------------------------------------------------------------------*/