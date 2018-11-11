import * as React from 'react';
import {ISlideConfig, PageSlides, SlideParallaxType} from '../../src';
import {Settings} from "./models/Settings";
import './style.css';


export class MainPage extends React.Component<Settings> {
    render() {
        return (
            <PageSlides
                enableAutoScroll={this.props.enableAutoScroll}
                transitionSpeed={this.props.transitionSpeed}
                slides={this.getSlides()}
                parallax={{
                    offset: this.props.parallaxOffset,
                    type: this.props.parallaxType
                }}
            />
        );
    };

    private getSlides(): ISlideConfig[] {
        return [
            {
                content: this.getFirstPageContent(),
                style: {
                    backgroundImage: 'url("public/photo/photo_1.jpg")'
                }
            },
            {
                content: this.getSecondPageContent(),
                style: {
                    backgroundImage: 'url("public/photo/photo_2.jpg")'
                }
            },
            {
                content: this.getThirdPageContent(),
                style: {
                    backgroundImage: 'url("public/photo/photo_3.jpg")'
                }
            }
        ];
    }

    private getFirstPageContent() {
        return (
            <div className="page">
                <div className="text">
                    <h1>React-Page-Slides</h1>
                    <p>Free Library For Creating Fullscreen Scrolling Websites</p>
                </div>
            </div>
        )
    }

    private getSecondPageContent() {
        return (
            <div className="page">
                <div className="text">
                    <h1>PARALLAX EFFECT</h1>
                    <p>Customize Parallax Effect For Each Page</p>
                </div>
            </div>
        )
    }

    private getThirdPageContent() {
        return (
            <div className="page">
                <div className="text">
                    <h1>AUTO AND MANUAL SCROLL</h1>
                    <p>Customize speed for auto scroll. Use parallax effect for manual and auto scrolling</p>
                </div>
            </div>
        )
    }

}