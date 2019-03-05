# tr-table

{{#docs-demo as |demo|}}
  {{#demo.example name="tr-table.hbs"}}
    {{#tr-table tableData=tableData headerDefinition=headers onRowClicked=(action "rowClick") as |table|}}
      {{#table.headerTemplate as |columnDefinition toggleSorting columnState applyColumnFilter|}}
        {{columnDefinition.headerTitle}}
      {{/table.headerTemplate}}
      {{#table.itemTemplate as |rowData value column|}}
        {{fixedFloatString value 2}}
      {{/table.itemTemplate}}
    {{/tr-table}}
    <h5>{{status}}</h5>
  {{/demo.example}}
  {{demo.snippet "tr-table.hbs" label="template.hbs"}}
  {{demo.snippet "tr-table-data.js" label="data.js"}}
  {{demo.snippet "tr-table-header.js" label="header.js"}}
  {{demo.snippet "tr-table-actions.js" label="actions.js"}}
  {{demo.snippet "fixedFloatString.js"}}
{{/docs-demo}}