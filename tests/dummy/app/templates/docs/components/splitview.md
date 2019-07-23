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
        <span>isResizable</span>
        {{input type="checkbox" checked=toggleIsResizable}}
      </div>
      <div>
      <span>isReverse</span>
        {{input type="checkbox" checked=toggleIsReverse}}
      </div>
      <div>
      <span>isFullSize</span>
        {{input type="checkbox" checked=toggleIsFullSize}}
      </div>
      <div>
      {{#if toggleIsResizable}}
          <div>
            <span>doubleClickToToggle (on handle)</span>
            {{input type="checkbox" checked=toggleDoubleClickToToggle}}
          </div>
      {{/if}}
      <span>panelSize</span>
        {{input type="text" value=panelSize}} (px, initially % is accepted)
      </div>
    </div>
    <div style="width:100%;height:350px;padding:4px;background:#91cec0;">
        {{#split-view 
              orientation=selectedOption
              panelSize=panelSize
              isResizable=toggleIsResizable
              isReverse=toggleIsReverse
              isFullSize=toggleIsFullSize
              doubleClickToToggle=toggleDoubleClickToToggle
              as |sv|}}
              {{#sv.pane style="background-color:#cb91ce;"}}
                <h1>PANE</h1>
              {{/sv.pane}}
              {{#sv.content style="background-color:#EE99FF;"}}
                <h1>CONTENT</h1>
                <ol>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                    <li>Four</li>
                </ol>
              {{/sv.content}}
            {{/split-view}}
    </div>
  {{/demo.example}}
  {{demo.snippet "split-view.hbs" label="template.hbs"}}
{{/docs-demo}}

