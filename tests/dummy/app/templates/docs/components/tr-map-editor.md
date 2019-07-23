# tr-map-editor

## Basic usage

{{#docs-demo as |demo|}}

  <div class="docu-options-block">
        <div>
          <span>autoGeocode</span>
          {{input type="checkbox" checked=isAutoGeocode}}
      </div>
      <div>
          <span>disableCoordinates</span>
          {{input type="checkbox" checked=isDisableCoordinates}}
      </div>
      <div>
          <span>disableAddressSearch</span>
          {{input type="checkbox" checked=isDisableAddressSearch}}
      </div>
      <div>
          <span>disableDefaultUI</span>
          {{input type="checkbox" checked=disableDefaultUI}}
      </div>
      <div>
          <span>streetViewControl</span>
          {{input type="checkbox" checked=streetViewControl}}
      </div>
      <div>
          <span>zoomControl</span>
          {{input type="checkbox" checked=zoomControl}}
      </div>
      <div>
          <span><s>zoom</s></span>
          <!-- {{input type="number" value=zoomLevel}} -->
      </div>
      <div>
          <span>address</span>
          {{input type="text" value=addressString}}
      </div>
  </div>
  {{#demo.example name="tr-map-editor.hbs"}}
  {{tr-map-editor
    autoGeocode=isAutoGeocode disableCoordinates=isDisableCoordinates disableAddressSearch=isDisableAddressSearch
    disableDefaultUI=disableDefaultUI
    streetViewControl=streetViewControl
    zoomControl=zoomControl 
    address=addressString}}
  {{/demo.example}}
  {{demo.snippet "tr-map-editor.hbs" label="template.hbs"}}
{{/docs-demo}}
