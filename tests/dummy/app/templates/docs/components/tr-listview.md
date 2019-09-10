# ListView

## Basic usage

{{#docs-demo as |demo|}}
    {{#demo.example name="tr-listview.hbs"}}
        {{#tr-listview items=items as |lv|}}
          {{#lv.itemTemplate as |item|}}
            This is the item "{{item.id}}"
          {{/lv.itemTemplate}}
          {{#lv.header header="My Header" subHeader="Content for subheader" showHeader=false showMenu=true as |header|}}
            {{#header.menu}}
              {{tr-button-editor text="Button in bar"}}
            {{/header.menu}}
            {{#header.content}}Some special content in the header{{/header.content}}  
          {{/lv.header}}
          {{#lv.empty}}
            There's no item available ({{items.length}})
          {{/lv.empty}}
        {{/tr-listview}}
    {{/demo.example}}
    {{demo.snippet "tr-listview.hbs" label="template.hbs"}}
{{/docs-demo}}
