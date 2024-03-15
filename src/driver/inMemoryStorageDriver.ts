import { Project } from "../type/projectType";
import InMemoryStorageDriverInterface from "./inMemoryStorageDriverInterface";

export default class InMemoryStorageDriver implements InMemoryStorageDriverInterface {

    #KEY_NAME: string = 'projects'

    constructor() {
        if(localStorage.getItem(this.#KEY_NAME) === null) {
            localStorage.setItem(this.#KEY_NAME,JSON.stringify([]))
        }
    }
    
    save(data: Project[]) {
        localStorage.setItem(this.#KEY_NAME,JSON.stringify(data))
    };

    get() {
        return Array.from<Project>(JSON.parse(localStorage.getItem(this.#KEY_NAME)!));
    }

}