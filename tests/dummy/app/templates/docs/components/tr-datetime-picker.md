# datetime-picker

## Basic usage
{{#docs-demo as |demo|}}
    <div class="docu-options-block">
        <div>
            <span>timeMode</span>
            <select required name="timeModeOptions" onchange={{action "selectTimeMode" value="target.value"}}>
              {{#each timeModeOptions as |option|}}        
                <option value={{option.value}}>{{option.name}}</option>      
              {{/each}}
            </select>
        </div>
        <div>
            <span>isOpen</span>
            {{input type="checkbox" checked=isOpen}}
        </div>
    </div>
    <div>
        {{#demo.example name="tr-datetime-picker.hbs"}}
        {{#tr-datetime-picker timeMode=selectedTimeMode isOpen=isOpen as |displayValue mode date range selectedItems toggle|}}
            {{#if displayValue}}
                <div {{action toggle}}>{{displayValue}}</div>
            {{else}}
                <a {{action toggle}}>Click to select a date</a>
            {{/if}}
        {{/tr-datetime-picker}}
        {{/demo.example}}
    </div>
  {{demo.snippet "tr-datetime-picker.hbs" label="template.hbs"}}
{{/docs-demo}}

## Custom hours, minutes and seconds 
{{#docs-demo as |demo|}}
    <div>
        {{#demo.example name="tr-datetime-picker-custom-hms.hbs"}}
        {{#tr-datetime-picker 
            timeMode='hms' 
            rangeBegin=rangeBegin 
            rangeEnd=rangeEnd 
            minutes=(array 0 15 30 45) 
            hours=(array 6 7 8 9 10 11 12 13 14 15 16 17 18)
            seconds=(array 0 30)
            as |displayValue mode date range selectedItems toggle|}}
            {{#if displayValue}}
                <div {{action toggle}}>{{displayValue}}</div>
            {{else}}
                <a {{action toggle}}>Click to select a date</a>
            {{/if}}
        {{/tr-datetime-picker}}
        {{/demo.example}}
    </div>
  {{demo.snippet "tr-datetime-picker-custom-hms.hbs" label="template.hbs"}}
{{/docs-demo}}


## Use with editables
{{#docs-demo as |demo|}}
     <div>
        {{#demo.example name="tr-datetime-picker-editable.hbs"}}
        {{#tr-datetime-picker date=selectedDate as |displayValue mode date range selectedItems toggle|}}
            {{tr-text-editor label='Date' value=displayValue}}
        {{/tr-datetime-picker}}
        {{/demo.example}}
     </div>
  {{demo.snippet "tr-datetime-picker-editable.hbs" label="template.hbs"}}
{{/docs-demo}}

## Multiple- and Range-Selection
{{#docs-demo as |demo|}}
     <div class="docu-options-block">
      <div>
        <span>Selection Mode</span>
        <select required name="modeOptions" onchange={{action "selectMode" value="target.value"}}>
          {{#each modeOptions as |option|}}        
            <option value={{option.value}}>{{option.name}}</option>      
          {{/each}}
        </select>
      </div>
    </div>
    <div>
        {{#demo.example name="tr-datetime-picker-selection-mode.hbs"}}
        {{#tr-datetime-picker timeMode='hm' mode=selectedMode rangeBegin=rangeBegin rangeEnd=rangeEnd selectedItems=selectedItems as |displayValue mode date range selectedItems toggle|}}
            {{#if displayValue}}
                <div {{action toggle}}>{{displayValue}}</div>
            {{else}}
                <a {{action toggle}}>Click to select</a>
            {{/if}}
        {{/tr-datetime-picker}}
        <div>
            {{#if (compare selectedMode 'range')}}
                {{tr-display label="Begin" value=rangeBegin type='date' format='LLL'}}<br>
                {{tr-display label="End" value=rangeEnd type='date' format='LLL'}}
            {{else if (compare selectedMode 'multiple')}}
                {{#each selectedItems as |date idx|}}
                    {{tr-display label=(concat 'Selection ' idx) value=date type='date' format='LLL'}}<br>
                {{/each}}            
            {{/if}}
        </div>
        {{/demo.example}}
    </div>
  {{demo.snippet "tr-datetime-picker-selection-mode.hbs" label="template.hbs"}}
{{/docs-demo}}

## Enhanced Range Mode 
{{#docs-demo as |demo|}}
    <div>
        {{#demo.example name="tr-datetime-picker-enhanced-range.hbs"}}
        {{#tr-datetime-picker 
            timeMode='hm' 
            mode='range' 
            rangeBegin=rangeBegin 
            rangeEnd=rangeEnd 
            as |displayValue mode date range selectedItems toggle|}}
            {{tr-text-editor label="Bound Begin" value=range.beginDisplayValue}}
            {{tr-text-editor label="Bound End" value=range.endDisplayValue}}
            {{tr-text-editor isDisabled=true label="ReadOnly Range" value=displayValue}}
        {{/tr-datetime-picker}}
        {{/demo.example}}
    </div>
  {{demo.snippet "tr-datetime-picker-enhanced-range.hbs" label="template.hbs"}}
{{/docs-demo}}