# tr-numeric-editor

## Issues

Multiple commas can be entered...

## Demo
{{#docs-demo as |demo|}}
    <div class="docu-options-block">
      <ul>
        <li>{{input type="checkbox" class="checkbox" checked=isReadonly}} isReadonly</li>
        <li>{{input type="checkbox" class="checkbox" checked=allowNull}} allowNull</li>
        <li>label {{input type="text" value=label}}</li>
        <li>placeholder {{input type="text" value=placeholder}}</li>
        <li>title {{input type="text" value=title}}</li>
        <li>info (title) {{input type="text" value=content}}</li>
        <li>minValue {{input type="text" value=minValue}}</li>
        <li>maxValue {{input type="text" value=maxValue}}</li>
        <li>fractionLength {{input type="text" value=fractionLength}}</li>
        <li>value {{input type="text" value=value}}</li>
      </ul>
    </div>
    <hr>
    {{#demo.example name='tr-numeric-editor.hbs'}}
    {{tr-numeric-editor
      label=label
      value=value
      isReadonly=isReadonly
      allowNull=allowNull
      title=title
      info=info
      minValue=minValue
      maxValue=maxValue
      fractionLength=fractionLength
      placeholder=placeholder}}
      <p>Current Value = {{value}}</p>
  {{/demo.example}}
  {{demo.snippet 'tr-numeric-editor.hbs' label='template.hbs'}}
  {{demo.snippet 'tr-numeric-editor.js' label='controller.js'}}
{{/docs-demo}}