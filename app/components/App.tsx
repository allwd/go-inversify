import * as React from 'react'
import Index from './Index';

declare global {
    interface Window {
        myDiagram: go.Diagram
        myPalette: go.Palette
    }
}

function App() {
    return (
        <Index />
    )
}

export default App;