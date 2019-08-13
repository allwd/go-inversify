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
        const boxWidth = width + this.spacing.width
        const boxHeight = height + this.spacing.height

        const leftColX = x
        const rightColX = x + width + this.spacing.width
        let isRtl = true

        const smallScreen = this.diagram.viewportBounds.width < boxWidth

        for (let i = 0; i < array.length; i++) {
            let first = isRtl ? leftColX : rightColX;
            let second = !isRtl ? leftColX : rightColX;
            let newX = i % 2 === 0 ? first : second

            if (smallScreen) {
                newX = first
                y += boxHeight
            }

            const node = array[i]
            node.move(new go.Point(newX, y))

            if (!(node instanceof go.Node)) {
            continue;
            }

            if (i % 2 !== 0 && !smallScreen) {
                y += boxHeight
                isRtl = !isRtl
            }
        }
        
        this.diagram.commitTransaction("Serpentine Layout");
    }
}

export default GridLayout;