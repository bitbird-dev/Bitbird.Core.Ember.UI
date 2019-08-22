import Component from '@ember/component';
import { observer, computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import layout from '../templates/components/tr-datetime-picker';
import Ember from 'ember';
import Moment from 'moment';
import OutsideClick from '../mixins/tr-outside-click';
import { next } from '@ember/runloop';

export default Component.extend(OutsideClick, {
    layout,

    classNames: ['tr-editor', 'tr-datetime-picker'],
    classNameBindings: ['timeMode'],

    year: null,
    month: null,
    currentMonth: computed('year', 'month', function() {
        let y = this.get('year'),
            m = this.get('month');

        return new Date(y, m, 1);
    }),

    date: null,
    selectedItems: null,
    rangeBegin: null,
    rangeEnd: null,

    beginTime: null,
    endTime: null,

    hours: [
        0,1,2,3,4,5,6,7,8,9,
        10,11,12,13,14,15,16,17,18,19,
        20,21,22,23
    ],
    minutes: [
        0,1,2,3,4,5,6,7,8,9,
        10,11,12,13,14,15,16,17,18,19,
        20,21,22,23,24,25,26,27,28,29,
        30,31,32,33,34,35,36,37,38,39,
        40,41,42,43,44,45,46,47,48,49,
        50,51,52,53,54,55,56,57,58,59
    ],
    seconds: [
        0,1,2,3,4,5,6,7,8,9,
        10,11,12,13,14,15,16,17,18,19,
        20,21,22,23,24,25,26,27,28,29,
        30,31,32,33,34,35,36,37,38,39,
        40,41,42,43,44,45,46,47,48,49,
        50,51,52,53,54,55,56,57,58,59
    ],

    animate: true,

    init() {
        this._updateTimeFromValue();
        this._super(...arguments);
    },

    /**
     * Text to show if range is waiting for an end date
     */
    waitingForEndDateText: 'Um ein anderes Enddatum zu wählen, klicken Sie bitte auf einen anderen Tag.',

    _updateRangeChanges: observer('minutes', function() {
        //this.__updateUiForAllDays();
        //this.notifyPropertyChange('timeMode');
        //let b = this.set('beginTime');
        //this.set('beginTime', null);
        //this.set('beginTime', b);
    }),

    isMonthPickerVisible: false,
    isYearPickerVisible: false,
    isDetailPickerVisible: computed('isMonthPickerVisible', 'isYearPickerVisible', function() {
        return this.get('isMonthPickerVisible') || this.get('isYearPickerVisible');
    }),

    /**
     * single, range, multiple
     */
    mode: 'single',

    /**
    * null, 'iso'
    */
    weekNumbers: null,

    showWeekNumbers: readOnly('weekNumbers', function() {
        return ['iso'].indexOf(this.get('weekNumbers')) > -1;
    }),

    startsOnMonday: true,
    isOpen: false,

    /**
     * Enables time-picker support
     * null, 'hm', 'hms'
     */
    timeMode: null,

    timeCssClass: computed('mode', 'timeMode', 'showWeekNumbers', function() {
        let mode = this.get('mode'),
            timeMode = this.get('timeMode') || '',
            showWeekNumbers = this.get('showWeekNumbers'),
            cssClassNames = [];

        if(timeMode.indexOf('hm') === 0) {
            cssClassNames.push('allow-begin-time');
            if(mode === 'range') cssClassNames.push('allow-end-time');
        }

        if(showWeekNumbers) {
            cssClassNames.push('show-week-numbers');
        }

        return cssClassNames.join(' ');
    }),

    hasValue: computed('date', 'selectedItems', 'selectedItems.length', 'rangeBegin', 'rangeEnd', function() {
        let mode = this.get('mode');

        switch(mode) {
            case 'single':
                return !!this.get('date');
            case 'range':
                return !!this.get('rangeBegin') ||!!this.get('rangeEnd');
            case 'multiple':
                return this.get('selectedItems.length') > 0;
        }

        return false;
    }),

    $popup: null,

    rangeBeginDisplayValue: computed('mode', 'date', 'selectedItems', 'selectedItems.length', 'rangeBegin', {
        set(key, value) {
            this._setValueFromString(value, 'rangeBegin');
            return this.get('rangeBeginDisplayValue');
        },
        get() {
            let date = this.get('rangeBegin');
            if(!date)
            {
                return null;
            }
            return this._displayValueForDate(date);
        }
    }),

    rangeEndDisplayValue: computed('mode', 'date', 'selectedItems', 'selectedItems.length', 'rangeEnd', {
        set(key, value) {
            this._setValueFromString(value, 'rangeEnd');
            return this.get('rangeEndDisplayValue');
        },
        get() {
            let date = this.get('rangeEnd');
            if(!date)
            {
                return null;
            }
            return this._displayValueForDate(date);
        }
    }),

    displayValue: computed('mode', 'date', 'selectedItems', 'selectedItems.length', 'rangeBegin', 'rangeEnd', {
        set(key, value) {
            let mode = this.get('mode');

            if(mode === 'single')
            {
                this._setValueFromString(value);
            }
            return this.get('displayValue');
        },
        get() {
            let mode = this.get('mode'),
                displayValues = this.get('displayValues');

            if(mode === 'single') {
                return displayValues[0].displayValue;
            }
            else if(mode === 'range')
            {
                return  displayValues.map(function(pair) { return pair.displayValue; }, this).join(" - ");
            }
            else if(mode === 'multiple')
            {
                return  displayValues.map(function(pair) { return pair.displayValue; }, this).join(", ");
            }

            return 'Format not supported';
        }
    }),

    displayValues: computed('mode', 'date', 'selectedItems', 'selectedItems.length', 'rangeBegin', 'rangeEnd', {
        get() {
            let mode = this.get('mode'),
                result = [];

            if(mode === 'single') {
                result.push({ value: this.get('date'), displayValue: this._displayValueForDate(this.get('date')) });
            }
            else if(mode === 'range')
            {
                let a = this._displayValueForDate(this.get('rangeBegin')),
                    b = this._displayValueForDate(this.get('rangeEnd'));

                if(a) result.push({ value: this.get('rangeBegin'), displayValue: a });
                if(b) result.push({ value: this.get('rangeEnd'), displayValue: b });
            }
            else if(mode === 'multiple')
            {
                (this.get('selectedItems') || []).forEach(function(date) {
                    result.push({ value: date, displayValue: this._displayValueForDate(date) });
                }, this);
            }

            return result;
        }
    }),

    _displayValueForDate(date) {
        let timeMode = this.get('timeMode'),
            formatString = null;

        if(date === undefined || date === null) return null;

        switch(timeMode) {
            case 'hm':
                formatString = 'L LT';
                break;
            case 'hms':
                formatString = 'L LTS';
                break;
            default:
                formatString = 'L';
                break;
        }

        return Moment(date).format(formatString);
    },

    _setValueFromString(value, valuePropertyName) {
        let mode = this.get('mode'),
            parsedValue = Moment(value, "DD.MM.YYYY HH:mm");

        if(parsedValue.isValid())
        {
            let date = parsedValue.toDate(),
                self = this;

            if(mode === 'single') {
                this.set('beginTime', this._buildTime(date.getHours(), date.getMinutes(), date.getSeconds()));
                next(function() {
                    self._focusTime();
                });
                this._select(date, false);
                this._focus(date);
            } else if(mode === 'range') {
                if(valuePropertyName === 'rangeBegin') {
                    let time = this._buildTime(date.getHours(), date.getMinutes(), date.getSeconds());
                    this.set('beginTime', time);
                    //next(this, function() {
                        this.set('rangeBegin', date);
                        let day = this.days[date.toDateString()];
                        if(day) day.set('isSelected', true);
                        this.__updateUiForAllDays();
                    //});

                    this.__updateUiForAllDays();
                } else if(valuePropertyName === 'rangeEnd') {
                    this.set('endTime', this._buildTime(date.getHours(), date.getMinutes(), date.getSeconds()));
                    this.set('rangeEnd', date);
                    let day = this.days[date.toDateString()];
                    if(day) day.set('isSelected', true);

                    this.__updateUiForAllDays();
                }
            }
        }
    },

    _updateTimeFromValue: observer('date', 'rangeBegin', 'rangeEnd', function() {
        let mode = this.get('mode');
        if(mode === 'single') {
            let date = this.get('date');
            if(date)
            {
                this.set('beginTime', this._buildTime(date.getHours(), date.getMinutes(), date.getSeconds()));
            }
        } else if(mode === 'range') {
            let rangeBegin = this.get('rangeBegin'),
                rangeEnd = this.get('rangeEnd');

            if(rangeBegin)
            {
                this.set('beginTime', this._buildTime(rangeBegin.getHours(), rangeBegin.getMinutes(), rangeBegin.getSeconds()));
            }

            if(rangeEnd)
            {
                this.set('endTime', this._buildTime(rangeEnd.getHours(), rangeEnd.getMinutes(), rangeEnd.getSeconds()));
            }
        }
    }),

    didInsertElement() {
        let mode = this.get('mode'),
            today = new Date(),
            baseDate = null;

        this._initUI();

        if(mode === 'multiple' && this.get('selectedItems.length') > 0) {
            baseDate = this.get('selectedItems').objectAt(0);
        }
        else if(mode === 'range' && this.get('rangeBegin')) {
            baseDate = this.get('rangeBegin');
        }
        else {
            baseDate = this.get('date');
        }

        baseDate = baseDate || today;

        this.setProperties({
            year: baseDate.getFullYear(),
            month: baseDate.getMonth()
        });
    },

    willDestroyElement() {
        let id = `datetime-pickers-${this.get('elementId')}`;
        this.$(document).find(`#${id}`).remove();
    },

    _initUI() {
        let self = this;

        let id = `datetime-pickers-${this.get('elementId')}`;

        if(this.$(document).find(`#${id}`).length === 0) {
            this.$(`<div id="${id}"></div>`).appendTo('body');
        }

        this.$popup = this.$('.tr-datetime-picker-wrapper');
        this.$control = this.$('.tr-datetime-picker-control');

        this.set('ownElements', this.$popup);
        this.$popup.hide();
        //this.$popup.detach().appendTo('.ember-application');
        this._updatePopupPosition();
        this.$(window).resize(function() {
            self._updatePopupPosition();
        });
    },

    _updatePopupPosition() {
        let v = this.$control.offset().top + this.$control.outerHeight(),
            h = this.$control.offset().left;

        if(this.$popup.length > 0)
        {
            let $popup = this.$(this.$popup[0]);
            if(!$popup || !$popup.css) return;
            $popup.css('top', v + 'px');
            $popup.css('left', h + 'px');
            $popup.css('z-index', 50);
        }
    },

    _isOpenDidChange: observer('isOpen', function() {
        if(this.get('isOpen')) {
            this.open();
        } else {
            this.close();
        }
    }),

    open() {
        this.set('isOpen', true);
        //if(this.$popup.is(':visible')) return;
        this._closeDetailPickers();
        this._updatePopupPosition();
        if(this.get('animate'))
        {
          this.$popup.show('fast');
        } else {
          this.$popup.show();
        }

        switch(this.get('mode')) {
            case 'single':
                this._focus(this.get('date') || new Date());
                break;
            case 'range':
                this._focus(this.get('rangeBegin') || this.get('rangeEnd'));
                break;
            case 'multiple':
                var selectedItems = this.get('selectedItems') || [];
                this._focus(selectedItems.length > 0 ? selectedItems[0] : new Date());
                break;
            default:
                this._focus(new Date());
                break;
        }
        this._updatePopupPosition();
    },

    close() {
        this.set('___rangeSelectionState', 0);
        this.set('isOpen', false);
        if(this.get('animate')) {
          this.$(this.$popup[0]).hide('fast');
        } else {
          this.$(this.$popup[0]).hide();
        }
    },

    toggle() {
        if(this.get('isOpen')) {
            this.close();
        } else {
            this.open();
        }
    },

    pageStartOffset: 0,
    pageEndOffset: 1,

    renderStart: null,
    renderEnd: null,
    weeks: null,

    months: computed('year', function() {
        let arr = [],
            year = this.get('year');

        for(let idx = 0; idx < 12; idx++) {
            arr.push(new Date(year,idx,1));
        }

        return arr;
    }),

    years: computed('year', function() {
        let arr = [],
            year = this.get('year'),
            offsetBefore = 12,
            offsetAfter = 17;

        for(let idx = -offsetBefore; idx <= offsetAfter ; idx++) {
            arr.push(year + idx);
        }

        return arr;
    }),

    /**
     * Return false to disable selection, return 0 to allow double click on disabled items
     * @param args
     */
    canSelect: null,

    _refreshIntervalWeeks: observer(
        'mode',
        'items',
        'year',
        'month',
        'rangeBegin',
        'rangeEnd',
        'startsOnMonday',
        'weekNumbers',
        function () {
            let self = this,
                year = this.get('year'),
                month = this.get('month'),
                startsOnMonday = this.get('startsOnMonday');

            let start = new Date(year, month, 1);

            // day to start rendering
            let renderStart = this._copyDate(start);

            // result array of weeks containing occurrences: [[eventsOfWeek1], [eventsOfWeek2], ...]
            let data = Ember.A(),
                days = {}; //contains the same data as properties

            // Correction value to get a monday from the current renderStart
            let dayToWeekStartCorrection = startsOnMonday ?
                (1-(renderStart.getDay()) % 7) :
                (0-(renderStart.getDay()) % 7);

            if(dayToWeekStartCorrection > 0) dayToWeekStartCorrection = dayToWeekStartCorrection - 7;

            // Initially current is the monday before the requested renderStart
            let current = this._addDays(this._getDatePart(renderStart), dayToWeekStartCorrection);

            // The last rendered date
            /* let last = new Date(start.getFullYear(), start.getMonth()+1, 1);
            last = new Date(last.setMilliseconds(-1));
            last = new Date(last.setDate(last.getDate() + 7 - last.getDay()));*/
            let last = this._addDays(this._copyDate(current), 42);
            // Create a multidimensional array and group the event occurrences of the same day together
            /*
            * [
            *   "Fri Mar 09 2018": [
            *     event1,
            *     event2
            *   ],
            *   "Sat Mar 10 2018": [
            *     event3,
            *     event2
            *   ]
            * ]
            * */
            let eventsPerDate = [],
                items = this.get('items') || [];

            items.forEach(function (entry) {
                if (entry.get('isDeleted')) return;
                entry.getNext(current, last).forEach(function (date) {
                    if (!eventsPerDate[date.toDateString()]) {
                        eventsPerDate[date.toDateString()] = [];
                    }
                    eventsPerDate[date.toDateString()].pushObject(entry);
                });
            });

            // Set the time range that is rendered
            this.set('renderStart', current);
            this.set('renderEnd', last);

            let renderedWeekCount = Math.round((last - current)/(1000*60*60*24)) / 7;

            this.set('renderedWeeks', renderedWeekCount);

            // Find the events for each week
            for (let idx = 0, max = renderedWeekCount; idx++ < max;) {
                let weekData = Ember.A(),
                    sortedEventsPerDate;
                for (let didx = 0, dmax = 7; didx++ < dmax;) {
                    sortedEventsPerDate = eventsPerDate[current.toDateString()] || [];
                    sortedEventsPerDate = sortedEventsPerDate.sort(function (a, b) {
                        return new Date(a.get('dateBegin')) - new Date(b.get('dateBegin'));
                    });

                    let day = Ember.Object.create({
                        date: current,
                        events: sortedEventsPerDate,
                        isCurrentMonth: current.getFullYear() === year && current.getMonth() === month,
                        isToday: current.toDateString() === (new Date()).toDateString(),
                        isWeekend: [0,6].indexOf(current.getDay()) > -1,
                        isDisabled: false,
                        isSelected: false,
                        isRangeBegin: false,
                        isRange: false,
                        isRangeEnd: false
                    });
                    self.__updateUiSelection(day);
                    weekData.pushObject(day);
                    days[current.toDateString()] = day;

                    current = this._addDays(this._copyDate(current), 1);
                }
                if(this.get('weekNumbers') === 'iso')
                {
                  weekData.number = Moment(weekData.objectAt(0).date).isoWeek();
                }
                data.pushObject(weekData);
            }

            this.setProperties({
                weeks: data,
                days: days
            });

            //this._resize();
        }).on('init'),

    _addDays(date, value) {
        date.setDate(date.getDate() + value);
        return date;
    },
    _copyDate(date) {
        return new Date(date.getTime());
    },
    _getDatePart(date) {
        var copy = this._copyDate(date);
        copy.setHours(0);
        copy.setMinutes(0);
        copy.setSeconds(0);
        copy.setMilliseconds(0);
        return copy;
    },
    _today() {
        let today = new Date();
        this.set('year', today.getFullYear());
        this.set('month', today.getMonth());
        this._fetch(this.get('renderStart'), this.get('renderEnd'));
    },
    _page(rangeToAdd) {
        if(this.get('isYearPickerVisible')) {
            this.set('year', this.get('year') +  rangeToAdd);
            return;
        }

        let currentMonth = new Date(this.get('year'), this.get('month'), 1);

        let newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + rangeToAdd, currentMonth.getDate());

        // Prevent jumping to n+1 months:
        // otherwise i.e. paging +1 from 2018-31-01 would result in 2018-02-03
        if(rangeToAdd > 0) {
            while((100+newMonth.getMonth()) > (100+currentMonth.getMonth()+1)) {
                newMonth = new Date(newMonth.setDate(newMonth.getDate()-1));
            }
        }

        this.set('year', newMonth.getFullYear());
        this.set('month', newMonth.getMonth());
        this._fetch(this.get('renderStart'), this.get('renderEnd'));
    },
    _focus(date) {
        this._focusTime();

        if(!date) return;
        this.set('year', date.getFullYear());
        this.set('month', date.getMonth());
        this._fetch(this.get('renderStart'), this.get('renderEnd'));
    },
    _focusTime() {
        this.$popup.find('.tr-datetime-picker-time-begin-panel .is-selected').each(function(idx, el) {
            el.scrollIntoView();
        });
        this.$popup.find('.tr-datetime-picker-time-end-panel .is-selected').each(function(idx, el) {
            el.scrollIntoView();
        });
    },
    _resetValue: observer('mode', function() {
        this.setProperties({
            date: null,
            rangeBegin: null,
            rangeEnd: null,
            selectedItems: null,
            beginTime: null,
            endTime: null
        });

        this.__updateUiForAllDays();
    }),
    _select(date, allowUnselect) {
        let mode = this.get('mode'),
            didSelect = false;

        if(allowUnselect === undefined) allowUnselect = true;

        switch(mode) {
            case 'range':
                didSelect = this.__selectRange(date, allowUnselect);
                break;
            case 'multiple':
                didSelect = this.__selectMultiple(date, allowUnselect);
                break;
            default:
                didSelect = this.__selectSingle(date, allowUnselect);
                break;
        }

        let day = this.days[date.toDateString()];
        if(day) day.set('isSelected', didSelect);

        this.__updateUiForAllDays();
    },
    __updateUiForAllDays() {
        for(let prop in this.days) {
            if(!this.days.hasOwnProperty(prop)) continue;
            this.__updateUiSelection(this.days[prop]);
        }
    },
    __updateUiSelection(day) {
        let mode = this.get('mode'),
            date = day.get('date'),
            canSelectFun = this.get('canSelect'),
            isDisabled = false;

        let canSelect = canSelectFun && canSelectFun({
            mode: mode,
            date: date,
            selection: mode === 'range' ?
                {
                    begin: this.get('rangeBegin'),
                    end: this.get('rangeEnd'),
                    waitingForEndSelection: this.get('___rangeSelectionState') === 1
                } : (mode === 'multiple' ? this.get('selectedItems') : this.get('date'))
        });

        if(canSelect === false) {
            isDisabled = true;
        } else if(canSelect === 0) {
            isDisabled = 1;
        }

        if(mode === 'single')
        {
            day.setProperties({
                isRangeBegin: false,
                isRange: false,
                isRangeEnd: false,
                isSelected: date && this.get('date') && date.toDateString() === this.get('date').toDateString(),
                isDisabled: isDisabled
            });
        } else if(mode === 'range') {
            let rangeBegin = this.get('rangeBegin'),
                rangeEnd = this.get('rangeEnd'),
                isValidRange = rangeBegin && rangeEnd && rangeBegin < rangeEnd,
                isRangeEnd = rangeEnd && date && rangeEnd.toDateString() === date.toDateString(),
                isRangeBegin = rangeBegin && date && rangeBegin.toDateString() === date.toDateString(),
                isInRange = isRangeBegin || isRangeEnd || date >= rangeBegin && date <= rangeEnd;

            day.setProperties({
                isRangeBegin: isRangeBegin,
                isRange: isValidRange && isInRange,
                isRangeEnd: isRangeEnd,
                isSelected: isInRange,
                isBeforeRangeBegin: !rangeEnd && rangeBegin && day.date < rangeBegin,
                isDisabled: isDisabled
            });
        } else if (mode === 'multiple') {
            let selectedItems = this.get('selectedItems') || [];

            day.setProperties({
                isRangeBegin: false,
                isRange: false,
                isRangeEnd: false,
                isSelected: date && selectedItems.map(function(d) { return d.toDateString(); }).includes(date.toDateString()),
                isDisabled: isDisabled
            });
        }
    },
    __selectSingle(date, allowUnselect) {
        if(this.get('date') && date && this.get('date').toDateString() === date.toDateString()) {
            if(allowUnselect)
            {
                this.set('date', null);
                return false;
            }
            return true;
        }

        this.set('date', date);
        return true;
    },
    ___rangeSelectionState: 0,
    __selectRange(date) {
        let rangeBeginDate = this._extractDateWithoutTime(this.get('rangeBegin')),
            rangeEndDate = this._extractDateWithoutTime(this.get('rangeEnd')),
            ___rangeSelectionState = this.get('___rangeSelectionState');

        //Fix state
        if(rangeBeginDate && date < rangeBeginDate) {
            ___rangeSelectionState = this.set('___rangeSelectionState', 0);
        }

        //Set new state
        if(___rangeSelectionState === 0) {
            this.setProperties({
                rangeBegin: date,
                rangeEnd: date,
                ___rangeSelectionState: 1
            });
            return true;
        }

        if(___rangeSelectionState === 1) {
            if(rangeEndDate && date && rangeEndDate.getTime() !== date.getTime()) {
                this.setProperties({
                    rangeEnd: date,
                    ___rangeSelectionState: 0
                });
                return true;
            }
        }

        return false;

        /*if(this.get('rangeBegin') === null || date < rangeBeginDate || rangeEndDate !== null) {
            this.set('rangeBegin', date);
            this.set('rangeEnd', null);
            return true;
        } else if(this.get('rangeEnd') === null) {
            this.set('rangeEnd', date);
            return true;
        }*/
    },
    __selectMultiple(date) {
        let selectedItems = this.get('selectedItems');
        if(selectedItems === null) {
            selectedItems = [];
            this.set('selectedItems', selectedItems);
        }

        let selectedItem = selectedItems.find(function(selectedDate) { return date.toDateString() === selectedDate.toDateString() });

        if(selectedItem) {
            selectedItems.removeObject(selectedItem);
            return false;
        } else {
            this._setTimeInDate(date, this.get('beginTime') || '00:00:00');
            selectedItems.pushObject(date);
            return true;
        }
    },
    _updateFromTime: observer('mode', 'date', 'rangeBegin', 'rangeEnd', 'selectedItems', 'beginTime', 'endTime', function() {
        let mode = this.get('mode');
        switch(mode) {
            case 'single':
                this._updateSingleFromTime();
                break;
            case 'range':
                this._updateRangeFromTime();
                break;
            case 'multiple':
                this._updateMultipleFromTime();
                break;
        }
    }),
    _updateSingleFromTime() {
        let date = this.get('date');
        if(date) {
            date = new Date(date);
            this._setTimeInDate(date, this.get('beginTime') || '00:00:00');
            if(this.get('date').toLocaleString() !== date.toLocaleString())
            {
                this.set('date', date);
            }
        }
    },
    _updateRangeFromTime() {
        let rangeBegin = this.get('rangeBegin'),
            rangeEnd = this.get('rangeEnd');

        if(rangeBegin) {
            rangeBegin = new Date(rangeBegin);
            this._setTimeInDate(rangeBegin, this.get('beginTime') || '00:00:00');
            if(this.get('rangeBegin').toLocaleString() !== rangeBegin.toLocaleString())
            {
                this.set('rangeBegin', rangeBegin);
            }
        }

        if(rangeEnd) {
            rangeEnd = new Date(rangeEnd);
            this._setTimeInDate(rangeEnd, this.get('endTime') || '00:00:00');
            if(this.get('rangeEnd').toLocaleString() !== rangeEnd.toLocaleString())
            {
                this.set('rangeEnd', rangeEnd);
            }
        }
    },
    _updateMultipleFromTime() {
        let selectedItems = this.get('selectedItems');
        if(selectedItems && selectedItems.length > 0) {
            selectedItems.forEach(function(date, idx) {
                let newDate = new Date(date);
                this._setTimeInDate(newDate, this.get('beginTime') || '00:00:00');
                if(date.toLocaleString() !== newDate.toLocaleString())
                {
                    //this.set('date', date);
                    this.get('selectedItems').replace(idx, 1, newDate);
                }
            }, this);
        }
    },
    _setTimeInDate(date, timeStr) {
        let timeParts = timeStr.split(':');
        timeParts.forEach(function(part, index) {
            if(index === 0) {
                let val = Number.parseInt(part);
                val = val > 23 ? 23 : val;
                date.setHours(val);
            } else if(index === 1) {
                let val = Number.parseInt(part);
                val = val > 59 ? 59 : val;
                date.setMinutes(val);
            } else if(index === 2) {
                let val = Number.parseInt(part);
                val = val > 59 ? 59 : val;
                date.setSeconds(val);
            }
        }, this);
    },
    _buildTime(hPart, mPart, sPart) {
        let timeMode = this.get('timeMode') || '';

        if(timeMode !== 'hm' && timeMode !== 'hms') return null;

        let arr = [
            (hPart || '00').toString().padStart(2, '0'),
            (mPart || '00').toString().padStart(2, '0')
        ];

        if(timeMode === 'hms') arr.push((sPart || '00').toString().padStart(2, '0'));

        return arr.join(':');
    },
    _fetch(start, end) {
        if (this.onFindEvents) {
            this.set('items', null);
            this.onFindEvents(this, start, end);
        }
    },
    _extractDateWithoutTime(date) {
        if(!date) return date;
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    },

    _closeDetailPickers() {
        this.set('isMonthPickerVisible', false);
        this.set('isYearPickerVisible', false);
    },

    clickInside() {},
    clickOutside() {
        this.close();
    },

    focusInside() {
        this.open();
    },
    focusOutside() {
        this.close();
    },

    actions: {
        page: function(value){
            if(value) {
                this._page(value);
            } else {
                this._today();
            }
        },
        setMonth: function(date){
            if(date) {
                this._closeDetailPickers();
                this.set('month', date.getMonth());
            }
        },
        setYear: function(year){
            if(year) {
                this._closeDetailPickers();
                this.set('year', year);
            }
        },
        select(day) {
            if(!day || day.get('isDisabled')) return;
            this._closeDetailPickers();
            this._select(day.date);
        },
        selectWithReset(day) {
            //If isDisabled is 1, allow double click!
            if(!day || day.get('isDisabled') === true) return;
            this.set('___rangeSelectionState', 0);
            this._closeDetailPickers();
            this._select(day.date);
        },
        deselect(date) {
            if(!date) return;
            this._select(date);
        },
        mode(mode) {
            this.set('mode', mode);
        },
        open() {
            this.open();
        },
        close() {
            this.close();
        },
        reset() {
            this._resetValue();
        },
        focus(date) {
            this._focus(date);
        },
        toggle() {
            this.toggle();
        },
        selectBeginTimePart(type, value) {
            let beginTime = this.get('beginTime');
            if(beginTime == null) {
                beginTime = '00:00:00';
            }

            value = value.toString();

            let arr = beginTime.split(':');
            switch(type) {
                case 'h':
                    arr[0] = value.padStart(2, '0');
                    break;
                case 'm':
                    arr[1] = value.padStart(2, '0');
                    break;
                case 's':
                    arr[2] = value.padStart(2, '0');
                    break;
            }

            this.set('beginTime', this._buildTime(arr[0], arr[1], arr[2]));
        },
        selectEndTimePart(type, value) {
            let endTime = this.get('endTime');
            if(endTime == null) {
                endTime = '00:00:00';
            }

            value = value.toString();

            let arr = endTime.split(':');
            switch(type) {
                case 'h':
                    arr[0] = value.padStart(2, '0');
                    break;
                case 'm':
                    arr[1] = value.padStart(2, '0');
                    break;
                case 's':
                    arr[2] = value.padStart(2, '0');
                    break;
            }

            this.set('endTime', this._buildTime(arr[0], arr[1], arr[2]));
        },
        toggleMonthPicker() {
            this.set('isYearPickerVisible', false);
            this.set('isMonthPickerVisible', !this.get('isMonthPickerVisible'));
        },
        toggleYearPicker() {
            this.set('isMonthPickerVisible', false);
            this.set('isYearPickerVisible', !this.get('isYearPickerVisible'));
        },
        refreshDisplayValue() {
            this._updateTimeFromValue();
            this.notifyPropertyChange('rangeBeginDisplayValue');
            this.notifyPropertyChange('rangeEndDisplayValue');
            this.__updateUiForAllDays();
        }
    }
});
