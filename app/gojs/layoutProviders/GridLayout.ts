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

        let { width, height } = items[0].actualBounds;
        const { right } = this.diagram.viewportBounds;

        this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
        let { x, y } = this.arrangementOrigin;
        let isRtl = false
        let left = x

        const boxWidth = width + this.spacing.width
        const boxHeight = height + this.spacing.height

        const initialX = x
        let lastX = 0

        for (let i = 0; i < items.length; i++) {
            const node = items[i];
            ({ width, height } = node.actualBounds);
            node.move(new go.Point(x, y))

            if (!(node instanceof go.Node)) {
                continue;
            }

            lastX = x
            x += (isRtl ? -1 : 1) * boxWidth
            if (x + width >= right || x < left) {
                x = isRtl ? initialX : lastX;
                y += boxHeight
                isRtl = !isRtl
            }
        }

        this.diagram.commitTransaction('Grid Layout');
    }
}

export default GridLayout;