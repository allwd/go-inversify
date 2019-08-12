import * as React from 'react'

function Actions({addModel, changeModel, saveDiagram, currentModel, models}) {
    return (
        <div className={'actions'}>
            {Object.keys(models).map(key => (
                <button key={key} onClick={() => changeModel(key)} style={{fontWeight: String(currentModel) === key ? 'bold' : 'unset'}}>Model {key}</button>
            ))}
            <button onClick={addModel}>New Model</button>
            <button onClick={saveDiagram}>Save Diagram</button>
        </div>
    )
}

export default Actions;