import Component from '@ember/component';
import layout from '../../templates/components/split-view';
import {computed, observer} from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
    classNames: 'split-view-item split-view-content',
    attributeBindings: ['style']
});
