import * as go from 'gojs';

class GridLayout extends go.GridLayout {
    doLayout(collection) {
        let list = this.collectParts(collection)
        if (!list.count) {
            return
        }

        this.diagram.startTransaction('Grid Layout');

        const items = list
            .toArray()
            .sort(({ data: { text: textA } }, { data: { text: textB } }) => {
                if (textA === textB) {
                    return 0;
                }

                return textA < textB ? -1 : 1;
            })

        const { width, height } = items[0].naturalBounds;

        this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
        let { x, y } = this.arrangementOrigin;
        let isRtl = true

        const boxWidth = width + this.spacing.width
        const boxHeight = height + this.spacing.height

        const leftColX = x
        const rightColX = x + width + this.spacing.width

        const smallScreen = this.diagram.viewportBounds.width < boxWidth

        for (let i = 0; i < items.length; i++) {
            let first = isRtl ? leftColX : rightColX;
            let second = !isRtl ? leftColX : rightColX;
            let newX = i % 2 === 0 ? first : second

            if (smallScreen) {
                newX = first
                y += boxHeight
            }

            const node = items[i]
            node.move(new go.Point(newX, y))

            if (!(node instanceof go.Node)) {
                continue;
            }

            if (i % 2 !== 0 && !smallScreen) {
                y += boxHeight
                isRtl = !isRtl
            }
        }

        this.diagram.commitTransaction('Grid Layout');
    }
}

export default GridLayout;