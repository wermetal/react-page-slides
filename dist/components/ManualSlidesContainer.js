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
require("./ManualSlidesContainer.css");
var ManualSlide_1 = require("./ManualSlide");
var ManualSlidesContainer = /** @class */ (function (_super) {
    __extends(ManualSlidesContainer, _super);
    function ManualSlidesContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            scrollToTop: 0,
            currentSlideIndex: 0,
            transition: false,
            scrollTop: 0,
            block: false
        };
        return _this;
    }
    ManualSlidesContainer.prototype.componentDidMount = function () {
        var _this = this;
        this.container.addEventListener('scroll', function (event) {
            var target = event.target;
            if (!_this.props.enableAutoScroll && target) {
                var currentSlideIndex = Math.ceil(target.scrollTop / _this.getHeight());
                var scrollTop = target.scrollTop % _this.getHeight();
                if (_this.state.currentSlideIndex !== currentSlideIndex) {
                    _this.setState({
                        scrollTop: scrollTop,
                        currentSlideIndex: currentSlideIndex
                    });
                }
                else {
                    _this.setState({
                        scrollTop: scrollTop
                    });
                }
            }
        });
    };
    ManualSlidesContainer.prototype.getHeight = function () {
        return this.props.height;
    };
    ManualSlidesContainer.prototype.renderSlides = function () {
        var _this = this;
        var height = this.getHeight();
        return this.props.slides.map(function (props, index) {
            var isCurrent = index === _this.state.currentSlideIndex;
            var isBottom = index > _this.state.currentSlideIndex;
            return (React.createElement(ManualSlide_1.ManualSlide, __assign({}, props, { isCurrent: isCurrent, scrollTop: isCurrent ? _this.state.scrollTop : 0, height: height, isBottom: isBottom, key: index })));
        });
    };
    ManualSlidesContainer.prototype.getContainerStyle = function () {
        var height = this.getHeight();
        return {
            height: height + "px",
        };
    };
    ManualSlidesContainer.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "rps-manual-slides-container", style: this.getContainerStyle(), ref: function (ref) {
                _this.container = ref;
            } }, this.renderSlides()));
    };
    ManualSlidesContainer.defaultProps = {
        enableAutoScroll: false
    };
    return ManualSlidesContainer;
}(React.PureComponent));
exports.ManualSlidesContainer = ManualSlidesContainer;
//# sourceMappingURL=ManualSlidesContainer.js.map