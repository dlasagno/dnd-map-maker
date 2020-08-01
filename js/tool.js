class Tool {

  constructor(name, icon) {
    this.name = name
    this.icon = icon

    this.eventHandlers = new Map()
  }


  listenTo(events, eventHandler) {
    for (const event of events.split(/\s+/))
      this.eventHandlers.set(event, eventHandler)
  }

  on(event) {
    if (this.eventHandlers.has(event.type))
      this.eventHandlers.get(event.type)(event)
  }

}
