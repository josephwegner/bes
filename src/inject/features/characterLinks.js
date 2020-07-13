(function() {
  const MENU_BODY = document.getElementsByClassName("mm-navbar__menu-body")[0]

  var characterNodes = []

  bes.features.characterLinks = {
    shouldRun: () => {
      return MENU_BODY !== undefined
    },

    run: () => {
      chrome.extension.sendMessage({ action: 'getCharacters'}, (resp) => {
        characters = resp

        buildDOMElements(characters)
        watchForMenu()
      });
    }
  }

  function buildDOMElements (characters) {
    var cssHref = document.querySelectorAll("link[rel='stylesheet'][href*=compiled]")[0].href
      var version = cssHref.match(/\/content\/([0-9-]+)\//)[1]

    characters.forEach((character) => {
      var wrapper = document.createElement('div')
      wrapper.className = "mm-grid-button__button bes-character-link"
      wrapper.style.gridColumnEnd = "span 3"
      wrapper.style.gridRowEnd = "span 1"

      var anchor = document.createElement('a')
      anchor.href = character.link

      var avatar = document.createElement('img')
      var avaURL = character.avatar
      if (!avaURL) {
        avaURL = `https://www.dndbeyond.com/content/${version}/skins/waterdeep/images/characters/default-avatar.png`
      }
      avatar.setAttribute('src', avaURL)

      var name = document.createElement("span")
      name.innerText = character.name
      name.className = "mm-menu-list-item__label"

      wrapper.appendChild(anchor)
      anchor.appendChild(avatar)
      anchor.appendChild(name)

      characterNodes.push(wrapper)
    })
  }

  function watchForMenu () {
    var observer = new MutationObserver((mutations) => {
      if (MENU_BODY.querySelectorAll("[href='/my-characters']").length) {
        var addedMenu = mutations.some((mut) => {
          return mut.addedNodes[0] && mut.addedNodes[0].className === "mm-nav-item__content"
        })
        if (addedMenu) {
          injectNodes()
        }
      }
    });
    observer.observe(MENU_BODY, { attributes: false, childList: true, subtree: true })
  }

  function injectNodes () {
    var body = MENU_BODY.getElementsByClassName("mm-grid-group")[0]
    MENU_BODY.getElementsByClassName("mm-content-body")[0].style.height = "auto"

    characterNodes.forEach((node) => {
      body.appendChild(node)
    })
  }
})()
