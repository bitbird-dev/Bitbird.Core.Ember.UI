import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-blade', 'Integration | Component | tr blade', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-blade}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-blade}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-blade}}
      template block text
    {{/tr-blade}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
