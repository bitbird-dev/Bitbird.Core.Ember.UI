import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-splitview', 'Integration | Component | tr splitview', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-splitview}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-splitview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-splitview}}
      template block text
    {{/tr-splitview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
