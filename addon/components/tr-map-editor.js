import Ember from "ember";
import Component from "@ember/component";
import layout from "../templates/components/tr-map-editor";
import { computed } from "@ember/object";
import { reads } from "@ember/object/computed";

export default Component.extend({
    layout,
    googleMapsApi: Ember.inject.service(),

    init() {
        let self = this;

        this._super(...arguments);
        this.set("_google", this.get("googleMapsApi.google"));
        this.get("_google").then(function(google) {
            self.set("geocoder", new google.maps.Geocoder());
            self.notifyPropertyChange("_polyLineIcons");
        });

        if (this.get("autoGeocode") === true) {
            this.addObserver("address", this, "_autoGeocodeAddress");
            this.addObserver("geocoder", this, "_autoGeocodeAddress");
            this._autoGeocodeAddress();
        }
    },

    _google: null,

    classNames: "tr-map-editor",

    geocoder: null,

    autoGeocode: false,

    zoom: 2,
    lat: 0.0001,
    lng: 0.0001,
    title: null,

    address: null,
    disableAddressSearch: false,
    disableCoordinates: false,

    color: "#222",
    lineSymbol: null,

    coordinates: null,
    connectCoordinates: false,
    showCoordinateMarkers: true,

    disableDefaultUI: true,
    zoomControl: true,

    streetViewControl: false,

    onMarkerClick: null,

    _polyLineIcons: computed("symbol", function() {
        let symbol = (this.get("lineSymbol") || "").toUpperCase(),
            google = this.get("_google"),
            maps = google.get("maps"),
            _icons = [
                {
                    icon: null,
                    offset: "100%",
                },
            ];

        if (!google || !maps) return null;

        switch (symbol) {
            case "CIRCLE":
                _icons[0].icon = maps.SymbolPath.CIRCLE;
                return _icons;
            case "BACKWARD_CLOSED_ARROW":
                _icons[0].icon = maps.SymbolPath.BACKWARD_CLOSED_ARROW;
                return _icons;
            case "FORWARD_CLOSED_ARROW":
                _icons[0].icon = maps.SymbolPath.FORWARD_CLOSED_ARROW;
                return _icons;
            case "BACKWARD_OPEN_ARROW":
                _icons[0].icon = maps.SymbolPath.BACKWARD_OPEN_ARROW;
                return _icons;
            case "FORWARD_OPEN_ARROW":
                _icons[0].icon = maps.SymbolPath.FORWARD_OPEN_ARROW;
                return _icons;
            default:
                return null;
        }
    }),

    _autoGeocodeAddress() {
        this.geocodeAddress(this.get("address"), false);
    },

    geocodeAddress(address, updateAddress) {
        let self = this,
            geocoder = this.get("geocoder");

        if (!geocoder) {
            return;
        }

        geocoder.geocode({ address: address }, function(results, status) {
            if (status === "OK") {
                let result = results[0];
                self.setProperties({
                    lat: result.geometry.location.lat(),
                    lng: result.geometry.location.lng(),
                });
                if (updateAddress !== false) {
                    self.set("address", result.formatted_address);
                }
            } else {
                //Ember.Warn('Geocode was not successful for the following reason: ' + status);
                self.setProperties({
                    lat: null,
                    lng: null,
                    zoom: 1,
                });
            }
        });
    },

    actions: {
        geocodeAddress() {
            this.geocodeAddress(this.get("address"));
        },
        onClick(event) {
            this.setProperties({
                lat: event.googleEvent.latLng.lat(),
                lng: event.googleEvent.latLng.lng(),
            });
        },
        onMarkerClick(args) {
            let onMarkerClick = this.get("onMarkerClick");
            if (onMarkerClick) {
                onMarkerClick(args);
            }
        },
    },
});
