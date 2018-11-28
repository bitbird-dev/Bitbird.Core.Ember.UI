import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-treeview', 'Integration | Component | tr treeview', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-treeview}}`);
    assert.equal(true, true);
  /*this.render(hbs`{{tr-treeview}}`);

  assert.equal(this.$().text().trim(), 'template block text');

  // Template block usage:
  this.render(hbs`
    {{#tr-treeview}}
      template block text
    {{/tr-treeview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
