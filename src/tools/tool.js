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

  static getGridCoordinates(e, cellSize) {
    const x = Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().x + e.currentTarget.scrollLeft) / cellSize);
    const y = Math.floor((e.clientY - e.currentTarget.getBoundingClientRect().y + e.currentTarget.scrollTop) / cellSize);

    return [x, y];
  }

}

export default Tool;
