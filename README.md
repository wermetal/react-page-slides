# react-page-slides

React component for reating fullscreen scrolling websites with parallax effect. Supports Typescript.

## Installation
```sh
npm install --save react-page-slides
```

## Demo

[Click here](https://wermetal.github.io/react-page-slides/)

## Usage
```
import React from 'react';
import {ISlideConfig, PageSlides, SlideParallaxType} from 'react-page-slides';

export const MainPage = () => {
    const slides: ISlideConfig[] = [
        {
            content: <div>first page content</div>,
            style: {
                backgroundImage: 'url("public/photo/photo_1.jpg")'
            }
        },
        {
            content: <div>second page content</div>,
            style: {
                backgroundImage: 'url("public/photo/photo_2.jpg")'
            }
        },
        {
            content: <div>third page content</div>,
            style: {
                backgroundImage: 'url("public/photo/photo_2.jpg")'
            }
        },
    ];
    return (
        <PageSlides
            enableAutoScroll={true}
            transitionSpeed={1000}
            slides={slides}
            parallax={{
                offset: 0.6,
                type: SlideParallaxType.reveal
            }}
        />
    )
};
```

## Props

* enableAutoScroll - scroll slides automatically or not
* transitionSpeed - speed of scrolling in milliseconds when using enableAutoScroll = true
* slides - array of configurations of slides. Configurations must implement interface ISlideConfig
```
interface ISlideConfig {
    content: any; // content of slide.
    style: CSSProperties //css properties. can be using for setting of background to slide.
}
```
* parallax - parallax settings. Takes two options - offset of parallax (allows float values from 0 to 1) and type ('reveal' or 'cover');
* currentSlideIndex - can be using for scrolling to particular slide (allows integer values from 0 to slides.length - 1). You can use it with react-router.
* onChange - subscribe to change slide event. first parameter of callback - index of current slide.



