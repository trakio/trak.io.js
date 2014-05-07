// Generated by IcedCoffeeScript 1.7.1-b
define([], function() {
  var events;
  events = {
    addEvent: function(element, type, handler) {
      var handlers;
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else {
        if (!handler.$$guid) {
          handler.$$guid = this.addEvent.guid++;
        }
        if (!element.events) {
          element.events = {};
        }
        handlers = element.events[type];
        if (!handlers) {
          handlers = element.events[type] = {};
          if (element["on" + type]) {
            handlers[0] = element["on" + type];
          }
        }
        handlers[handler.$$guid] = handler;
        element["on" + type] = this.handleEvent;
      }
    },
    removeEvent: function(element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else {
        if (element.events && element.events[type]) {
          delete element.events[type][handler.$$guid];
        }
      }
    },
    handleEvent: function(event) {
      var handlers, i, returnValue;
      returnValue = true;
      event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
      handlers = this.events[event.type];
      for (i in handlers) {
        this.$$handleEvent = handlers[i];
        if (this.$$handleEvent(event) === false) {
          returnValue = false;
        }
      }
      return returnValue;
    },
    fixEvent: function(event) {
      event.preventDefault = this.fixEvent.preventDefault;
      event.stopPropagation = this.fixEvent.stopPropagation;
      return event;
    }
  };
  events.fixEvent.preventDefault = function() {
    this.returnValue = false;
  };
  events.fixEvent.stopPropagation = function() {
    this.cancelBubble = true;
  };
  events.addEvent.guid = 1;
  return events;
});