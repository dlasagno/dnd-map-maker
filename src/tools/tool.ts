import { SyntheticEvent } from "react";

export interface ToolHelpers {
  drawMap: (x: number, y: number) => void,
  drawPreview: (x: number, y: number) => void,
  clearPreview: () => void,
  cellSize: number
}

type EventHandler = (helpers: ToolHelpers, e: SyntheticEvent) => void;

export class Tool {

  _eventHandlers: Map<string, EventHandler>;

  constructor(readonly name: string, readonly icon: string) {
    this._eventHandlers = new Map();
  }

  
  listenTo(events: string, eventHandler: EventHandler) {
    for (const event of events.split(/\s+/))
      this._eventHandlers.set(event, eventHandler);
  }

  getEventHandlers(helpers: ToolHelpers) {
    const eventHandlers: {
      [key: string]: (e: SyntheticEvent) => void
    } = {};
    for (const [event, handler] of this._eventHandlers) {
      eventHandlers[event] = (e: SyntheticEvent) => handler(helpers, e);
    }
    return eventHandlers;
  }

  static getGridCoordinates(e: any, cellSize: number) {
    const x = Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().x + e.currentTarget.scrollLeft) / cellSize);
    const y = Math.floor((e.clientY - e.currentTarget.getBoundingClientRect().y + e.currentTarget.scrollTop) / cellSize);

    return [x, y];
  }

}

export default Tool;
