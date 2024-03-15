import ProjectManager from "./projectManager"
import { Project } from './type/projectType'

const dummyData: Project[] = [
    {id: crypto.randomUUID(),name: "abc",descrition: "c5435ba"},
    {id: crypto.randomUUID(),name: "abcadsa",descrition: "asdascba"},
    {id: crypto.randomUUID(),name: "abasdasdadc",descrition: "cb5443a"},
    {id: crypto.randomUUID(),name: "abasdasdc",descrition: "cdsasdba"},
    {id: crypto.randomUUID(),name: "abddc",descrition: "cba4343"},
    {id: crypto.randomUUID(),name: "abddsc",descrition: "cgfgba"},
    {id: crypto.randomUUID(),name: "abadasdc",descrition: "c3424sddba"},
    {id: crypto.randomUUID(),name: "abasdasc",descrition: "cb5asda"},
    {id: crypto.randomUUID(),name: "abrehgfsc",descrition: "c5t453fgba"},
    {id: crypto.randomUUID(),name: "adddfsabc",descrition: "cba354353"}
]


function initialize()
{
    const root = document.getElementById('app')
    if(root === null)
        throw new Error("Couldn't find root element !")

    const app = new ProjectManager(root)
    app.init(dummyData)
}

initialize()