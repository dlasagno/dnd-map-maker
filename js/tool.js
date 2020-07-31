class Tool {

  constructor(name, icon) {
    this.name = name
    this.icon = icon

    this.eventHandlers = new Map()
  }


  listenTo(event, eventHandler) {
    this.eventHandlers.set(event, eventHandler)
  }

  on(event) {
    this.eventHandlers.get(event.type)(event)
  }

}
