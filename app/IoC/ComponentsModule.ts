import { ContainerModule, interfaces, decorate, injectable } from 'inversify';
import { componentSymbols } from './Symbols';
import * as go from 'gojs';
import Diagram from '../gojs/Diagram';
import Palette from '../gojs/Palette';
import RedTemplateProvider from '../gojs/templateProviders/RedTemplateProvider';
import GreenTemplateProvider from '../gojs/templateProviders/GreenTemplateProvider';

const componentsModule = new ContainerModule((bind: interfaces.Bind) => {
    decorate(injectable(), go.Diagram);
    decorate(injectable(), go.Palette);

    bind(componentSymbols.diagram).to(Diagram);
    bind(componentSymbols.palette).to(Palette);

    bind<interfaces.Factory<Diagram>>(componentSymbols.diagramFactory)
        .toAutoFactory(componentSymbols.diagram);
    bind<interfaces.Factory<Palette>>(componentSymbols.paletteFactory)
        .toAutoFactory(componentSymbols.palette);

    bind<RedTemplateProvider>(componentSymbols.nodeTemplateProvider).to(RedTemplateProvider);
    bind<GreenTemplateProvider>(componentSymbols.nodeTemplateProvider).to(GreenTemplateProvider);
});

export default componentsModule;
