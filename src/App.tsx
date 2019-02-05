import styles from './App.module.scss';

import React, { PureComponent } from 'react';
import Test from "./Test";
import { Comparator } from "./comparators/type";
import { TextComparator } from "./comparators/text";
import { BarComparator } from "./comparators/bars";
import { CapComparator } from "./comparators/caps";
import { CirclesComparator } from "./comparators/circles";
import { PieComparator } from "./comparators/pie";
import { StackComparator } from "./comparators/stacks";

const comparators: ReadonlyArray<Comparator> = [
    TextComparator,
    BarComparator,
    CapComparator,
    CirclesComparator,
    PieComparator,
    StackComparator,
];

interface AppState {
    demo: boolean;
    chosenComparators: typeof comparators;
}

class App extends PureComponent<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = { demo: true, chosenComparators: comparators };
    }

    public render() {
        return <div className={ styles.app }>
            <p>Test accuracy and speed of comparing numbers using different comparison formats.</p>

            { this.state.chosenComparators.length > 0
                ? <Test demo={ this.state.demo } onChoice={ this._onChoice } comparators={ this.state.chosenComparators }/>
                : <p>Please choose at least one comparison mode below</p> }

            { this._intro() }
        </div>;
    }

    private _toggleComparator = (c: Comparator) => {
        const idx = this.state.chosenComparators.indexOf(c);
        if (idx === -1) {
            this.setState({ chosenComparators: [...this.state.chosenComparators, c] });
        } else {
            const newComparators = [...this.state.chosenComparators];
            newComparators.splice(idx, 1);
            this.setState({ chosenComparators: newComparators });
        }
    };
    private _comparatorToggles = comparators.reduce((agg, c) => {
        agg[c.label] = () => this._toggleComparator(c);
        return agg;
    }, {} as { [key: string]: () => void });
    private _intro() {
        if (!this.state.demo) { return null; }
        return <div>
            { this.state.chosenComparators.length > 0
                ? <p>Click on an answer to start.</p>
                : null }

            <div>
                <p>Select comparison modes:</p>
                { comparators.map(C => <div key={ C.label } className={ styles.comparator }>
                    <input type="checkbox" checked={ this.state.chosenComparators.indexOf(C) !== -1 }
                           onChange={ this._comparatorToggles[C.label] }/>
                    <div className={ styles.comparator__label }>{ C.label }</div>
                    <div className={ styles.comparator__thumbnail }>
                        <C a={ 100 } b={ 50 }/>
                    </div>
                </div>) }
            </div>
        </div>;
    }

    private _onChoice = () => {
        if (!this.state.demo) { return; }
        this.setState({ demo: false });
    }
}

export default App;
