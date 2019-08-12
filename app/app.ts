import { container } from '../inversify.config';
import { componentSymbols } from './IoC/Symbols';
import './main.scss';
import go = require('gojs');

declare global {
    interface Window {
        myDiagram: go.Diagram
    }
}

window.onload = () => {
    const diagramFactory = container.get<Function>(componentSymbols.diagramFactory);
    const paletteFactory = container.get<Function>(componentSymbols.paletteFactory);
    (window as any).myDiagram = diagramFactory();
    (window as any).myPalette = paletteFactory();
};
