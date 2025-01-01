import type React from 'react';
import { WebView } from 'react-native-webview';

const EfficiencyChart: React.FC = () => {
	const chartHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/3.21.1/fusioncharts.js"></script>
        <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/3.21.1/fusioncharts.timeseries.js"></script>
        <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/3.21.1/themes/fusioncharts.theme.fusion.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200..800&display=swap" rel="stylesheet">
        <style>
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          #chart-container {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div id="chart-container"></div>
        <script type="text/javascript">
          FusionCharts.ready(function() {

            FusionCharts.options.license({
              key: "lB-21D8ramD4A2I3I2B4D2C7E6D5F3H2I2crtE2D6D-11A-9qmzA7C8qgpC4D1I4D1B3D3E2E6C1G1B4F4B3B6C1E3gzzC1G4B1zB1E4B1oreA33A8B14cetB4A4H4gyB-33A7A3A3D6C1C4C1C3C5A2B2B-13vvF1B3EC2fbqE6D4G4i1sB8TD6B5iizH3H3B5D9A6D5B5B1F4D3H2C9C5C1f1==",
              creditLabel: false
            });

            const data = [
              ["2024-12-31 10:37", 83.89, 0.0, 0.0, 83.89],
              ["2024-12-31 10:38", 83.9, 0.0, 0.0, 83.9],
              ["2024-12-31 10:39", 83.9, 0.0, 0.0, 83.9],
              ["2024-12-31 10:40", 83.9, 0.0, 0.0, 83.9],
              ["2024-12-31 10:41", 83.9, 0.0, 0.0, 83.9],
              ["2024-12-31 10:42", 83.91, 0.0, 0.0, 83.91],
              ["2024-12-31 10:43", 83.91, 0.0, 0.0, 83.91],
              ["2024-12-31 10:44", 83.9, 1.0, 0.0, 83.9],
              ["2024-12-31 10:45", 83.9, 1.0, 0.0, 83.9],
              ["2024-12-31 10:46", 83.9, 1.0, 0.0, 83.9]
            ];

            const schema = [
              { name: "Time", type: "date", format: "%Y-%m-%d %H:%M" },
              { name: "Boiler Eff", type: "number" },
              { name: "SOPT Run", type: "number" },
              { name: "COPT Run", type: "number" },
              { name: "Eff Baseline", type: "number" }
            ];

            const fusionTable = new FusionCharts.DataStore().createDataTable(data, schema);

            const chart = new FusionCharts({
              type: "timeseries",
              renderAt: "chart-container",
              width: "100%",
              height: "100%",
              
              dataSource: {
                chart: {
                  caption: {
                    text: "Combined Performance Chart"
                  },
                  subcaption: {
                    text: "Boiler Efficiency, Sootblow, and Combustion Run"
                  },
                  showLegend: true,
                  theme: "fusion",
                        baseFont: "Oxanium", // Change font family
                   legendItemFont: "Oxanium",
            legendItemFontSize: "12",
            drawCustomLegend: "1",
            legendPosition: "bottom", // Place legend at the bottom
    legendItemFontSize: "10", // Set legend font size
    legendItemFontBold: "1", // Make legend text bold
    legendIconScale: "1", // Increase size of legend icons
    legendPadding: "1", // Add padding around the legend
            chartLeftMargin: "0",
            chartTopMargin: "0",
            chartRightMargin: "0",
            chartBottomMargin: "0",
            legendNumRows: 2,
        legendNumColumns: 2,
            multiCanvas: false,
            paletteColors: '#00A152, #ffa000, #2196F3, #ff0000',
                },
                 extensions: {
            customRangeSelector: {
              enabled: "0",
            },
          },
          style: {
    text: {
      fontFamily: "Oxanium", // Apply font to all text
    },
legend: {
      fontFamily: "Oxanium",
    position: "bottom",
    scrollable: false, // Ensures legend is not scrollable
  },

    tooltip: {
      fontFamily: "Oxanium",
    },
  },
              yaxis: [
    {
      title: "Running",
      plot: [
        {
          value: "SOPT Run",
          type: "step-line"
        },
        {
          value: "COPT Run",
          type: "step-line"
        }
      ],
      orientation: "left", // Left Y-axis
      min: 0,
      max: 1.1,
      format: {
      orientation: "right", // Right Y-axis
        defaultFormat: 0,
        round: 1
      }
    },
    {
      title: "Efficiency",
      plot: [
        {
          value: "Boiler Eff",
          type: "line"
        },
        {
          value: "Eff Baseline",
          type: "line"
        }
      ],
      format: {
        suffix: "%",
        defaultFormat: 0,
        round: 1
      }
}],
                data: fusionTable
              }
            });

            chart.render();
          });
        </script>
      </body>
    </html>
  `;

	return (
		<WebView
			originWhitelist={['*']}
			source={{ html: chartHTML }}
			style={{ flex: 1, minHeight: 420 }}
			scalesPageToFit={true}
			javaScriptEnabled={true}
		/>
	);
};

export default EfficiencyChart;
