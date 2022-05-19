const brws = (typeof browser=="undefined"?chrome:browser);
brws.storage.local.get((storedConfig) => {
  let ff = document.querySelector("form.magicph_cfg") ?? console.log("[MagicPH] Can't find form"),
  config = {
    debug: true,
    altplayers: "none",
    seektime: 4,
    autojump: false,
    autoscroll: true,
    blurimg: false,
    comments: false,
    topbutton: false,
    sidebar: false,
    favorites: "",
    headerOrder: [
        "home",
        "videos",
        "categories",
        "pornstars",
        "gifs",
        "recommended",
        "custom",
    ],
    headerLinks: {
        Home: "/",
        Video: "/video?o=tr&hd=1",
        Category: "/categories?o=al",
        Pornstar: "/pornstars?performerType=pornstar",
        Community: "/user/discover",
        Photo: "/gifs",
        Premium: "/premium",
        Gift: "/premium",
        GPremium: "/gay/premium",
        GHome: "/gay",
        GVideo: "/gay/video?o=tr&hd=1",
        GCategory: "/gay/categories?o=al",
        GPornstar: "/gay/pornstars?performerType=pornstar",
        GCommunity: "/user/discover/gay",
        GPhoto: "/gay/gifs?o=tr",
    },
    ...storedConfig,
  };
  for (let prop in config) {
    prop in ff.elements
      ? ff.elements[prop].type == "checkbox"
        ? (ff.elements[prop].checked = config[prop])
        : (ff.elements[prop].value = config[prop])
      : false;
  }

  ff.addEventListener("change", (e) => {
    let $el = /** @type {HTMLInputElement} */ (e.target);
    $el.type == "checkbox"
      ? (config[$el.name] = $el.checked)
      : (config[$el.name] = $el.value);
    brws.storage.local.set(config);
  });
});