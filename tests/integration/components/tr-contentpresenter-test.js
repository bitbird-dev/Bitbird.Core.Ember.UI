import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-contentpresenter', 'Integration | Component | tr contentpresenter', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-contentpresenter}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-contentpresenter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-contentpresenter}}
      template block text
    {{/tr-contentpresenter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
