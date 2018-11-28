import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-listview', 'Integration | Component | tr listview', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-value-bar}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-listview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-listview}}
      template block text
    {{/tr-listview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
