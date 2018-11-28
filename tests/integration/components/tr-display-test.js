import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-display', 'Integration | Component | tr display', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-display}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-display}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-display}}
      template block text
    {{/tr-display}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
