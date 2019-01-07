import Ember from 'ember';
import Component from '@ember/component';
import layout from '../templates/components/tr-map-editor';
import { reads } from '@ember/object/computed';

export default Component.extend({
    layout,
    classNames: 'tr-map-editor',

    googleMapsApi: Ember.inject.service(),
    google: reads('googleMapsApi.google'),
    geocoder: Ember.computed(function() {
        if(this._geocoder) return this._geocoder;

        let google = this.get('googleMapsApi.google').content;
        return this._geocoder = new google.maps.Geocoder();
    }),

    zoom: 11,
    lat: 0.0001,
    lng: 0.0001,
    title: null,

    address: null,

    disableDefaultUI: true,
    zoomControl: true,

    geocodeAddress(address) {
        let self = this,
            geocoder = this.get('geocoder');

        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                let result = results[0];
                self.setProperties({
                    lat: result.geometry.location.lat(),
                    lng: result.geometry.location.lng(),
                    address: result.formatted_address
                });
            } else {
                Ember.Warn('Geocode was not successful for the following reason: ' + status);
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
