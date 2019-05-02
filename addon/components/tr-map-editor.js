import Ember from 'ember';
import Component from '@ember/component';
import layout from '../templates/components/tr-map-editor';
import { reads } from '@ember/object/computed';

export default Component.extend({
    layout,

    init() {
        this._super(...arguments);
        if(this.get('autoGeocode') === true) {
            this.addObserver('address', this, '_autoGeocodeAddress');
            this.addObserver('geocoder', this, '_autoGeocodeAddress');
            this._autoGeocodeAddress();
        }
    },

    classNames: 'tr-map-editor',

    googleMapsApi: Ember.inject.service(),
    google: reads('googleMapsApi.google'),
    geocoder: Ember.computed(function() {
        let self = this;

        if(this._geocoder) return this._geocoder;

        let google = this.get('googleMapsApi.google');

        if(!google.isFulfilled) {
            google.then(function() {
                self.notifyPropertyChange('geocoder');
            });
            return null;
        }

        if(google.content && google.content.maps) return this._geocoder = new google.content.maps.Geocoder();
        return null;
    }).volatile(),

    autoGeocode: false,

    zoom: 2,
    lat: 0.0001,
    lng: 0.0001,
    title: null,

    address: null,
    disableAddressSearch: false,
    disableCoordinates: false,

    disableDefaultUI: true,
    zoomControl: true,

    _autoGeocodeAddress() {
        this.geocodeAddress(this.get('address'), false)
    },

    geocodeAddress(address, updateAddress) {
        let self = this,
            geocoder = this.get('geocoder');

        if(!geocoder) {
            return;
        }

        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                let result = results[0];
                self.setProperties({
                    lat: result.geometry.location.lat(),
                    lng: result.geometry.location.lng()
                });
                if(updateAddress !== false) {
                    self.set('address', result.formatted_address);
                }
            } else {
                //Ember.Warn('Geocode was not successful for the following reason: ' + status);
                self.setProperties({
                    lat: null,
                    lng: null,
                    zoom: 1
                });
            }
        });
    },

    actions: {
        geocodeAddress() {
            this.geocodeAddress(this.get('address'));
        },
        onClick(event) {
            this.setProperties({
                lat: event.googleEvent.latLng.lat(),
                lng: event.googleEvent.latLng.lng()
            });
        }
    }
});
