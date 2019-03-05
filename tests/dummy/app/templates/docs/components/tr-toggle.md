

# Toggle

## Usage

### isDisabled Property

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-toggle-d.hbs'}}
    {{tr-toggle 
      isDisabled=true }}
  {{/demo.example}}
  {{demo.snippet 'tr-toggle-d.hbs'}}
{{/docs-demo}}

### selectedValue Property

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-toggle.hbs'}}
    {{tr-toggle 
      selectedValue=enSwValue 
      postfix=(if enSwValue "ON" "OFF")
      isDisabled=false }}
  {{/demo.example}}
  {{demo.snippet 'tr-toggle.hbs'}}
{{/docs-demo}}

### onChange Callback Property

If the onChange callback is used, the selected value has to be set manually, otherwise the button does not work.

{{#docs-demo as |demo|}}
  {{#demo.example name='tr-toggle-cb.hbs'}}
    {{tr-toggle 
      selectedValue=cbSwValue 
      isDisabled=false 
      postfix=(if cbSwValue "ON" "OFF")
      onChange=(action "onSwitch")}}
      <p>{{statusText}}</p>
  {{/demo.example}}
  
  {{demo.snippet 'tr-toggle-cb.hbs'}}
  {{demo.snippet 'tr-toggle-cb.js'}}
{{/docs-demo}}