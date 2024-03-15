import Repository from '../repository/repository'
import { Project } from '../type/projectType'
import RendererInterface from './rendererInterface'

export default class ProjectTable implements RendererInterface {

    repository: Repository
    target: HTMLElement

    constructor(target: HTMLElement, repository: Repository) {
        this.repository = repository
        this.target = target
    }

    generate(): void {

        this.target.innerHTML = ""
        const table = document.createElement('table')
        
        const tbody = this.generateBody(this.repository.get())
        const thead = this.generateHeader()

        table.appendChild(tbody)
        table.appendChild(thead)

        this.target.appendChild(table)
    }

    generateHeader(): HTMLTableSectionElement {
        const header = document.createElement('thead')

        const headerCol1 = document.createElement('th')
        const headerCol2 = document.createElement('th')
        const headerCol3 = document.createElement('th')

        const headerRow = document.createElement('tr')

        headerCol1.innerText = "Name"
        headerCol2.innerText = "Description"
        headerCol3.innerText = "Actions"
        
        headerRow.appendChild(headerCol1)
        headerRow.appendChild(headerCol2)
        headerRow.appendChild(headerCol3)

        header.appendChild(headerRow)

        return header
    }

    generateBody(data: Project[]): HTMLTableSectionElement {
        const tbody = document.createElement('tbody')

        data.forEach(e => {
            const row = this.generateRow(e)
            tbody.appendChild(row)
        })

        return tbody
    }

    generateRow(entity: Project): HTMLTableRowElement {
        const row = document.createElement('tr')

        const cell1 = document.createElement('td')
        const cell2 = document.createElement('td')
        const cell3 = document.createElement('td')

        cell1.innerText = entity.name
        cell2.innerText = entity.descrition


        const btnRemove = this.#generateRemoveButton(entity.id)
        cell3.appendChild(btnRemove)

        const btnEdit = this.#generateEditButton(entity)
        cell3.appendChild(btnEdit)


        row.appendChild(cell1)
        row.appendChild(cell2)
        row.appendChild(cell3)

        return row
    }

    #generateRemoveButton(id: string):HTMLButtonElement {
        const button = document.createElement('button')

        button.innerText = 'Remove'
        button.addEventListener('click',() => {
            this.repository.delete(id)
            this.repository.save()
        })

        return button
    }

    #generateEditButton(entity: Project):HTMLButtonElement {
        const button = document.createElement('button')

        button.innerText = 'Edit'
        button.addEventListener('click',() => {
            const p: Project = {
                id: entity.id,
                name: prompt("Please provide new project name.",entity.name) ?? "-",
                descrition: prompt("Please provide new project description.",entity.descrition) ?? "-"
            }

            this.repository.update(p)
            this.repository.save()
        })

        return button
    }
}