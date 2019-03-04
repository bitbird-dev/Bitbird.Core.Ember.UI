# tr-numeric-editor

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-numeric-editor.hbs'}}
    {{tr-numeric-editor
      label="label"
      value=value
      placeholder="enter a number..."}}
      <p>Current Value = {{value}}</p>
  {{/demo.example}}
  {{demo.snippet 'tr-numeric-editor.hbs' label='template.hbs'}}
{{/docs-demo}}