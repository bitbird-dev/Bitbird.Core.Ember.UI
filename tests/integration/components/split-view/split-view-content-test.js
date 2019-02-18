import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('split-view/split-view-content', 'Integration | Component | split view/split view content', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{split-view/split-view-content}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#split-view/split-view-content}}
      template block text
    {{/split-view/split-view-content}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
