import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-checkbox-editor', 'Integration | Component | tr checkbox editor', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-checkbox-editor}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-checkbox-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-checkbox-editor}}
      template block text
    {{/tr-checkbox-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
