// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata
      .filter(sampleObj => {
        return sampleObj.id == sample
      });
    console.log(data);

    // Create a variable that holds the samples array. 
    var result = resultArray[0];
    console.log(result);
    var wash_freq = result.wfreq;
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

    // 4. Create the trace for the gauge chart.
    var gaugeData = {


      width: 600,
      height: 500,
      margin: { t: 0, b: 0 }
    };

    Plotly.newPlot('gauge', gauge_trace, gaugeData)

  });

}
