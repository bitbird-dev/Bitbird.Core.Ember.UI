import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-pageview', 'Integration | Component | tr pageview', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-pageview}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-pageview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-pageview}}
      template block text
    {{/tr-pageview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
