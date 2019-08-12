import * as go from 'gojs';
import { injectable, inject } from 'inversify';
import { constantsSymbols } from '../IoC/Symbols';

@injectable()
export default class Palette extends go.Palette {
    constructor( @inject(constantsSymbols.paletteSelector) paletteSelector: string ) {
        super(document.querySelector(paletteSelector) as HTMLDivElement);
        this.layout = go.GraphObject.make(go.GridLayout, { wrappingColumn: 1, alignment: go.GridLayout.Location }),

        this.linkTemplate = window.myDiagram.linkTemplate
        this.nodeTemplateMap = window.myDiagram.nodeTemplateMap
        
        this.model.nodeDataArray = [{ category: 'green' }, { category: 'red' }];
    }
}
