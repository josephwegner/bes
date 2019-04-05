(function() {
  const MENU_BODY = document.getElementsByClassName("mm-navbar__menu-body")[0]
  const URLS_TO_MODIFY = [
    "^='/spells'",
    "='/feats'",
    "='/magic-items'",
    "='/backgrounds'",
    "='/monsters'"
  ]
  var sources

  bdndb.features.mySources = {
    shouldRun: () => {
      return MENU_BODY !== undefined
    },

    run: () => {
      chrome.extension.sendMessage({ action: 'getSources'}, (resp) => {
        sources = resp
        watchForMegamenu()
      });
    }
  }

  function watchForMegamenu(sources) {
    var observer = new MutationObserver((mutations) => {
      mutations.forEach(menuChanged)
    });
    observer.observe(MENU_BODY, { attributes: false, childList: true, subtree: true })
  }

  function menuChanged(mutation) {
    if (mutation.addedNodes.length) {
      updateLinks()
    }
  }

  function updateLinks() {
    var query = URLS_TO_MODIFY.map((href) => {
      return `[href${href}]`
    }).join(',')
    var queryParams = sources.map((source) => {
      return `filter-source=${source.id}`
    }).join('&')

    MENU_BODY.querySelectorAll(query).forEach((link) => {
      if (link.href.indexOf('?') === -1) {
        link.href = link.href+'?'
      }
      link.href = link.href+queryParams
    })
  }
})()
