import * as React from 'react'
import Diagram from './Diagram';
import Palette from './Palette';
import Actions from './Actions';
import { container } from '../../inversify.config';
import { componentSymbols } from '../IoC/Symbols';
import DiagramStorage from '../helpers/DiagramStorage';

import './main.scss';
import ContainerClass from '../helpers/Container';

const Storage: DiagramStorage = container.get(componentSymbols.diagramStorage);
const Container: ContainerClass = container.get(componentSymbols.container);

function Index() {
    const [current, setCurrent] = React.useState(null)
    const [models, setModels] = React.useState({})

    React.useEffect(() => {
        Container.init();
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