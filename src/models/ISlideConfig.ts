import {CSSProperties} from "react";

export interface ISlideConfig {
    content: any;
    parallax?: {
        offset: number;
    };
    style: CSSProperties
}