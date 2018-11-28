import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-datetime-editor', 'Integration | Component | tr datetime editor', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-datetime-editor}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-datetime-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-datetime-editor}}
      template block text
    {{/tr-datetime-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
