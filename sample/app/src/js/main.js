/**
* @author rrubalcava@odoe.net (Rene Rubalcava)
*/
/*global define require console esri location */
(function() {
  'use strict';

  require({
    async: true,
    parseOnLoad: true,
    aliases: [["text", "dojo/text"]],
    packages: [
      {
        name: "views",
        location: location.pathname.replace(/\/[^\/]+$/, "") + "js/views"
      }, {
        name: "helpers",
        location: location.pathname.replace(/\/[^\/]+$/, "") + "js/helpers"
      }, {
        name: "extras",
        location: location.pathname.replace(/\/[^\/]+$/, "") + "js/extras"
      },{
        name: "app",
        location: location.pathname.replace(/\/[^\/]+$/, "") + "js",
        main: "app"
      }
    ]
  });

  require(['app', 'helpers/shim', 'dojo/domReady!'], function(App) {

      App.initialize();

  });

}).call(this);
