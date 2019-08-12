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
            go.Panel.Auto, 
            {
                locationSpot: go.Spot.Center
            },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, 'RoundedRectangle', { desiredSize: new go.Size(100, 100), fill: 'red' })
        );
    }
}