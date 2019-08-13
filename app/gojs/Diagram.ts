import * as go from 'gojs';
import { injectable, inject, multiInject } from 'inversify';
import { constantsSymbols, componentSymbols } from '../IoC/Symbols';
import RedTemplateProvider from './templateProviders/RedTemplateProvider';
import GreenTemplateProvider from './templateProviders/GreenTemplateProvider';
import GridLayout from './layoutProviders/GridLayout';

@injectable()
export default class Diagram extends go.Diagram {
    constructor( @inject(constantsSymbols.diagramSelector) diagramSelector: string,
        @multiInject(componentSymbols.nodeTemplateProvider) nodeTemplateProvider: Array<RedTemplateProvider | GreenTemplateProvider>) {
        super(document.querySelector(diagramSelector) as HTMLDivElement);
        this.undoManager.isEnabled = true;
        this.allowDrop = true;
        this.layout = go.GraphObject.make(GridLayout);
        
        nodeTemplateProvider.forEach(template => this.nodeTemplateMap.add(template.category, template.provideTemplate()));
    }
}
