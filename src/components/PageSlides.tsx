import * as React from 'react';
import {AutoSlidesContainer} from './AutoSlidesContainer';
import {ManualSlidesContainer} from './ManualSlidesContainer';
import {ISlideConfig} from "../models/ISlideConfig";

interface IPageSlidesProps {
    enableAutoScroll: boolean;
    transitionSpeed: number;
    slides: ISlideConfig[];
}

interface IPageSlidesState {
    height: number;
}

export class PageSlides extends React.Component<IPageSlidesProps, IPageSlidesState> {

    static defaultProps = {
        enableAutoScroll: true,
        transitionSpeed: 1000,
    };

    public state = {
        height: this.getHeight()
    };

    componentDidMount() {
        this.onResize();
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize = () => {
        this.setState({height: this.getHeight()});
    };

    getHeight() {
        return window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
    }

    getSlidesComponent() {
        if (this.props.enableAutoScroll) {
            return AutoSlidesContainer;
        } else {
            return ManualSlidesContainer;
        }
    }

    render() {
        const ContainerComponent = this.getSlidesComponent();
        return <ContainerComponent
            slides={this.props.slides}
            height={this.state.height}
            transitionSpeed={this.props.transitionSpeed}
        />
    }
}