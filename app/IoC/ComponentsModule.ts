import { ContainerModule, interfaces, decorate, injectable } from 'inversify';
import { componentSymbols } from './Symbols';
import * as go from 'gojs';
import Diagram from '../components/Diagram';
import Palette from '../components/Palette';
import NodeTemplateProvider from '../components/templateProviders/NodeTemplateProvider';
import AnotherTemplateProvider from '../components/templateProviders/AnotherTemplateProvider';

const componentsModule = new ContainerModule((bind: interfaces.Bind) => {
    decorate(injectable(), go.Diagram);
    decorate(injectable(), go.Palette);

    bind(componentSymbols.diagram).to(Diagram);
    bind(componentSymbols.palette).to(Palette);

    bind<interfaces.Factory<Diagram>>(componentSymbols.diagramFactory)
        .toAutoFactory(componentSymbols.diagram);
    bind<interfaces.Factory<Palette>>(componentSymbols.paletteFactory)
        .toAutoFactory(componentSymbols.palette);

    bind<NodeTemplateProvider>(componentSymbols.nodeTemplateProvider).to(NodeTemplateProvider);
    bind<AnotherTemplateProvider>(componentSymbols.nodeTemplateProvider).to(AnotherTemplateProvider);
});

export default componentsModule;
