# tr-splitview

## basic usage
{{#docs-demo as |demo|}}
  {{#demo.example name="tr-splitview.hbs"}}
    {{#tr-splitview 
      orientation="horizontal" 
      panelSize="50%" 
      isResizable=true
      as |sv|}}
      {{#sv.pane}}
        <h1>PANE</h1>
      {{/sv.pane}}
      {{#sv.content}}
        <h1>CONTENT</h1>
      {{/sv.content}}
    {{/tr-splitview}}
  {{/demo.example}}
  {{demo.snippet "tr-splitview.hbs" label="template.hbs"}}
{{/docs-demo}}

## Open and collapse panel
{{#docs-demo as |demo|}}
  {{#demo.example name="tr-splitview-bd.hbs"}}
    {{#tr-form header="options" size=4}}
      {{#tr-form-block canCollapse=false size=1 as |formBlock|}}
        {{#formBlock.content}}
          {{tr-toggle label="isOpen" selectedValue=isOpen postfix=""}}
        {{/formBlock.content}}
      {{/tr-form-block}}
      {{#tr-form-block canCollapse=false size=1 as |formBlock|}}
        {{#formBlock.content}}
          {{tr-toggle label="sidebarMode" selectedValue=sidebarMode postfix=""}}
        {{/formBlock.content}}
      {{/tr-form-block}}
      {{#tr-form-block canCollapse=false size=1 as |formBlock|}}
        {{#formBlock.content}}
          {{tr-toggle label="enableToggle" selectedValue=enableToggle postfix=""}}
        {{/formBlock.content}}
      {{/tr-form-block}}
      {{#tr-form-block canCollapse=false size=1 as |formBlock|}}
        {{#formBlock.content}}
          {{tr-toggle label="enableBackdrop" selectedValue=enableBackdrop postfix=""}}
        {{/formBlock.content}}
      {{/tr-form-block}}
    {{/tr-form}}
    {{#tr-splitview 
      isOpen=isOpen
      orientation="horizontal" 
      panelSize="50%" 
      isResizable=true
      sidebarMode=sidebarMode
      enableBackdrop=true
      enableToggle=true
      as |sv|}}
      {{#sv.pane}}
        <h1>PANE</h1>
      {{/sv.pane}}
      {{#sv.content}}
        <h1>CONTENT</h1>
      {{/sv.content}}
      {{#sv.backdrop}}
        <h1>BACKDROP</h1>
      {{/sv.backdrop}}
    {{/tr-splitview}}
  {{/demo.example}}
  {{demo.snippet "tr-splitview-bd.hbs" label="template.hbs"}}
  {{demo.snippet "tr-splitview-actions.js" label="controller.js"}}
{{/docs-demo}}