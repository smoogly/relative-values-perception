import React, { CSSProperties } from 'react';
import { Comparator, ComparatorFn } from "./type";

const size = 40;
const basisStyle: CSSProperties = { width: size, height: size, background: "blue", display: "inline-block", borderRadius: "100%" };
const bOffset: CSSProperties = { marginLeft: ".4em", display: "inline-block" };
const fn: ComparatorFn = ({ a, b }) => {
    const comparedSize = size * Math.sqrt(b / a);
    return <div>
        A: <div style={ basisStyle }/>
        <div style={ bOffset } />
        B: <div style={ { height: comparedSize, width: comparedSize, background: "red", display: "inline-block", borderRadius: "100%" } }/>
    </div>;
};
export const CirclesComparator: Comparator = Object.assign(fn, { label: "Circles" });
