import * as React from 'react'
import Diagram from './Diagram';
import Palette from './Palette';
import Actions from './Actions';
import { container } from '../../inversify.config';
import { componentSymbols } from '../IoC/Symbols';
import DiagramStorage from '../helpers/DiagramStorage';

import './main.scss';
const Storage: DiagramStorage = container.get(componentSymbols.diagramStorage);

function Index() {
    const [current, setCurrent] = React.useState(null)
    const [models, setModels] = React.useState({})

    React.useEffect(() => {
        const diagramFactory = container.get<Function>(componentSymbols.diagramFactory);
        const paletteFactory = container.get<Function>(componentSymbols.paletteFactory);
        window.myDiagram = diagramFactory();
        window.myPalette = paletteFactory();

        window.myDiagram.requestUpdate();

        Storage.init();
        reload()
    }, [])

    const reload = () => {
        setModels(Storage.getModels())
        setCurrent(Storage.getCurrent())
        Storage.updateDiagram();
    }

    const save = () => {
        Storage.save()
    }

    const add = () => {
        Storage.add()
        reload()
    }

    const change = (key) => {
        Storage.change(key)
        reload()
    }

    return (
        <div className={'container'}>
            <div className={'wrapper'}>
                <Palette />
                <Diagram />
            </div>
            <Actions {...{current, models, save, change, add}} />
        </div>
    )
}

export default Index;