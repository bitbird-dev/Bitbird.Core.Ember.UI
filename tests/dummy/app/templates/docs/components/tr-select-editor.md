# tr-select-editor

## Issues

Dropdown appears in the wrong place if browser-window is scrolled.

## Simple usage with list of values

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-select-editor.hbs'}}
    {{tr-select-editor items=values selectedItem=selectedValue}}
      <p>Selected: {{selectedValue}}</p>
  {{/demo.example}}
  {{demo.snippet 'tr-select-editor.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-select-editor.js' label='controller.js'}}
  {{demo.snippet 'tr-select-editor.css' label='style.scss'}}
{{/docs-demo}}

## Usage with list of objects

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-select-editor-objects.hbs'}}
    <div class="docu-options-block">
      <button {{action 'selectItemByKey' 'key 1'}}>Select item 1</button>
      <button {{action 'selectItemByKey' 'key 2'}}>Select item 2</button>
      <button {{action 'selectItemByKey' 'key 3'}}>Select item 3</button>
    </div>
    {{tr-select-editor items=items selectedItem=selectedItem}}
      <p>Selected: {{selectedItem.value}}</p>
  {{/demo.example}}
  {{demo.snippet 'tr-select-editor-objects.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-select-editor-objects.js' label='controller.js'}}
  {{demo.snippet 'tr-select-editor-objects.css' label='style.scss'}}
{{/docs-demo}}

## Usage with list of objects and selectedKey

{{#docs-demo as |demo|}}
    <div class="docu-options-block">
        <button {{action 'selectKey' 'key 1'}}>Select item 1</button>
        <button {{action 'selectKey' 'key 2'}}>Select item 2</button>
        <button {{action 'selectKey' 'key 3'}}>Select item 3</button>
    </div>
    {{#demo.example name='tr-select-editor-keys.hbs'}}
        {{tr-select-editor items=items selectedKey=selectedKey}}
    {{/demo.example}}
    <p>Selected: {{selectedKey}}</p>
  {{demo.snippet 'tr-select-editor-keys.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-select-editor-keys.js' label='controller.js'}}
  {{demo.snippet 'tr-select-editor-keys.css' label='style.scss'}}
{{/docs-demo}}

## Use filter and suggestions

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-select-editor-filter.hbs'}}
    <div class="docu-options-block">
      <button {{action 'selectItemByKey' 'key 1'}}>Select item 1</button>
      <button {{action 'selectItemByKey' 'key 2'}}>Select item 2</button>
      <button {{action 'selectItemByKey' 'key 3'}}>Select item 3</button>
    </div>
    <p>Selected: {{selectedItem.value}}</p>
    <p>Suggested: {{suggestedValue}}</p>
    {{tr-select-editor items=items selectedItem=selectedItem editable=true _suggestedValue=suggestedValue}}
  {{/demo.example}}
  {{demo.snippet 'tr-select-editor-filter.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-select-editor-filter.js' label='controller.js'}}
  {{demo.snippet 'tr-select-editor-filter.css' label='style.scss'}}
{{/docs-demo}}

## Custom templates

{{#docs-demo as |demo|}}
    <div class="docu-options-block">
      <button {{action 'selectItemByKey' 'key 1'}}>Select item 1</button>
      <button {{action 'selectItemByKey' 'key 2'}}>Select item 2</button>
      <button {{action 'selectItemByKey' 'key 3'}}>Select item 3</button>
    </div>
  {{#demo.example name='tr-select-editor-template.hbs'}}
    {{#tr-select-editor items=items selectedItem=selectedItem as |select|}}
        {{#select.itemTemplate as |item|}}
            <strong>Item with super {{item.key}}</strong><br>
            <small>{{item.value}}</small>        
        {{/select.itemTemplate}}
    {{/tr-select-editor}}
      <p>Selected: {{selectedItem.value}}</p>
  {{/demo.example}}
  {{demo.snippet 'tr-select-editor-template.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-select-editor-template.js' label='controller.js'}}
  {{demo.snippet 'tr-select-editor-template.css' label='style.scss'}}
{{/docs-demo}}

## Alternative styles

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-select-editor-styles.hbs'}}
    <div class="docu-options-block">
      <button {{action 'selectStyle' 'select'}}>Select</button>
      <button {{action 'selectStyle' 'flat'}}>Flat</button>
      <button {{action 'selectStyle' 'popout'}}>Popout</button><br>
      <button {{action 'selectItemByKey' 'key 1'}}>Select item 1</button>
      <button {{action 'selectItemByKey' 'key 2'}}>Select item 2</button>
      <button {{action 'selectItemByKey' 'key 3'}}>Select item 3</button>      
    </div>
    {{#tr-select-editor items=items selectedItem=selectedItem style=style as |select|}}
        {{#select.itemTemplate as |item|}}
            <strong>Item with super {{item.key}}</strong><br>
            <small>{{item.value}}</small>        
        {{/select.itemTemplate}}
    {{/tr-select-editor}}
      <p>Selected: {{selectedItem.value}}</p>
  {{/demo.example}}
  {{demo.snippet 'tr-select-editor-objects.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-select-editor-objects.js' label='controller.js'}}
  {{demo.snippet 'tr-select-editor-objects.css' label='style.scss'}}
{{/docs-demo}}

## Simple usage within scrollables

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-select-editor-scroll.hbs'}}
  <div style="max-height:300px;height:300px;overflow:auto;">
    <div style="">
        <div style="">
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            {{tr-select-editor items=values selectedItem=selectedValue}}
              <p>Selected: {{selectedValue}}</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
        </div>
    </div>
  </div>
  {{/demo.example}}
  {{demo.snippet 'tr-select-editor-scroll.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-select-editor-scroll.js' label='controller.js'}}
  {{demo.snippet 'tr-select-editor-scroll.css' label='style.scss'}}
{{/docs-demo}}
