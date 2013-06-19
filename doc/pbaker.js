//
// 
//
function pbaker_panorama(server, imagetype, targetdiv) {
        var extent = new OpenLayers.Bounds(-320037508.34, -7207508.34, 320037508.34, 7207508.34);
        var options = {
                restrictedExtent: extent
            }
        map = new OpenLayers.Map(targetdiv, options);
        map.reversed = true; // this has only an effect if you use the pbaker openlayers patch
        OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
        OpenLayers.Util.onImageLoadErrorColor = "transparent";
        var mapnik         = new OpenLayers.Layer.OSM("New Layer", [ server + "/${z}/${x}/${y}." + imagetype] ,  { tileOptions: { crossOriginKeyword: null } , attribution: "" ,
                                                                                  transitionEffect: "resize" , numZoomLevels: 7 , buffer: 5 });
        var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position       = new OpenLayers.LonLat(13.41,52.52).transform( fromProjection, toProjection);
        var zoom           = 1;
        map.addLayer(mapnik);
        map.addControl(new OpenLayers.Control.Navigation({
                dragPanOptions:{enableKinetic: true,documentDrag: true, interval: 10},
                zoomWheelEnabled: true, cursor: 'crosshair'
        }));

        map.setCenter(position, 2 );

}

