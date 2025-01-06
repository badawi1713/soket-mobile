import {COLORS} from '@/constants/colors';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import Skeleton from './Skeleton';

type Props = {
  title?: string;
};

const BarChart: React.FC<Props> = ({title = ''}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const dataSource = {
    chart: {
      caption: '',
      yaxisname: '',
      aligncaptionwithcanvas: '0',
      plottooltext: "<i>$label</i>: <b>$dataValue</b>",
      theme: 'fusion',
      baseFont: 'Oxanium',
      baseFontSize: '14',
      baseFontColor: COLORS.common.black,
      showvalue: '1',
      valueFont: 'Oxanium',
      valueFontSize: '14',
      paletteColors: COLORS.primary.main,
    },
    data: [
      {label: 'Boiler Feed Water Pump Turbine #1', value: '41'},
      {label: 'MBFP #1C', value: '139'},
      {label: 'Boiler Feed Water Pump Turbine #1A', value: '38'},
      {label: 'Boiler Feed Water Pump Turbine #2A', value: '32'},
      {label: 'Pulverizer #1C', value: '126'},
      {label: 'Vacuum Pump #1B', value: '25'},
      {label: 'Steam Drum #1', value: '25'},
      {label: 'Seal Air Fan #1B', value: '24'},
      {label: 'Forced Draft Fan #1B', value: '22'},
      {label: 'Others', value: '10'},
    ],
  };

  const chartConfig = {
    type: 'bar2d',
    renderAt: 'chart-container',
    width: '100%',
    height: '100%',
    dataFormat: 'json',
    dataSource,
  };

  const chartHTML = `
    <!DOCTYPE html>
    <html>
          <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/3.21.1/fusioncharts.js"></script>
        <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/3.21.1/fusioncharts.widgets.js"></script>
        <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/3.21.1/themes/fusioncharts.theme.fusion.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200..600&display=swap" rel="stylesheet">
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
            display: flex;
            justify-content: center;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <div id="chart-container"></div>
        <script type="text/javascript">
          FusionCharts.ready(function () {
                     FusionCharts.options.license({
      key: 'lB-21D8ramD4A2I3I2B4D2C7E6D5F3H2I2crtE2D6D-11A-9qmzA7C8qgpC4D1I4D1B3D3E2E6C1G1B4F4B3B6C1E3gzzC1G4B1zB1E4B1oreA33A8B14cetB4A4H4gyB-33A7A3A3D6C1C4C1C3C5A2B2B-13vvF1B3EC2fbqE6D4G4i1sB8TD6B5iizH3H3B5D9A6D5B5B1F4D3H2C9C5C1f1==',
      creditLabel: false
    })
            var chart = new FusionCharts(${JSON.stringify(chartConfig)});
            chart.render();
          });
        </script>
      </body>
    </html>
  `;

  return isLoading ? (
    <View style={styles.loaderContainer}>
      <Skeleton width="100%" height="100%" borderRadius={5} />
    </View>
  ) : (
    <WebView
      originWhitelist={['*']}
      source={{html: chartHTML}}
      style={{flex: 1}}
      scalesPageToFit={true}
    />
  );
};

export default BarChart;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.common.white,
  },
});
