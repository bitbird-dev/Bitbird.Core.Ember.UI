# splitview

## basic usage
{{#docs-demo as |demo|}}
  {{#demo.example name="split-view.hbs"}}
    <div class="docu-options-block">
      <div>
        <span>orientation</span>
        <select required name="orientationOptions" onchange={{action "setSelection" value="target.value"}}>
          {{#each orientationOptions as |option|}}        
            <option value={{option.value}}>{{option.name}}</option>      
          {{/each}}
        </select>
      </div>
      <div>
        <span>isResizeable</span>
        {{input type="checkbox" checked=toggleIsResizeable}}
      </div>
    </div>
    {{#split-view 
      orientation=selectedOption
      panelSize = "50%"
      isResizable=toggleIsResizeable
      as |sv|}}
      {{#sv.pane}}
        <h1>PANE</h1>
      {{/sv.pane}}
      {{#sv.content}}
        <h1>CONTENT</h1>
      {{/sv.content}}
    {{/split-view}}
  {{/demo.example}}
  {{demo.snippet "split-view.hbs" label="template.hbs"}}
{{/docs-demo}}

