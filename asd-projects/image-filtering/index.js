// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here

  applyFilter(reddify);
  applyFilter(decreaseBlue);
  applyFilter(increaseGreenByBlue);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
    for (var row = 0; row < image.length; row++) {
        for (var col = 0; col < image[row].length; col++) {
            var rgbString = image[row][col];
            var rgbArray = rgbStringToArray(rgbString);
            filterFunction(rgbArray);
            image[row][col] = rgbArrayToString(rgbArray);
        }
    }
}

// Renamed this version of applyAndRender to avoid overwriting the real one
function applyAndRender_Extra() {
    applyFilter(reddify);
    applyFilter(decreaseBlue);
    applyFilter(increaseGreenByBlue);
}


// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
    var background = rgbStringToArray(image[0][0]);
    for (var row = 0; row < image.length; row++) {
        for (var col = 0; col < image[row].length; col++) {
            var rgbString = image[row][col];
            var rgbArray = rgbStringToArray(rgbString);
            if (!arraysEqual(rgbArray, background)) {
                filterFunction(rgbArray);
                image[row][col] = rgbArrayToString(rgbArray);
            }
        }
    }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(value) {
    if (value < 0) {
        return 0;
    } else if (value > 255) {
        return 255;
    } else {
        return value;
    }
}

// TODO 3: Create reddify function
function reddify(rgb) {
    rgb[0] = 255;
}

// TODO 6: Create more filter functions
function decreaseBlue(rgb) {
    rgb[2] = keepInBounds(rgb[2] - 50);
}

function increaseGreenByBlue(rgb) {
    rgb[1] = keepInBounds(rgb[1] + rgb[2]);
}

// Helper function to compare arrays for background filtering
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// CHALLENGE code goes below here
