/**
 * @author rrubalcava@odoe.net (Rene Rubalcava)
*/
/*global define esri console dojo*/
(function() {
    'use strict';

    define([
           'dojo/_base/declare',
           'dojo/Evented',
           'dojo/request',
           'dojo/json',
           'helpers/symbolHelper',
           'extras/jsonConverters'
    ], function(declare, Evented, request, dojoJSON, symbols, jsonConverters) {


        var _cartodbLayer = {};
        /*
        * params must contain
        * - user <string>
        */
        _cartodbLayer.constructor = function(params /*object*/) {

            var urlBuilder = [];
            urlBuilder.push('//');
            urlBuilder.push(this._params.user);
            urlBuilder.push('.cartodb.com/api/v2/sql?format=GeoJSON&q=');
            this.url = urlBuilder.join('');

        };

        /**
        * The main query function of the CartoDBLayer
        * @param {string} queryString
        */
        _cartodbLayer.query = function(queryString /*string*/) {

            var _url = this.url.concat(queryString),
            self = this;

            request(_url).then(function (data) {

                var geojson,
                esriJson,
                i,
                len;

                geojson = dojoJSON.parse(data);
                esriJson = jsonConverters.geoJsonConverter().toEsri(geojson);

                for (i = 0, len = esriJson.features.length; i < len; i++) {
                    var esriFeat = esriJson.features[i];
                    if (esriFeat.geometry) {
                        var graphic = new esri.Graphic(esriFeat);

                        //project geometry to web mercator if needed
                        if (graphic.geometry.spatialReference.wkid === 4326){
                            graphic.setGeometry(esri.geometry.geographicToWebMercator(graphic.geometry));
                        }

                        //set symbol for graphic and set info template
                        graphic.setSymbol(symbols.polygonSymbol());
                        graphic.setInfoTemplate(new esri.InfoTemplate("Attributes", "${*}"));
                        self.add(graphic);
                    }

                }

                self.emit('querySuccess', self.graphics);

            });

        };

        var CartoDBLayer = declare([esri.layers.GraphicsLayer, Evented], _cartodbLayer);

        return CartoDBLayer;

    });

}).call(this);

