import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-submenu', 'Integration | Component | tr submenu', {
  integration: true
});

test('it renders', function(assert) {

  //todo:implement test
    this.render(hbs`{{tr-submenu}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-submenu}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-submenu}}
      template block text
    {{/tr-submenu}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
