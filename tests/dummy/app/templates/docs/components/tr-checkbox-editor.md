# tr-checkbox-editor

## Basic usage
{{#docs-demo as |demo|}}
    {{#demo.example name='checkbox-snippet.hbs'}}
    <div class="docu-options-block">
        <ul>
            <li>{{input type="checkbox" class="checkbox" checked=isSelected}} isSelected</li>
            <li>{{input type="checkbox" class="checkbox" checked=allowNull}} allowNull</li>
            <li>{{input type="checkbox" class="checkbox" checked=isReadonly}} isReadonly</li>
            <li>label {{input type="text" value=label}}</li>
            <li>placeholder {{input type="text" value=placeholder}}</li>
            <li>info title {{input type="text" value=info.title}}</li>
            <li>info content {{input type="text" value=info.content}}</li>
        </ul>
    </div>
    <hr>
        {{tr-checkbox-editor 
            label=label
            info=info.content
            title=info.title
            isReadonly=isReadonly
            errors=errors
            placeholder=placeholder
            allowNull=allowNull
            value=isSelected}}
    {{/demo.example}}
    {{demo.snippet 'checkbox-snippet.hbs' label='tr-checkbox-editor.hbs'}}
    {{demo.snippet 'tr-checkbox-editor.js' label='tr-checkbox-editor.js'}}
{{/docs-demo}}