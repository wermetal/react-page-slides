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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./ManualSlide.css");
var ManualSlide = /** @class */ (function (_super) {
    __extends(ManualSlide, _super);
    function ManualSlide() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ManualSlide.prototype.getHeight = function () {
        return this.props.height;
    };
    ManualSlide.prototype.getSliderStyles = function () {
        return {
            height: this.getHeight() + "px",
        };
    };
    ManualSlide.prototype.getBackgroundStyles = function () {
        var translateY = 0;
        if (this.props.isCurrent) {
            if (this.props.scrollTop !== 0) {
                translateY = -1 * (this.getHeight() - this.props.scrollTop) * this.props.parallax.offset;
            }
        }
        else {
            if (this.props.isBottom) {
                translateY = -1 * this.getHeight() * this.props.parallax.offset;
            }
        }
        return __assign({}, this.props.style, { height: this.getHeight() + "px", width: '100%', transform: "translateX(0px) translateY(" + translateY + "px)", position: 'absolute', top: 0, left: 0, zIndex: -1 });
    };
    ManualSlide.prototype.render = function () {
        return (React.createElement("div", { className: "rps-slide", style: this.getSliderStyles() },
            React.createElement("div", { className: "rps-slide__inner-container", style: { height: this.getHeight() + "px" } },
                React.createElement("div", { className: "rps-slide-background", style: this.getBackgroundStyles() }),
                this.props.content)));
    };
    ManualSlide.defaultProps = {
        style: {}
    };
    return ManualSlide;
}(React.PureComponent));
exports.ManualSlide = ManualSlide;
//# sourceMappingURL=ManualSlide.js.map