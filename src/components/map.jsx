import { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);

export default function MapIndonesiaChart() {
  useEffect(() => {
    const chart = am4core.create('chartDiv', am4maps.MapChart);

    // Set map definition
    chart.geodataSource.url = './src/utils/geoJson.json';
    chart.geodataSource.events.on('parseended', function (event) {
      let data = [];
      for (var i = 0; i < event.target.data.features.length; i++) {
        const feature = event.target.data.features[i];
        data.push({
          id: feature.id,
          value: 2000
        });
      }
      polygonSeries.data = data;
    });

    // Set projection
    chart.projection = new am4maps.projections.Mercator();

    // Add zoom control
    chart.zoomControl = new am4maps.ZoomControl();

    // Set initial zoom
    chart.homeZoomLevel = 1;

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.mapPolygons.template.strokeWidth = 0.5;

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    var heatColors = [am4core.color('#6741D9'), am4core.color('#6741D9')];

    polygonSeries.mapPolygons.template.adapter.add('fill', function (fill, mapPolygon) {
      var workingValue = mapPolygon.dataItem.values['value'].workingValue;
      var minValue = polygonSeries.dataItem.values['value'].low;
      var maxValue = polygonSeries.dataItem.values['value'].high;
      var percent = (workingValue - minValue) / (maxValue - minValue);

      if (am4core.type.isNumber(percent)) {
        if (percent > 0.5) {
          return new am4core.Color(
            am4core.colors.interpolate(heatColors[1].rgb, (percent - 0.5) * 2)
          );
        } else {
          return new am4core.Color(
            am4core.colors.interpolate(heatColors[0].rgb, heatColors[1].rgb, percent * 2)
          );
        }
      }
      return fill;
    });

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;

    polygonTemplate.tooltipText = '{name}: {value}';
    polygonTemplate.fill = am4core.color('#2E6B35');

    // Create hover state and set alternative fill color
    var hoverState = polygonSeries.mapPolygons.template.states.create('hover');
    hoverState.adapter.add('fill', function (fill) {
      return fill.lighten(-0.1);
    });

    // Create active state
    var activeState = polygonTemplate.states.create('active');
    activeState.properties.fill = '#2E6B35';

    // Create an event to toggle "active" state
    polygonTemplate.events.on('hit', function (event) {
      event.target.isActive = !event.target.isActive;
    });
    return () => {
      // Dispose the chart object when the component unmounts
      chart.dispose();
    };
  }, []);
  return <div id="chartDiv" style={{ width: '100%', height: '100%' }} />;
}
