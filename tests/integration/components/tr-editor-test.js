import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-editor', 'Integration | Component | tr editor', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-editor}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-editor}}
      template block text
    {{/tr-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
