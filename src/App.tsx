import styles from './App.module.scss';

import React, { PureComponent } from 'react';
import Test from "./Test";

interface AppState {
    demo: boolean;
}

class App extends PureComponent<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = { demo: true };
    }

    public render() {
        return <div className={ styles.app }>
            <p>Test accuracy and speed of comparing numbers using different comparison formats.</p>
            <Test demo={ this.state.demo } onChoice={ this._onChoice }/>

            { this._intro() }
        </div>;
    }

    private _intro() {
        if (!this.state.demo) { return null; }
        return <p>Click on an answer to start.</p>;
    }

    private _onChoice = () => {
        if (!this.state.demo) { return; }
        this.setState({ demo: false });
    }
}

export default App;
