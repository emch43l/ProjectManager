import RendererInterface from "../ui/rendererInterface";

type ObserverSet = {
    event: string,
    target: RendererInterface
}

export default class RepositoryObserver {

    registered: ObserverSet[] = []

    raiseEvent(event: string) {
        this.registered.forEach(e => {
            if(e.event.toLocaleLowerCase() === event.toLocaleLowerCase()) {
                e.target.generate()
            }
        })
    }

    subscribe(event: string, target: RendererInterface) {
        this.registered.push({event:event, target:target})
    }

    unsubscribe(event: string, target: RendererInterface) {
        this.registered = this.registered.filter(e => e.event !== event && e.target !== target)
    }
}