import * as React from 'react'
import Diagram from './Diagram';
import Palette from './Palette';
import Actions from './Actions';
import './main.scss';

import go = require('gojs');
import { container } from '../../inversify.config';
import { componentSymbols } from '../IoC/Symbols';

declare global {
    interface Window {
        myDiagram: go.Diagram
        myPalette: go.Palette
    }
}

function App() {
    const [uniqId, setUniqId] = React.useState(null)
    const [models, setModels] = React.useState({})
    const [currentModel, setCurrentModel] = React.useState(null)

    const saveModel = () => {
        if (window.myDiagram.model.nodeDataArray.length > 0) {
            const newModels = {...models, [currentModel]: window.myDiagram.model.toJson()}
            setModels(newModels)
        }
    }

    const saveDiagram = () => {
        saveModel()
        localStorage.setItem('gojs', JSON.stringify({ uniqId, currentModel, models: {...models, [currentModel]: window.myDiagram.model.toJson()} }))
    }

    const changeModel = (key) => {
        saveModel()
        setCurrentModel(String(key))
    }

    const addModel = () => {
        saveModel()
        const key = uniqId + 1
        setUniqId(key)
        setModels({...models, [key]: new go.GraphLinksModel()})
        setCurrentModel(String(key))
    }

    React.useEffect(() => {
        const diagramFactory = container.get<Function>(componentSymbols.diagramFactory);
        const paletteFactory = container.get<Function>(componentSymbols.paletteFactory);
        window.myDiagram = diagramFactory();
        window.myPalette = paletteFactory();

        window.myDiagram.requestUpdate();
        const storage = localStorage.getItem("gojs");
        console.log(storage)
        if (storage) {
            const data = JSON.parse(storage)
            setUniqId(data.uniqId)
            setModels(data.models)   
            setCurrentModel(data.currentModel)
        } else {
            setUniqId(1)
            setModels({
                [1]: null
            })
            setCurrentModel(1)
        }
    }, [])

    React.useEffect(() => {
        console.log(models[currentModel])
        window.myDiagram.model = go.Model.fromJson(models[currentModel] || new go.GraphLinksModel())
    }, [currentModel])

    return (
        <div className={'container'}>
            <div className={'wrapper'}>
                <Palette />
                <Diagram />
            </div>
            <Actions {...{currentModel, models, saveDiagram, changeModel, addModel}} />
        </div>
    )
}

export default App;