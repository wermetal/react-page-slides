import * as React  from 'react';
import './ManualSlide.css';
import {ISlideConfig} from "../models/ISlideConfig";
import {ISlideProps} from "../models/ISlideProps";

interface IManualSlideProps extends ISlideConfig, ISlideProps {
    scrollTop: number;
}

export class ManualSlide extends React.PureComponent<IManualSlideProps> {
  static defaultProps = {
    style: {}
  };

  getHeight() {
    return this.props.height;
  }

  getSliderStyles() {
    return {
      height: `${this.getHeight()}px`,
    }
  }

  getBackgroundStyles() {
    let translateY = 0;

    if (this.props.isCurrent) {
      if (this.props.scrollTop !== 0) {
        translateY = -1 * (this.getHeight() - this.props.scrollTop) * this.props.parallax.offset;
      }
    } else {
      if (this.props.isBottom) {
        translateY = -1 * this.getHeight() * this.props.parallax.offset;
      }
    }

    return {
      ...this.props.style,
      height: `${this.getHeight()}px`,
      width: '100%',
      transform: `translateX(0px) translateY(${translateY}px)`,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
    } as React.CSSProperties;
  }

  render() {
    return (
      <div className="rps-slide" style={this.getSliderStyles()}>
        <div className="rps-slide__inner-container" style={{height: `${this.getHeight()}px`}}>
          <div className="rps-slide-background" style={this.getBackgroundStyles()} />
          {this.props.content}
        </div>
      </div>
    )
  }
}