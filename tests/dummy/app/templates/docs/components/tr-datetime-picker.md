# tr-datetime-picker

## basic usage

{{#docs-demo as |demo|}}
  {{#demo.example name="tr-datetime-picker.hbs"}}
    <div class="docu-options-block">
      <div>
        <span>timeMode</span>
        <select required name="timeModeOptions" onchange={{action "setSelectedTimeMode" value="target.value"}}>
          {{#each timeModeOptions as |option|}}        
            <option value={{option.value}}>{{option.name}}</option>      
          {{/each}}
        </select>
      </div>
      <div>
        <span>timeMode</span>
        <select required name="modeOptions" onchange={{action "setSelectedMode" value="target.value"}}>
          {{#each modeOptions as |option|}}        
            <option value={{option.value}}>{{option.name}}</option>      
          {{/each}}
        </select>
      </div>
      <div>
        <span>startsOnMonday</span>
        {{input type="checkbox" checked=startsOnMonday}}
      </div>
      <div>
        <span>isOpen</span>
        {{input type="checkbox" checked=isOpen}}
      </div>
    </div>
    {{#tr-datetime-picker date=selectedDate timeMode=selectedTimeMode mode=selectedMode startsOnMonday=startsOnMonday isOpen=isOpen as |displayValue mode date range selectedItems toggle|}}
      {{displayValue}} 
      <button {{action toggle}}>X</button>
    {{/tr-datetime-picker}}
  {{/demo.example}}
  {{demo.snippet "tr-datetime-picker.hbs" label="template.hbs"}}
  {{demo.snippet "tr-datetime-picker.js" label="controller.js"}}
{{/docs-demo}}
