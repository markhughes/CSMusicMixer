export function getById<T extends HTMLElement = HTMLElement>(id: string): T {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Missing element #${id}`);
    return el as T;
}

export function getFirstByClass<T extends HTMLElement = HTMLElement>(
    className: string
): T | null {
    // className is a single class token in this codebase, not a selector.
    return document.querySelector(`.${CSS.escape(className)}`) as T | null;
}

// Legacy cross-browser helper (ported from PrototypeTools.js)
export const addEvent: (
    el: any,
    type: string,
    fn: (ev: any) => void
) => void = (function () {
    return function (el: any, type: string, fn: (ev: any) => void) {
        if ((el && el.nodeName) || el === window) {
            el.addEventListener(type, fn, false);
        } else if (el && el.length) {
            for (let i = 0; i < el.length; i++) addEvent(el[i], type, fn);
        }
    };
})();


