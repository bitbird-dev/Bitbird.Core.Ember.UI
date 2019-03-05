# tr-menubar

TODO: WTF is THIS???

{{#docs-demo as |demo|}}
  {{#demo.example name="tr-menubar.hbs"}}
    {{#tr-menubar as |menu|}}
        <div>menu</div>
      {{#menu.secondary}}
        <div>item1</div>
        <div>item2</div>
        <div>item3</div>
      {{/menu.secondary}}
    {{/tr-menubar}}
  {{/demo.example}}
  {{demo.snippet "tr-menubar.hbs" label="template.hbs"}}
{{/docs-demo}}