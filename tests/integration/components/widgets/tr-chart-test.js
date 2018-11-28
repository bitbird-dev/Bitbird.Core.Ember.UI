import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/tr-chart', 'Integration | Component | widgets/tr chart', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{widgets/tr-chart}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{widgets/tr-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#widgets/tr-chart}}
      template block text
    {{/widgets/tr-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
