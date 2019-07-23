import Controller from "@ember/controller";

export default Controller.extend({
    isAutoGeocode: true,
    isDisableCoordinates: true,
    isDisableAddressSearch: true,
    disableDefaultUI: false,
    streetViewControl: false,
    zoomControl: false,
    zoomLevel: 1,
    addressString: "Alser Str. 18, 1090 Wien, Österreich",
    init() {
        this._super(...arguments);
        // BEGIN-SNIPPET tr-map-editor.js
        // END-SNIPPET
    },
    actions: {},
});
