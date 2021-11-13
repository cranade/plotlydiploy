// Create the buildChart function.
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildGauge(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildGauge(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(key.toUpperCase() + ':' + value);
    })

  });
}
function buildGauge(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata
      .filter(sampleObj => {
        return sampleObj.id == sample
      });
    console.log(resultArray);

    var result = resultArray[0];
    console.log(result);
    var wash_freq = parseFloat(result.wfreq);
    console.log(wash_freq);
    // Create a variable that filters the samples for the object with the desired sample number.
    var gauge_trace = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wash_freq,
        title: { text: "Belly Button Washing Frequency <br> Scrubs per Week", font: { size: 18 } },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: "steelblue" },
          steps: [
            { range: [0, 1], color: 'rgba(0, 0, 0, 0.5)' },
            { range: [1, 2], color: 'rgba(0, 0, 0, 0.5)' },
            { range: [2, 3], color: 'rgba(183,28,28, .5)' },
            { range: [3, 4], color: 'rgba(183,28,28, .5)' },
            { range: [4, 5], color: 'rgba(249, 168, 37, .5)' },
            { range: [5, 6], color: 'rgba(249, 168, 37, .5)' },
            { range: [6, 7], color: 'rgba(110, 154, 22, .5)' },
            { range: [7, 8], color: 'rgba(110, 154, 22, .5)' },
            { range: [8, 9], color: 'rgba(14, 127, 0, .5)' },
            { range: [9, 10], color: 'rgba(14, 127, 0, .5)' }
          ],
        }
      }
    ];


    var gaugeData = {


      width: 600,
      height: 500,
      margin: { t: 0, b: 0 }
    };

    Plotly.newPlot('gauge', gauge_trace, gaugeData)

  });

}