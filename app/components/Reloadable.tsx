import * as React from 'react'
import { container } from '../../inversify.config';
import { componentSymbols } from '../IoC/Symbols';
import ContainerClass from '../helpers/Container';

const Container: ContainerClass = container.get(componentSymbols.container);

function Reloadable() {
    const [reloadable, setReloadable] = React.useState(Container.getDiagram().getReloadable())

    const toggleReloadable = () => {
        const value = !reloadable
        setReloadable(value)
        Container.getDiagram().setReloadable(value)
        Container.getDiagram().reloadChanges(null, true)
    }

    return (
        <div className={'toggleReloadable'}>
            <label>
                <input
                    checked={reloadable}
                    type={'checkbox'}
                    onChange={toggleReloadable}
                />
                Automatic reloads
            </label>
        </div>
    )
}

export default Reloadable;