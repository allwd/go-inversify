import * as go from 'gojs';
import { injectable, inject, multiInject } from 'inversify';
import { constantsSymbols, componentSymbols } from '../IoC/Symbols';
import RedTemplateProvider from './templateProviders/RedTemplateProvider';
import GreenTemplateProvider from './templateProviders/GreenTemplateProvider';
import GridLayout from './layoutProviders/GridLayout';

@injectable()
export default class Diagram extends go.Diagram {
    private _reloadable: boolean = true;

    constructor( @inject(constantsSymbols.diagramSelector) diagramSelector: string,
        @multiInject(componentSymbols.nodeTemplateProvider) nodeTemplateProvider: Array<RedTemplateProvider | GreenTemplateProvider>) {
        super(document.querySelector(diagramSelector) as HTMLDivElement);
        this.undoManager.isEnabled = true;
        this.allowDrop = true;
        this.layout = go.GraphObject.make(GridLayout);
        this.addChangedListener(this.reloadChanges)
        this.commandHandler.doKeyDown = function () {
            const { lastInput } = this.diagram;
            const control = lastInput.control || lastInput.meta;
            const { key } = lastInput;

            if (control && key === 'L') {
                this.diagram.reloadChanges(null, true);
            } else {
                go.CommandHandler.prototype.doKeyDown.call(this);
            }
        }
        
        nodeTemplateProvider.forEach(template => this.nodeTemplateMap.add(template.category, template.provideTemplate()));
    }

    reloadChanges = (_, force = false) => {
        if (this._reloadable || force) {
            this.layout.invalidateLayout();
        }
    }

    getReloadable() {
        return this._reloadable;
    }

    setReloadable(value) {
        this._reloadable = value
    }
}
