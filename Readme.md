# ArcGIS CartoDBLayer #

This is a custom Layer for use with the [ArcGIS JavaScript API.](http://help.arcgis.com/en/webapi/javascript/arcgis/)
This Layer will allow you to add [CartoDB](http://cartodb.com/) data
directly into your ArcGIS JavaScript Map.
This custom Layer utilizes the [Esri/geojson-utils](https://github.com/Esri/geojson-utils) library, however I [forked it](https://github.com/odoe/geojson-utils) to utilize AMD loading and made a minor fix to properly load GeoJSON MultiPolygons.
At the moment, it's set up for use with Polygons, but I will be adding
the option for users to provide their own symbology for they features.

You can see a sample of the CartoDBLayer in action [here](http://www.odoe.net/apps/arccartodb/)
