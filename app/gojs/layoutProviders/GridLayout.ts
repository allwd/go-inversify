import * as go from 'gojs';
const $ = go.GraphObject.make;

class GridLayout extends go.GridLayout {
    constructor () {
        super();
    }

    doLayout(collection) {
        this.diagram.startTransaction("Serpentine Layout");

        const items = this.collectParts(collection);
        const array = items.toArray().sort(({ data: { text: textA }}, { data: { text: textB }}) => {
            if (textA === textB) {
                return 0;
            }

            return textA < textB ? -1 : 1;
        })
        const { width, height } = items.first().naturalBounds;

        this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
        let { x, y } = this.arrangementOrigin;
        const leftColX = x
        const rightColX = x + width + this.spacing.width
        let isRtl = true

        for (let i = 0; i < array.length; i++) {
            let first = isRtl ? leftColX : rightColX;
            let second = !isRtl ? leftColX : rightColX;
            const newX = i % 2 === 0 ? first : second

            const node = array[i]
            node.move(new go.Point(newX, y))

            if (!(node instanceof go.Node)) {
            continue;
            }

            if (i % 2 !== 0) {
                y += height + this.spacing.height
                isRtl = !isRtl
            }
        }
        
        this.diagram.commitTransaction("Serpentine Layout");
    }
}

export default GridLayout;