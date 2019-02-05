import React from 'react';
import { Comparator, ComparatorFn } from "./type";

const height = 10;
const width = 100;
const fn: ComparatorFn = ({ a, b }) => <div>
    A <div style={ { height, width: width * a / (a + b), background: "blue", display: "inline-block" } }/>
    <div style={ { height, width: width * b / (a + b), background: "red", display: "inline-block" } }/> B
</div>;
export const StackComparator: Comparator = Object.assign(fn, { label: "Stacks" });
