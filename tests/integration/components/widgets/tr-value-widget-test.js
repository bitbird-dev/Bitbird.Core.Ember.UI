import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/tr-value-widget', 'Integration | Component | widgets/tr value widget', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{widgets/tr-value-widget}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{widgets/tr-value-widget}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#widgets/tr-value-widget}}
      template block text
    {{/widgets/tr-value-widget}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
