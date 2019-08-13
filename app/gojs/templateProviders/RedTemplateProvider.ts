import * as go from 'gojs';
import { injectable } from 'inversify';

@injectable()
export default class RedTemplateProvider {
    public category = 'red'

    provideTemplate() {
        return this.createTemplate();
    }

    private createTemplate() {
        const $ = go.GraphObject.make;

        return $(go.Node,
            go.Panel.Spot, 
            $(go.Shape, 'RoundedRectangle', { desiredSize: new go.Size(100, 100), fill: 'red' }),
            $(go.TextBlock,
                {
                    font: 'bold 19px sans-serif',
                    isMultiline: false,
                    editable: true,
                    alignment: go.Spot.Bottom,
                    alignmentFocus: go.Spot.Top
                },
                new go.Binding('text', 'index', value => `EL_${Math.abs(Number(value))}`),
                new go.Binding('text', 'text').makeTwoWay()
            )
        );
    }
}