import {Settings} from "./models/Settings";
import * as dat from 'dat.gui';
import {SlideParallaxType} from "../../src";

export class DatGuiWidget {
    private gui;
    constructor() {
       this.gui = new dat.GUI();
    }

    registerOnChange(fn: () => void) {
        this.onChange = fn;
    }
    init(settings: Settings) {
        this.gui.add(settings, 'parallaxOffset',  0, 1).onChange(() => {
            this.onChange();
        });
        this.gui.add(settings, 'currentSlideIndex').onChange(() => {
            this.onChange();
        });
        this.gui.add(settings, 'parallaxType', [SlideParallaxType.reveal, SlideParallaxType.cover]).onChange(() => {
            this.onChange();
        });
        this.gui.add(settings, 'transitionSpeed').onChange(() => {
            this.onChange();
        });
        this.gui.add(settings, 'enableAutoScroll').onChange(() => {
            this.onChange();
        });
    }
    emitOnChange() {
        this.onChange();
    }

    update() {
        Object.keys(this.gui.__controllers).forEach((key) => {
            this.gui.__controllers[key].updateDisplay();
        });
    }
    private onChange: () => void = () => {};
}
