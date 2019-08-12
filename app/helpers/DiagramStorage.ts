import go = require('gojs');
import { injectable } from 'inversify';

@injectable()
class DiagramStorage {
    private models;
    private current;

    init() {
        this.load();
        if (!this.models) {
            this.add();
        }
    }

    getUniqId() {
        let max = 1;
        if (this.models) {
            Object.keys(this.models).forEach(key => {
                const number = Number(key)
                if (number >= max) {
                    max = number + 1
                }
            })
        }
        
        return String(max);
    }

    add() {
        this.updateModel();
        this.current = this.getUniqId();
        this.models = { ...this.models, [this.current]: null };
        this.updateDiagram();
    }

    change(key) {
        this.updateModel();
        this.current = key;
        this.updateDiagram();
    }

    updateModel() {
        try {
            this.models[this.current] = window.myDiagram.model.toJson();
        } catch {
            console.log("unknown error");
        }
    }

    updateDiagram() {
        window.myDiagram.model = go.Model.fromJson(this.models[this.current] || new go.GraphLinksModel());
    }

    save() {
        this.updateModel();
        localStorage.setItem('gojs', JSON.stringify({ models: this.models, current: this.current }));
    }

    load() {
        const storage = localStorage.getItem('gojs')
        if (!storage) {
            return
        }

        const {
            models,
            current
        } = JSON.parse(storage)
        
        this.current = current
        this.models = models
    }

    getCurrent() {
        return this.current;
    }

    getModels() {
        return this.models;
    }
}

export default DiagramStorage;