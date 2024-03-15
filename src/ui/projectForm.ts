import Repository from "../repository/repository"
import { Project } from "../type/projectType"
import RendererInterface from "./rendererInterface"

export default class ProjectForm implements RendererInterface {
    
    target: HTMLElement
    repository: Repository
    editData: Project | null

    constructor(target: HTMLElement, repository: Repository) {
        this.repository = repository
        this.target = target
        this.editData = null
    }

    generate(): void {
        const form = document.createElement('form')

        const inputName = document.createElement('input')
        const inputDescription = document.createElement('input')
        const submitButton = document.createElement('button')

        inputName.name = 'name'
        submitButton.innerText = 'submit'
        inputDescription.name = 'description'

        form.appendChild(inputName)
        form.appendChild(inputDescription)
        form.appendChild(submitButton)

        submitButton.addEventListener('click', (e) => {
            e.preventDefault()

            const name = inputName.value
            const desc = inputDescription.value

            const entity: Project = {
                id: crypto.randomUUID(),
                name: name,
                descrition: desc
            }

            this.repository.add(entity)
            this.repository.save()
        })

        this.target.innerHTML = ""
        this.target.appendChild(form)
        
    }

}