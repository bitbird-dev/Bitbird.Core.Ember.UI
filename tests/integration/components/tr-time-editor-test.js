import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-time-editor', 'Integration | Component | tr time editor', {
  integration: true
});

test('it renders', function(assert) {

  this.set('date', new Date(2018,0,1));

  this.render(hbs`{{tr-time-editor value='12:00:00' isTime=false}}`);
  assert.equal(this.$().find('input').text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-time-editor value='12:00:00' isTime=false}}{{/tr-time-editor}}
  `);

  assert.equal(this.$('input').text().trim(), '');
});
