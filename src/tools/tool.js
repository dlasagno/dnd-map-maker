export class Tool {

  constructor(name, icon) {
    this.name = name;
    this.icon = icon;

    this._eventHandlers = new Map();
  }

  
  listenTo(events, eventHandler) {
    for (const event of events.split(/\s+/))
      this._eventHandlers.set(event, eventHandler);
  }

  getEventHandlers(painter) {
    const eventHandlers = {};
    for (const [event, handler] of this._eventHandlers.entries()) {
      eventHandlers[event] = e => handler(painter, e);
    }
    return eventHandlers;
  }
}

export default Tool;
