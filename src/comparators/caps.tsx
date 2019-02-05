import React, { CSSProperties } from 'react';
import { Comparator, ComparatorFn } from "./type";

const height = 10;
const width = 100;
const basisStyle: CSSProperties = { width, height, display: "inline-block", borderRight: "1px solid black" };
const fn: ComparatorFn = ({ a, b }) => <div>
    A:<div style={ basisStyle }/><br/>
    B:<div style={ { height, width: width * b / a, display: "inline-block", borderRight: "1px solid black" } }/>
</div>;
export const CapComparator: Comparator = Object.assign(fn, { label: "Caps" });
