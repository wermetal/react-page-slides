import * as React from 'react';
import {ISlideConfig} from "../models/ISlideConfig";
import {ISlidePrallaxConfig} from "../models/ISlidePrallaxConfig";

export interface IPageSlidesProps {
    transitionSpeed: number;
    parallax: ISlidePrallaxConfig;
    slides: ISlideConfig[];
    currentSlideIndex?: number;
    onChange?: (index: number) => void;
}

export interface IPageSlidesState {
    height: number;
}

export abstract class PageSlides extends React.Component<IPageSlidesProps, IPageSlidesState> {

    static defaultProps = {
        enableAutoScroll: true,
        transitionSpeed: 1000,
    };

    public state = {
        height: this._getHeight()
    };

    componentDidMount() {
        this.onResize();
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        window.addEventListener('resize', this.onResize);
        this._componentDidMount();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
        this._componentWillUnmount();
    }

    render() {
        const ContainerComponent = this.getSlidesComponent();
        return <ContainerComponent
            slides={this.props.slides}
            height={this.state.height}
            parallax={this.props.parallax}
            transitionSpeed={this.props.transitionSpeed}
            currentSlideIndex={this.props.currentSlideIndex}
            onChange={this.props.onChange}
        />
    }

    protected abstract _componentDidMount(): void;
    protected abstract _componentWillUnmount(): void;

    private onResize = () => {
        this.setState({height: this._getHeight()});
    };

    private _getHeight() {
        return window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
    }
}