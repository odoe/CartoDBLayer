define([
  'dojo/_base/declare',
  'dojo/request',

  'esri/InfoTemplate',
  'esri/layers/GraphicsLayer',
  'esri/graphic',
  'esri/geometry/webMercatorUtils',

  'dojo/json'
], function(
  declare,
  request,
  InfoTemplate, GraphicsLayer, Graphic,
  webMercatorUtils,
  dojoJSON
) {


  var _cartodbLayer = {};
  /*
   * params must contain
   * - user <string> CartoDB User Name
   * - symbolDictionary <object> Dictionary of symbols for features.
   *   - symbol options: point | mulitpoint | polyline | polygon
   * - infoTemplate <esri/InfoTemplate>
   */
  _cartodbLayer.constructor = function(params /*object*/) {

    var urlBuilder = [
      '//',
      this._params.user,
      '.cartodb.com/api/v2/sql?format=GeoJSON&q='
    ];
    this.url = urlBuilder.join('');

    this._params.symbolDictionary = params.symbolDictionary || null;
    this._params.infoTemplate = params.infotemplate || null;

  };

  /**
   * The main query function of the CartoDBLayer
   * @param {string} queryString
   */
  _cartodbLayer.query = function(queryString /*string*/) {

    var _url = this.url.concat(queryString);

    request(_url).then(function (data) {
      var geojson = dojoJSON.parse(data);
      // assumes global Terraformer with ArcGIS Parser loaded
      // http://terraformer.io/
      var esriJson = Terraformer.ArcGIS.convert(geojson);

      esriJson.map(function(x) {
        if (x.geometry) {
          var graphic = new Graphic(x);

          //project geometry to web mercator if needed
          if (graphic.geometry.spatialReference.wkid === 4326){
            graphic.setGeometry(
              webMercatorUtils.geographicToWebMercator(graphic.geometry)
            );
          }

          //set symbol for graphic and set info template
          if (!!this._params.symbolDictionary) {
            graphic.setSymbol(
              this._params.symbolDictionary[graphic.geometry.type]
            );
          } else {
            return this.emit('queryDrawError', {
              message: 'No symbolDictionary for feature'
            });
          }

          if (!!this._params.infoTemplate) {
            graphic.setInfoTemplate(this._params.infoTemplate);
          } else {
            graphic.setInfoTemplate(new InfoTemplate("Attributes", "${*}"));
          }
          this.add(graphic);
        }
      }.bind(this));

      this.emit('querySuccess', this.graphics);

    }.bind(this));

  };

  var CartoDBLayer = declare([GraphicsLayer], _cartodbLayer);

  return CartoDBLayer;

});

