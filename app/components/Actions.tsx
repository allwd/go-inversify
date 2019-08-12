import * as React from 'react'

function Actions({add, change, save, current, models}) {
    return (
        <div className={'actions'}>
            {models && Object.keys(models).map((key, index) => (
                <button key={key} onClick={() => change(key)} style={{fontWeight: String(current) === key ? 'bold' : 'unset'}}>Model {index + 1}</button>
            ))}
            <button onClick={add}>New Model</button>
            <button onClick={save}>Save Diagram</button>
        </div>
    )
}

export default Actions;