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
    // Caminho relativo: resolve contra o <base href> do documento,
    // funcionando tanto na raiz do site (/o_i_a/) quanto em subpastas (/o_i_a/pages/).
    const res = await fetch(`./components/${file}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.warn(`loadComponent(${file}):`, err);
  }
}

/** Atalho para querySelector */
export const $ = (sel, ctx = document) => ctx.querySelector(sel);

/** Atalho para querySelectorAll */
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
