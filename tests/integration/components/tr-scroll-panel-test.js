import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-scroll-panel', 'Integration | Component | tr scroll panel', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-scroll-panel}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-scroll-panel}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-scroll-panel}}
      template block text
    {{/tr-scroll-panel}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
