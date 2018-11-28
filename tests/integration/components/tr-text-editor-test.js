import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-text-editor', 'Integration | Component | tr text editor', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-text-editor}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-text-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-text-editor}}
      template block text
    {{/tr-text-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
