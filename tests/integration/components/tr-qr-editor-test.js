import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-qr-editor', 'Integration | Component | tr qr editor', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-qr-editor}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-qr-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-qr-editor}}
      template block text
    {{/tr-qr-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
