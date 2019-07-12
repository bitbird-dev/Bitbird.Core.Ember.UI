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
        <span>Glyph</span>
          {{tr-text-editor value=glyph}}
      </div>
      <div>
        <span>Repeat</span>
          {{tr-numeric-editor value=repeat}}
      </div>
        <div>
        {{#demo.example name="rating-editor.hbs"}}
            {{rating-editor
                label="My Rating is sooopppaaaa!"
                value=value
                lower=lower
                upper=upper
                minValue=minValue
                maxValue=maxValue
                stepping=stepping
                glyph=glyph
                length=length}}
        {{/demo.example}}
        </div>
     </div>
  {{demo.snippet "rating-editor.hbs" label="template.hbs"}}
{{/docs-demo}}

