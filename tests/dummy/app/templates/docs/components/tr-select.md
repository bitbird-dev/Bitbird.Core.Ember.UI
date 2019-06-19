# tr-select-editor

## Issues

Dropdown appears in the wrong place if browser-window is scrolled.

## Use filter and suggestions

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-select-filter.hbs'}}
    <div class="docu-options-block">
      <button {{action 'selectItemByKey' 'key 1'}}>Select item 1</button>
      <button {{action 'selectItemByKey' 'key 2'}}>Select item 2</button>
      <button {{action 'selectItemByKey' 'key 3'}}>Select item 3</button>
    </div>
    <p>Selected: {{selectedItem.value}}</p>
    <p>Suggested: {{suggestedValue}}</p>
    {{tr-select items=items selectedItem=selectedItem editable=true _suggestedValue=suggestedValue}}
  {{/demo.example}}
  {{demo.snippet 'tr-select-filter.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-select-filter.js' label='controller.js'}}
  {{demo.snippet 'tr-select-filter.css' label='style.scss'}}
{{/docs-demo}}
