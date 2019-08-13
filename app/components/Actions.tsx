import * as React from 'react'

function Actions({ add, change, save, current, models }) {
    return (
        <div className={'actions'}>
            {models && Object.keys(models).map(key => (
                <button
                    className={'button'}
                    key={key}
                    onClick={() => change(key)}
                    style={{ fontWeight: String(current) === key ? 'bold' : 'unset' }}
                >
                    Model {key}
                </button>
            ))}
            <button
                className={'button'}
                onClick={add}
            >
                New Model
            </button>
            <button
                className={'button'}
                onClick={save}
            >
                Save Diagram
            </button>
        </div>
    )
}

export default Actions;