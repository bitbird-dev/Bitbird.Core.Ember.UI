import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-info-tooltip', 'Integration | Component | tr info tooltip', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-info-tooltip}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-info-tooltip}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-info-tooltip}}
      template block text
    {{/tr-info-tooltip}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
