import { Project } from './type/projectType'
import ProjectForm from './ui/projectForm'
import ProjectTable from './ui/projectTable'
import InMemoryRepository from './repository/inMemoryRepository'
import InMemoryStorageDriver from './driver/inMemoryStorageDriver'
import RepositoryObserver from './observer/repositoryObserver'

export default class ProjectManager {

    rootElement: HTMLElement

    constructor(rootElement: HTMLElement, ) {
        this.rootElement = rootElement
    }

    init(data?: Project[]) {
        const formContainer = document.createElement('div')
        const tableContainer = document.createElement('div')

        const observer = new RepositoryObserver()

        const repository = new InMemoryRepository(
            new InMemoryStorageDriver(),
            observer
            )

        if(data !== undefined && repository.get().length == 0) {
            data.forEach(e => repository.add(e))
        }

        repository.save()

        const table = new ProjectTable(tableContainer,repository)
        const form = new ProjectForm(formContainer,repository)

        observer.subscribe('repo-updated',table)

        table.generate()
        form.generate()

        this.rootElement.appendChild(formContainer)
        this.rootElement.appendChild(tableContainer)
    }

}