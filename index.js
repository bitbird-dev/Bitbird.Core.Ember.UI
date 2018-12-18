'use strict';

module.exports = {
  name: 'bitbird-core-ember-ui',
  included: function(parent) {
    //app.import('addon/styles/style.css');

    //app.import('node_modules/kalel/kalEl/kalEl.js');
    //app.import('node_modules/kalel/kalEl/cal.css');
      this._super.included.apply(this, arguments);

      //this.import('node_modules/jquery-ui/ui/core.js');

      this.import('node_modules/jquery-ui/ui/version.js');
      this.import('node_modules/jquery-ui/ui/data.js');
      this.import('node_modules/jquery-ui/ui/ie.js');
      this.import('node_modules/jquery-ui/ui/safe-active-element.js');
      this.import('node_modules/jquery-ui/ui/safe-blur.js');
      this.import('node_modules/jquery-ui/ui/scroll-parent.js');
      this.import('node_modules/jquery-ui/ui/plugin.js');
      this.import('node_modules/jquery-ui/ui/widget.js');
      this.import('node_modules/jquery-ui/ui/widgets/mouse.js');
      this.import('node_modules/jquery-ui/ui/widgets/draggable.js');
      this.import('node_modules/jquery-ui/ui/widgets/sortable.js');
  }
};
