# tr-select-editor

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-select-editor.hbs'}}
    {{tr-select-editor 
      items=items
      selectedItem=selectedItem
      keyProperty="key"
      valueProperty="value"
      idPropertyName= "key"
      emptyText="emptyText"
      popoutHeader="popoutHeader"
      popoutPrimaryText="popoutPrimaryText"
      editable=false
      style="select"}}
      <p>Selected: {{selectedItem.value}}</p>
  {{/demo.example}}
  {{demo.snippet 'tr-select-editor.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-select-editor.js' label='controller.js'}}
  {{demo.snippet 'tr-select-editor.css' label='style.scss'}}
{{/docs-demo}}