/**
 * @author rrubalcava@odoe.net (Rene Rubalcava)
 */
/*global console define require esri*/
(function() {
    'use strict';

    define([
        'dojo/_base/declare',
        'dojo/query',
        'views/map/MapView'
        ], function(declare, query, MapView) {

            var _vm = {};
            /**
             * Render function that will start viewable items
             * @return {ViewManager} Returns itself
             */
            _vm.render = function () {

                var mapView = new MapView();
                mapView.render();

                return this;
            };

            /**
             * ViewManager Controller that handles what widgets are added to application
             * @constructor
             */
            var VM = declare([], _vm);

            return VM;

        });

}).call(this);
