import { ContainerModule, interfaces, decorate, injectable } from 'inversify';
import { componentSymbols } from './Symbols';
import * as go from 'gojs';
import Diagram from '../gojs/Diagram';
import Palette from '../gojs/Palette';
import RedTemplateProvider from '../gojs/templateProviders/RedTemplateProvider';
import GreenTemplateProvider from '../gojs/templateProviders/GreenTemplateProvider';
import DiagramStorage from '../helpers/DiagramStorage';

const componentsModule = new ContainerModule((bind: interfaces.Bind) => {
    decorate(injectable(), go.Diagram);
    decorate(injectable(), go.Palette);

    bind(componentSymbols.diagram).to(Diagram);
    bind(componentSymbols.palette).to(Palette);

    bind<interfaces.Factory<Diagram>>(componentSymbols.diagramFactory)
        .toAutoFactory(componentSymbols.diagram);
    bind<interfaces.Factory<Palette>>(componentSymbols.paletteFactory)
        .toAutoFactory(componentSymbols.palette);
    
    bind<DiagramStorage>(componentSymbols.diagramStorage).to(DiagramStorage).inSingletonScope();

    bind<RedTemplateProvider>(componentSymbols.nodeTemplateProvider).to(RedTemplateProvider);
    bind<GreenTemplateProvider>(componentSymbols.nodeTemplateProvider).to(GreenTemplateProvider);
});

export default componentsModule;
