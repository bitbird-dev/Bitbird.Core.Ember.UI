import Controller from '@ember/controller';

// BEGIN-SNIPPET rating-editor.js
export default Controller.extend({
    value: 60,
    lower: 40,
    upper: 90,
    minValue: 60,
    maxValue: 85,
    stepping: 10,
    glyph: '★',
    repeat: 5,
    fillBackground: false,
    actions: {
        setGlyph(glyph) {
            this.set('glyph', glyph);
        }
    }
});
// END-SNIPPET
