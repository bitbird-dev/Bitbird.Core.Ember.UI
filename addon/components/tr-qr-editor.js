import { inject as service } from '@ember/service';
import Editor from './tr-editor';
import layout from '../templates/components/tr-qr-editor';
import { run } from '@ember/runloop';
import { computed } from '@ember/object';
const { next } = run;

export default Editor.extend({
    layout,
    functions: service(),
    classNames: 'tr-editor tr-qrcode-editor',
    isEditing: false,

    size: 64,
    printSize: 256,
    onGenerateNew: null,
    maxLength: null,

    actions: {
        generateNew() {
            let generateNew = this.get('onGenerateNew');
            if(generateNew)
            {
                this.set('value', generateNew());
            } else {
                this.set('value', this.get('functions').makeId());
            }
        },
        edit() {
            this.set('isEditing', true);
        },
        commit() {
            this.set('isEditing', false);
        },
        print() {
            this.set('isPrinting', true);

            next(this, function() {
                let $printable = this.$('.tr-qrcode-editor-printable');

                if($printable.length === 0) {
                    return;
                }

                let html = $printable[0].innerHTML;

                this.set('isPrinting', false);

                html = "<html><head><script>function step1(){\n" +
                        "setTimeout('step2()', 10);}\n" +
                        "function step2(){window.print();window.close()}\n" +
                        "</scri" + "pt></head><body onload='step1()'>\n" +
                        html +
                        "</body></html>";

                let pwa = window.open("about:blank", "_new");
                pwa.document.open();
                pwa.document.write(html);
                pwa.document.close();
            });
        }
    }
});
