# tr-button-editor

## Basic usage
{{#docs-demo as |demo|}}
  <div class="docu-options-block">
        <div>
          <span>isDisabled</span>
          {{input type="checkbox" checked=isDisabled}}
      </div>
      <div>
          <span>isReadonly</span>
          {{input type="checkbox" checked=isReadonly}}
      </div>
      <div>
          <span>highlight</span>
          {{input type="checkbox" checked=highlight}}
      </div>
  </div>
  {{#demo.example name="tr-button-editor.hbs"}}
  <h1>Click Count: {{clickCount}}</h1>
  {{#tr-button-editor onClick=(action "onClick") highlight=highlight isReadonly=isReadonly isDisabled=isDisabled}}
    ButtonContent
  {{/tr-button-editor}}
  {{/demo.example}}
  {{demo.snippet "tr-button-editor.hbs" label="template.hbs"}}
  {{demo.snippet "tr-button-editor-click.js" label="actions.js"}}
{{/docs-demo}}