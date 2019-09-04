# tr-select

## Use filter and suggestions

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-select-filter.hbs'}}
    <div class="docu-options-block">
      <button {{action 'selectItemByKey' 'key 12'}}>Select item 12</button>
      <button {{action 'selectItemByKey' 'key 21'}}>Select item 21</button>
      <button {{action 'selectItemByKey' 'key 33'}}>Select item 33</button>
      <button {{action 'changeDisplayValues'}}>Change Values</button>
    </div>
    <p>Selected: {{selectedItem.value}}</p>
    <p>Suggested: {{suggestedValue}}</p>
    {{tr-select 
        label="Select something" 
        items=items selectedItem=selectedItem 
        editable=true 
        suggestedValue=suggestedValue}}
    {{tr-select 
        label=(concat "Select by key " selectedKey "==" selectedItem.value) 
        items=items 
        keyProperty='key'
        valueProperty='value'
        selectedKey=selectedKey 
        editable=true}}

  {{/demo.example}}
  {{demo.snippet 'tr-select-filter.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-select-filter.js' label='controller.js'}}
  {{demo.snippet 'tr-select-filter.css' label='style.scss'}}
{{/docs-demo}}

## Handling of Promises

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-select-promise.hbs'}}
    <div class="docu-options-block">
      <button {{action 'selectItemByKey' 'key 12'}}>Select item 12</button>
      <button {{action 'selectItemByKey' 'key 21'}}>Select item 21</button>
      <button {{action 'selectItemByKey' 'key 33'}}>Select item 33</button>
    </div>
    <p>Selected: {{selectedItem.value}}</p>
    <p>Suggested: {{suggestedValue}}</p>
    {{tr-select label="Select something" items=items selectedItem=selectedItem editable=true suggestedValue=suggestedValue}}
    {{tr-select 
        label=(concat "Select by key " selectedKey "==" selectedItem.value) 
        items=items selectedKey=selectedKey editable=true}}
  {{/demo.example}}
  {{demo.snippet 'tr-select-promise.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-select-promise.js' label='controller.js'}}
{{/docs-demo}}

## Multiple Selection

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-select-multiple.hbs'}}
    <div class="docu-options-block">
      <button {{action 'selectItemByKey' 'key 12'}}>Select item 12</button>
      <button {{action 'selectItemByKey' 'key 21'}}>Select item 21</button>
      <button {{action 'selectItemByKey' 'key 33'}}>Select item 33</button>
      <br>
      <div>
        <small>Event output</small>
        <textarea value={{eventOutput}} style="font-family: Consolas; font-size: 10px; width: 100%; height: 80px;" />   
      </div>
    </div>
    <hr>
    {{#tr-select
        items=items 
        selectedItems=selectedItems 
        style='popout' 
        onOpen=onOpen
        onClose=onClose
        onPrimaryAction=onPrimaryAction
        isCloseOnPrimary=isCloseOnPrimary
        isMultiple=true as |select|
      }}
        {{#select.itemTemplate as |item isSelected|}}
            <strong>Item with super {{item.key}} {{isSelected}}</strong><br>
            <small>{{item.value}}</small>        
        {{/select.itemTemplate}}
    {{/tr-select}}
      <p>Selected: {{selectedItem.value}}</p>
  {{/demo.example}}
  {{demo.snippet 'tr-select-multiple.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-select-multiple.js' label='controller.js'}}
  {{demo.snippet 'tr-select-editor-multiple.css' label='style.scss'}}
{{/docs-demo}}
