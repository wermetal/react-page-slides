import * as React from 'react';
import {CSSProperties} from 'react';

interface ISlideProps {
    height: number;
}

export class Slide extends React.PureComponent<ISlideProps> {

    render() {
        return (
            <div className="rps-slide" style={this.getSliderStyles()}>
                <div className="rps-slide__inner-container" style={this.getSlideInnerContainerStyles()}>
                    {this.props.children}
                </div>
            </div>
        )
    }

    private getHeight() {
        return this.props.height;
    }

    private getSliderStyles() {
        return {
            height: `${this.getHeight()}px`,
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            boxSizing: 'border-box'
        } as CSSProperties;
    }

    private getSlideInnerContainerStyles() {
        return {
            height: `${this.getHeight()}px`,
            position: 'relative',
            width: '100%',
            overflow: 'hidden'
        } as CSSProperties;
    }
}