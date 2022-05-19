'use strict';

const mph = {
  ael(elm = document, event, callback){
    return elm.addEventListener(event, callback);
  },
  /** Waits until args return true */
  async check(args) {
    while (args === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return args;
  },
  /** Can create various elements */
  create(element,cname,type) {
    let el = document.createElement(element);
    type ? (el.type = type) : false;
    cname ? (el.className = cname) : false;
    return el;
  },
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  err(...error) {
    console.error('[%cMagicPH%c] %cERROR', 'color: rgb(255,153,0);', '', 'color: rgb(249, 24, 128);', ...error);
  },
  getItem(key) {
    return localStorage.getItem(key);
  },
  async getURL(url) {
    let res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }),
    r = await res.json();
    return Promise.resolve(r);
  },
  halt(e) {
    e.preventDefault();
    e.stopPropagation();
  },
  info(...message){
    console.info('[%cMagicPH%c] %cINF', 'color: rgb(255,153,0);', '', 'color: rgb(0, 186, 124);', ...message);
  },
  inject(src) {
    let script,
    doc = document;
    script = this.create("script",null,"text/javascript");
    script.innerHTML = src;
    (doc.head || doc.documentElement || doc).appendChild(script);
    if (script) {
      script.remove();
    };
  },
  log(...message){
    console.log('[%cMagicPH%c] %cDBG', 'color: rgb(255,153,0);', '', 'color: rgb(255, 212, 0);', ...message);
  },
/**
 * @param {Node} element
 * @param {MutationCallback} callback
 * @param {MutationObserverInit} options
 */
  observe(element, callback, options = {subtree:true,childList:true}) {
    let observer = new MutationObserver(callback);
    callback([], observer);
    observer.observe(element, options);
    return observer;
  },
  /** Waits until querySelectedElement exists */
  async query(selector, root = document) {
    while ( root.querySelector(selector) === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return root.querySelector(selector);
  },
  queryAll(selectors, root = document) {
    return root.querySelectorAll(selectors);
  },
  removeItem(key) {
    return localStorage.removeItem(key);
  },
  setItem(key,value) {
    return localStorage.setItem(key,value);
  },
  scrollnumber: /view_video.php/.test(window.location.href) ? 400 : 101,
};

export default mph;