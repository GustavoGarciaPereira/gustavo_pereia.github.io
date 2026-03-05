// utils/events.js — Event Bus simples (pub/sub)
const _handlers = {};

export const bus = {
  on(event, fn) {
    (_handlers[event] ??= []).push(fn);
    return () => this.off(event, fn);
  },
  off(event, fn) {
    _handlers[event] = (_handlers[event] ?? []).filter(h => h !== fn);
  },
  emit(event, data) {
    (_handlers[event] ?? []).forEach(fn => fn(data));
  },
};
