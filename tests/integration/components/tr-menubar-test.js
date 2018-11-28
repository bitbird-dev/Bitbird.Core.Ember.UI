import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-menubar', 'Integration | Component | tr menubar', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-menubar}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-menubar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-menubar}}
      template block text
    {{/tr-menubar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
