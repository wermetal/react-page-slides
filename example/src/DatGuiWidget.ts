import {Settings} from "./models/Settings";
import * as dat from 'dat.gui';

export class DatGuiWidget {
    registerOnChange(fn: () => void) {
        this.onChange = fn;
    }
    init(settings: Settings) {
        const gui = new dat.GUI();
        gui.add(settings, 'parallaxOffset',  0, 1).onChange(() => {
            this.onChange();
        });
        gui.add(settings, 'transitionSpeed').onChange(() => {
            this.onChange();
        });
        gui.add(settings, 'enableAutoScroll').onChange(() => {
            this.onChange();
        });
    }
    emitOnChange() {
        this.onChange();
    }
    private onChange: () => void = () => {};
}
