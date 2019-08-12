import go = require('gojs');

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
        return String(new Date().getUTCMilliseconds());
    }

    add() {
        this.current = this.getUniqId();
        this.models = {...this.models, [this.current]: new go.GraphLinksModel()};
        this.updateDiagram();
    }

    change (key) {
        this.updateModel();
        this.current = key;
        this.updateDiagram();
    }

    updateModel () {
        try {
            this.models[this.current] = window.myDiagram.model.toJson();
        } catch {
            console.log("unknown error");
        }
    }

    updateDiagram () {
        window.myDiagram.model = go.Model.fromJson(this.models[this.current]);
    }

    save () {
        this.updateModel();
        localStorage.setItem('gojs', JSON.stringify({ models: this.models, current: this.current }));
    }

    load () {
        const storage = localStorage.getItem('gojs')
        if (!storage) {
            return
        }

        const {
            models,
            current
        } = JSON.parse(storage)
        console.log(models)
        this.current = current
        this.models = models
    }

    getCurrent () {
        return this.current;
    }

    getModels () {
        return this.models;
    }
}

export default DiagramStorage;