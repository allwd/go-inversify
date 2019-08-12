import { container } from '../inversify.config';
import { componentSymbols } from './IoC/Symbols';
import go = require('gojs');

declare global {
    interface Window {
        myDiagram: go.Diagram
        myPalette: go.Palette
    }
}

window.onload = () => {
    const diagramFactory = container.get<Function>(componentSymbols.diagramFactory);
    const paletteFactory = container.get<Function>(componentSymbols.paletteFactory);
    window.myDiagram = diagramFactory();
    window.myPalette = paletteFactory();

    window.myDiagram.requestUpdate();
};
