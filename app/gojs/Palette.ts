import * as go from 'gojs';
import { injectable, inject } from 'inversify';
import { constantsSymbols, componentSymbols } from '../IoC/Symbols';
import Container from '../helpers/Container';

@injectable()
export default class Palette extends go.Palette {
    constructor( @inject(constantsSymbols.paletteSelector) paletteSelector: string, @inject(componentSymbols.container) container: Container ) {
        super(document.querySelector(paletteSelector) as HTMLDivElement);
        this.layout = go.GraphObject.make(go.GridLayout, { wrappingColumn: 1, alignment: go.GridLayout.Location }),

        this.linkTemplate = container.getDiagram().linkTemplate
        this.nodeTemplateMap = container.getDiagram().nodeTemplateMap
        
        this.model.nodeDataArray = [{ category: 'green', text: '' }, { category: 'red', text: '' }];
    }
}
