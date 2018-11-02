"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var AutoSlidesContainer_1 = require("./AutoSlidesContainer");
var ManualSlidesContainer_1 = require("./ManualSlidesContainer");
require("./PageSlides.css");
var PageSlides = /** @class */ (function (_super) {
    __extends(PageSlides, _super);
    function PageSlides() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            height: _this.getHeight()
        };
        _this.onResize = function () {
            _this.setState({ height: _this.getHeight() });
        };
        return _this;
    }
    PageSlides.prototype.componentDidMount = function () {
        this.onResize();
        document.getElementsByTagName('body')[0].className = 'rps-enabled';
        window.addEventListener('resize', this.onResize);
    };
    PageSlides.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.onResize);
    };
    PageSlides.prototype.getHeight = function () {
        return window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
    };
    PageSlides.prototype.getSlidesComponent = function () {
        if (this.props.enableAutoScroll) {
            return AutoSlidesContainer_1.AutoSlidesContainer;
        }
        else {
            return ManualSlidesContainer_1.ManualSlidesContainer;
        }
    };
    PageSlides.prototype.render = function () {
        var ContainerComponent = this.getSlidesComponent();
        return React.createElement(ContainerComponent, { slides: this.props.slides, height: this.state.height, transitionSpeed: this.props.transitionSpeed });
    };
    PageSlides.defaultProps = {
        enableAutoScroll: true,
        transitionSpeed: 1000,
    };
    return PageSlides;
}(React.Component));
exports.PageSlides = PageSlides;
//# sourceMappingURL=PageSlides.js.map