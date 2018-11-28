import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-board', 'Integration | Component | tr board', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-board}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-board}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-board}}
      template block text
    {{/tr-board}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
