import React, { CSSProperties } from 'react';
import { Comparator, ComparatorFn } from "./type";

const height = 10;
const width = 100;
const basisStyle: CSSProperties = { width, height, background: "blue", display: "inline-block" };
const fn: ComparatorFn = ({ a, b }) => <div>
    A: <div style={ basisStyle }/><br/>
    B: <div style={ { height, width: width * b / a, background: "red", display: "inline-block" } }/>
</div>;
export const BarComparator: Comparator = Object.assign(fn, { label: "Bars" });
