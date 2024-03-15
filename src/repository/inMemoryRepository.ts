import { Project } from "../type/projectType";
import  Repository  from "./repository";
import InMemoryStorageDriverInterface from "../driver/inMemoryStorageDriverInterface";
import RepositoryObserver from "../observer/repositoryObserver";

export default class InMemoryRepository implements Repository {

    data: Project[]
    observer: RepositoryObserver
    storageDriver: InMemoryStorageDriverInterface;

    constructor(driver: InMemoryStorageDriverInterface, observer: RepositoryObserver) {
        this.storageDriver = driver
        this.data = this.storageDriver.get()
        this.observer = observer
    }

    add(entity: Project) {
        this.data.push(entity)
    };

    update(entity: Project) {
        this.data = this.data.map(e => {
            if(e.id === entity.id) {
                e.name = entity.name
                e.descrition = entity.descrition
            }
            return e
        })

    };

    delete(id: string) {
        this.data = this.data.filter(e => e.id !== id)
    };

    get() {
        return this.data
    };

    save()
    {
        this.storageDriver.save(this.data)
        this.observer.raiseEvent('repo-updated')
    }

}