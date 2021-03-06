import styles from "./Test.module.scss";

import React, { PureComponent } from 'react';
import { Comparator } from "./comparators/type";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const answers = Array.from(Array(9)).map((x, i) => (i + 1) / 10);
const generateNumbers = () => {
    const a = getRandomInt(100, 1000000);
    const answer = answers[getRandomInt(0, answers.length)];
    const b = Math.round(a * answer);
    return [a, b];
};

interface TestProps {
    comparators: ReadonlyArray<Comparator>;
    demo?: boolean;
    onChoice?: () => void;
}

interface TestState {
    a: number;
    b: number;
    ts: number;
    stats: { [comparator: string]: ReadonlyArray<{ accuracy: number, duration: number }> };
}

const comparatorStats = (comparators: TestProps["comparators"]) => comparators.reduce((agg, c) => {
    agg[c.label] = [];
    return agg;
}, {} as TestState["stats"]);

class Test extends PureComponent<TestProps, TestState> {
    constructor(props: TestProps) {
        super(props);

        const [a, b] = generateNumbers();
        this.state = {
            a, b,
            ts: Date.now(),
            stats: comparatorStats(props.comparators)
        };
    }

    public componentWillReceiveProps(nextProps: Readonly<TestProps>): void {
        if (this.props.comparators !== nextProps.comparators) {
            this.setState({ stats: comparatorStats(nextProps.comparators) });
        }
    }

    private _selectComparator(): Comparator {
        const nAnswers = Object.keys(this.state.stats).reduce((tot, k) => tot + this.state.stats[k].length, 0);
        return this.props.comparators[nAnswers % this.props.comparators.length];
    }

    private _handleAnswer = (answer: number) => {
        if (this.props.onChoice) { this.props.onChoice(); }

        if (this.props.demo) {
            const [a, b] = generateNumbers();
            this.setState({ a, b });
            return;
        }

        const now = Date.now();
        const trueAnswer = this.state.b / this.state.a;

        const comparator = this._selectComparator();
        const newStats = {
            ...this.state.stats,
            [comparator.label]: [...this.state.stats[comparator.label], {
                duration: now - this.state.ts,
                accuracy: Math.abs(answer - trueAnswer)
            }]
        };

        const [a, b] = generateNumbers();
        this.setState({ a, b, ts: now, stats: newStats })
    };
    private _answerHandlers = answers.reduce((agg, a) => {
        agg[a] = () => this._handleAnswer(a);
        return agg;
    }, {} as { [key: string]: () => void });

    public render() {
        const Compare = this._selectComparator();
        return <div>
            <p>What % of A is B?</p>
            <div className={styles.compareWrapper}><Compare a={ this.state.a } b={ this.state.b }/></div>
            <div className={styles.answers}>
                B is { answers.map(a => <button key={ a } onClick={ this._answerHandlers[a] }>{ a * 100 }%</button>) } of A
            </div>

            { this.props.demo ? null : this._stats() }
        </div>
    }

    private _stats() {
        const slice = 7;
        const remaining = Object.keys(this.state.stats)
            .map(k => slice - this.state.stats[k].length)
            .map(n => n > 0 ? n : 0)
            .reduce((tot, n) => tot + n, 0);
        if (remaining > 0) {
            return <div><p>{ remaining } { remaining === 1 ? "attempt" : "attempts" } remaining. Keep going.</p></div>
        }

        return <div>
            <p>
                Average over last { slice * this.props.comparators.length } attempts.<br/>
                Smaller values are better. Duration is in milliseconds.<br/>
            </p>
            <table className={styles.table}>
                <tbody>
                <tr>
                    <th className={ styles.table__header }>Type</th>
                    <th className={ styles.table__header }>ms</th>
                    <th className={ styles.table__header }>Mistake</th>
                </tr>
                { Object.keys(this.state.stats).map(k => {
                    const compStats = this.state.stats[k].slice(-slice);
                    if (compStats.length === 0) {
                        return <tr key={ k }>
                            <td>{ k }</td>
                            <td>&ndash;</td>
                            <td>&ndash;</td>
                        </tr>;
                    }

                    const accuracy = compStats.map(s => s.accuracy).reduce((tot, a) => a + tot, 0) / compStats.length;
                    const duration = compStats.map(s => s.duration).reduce((tot, d) => d + tot, 0) / compStats.length;

                    return <tr key={ k }>
                        <td className={ styles.table__cell }>{ k }</td>
                        <td className={ styles.table__cell }>{ Math.round(duration * 100) / 100 }</td>
                        <td className={ styles.table__cell }>{ Math.round(accuracy * 100) / 100 }</td>
                    </tr>;
                }) }
                </tbody>
            </table>
        </div>
    }
}

export default Test;
