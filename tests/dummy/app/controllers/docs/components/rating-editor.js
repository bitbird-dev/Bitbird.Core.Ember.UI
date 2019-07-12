import Controller from '@ember/controller';

export default Controller.extend({
    // BEGIN-SNIPPET rating-editor.js
    value: 60,
    lower: 40,
    upper: 90,
    minValue: 60,
    maxValue: 85,
    stepping: 10,
    glyph: '★',
    repeat: 5
    // END-SNIPPET
});
