import * as React from 'react';
import {ISlideConfig, PageSlides} from '../../src';
import './style.css';

export class MainPage extends React.Component {
    getSlides(): ISlideConfig[] {
        return [
            {
                content: 111,
                style: {
                    backgroundImage: 'url("public/photo/photo_1.jpg")'
                },
                parallax: {
                    offset: 0.6
                }
            },
            {
                content: 222,
                style: {
                    backgroundImage: 'url("public/photo/photo_2.jpg")'
                },
                parallax: {
                    offset: 0.6
                }
            },
            {
                content: 333,
                style: {
                    backgroundImage: 'url("public/photo/photo_3.jpg")'
                },
                parallax: {
                    offset: 0.6
                }
            }
        ];
    }
    render() {
        return (
            <PageSlides
                enableAutoScroll={true}
                transitionSpeed={1000}
                slides={this.getSlides()}
            />
        );
    };
}