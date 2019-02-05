import React from 'react';
import { arc, pie, PieArcDatum } from "d3-shape";
import { Comparator, ComparatorFn } from "./type";

const r = 20;
const fn: ComparatorFn = ({ a, b }) => {
    const arcs: ReadonlyArray<PieArcDatum<number>> = pie<number>().startAngle(0).endAngle(2 * Math.PI)([a, b]);

    const alignmentAngleOffset = -arcs[0].endAngle / 2 - Math.PI / 2;
    const sectorPath = arc<PieArcDatum<number>>()
        .startAngle(n => n.startAngle + alignmentAngleOffset)
        .endAngle(n => n.endAngle + alignmentAngleOffset)
        .innerRadius(0)
        .outerRadius(r);

    return <div>
        A
        <svg height={ 2 * r } width={ 2 * r }>
            <g transform={ `translate(${ r }, ${ r })` }>
                <path d={ sectorPath(arcs[0])! } fill="red"/>
                <path d={ sectorPath(arcs[1])! } fill="blue"/>
            </g>
        </svg>
        B
    </div>;
};
export const PieComparator: Comparator = Object.assign(fn, { label: "Pie" });
