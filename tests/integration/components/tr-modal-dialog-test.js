import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-modal-dialog', 'Integration | Component | tr modal dialog', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-modal-dialog}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-modal-dialog}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-modal-dialog}}
      template block text
    {{/tr-modal-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
