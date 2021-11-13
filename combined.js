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
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildBarCharts(newSample);
    buildGauge(newSample);
    buildBubble(newSample);
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    buildBubble(newSample);
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
// 1. Create the buildCharts function.
function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
        // 3. Create a variable that holds the samples array. 
        var resultArray = data
            // 4. Create a variable that filters the samples for the object with the desired sample number.
            .samples
            //  5. Create a variable that holds the first sample in the array.
            .filter(sampleObj => {
                return sampleObj.id == sample
            });
        var result = resultArray[0];

        // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        var top_ten_otu_ids = result.otu_ids.slice(0, 10).map(numericIds => {
            return 'OTU ' + numericIds;
        }).reverse();

        // 7. Create the yticks for the bar chart.
        // Hint: Get the the top 10 otu_ids and map them in descending order  
        var top_ten_sample_values = result.sample_values.slice(0, 10).reverse();
        var top_ten_otu_labels = result.otu_labels.slice(0, 10).reverse();
        //  so the otu_ids with the most bacteria are last. 

        // var yticks =

        // 8. Create the trace for the bar chart. 
        var barData = [
            {
                x: top_ten_sample_values,
                y: top_ten_otu_ids,
                text: top_ten_otu_labels,
                name: "Top 10",
                type: 'bar',
                orientation: 'h'
            }
        ];
        // 9. Create the layout for the bar chart. 
        var data = [barData];
        var barLayout = {
            title: "Top 10 OTUs",

        };
        // 10. Use Plotly to plot the data with the layout. 
        Plotly.newPlot('bar', barData, barLayout)
    });
}
//Build Bubble Charts
function buildBubble(sample) {
    d3.json("samples.json").then((data) => {
        var resultArray = data
            .samples
            .filter(sampleObj =>
                sampleObj.id == sample
            );

        var result = resultArray[0];

        var otu_ids = result.otu_ids

        var sample_values = result.sample_values;
        var otu_labels = result.otu_labels;

        var bubble_trace = [{

            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values

            }
        }];

        //var data = [bubble_trace];

        var bubbleLayout = {
            title: "OTU ID",
            showlegend: false,

        };

        Plotly.newPlot('bubble', bubble_trace, bubbleLayout)

    });
}

//Build Gaugechart

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