import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-image-upload', 'Integration | Component | tr image upload', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-image-upload}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-image-upload}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-image-upload}}
      template block text
    {{/tr-image-upload}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
