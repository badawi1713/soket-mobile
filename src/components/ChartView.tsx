import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';
import React from 'react';
import { WebView } from 'react-native-webview';

export interface ChartData {
  label: string;
  value: string;
}

// Tipe untuk konfigurasi grafik


const dummyChartData: ChartData[] = [
  { label: 'Jan', value: '500000' },
  { label: 'Feb', value: '600000' },
  { label: 'Mar', value: '700000' },
  { label: 'Apr', value: '800000' },
  { label: 'May', value: '550000' },
  { label: 'Jun', value: '750000' },
];

const chartConfig = {
  type: 'column2d',
  width: '100%', // Atur lebar grafik
  height: '600', // Atur tinggi grafik
  dataFormat: 'json',
  dataSource: {
    chart: {
      caption: 'Monthly Supply',
      subCaption: '2024',
      xAxisName: 'Month',
      yAxisName: 'Power (watt)',
      numberSuffix: 'K',
      theme: 'fusion',
      baseFont: 'Oxanium', // Change font family
      baseFontSize: '14', // Font size
      baseFontColor: COLORS.common.black, // Font color
      paletteColors: COLORS.primary.main, // Bar color (hexadecimal or named colors)
    },
    data: dummyChartData,
  },
};

const FusionChartComponent: React.FC = () => {
  const chartHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200..800&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/3.21.1/fusioncharts.js"></script>
        <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/3.21.1/themes/fusioncharts.theme.fusion.js"></script>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          #chart-container {
            width: 100dvw;
            height: 100dvh;
          }
        </style>
      </head>
      <body>
        <div id="chart-container"></div>
        <script type="text/javascript">
          FusionCharts.ready(function() {
           
        FusionCharts.options.license({
      key: 'lB-21D8ramD4A2I3I2B4D2C7E6D5F3H2I2crtE2D6D-11A-9qmzA7C8qgpC4D1I4D1B3D3E2E6C1G1B4F4B3B6C1E3gzzC1G4B1zB1E4B1oreA33A8B14cetB4A4H4gyB-33A7A3A3D6C1C4C1C3C5A2B2B-13vvF1B3EC2fbqE6D4G4i1sB8TD6B5iizH3H3B5D9A6D5B5B1F4D3H2C9C5C1f1==',
      creditLabel: false
    })

            var chart = new FusionCharts(${JSON.stringify(chartConfig)});
            chart.render("chart-container");
          });
        </script>
      </body>
    </html>
  `;

  return (
   <>
    <WebView
      originWhitelist={['*']}
      source={{ html: chartHTML }}
      style={{ flex: 1, minHeight: 600 }}
      scalesPageToFit={true}
    />
   </>
  );
};

export default FusionChartComponent;
