require([
  'esri/map',
  'esri/graphicsUtils',
  'esri/symbols/SimpleFillSymbol',
  'esri/symbols/SimpleLineSymbol',
  'esri/Color',
  './../CartoDBLayer.js',
  'dojo/domReady!'
], function(
  Map, graphicsUtils,
  SimpleFillSymbol,
  SimpleLineSymbol,
  Color,
  CartoDBLayer
) {
  var map = new Map('map', {
    center: [-118, 34.5],
    zoom: 8,
    basemap: 'topo'
  });

  var params = {
    user: 'odoe',
    symbolDictionary: {
      polygon: new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([153, 50, 204]), 2),
          new Color([255, 255, 0, 0.25])
      )
    }
  };

  var cartodbLayer = new CartoDBLayer(params);

  map.addLayers([cartodbLayer]);

  var query = "SELECT * FROM laco_parks";
  cartodbLayer.on('querySuccess', function (features) {

    if (features.length > 0) {
      map.setExtent(graphicsUtils.graphicsExtent(features));
    }

  });

  cartodbLayer.query(query);

});
