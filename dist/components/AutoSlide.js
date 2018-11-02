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
require("./AutoSlide.css");
var AutoSlide = /** @class */ (function (_super) {
    __extends(AutoSlide, _super);
    function AutoSlide() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoSlide.prototype.getHeight = function () {
        return this.props.height;
    };
    AutoSlide.prototype.getSliderStyles = function () {
        return {
            height: this.getHeight() + "px",
        };
    };
    AutoSlide.prototype.getBackgroundStyles = function () {
        var translateY = 0;
        if (this.props.isBottom) {
            translateY = -1 * this.props.parallax.offset * this.getHeight();
        }
        var styles = __assign({}, this.props.style, { height: this.getHeight() + "px", width: '100%', transform: "translateX(0px) translateY(" + translateY + "px)", position: 'absolute', top: 0, left: 0, zIndex: -1 });
        if (this.props.isBottom || this.props.isCurrent) {
            styles = __assign({}, styles, { transition: "all " + this.props.transitionSpeed + "ms ease" });
        }
        return styles;
    };
    AutoSlide.prototype.render = function () {
        return (React.createElement("div", { className: "rps-slide", style: this.getSliderStyles() },
            React.createElement("div", { className: "rps-slide__inner-container", style: { height: this.getHeight() + "px" } },
                React.createElement("div", { className: "rps-slide-background", style: this.getBackgroundStyles() }),
                this.props.content)));
    };
    AutoSlide.defaultProps = {
        style: {}
    };
    return AutoSlide;
}(React.PureComponent));
exports.AutoSlide = AutoSlide;
//# sourceMappingURL=AutoSlide.js.map