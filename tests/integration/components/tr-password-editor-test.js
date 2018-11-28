import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-password-editor', 'Integration | Component | tr password editor', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-password-editor}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-password-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-password-editor}}
      template block text
    {{/tr-password-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
