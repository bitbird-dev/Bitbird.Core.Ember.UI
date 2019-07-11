# rating-editor

## basic usage
{{#docs-demo as |demo|}}
    <div class="docu-options-block">
      <div>
        <span>Value</span>
        {{tr-numeric-editor value=value}}
      </div>
      <div>
          <span>Lower Boundary</span>
            {{tr-numeric-editor value=lower}}
      </div>
      <div>
        <span>Upper Boundary</span>
          {{tr-numeric-editor value=upper}}
      </div>
      <div>
          <span>Min Value</span>
            {{tr-numeric-editor value=minValue}}
      </div>
      <div>
        <span>Max Value</span>
          {{tr-numeric-editor value=maxValue}}
      </div>
      <div>
        <span>Stepping</span>
          {{tr-numeric-editor value=stepping}}
      </div>
        <div>
        {{#demo.example name="rating-editor.hbs"}}
            {{rating-editor
                label="My Rating"
                value=value
                lower=lower
                upper=upper
                minValue=minValue
                maxValue=maxValue
                stepping=stepping}}
        {{/demo.example}}
        </div>
     </div>
  {{demo.snippet "rating-editor.hbs" label="template.hbs"}}
{{/docs-demo}}

