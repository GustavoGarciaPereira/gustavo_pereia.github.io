// utils/dom.js — Helpers de DOM

/**
 * Carrega um fragmento HTML em um elemento via fetch
 * @param {string} selector - Seletor CSS do container
 * @param {string} file     - Nome do arquivo em /components/
 */
export async function loadComponent(selector, file) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const controller = new AbortController();
    const res = await fetch(`/components/${file}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    el.innerHTML = await res.text();
  } catch (err) {
    if (err.name !== 'AbortError') console.warn(`loadComponent(${file}):`, err);
  }
}

/** Atalho para querySelector */
export const $ = (sel, ctx = document) => ctx.querySelector(sel);

/** Atalho para querySelectorAll */
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
