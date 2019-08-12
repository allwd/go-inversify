import { ContainerModule, interfaces } from 'inversify';
import { constantsSymbols } from './Symbols';

const constantsModule = new ContainerModule((bind: interfaces.Bind) => {

    bind(constantsSymbols.diagramSelector).toConstantValue('.diagram');
    bind(constantsSymbols.paletteSelector).toConstantValue('.palette');

});

export default constantsModule;
