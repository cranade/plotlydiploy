// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    var resultArray = data
      .samples
      .filter(sampleObj => {
        return sampleObj.id == sample
      });

    var result = resultArray[0];

    var otu_ids = result.otu_ids.map(numericIds => {
      return numericIds;
    }).reverse();

    var sample_values = result.sample_values.reverse();
    var otu_labels = result.otu_labels.reverse();

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    //Plotly.newPlot();

    // 1. Create the trace for the bubble chart.
    var bubble_trace = {

      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values

      }
    };

    var data = [bubble_trace];

    var bubbleLayout = {
      title: "OTU ID",
      showlegend: false,

    };


    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', data, bubbleLayout)
  });
}
