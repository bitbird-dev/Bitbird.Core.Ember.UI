import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/tr-traffic-light', 'Integration | Component | widgets/tr traffic light', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{widgets/tr-light-widget}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{widgets/tr-traffic-light}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#widgets/tr-traffic-light}}
      template block text
    {{/widgets/tr-traffic-light}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
