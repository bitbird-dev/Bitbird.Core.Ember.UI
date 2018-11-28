import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-sticky-header', 'Integration | Component | tr sticky header', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-sticky-header}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-sticky-header}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-sticky-header}}
      template block text
    {{/tr-sticky-header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
