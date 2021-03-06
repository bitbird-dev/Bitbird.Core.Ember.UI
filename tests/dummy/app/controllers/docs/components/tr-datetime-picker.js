import Controller from '@ember/controller';

export default Controller.extend({
    modeOptions: null,
    selectedMode: 'range',

    selectedDate: null,
    selectedItems: null,
    rangeBegin: null,
    rangeEnd: null,

    timeModeOptions: null,
    selectedTimeMode: null,

    weekNumberOptions: null,
    selectedWeekNumber: null,

    isOpen: false,
    animate: true,

    init() {
        this._super(...arguments);
        this.set('selectedWeekNumber', null);
        this.set('selectedDate', new Date());
        this.set('modeOptions', [
            {value: 'single', name: 'single'},
            {value: 'range', name: 'range'},
            {value: 'multiple', name: 'multiple'}
        ]);
        this.set('timeModeOptions', [
            {value: null, name: ''},
            {value: 'hm', name: 'hm'},
            {value: 'hms', name: 'hms'}
        ]);
        this.set('weekNumberOptions', [
            {value: null, name: ''},
            {value: 'iso', name: 'iso'}
        ]);
    },
    // BEGIN-SNIPPET tr-datetime-picker-actions.js
    actions: {
        toggleIsOpen() {
            this.toggleProperty('isOpen');
        },
        selectMode: function (selected) {
            this.set('selectedMode', selected);
        },
        selectTimeMode: function (selected) {
            this.set('selectedTimeMode', selected);
        },
        selectWeekNumber: function (selected) {
            this.set('selectedWeekNumber', selected);
        }
    },
    // END-SNIPPET
});
