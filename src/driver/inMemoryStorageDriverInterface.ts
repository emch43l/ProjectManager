import { Project } from "../type/projectType"

export default interface InMemoryStorageDriverInterface {
    save: (data: Project[]) => void
    get:() => Array<Project>
}