import { Project } from "../type/projectType"

export default interface Repository {

    add:(entity: Project) => void
    update:(entity: Project) => void
    delete:(id: string) => void
    get:() => Project[] 
    save:() => void

}