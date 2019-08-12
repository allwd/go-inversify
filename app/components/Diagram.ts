import * as go from 'gojs';
import { injectable, inject, multiInject } from 'inversify';
import { constantsSymbols, componentSymbols } from '../IoC/Symbols';
import NodeTemplateProvider from './templateProviders/NodeTemplateProvider';
import AnotherTemplateProvider from './templateProviders/AnotherTemplateProvider';

@injectable()
export default class Diagram extends go.Diagram {
    constructor( @inject(constantsSymbols.diagramSelector) diagramSelector: string,
        @multiInject(componentSymbols.nodeTemplateProvider) nodeTemplateProvider: Array<NodeTemplateProvider | AnotherTemplateProvider>) {
        super(document.querySelector(diagramSelector) as HTMLDivElement);
        this.undoManager.isEnabled = true;
        this.allowDrop = true;
        (window as any).test = nodeTemplateProvider[0].provideTemplate()
        nodeTemplateProvider.forEach(template => this.nodeTemplateMap.add(template.category, template.provideTemplate()));
    }
}
