import React from 'react';
import { Comparator, ComparatorFn } from "./type";

const formatter = new Intl.NumberFormat("en-us");
const formatNumber = (n: number) => formatter.format(n);
const fn: ComparatorFn = ({ a, b }) => <div>
    A: { formatNumber(a) }<br/>
    B: { formatNumber(b) }
</div>;
export const TextComparator: Comparator = Object.assign(fn, { label: "Text" });
