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
var PropTypes = require("prop-types");
var AutoSlide_1 = require("./AutoSlide");
var AutoSlidesContainer = /** @class */ (function (_super) {
    __extends(AutoSlidesContainer, _super);
    function AutoSlidesContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            startScroll: 0,
            currentSlideIndex: 0,
            transition: false,
            block: false
        };
        _this.prevWheel = 0;
        _this.scrollValue = 0;
        _this.handleMouseWheel = function (event) {
            event.preventDefault();
            if (!_this.state.block) {
                var delta = event.wheelDelta || -event.deltaY;
                if (_this.prevWheel < Math.abs(delta)) {
                    if (delta < 0) {
                        _this.scrollValue--;
                    }
                    else if (delta > 0) {
                        _this.scrollValue++;
                    }
                }
                _this.prevWheel = Math.abs(delta);
                if (Math.abs(_this.scrollValue) > 5) {
                    _this.updateCurrentPage(delta < 0);
                    _this.scrollValue = 0;
                }
            }
        };
        _this.handleKeyDown = function (event) {
            if (!_this.state.block) {
                if (event.keyCode === 38) {
                    _this.updateCurrentPage(false);
                }
                if (event.keyCode === 40) {
                    _this.updateCurrentPage(true);
                }
            }
        };
        _this.handleTouchStart = function (event) {
            _this.touchStart = event.touches[0].pageY;
        };
        _this.handleTouchMove = function (event) {
            event.preventDefault();
            if (!_this.state.block) {
                var touchDelta = event.touches[0].pageY - _this.touchStart;
                if (Math.abs(touchDelta) > 30) {
                    _this.updateCurrentPage(touchDelta < 0);
                    _this.touchStart = event.touches[0].pageY;
                }
            }
        };
        _this.onTransitionEnd = function () {
            _this.setState({
                block: false,
                transition: false
            });
        };
        return _this;
    }
    AutoSlidesContainer.prototype.componentDidMount = function () {
        window.addEventListener('wheel', this.handleMouseWheel, { passive: false });
        window.addEventListener('DOMMouseScroll', this.handleMouseWheel, { passive: false });
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('touchstart', this.handleTouchStart);
        window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    };
    AutoSlidesContainer.prototype.componentWillUnmount = function () {
        window.removeEventListener('wheel', this.handleMouseWheel);
        window.removeEventListener('DOMMouseScroll', this.handleMouseWheel);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchmove', this.handleTouchMove);
    };
    AutoSlidesContainer.prototype.updateCurrentPage = function (nextPage) {
        var currentSlideIndex = (nextPage ? 1 : -1) + this.state.currentSlideIndex;
        if (currentSlideIndex < this.props.slides.length && currentSlideIndex >= 0) {
            this.setState({
                currentSlideIndex: currentSlideIndex,
                transition: true,
                block: true
            });
        }
    };
    AutoSlidesContainer.prototype.renderSlides = function () {
        var _this = this;
        var height = this.getHeight();
        return this.props.slides.map(function (props, index) {
            var isCurrent = index === _this.state.currentSlideIndex;
            var isBottom = index > _this.state.currentSlideIndex;
            return (React.createElement(AutoSlide_1.AutoSlide, __assign({}, props, { isCurrent: isCurrent, transitionSpeed: _this.props.transitionSpeed, height: height, isBottom: isBottom, key: index })));
        });
    };
    AutoSlidesContainer.prototype.getHeight = function () {
        return this.props.height;
    };
    AutoSlidesContainer.prototype.getScrollToTop = function () {
        return this.state.currentSlideIndex * this.getHeight() * -1;
    };
    AutoSlidesContainer.prototype.render = function () {
        return (React.createElement("div", { className: "rps-auto-slides-container", style: this.getContainerStyle(), onTransitionEnd: this.onTransitionEnd }, this.renderSlides()));
    };
    AutoSlidesContainer.prototype.getContainerStyle = function () {
        var scrollToTop = this.getScrollToTop();
        return {
            transform: "translate3d(0px, " + scrollToTop + "px, 0px)",
            transition: "all " + this.props.transitionSpeed + "ms ease",
            height: '100%',
            position: 'relative',
            touchAction: 'none',
            padding: 0,
            margin: 0
        };
    };
    AutoSlidesContainer.propTypes = {
        height: PropTypes.number.isRequired,
        slides: PropTypes.array.isRequired,
        transitionSpeed: PropTypes.number.isRequired
    };
    AutoSlidesContainer.defaultProps = {
        transitionSpeed: 2000
    };
    return AutoSlidesContainer;
}(React.Component));
exports.AutoSlidesContainer = AutoSlidesContainer;
//# sourceMappingURL=AutoSlidesContainer.js.map