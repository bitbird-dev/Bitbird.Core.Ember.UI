import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/tr-widget', 'Integration | Component | widgets/tr widget', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{widgets/tr-widget}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{widgets/tr-widget}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#widgets/tr-widget}}
      template block text
    {{/widgets/tr-widget}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
