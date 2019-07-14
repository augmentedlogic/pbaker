(function ( $ ) {
  $.fn.pbaker_panorama = function( options ) {

                    var settings = $.extend({
                         // These are the defaults.
                         url: "http://media.verbrannte-orte.de/38",
                         buffer: 2 ,
                         max_zoomlevel: 7,
                         zoom: 2 ,
                }, options );


        var extent = new OpenLayers.Bounds(-320037508.34, -7207508.34, 320037508.34, 7207508.34);
        var options = {
                restrictedExtent: extent
            }

        panorama = new OpenLayers.Map("container", options);
        panorama.reversed = true;

            OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
            OpenLayers.Util.onImageLoadErrorColor = "transparent";
            var mapnik         = new OpenLayers.Layer.OSM("New Layer", [settings.url + "/${z}/${x}/${y}.jpg"] ,  { tileOptions: { crossOriginKeyword: null } , attribution: "" ,
                                 transitionEffect: "resize" , numZoomLevels: 7 , buffer: 2 });
            var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
            var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
            var position       = new OpenLayers.LonLat(13.41,52.52).transform( fromProjection, toProjection);
            var zoom           = 1;
            panorama.addLayer(mapnik);
                panorama.addControl(new OpenLayers.Control.Navigation({
                    dragPanOptions:{enableKinetic: true,documentDrag: true, interval: 10},
                    zoomWheelEnabled: true, cursor: 'crosshair'
                }));

            panorama.setCenter(position, 2 );

            panorama.events.on({
                "mousemove":function(){
                   var temp = panorama.getCenter().transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326")).toShortString();
                   var co = temp.split(',');
                   // document.getElementById('direction').innerHTML = parseInt(co[0]);
                   jQuery("#compass_needle").css("-moz-transform", "rotate(" + parseInt(co[0]) + "deg)");
                   jQuery("#compass_needle").css("-webkit-transform", "rotate(" + parseInt(co[0]) + "deg)");
                 }
            });


  };
}( jQuery ));
