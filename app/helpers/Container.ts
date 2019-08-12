import { container } from '../../inversify.config';
import { componentSymbols } from '../IoC/Symbols';
import { injectable } from 'inversify';

@injectable()
class Container {
    private diagram;
    private palette;

    init () {
        const diagramFactory = container.get<Function>(componentSymbols.diagramFactory);
        const paletteFactory = container.get<Function>(componentSymbols.paletteFactory);
        this.diagram = diagramFactory();
        this.palette = paletteFactory();

        this.diagram.requestUpdate();
    }

    getDiagram() {
        return this.diagram;
    }

    getPalette() {
        return this.palette;
    }
}

export default Container;