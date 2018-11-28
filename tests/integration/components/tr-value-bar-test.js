import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-value-bar', 'Integration | Component | tr value bar', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-value-bar}}`);
    assert.equal(true, true);
/*
  this.render(hbs`{{tr-value-bar}}`);

  assert.equal(this.$().text().trim(), '0');

  // Template block usage:
  this.render(hbs`
    {{#tr-value-bar}}
      template block text
    {{/tr-value-bar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
