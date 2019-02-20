import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller/*, model*/) {
    controller.set('statusText', 'toggle the callback switch...');
    controller.set('enSwValue', false);
    controller.set('psSwValue', false);
    controller.set('cbSwValue', false);
    controller.set('opSwValue', null);
    controller.set('errorTest', [
      {message: 'errorMsg 1'},
      {message: 'errorMsg 2'}
    ]);
    controller.set('opSwOptions', [
      { value: true, content: 'true' },
      { value: null, content: 'null' },
      { value: false, content: 'false' }
    ]);
    controller.set('actions', { 
      onSwitch(){
        let v = this.get('cbSwValue');
        this.set('cbSwValue', !v);
        this.set('statusText', `changed callbackSwitch value from ${v} to ${!v}.`);
      }
    });
  }
});
