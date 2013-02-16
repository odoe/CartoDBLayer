/**
 * @author rrubalcava@odoe.net (Rene Rubalcava)
 */
/*global console window define require esri */
(function() {
    'use strict';

    define('views/map/MapView',[
        'dojo/_base/declare',
        'dojo/_base/connect',
        'dojo/Evented',
        'helpers/popuphelper',
        'extras/CartoDBLayer'
        ], function(declare, connect, Evented, popup, CartoDBLayer) {

            var _mapView = {};
            _mapView.map = null;
            _mapView.render = function() {

                var mapOptions,
                    params,
                    cartodbLayer,
                    query,
                    self,
                    handle,
                    mapLoadHandler;

                mapOptions = {
                    basemap: 'gray',
                    autoResize: true,
                    infoWindow: popup.create(),
                    center: [-118.22927499999803, 34.23848510514369],
                    zoom: 10
                };

                this.map = new esri.Map('map', mapOptions);


                // params are very simple so far
                params = {
                    user: 'odoe'
                };

                cartodbLayer = new CartoDBLayer(params);
                this.map.addLayer(cartodbLayer);
                query = "SELECT * FROM laco_parks";
                self = this;
                cartodbLayer.on('querySuccess', function (features) {

                    if (features.length > 0) {
                        self.map.setExtent(esri.graphicsExtent(features));
                    }

                });

                cartodbLayer.query(query);

                mapLoadHandler = function(scope) {

                    connect.disconnect(handle);

                    return function(results) {

                        cartodbLayer.query(query);
                        scope.emit('mapIsReady', {
                            map: scope.map
                        });
                    };

                };

                handle = connect.connect(this.map, 'onLoad', mapLoadHandler(this));

                return this;

            };

            /**
             * Map View Controller
             * @constructor
            */
            var MapView = declare([Evented], _mapView);

            return MapView;

        });

}).call(this);

