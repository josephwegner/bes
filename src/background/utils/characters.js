export default function getCharacters () {
  return new Promise((resolve, reject) => {
    checkLocalStorage()
      .then(resolve)
      .catch(refreshCharacters.bind(null, resolve, reject))
  })
}

function refreshCharacters(resolve, reject) {
  console.log('refreshing characters')

  fetch("https://www.dndbeyond.com/my-characters")
    .then((body) => {
      body.text().then((html) => {
        var parser = new DOMParser()
        var doc = parser.parseFromString(html, "text/html")

        var characters = findCharactersFromDOM(doc)
        resolve(characters)

        var saveData = {
          characters: characters,
          refreshedAt: Date.now()
        }

        chrome.storage.local.set({ characters: saveData }, function() {
          console.log('Saved characters');
        })
      })
    })


}

function findCharactersFromDOM(doc) {
  var nodes = doc.querySelectorAll("div.ddb-campaigns-character-card.status-active")

  return Array.prototype.map.call(nodes, (node) => {
    var link = node.getElementsByClassName("ddb-campaigns-character-card-footer-links-item-view")[0].getAttribute('href')
    var name = node.getElementsByClassName("ddb-campaigns-character-card-header-upper-character-info-primary")[0].innerText

    var attributes = node.getElementsByClassName("ddb-campaigns-character-card-header-upper-character-info-secondary")[0].innerText
    attributes = attributes.split('|').map((attr) => { return attr.trim() })

    var avatarNode = node.getElementsByClassName("ddb-campaigns-character-card-header-upper-portrait")[0].children[0]
    var avatar = avatarNode.style.backgroundImage

    return {
      name: name,
      link: link,
      avatar: avatar ? /\/\/[^"]+/g.exec(avatar)[0] : null,
      level: attributes[0].replace('Lvl ', ''),
      race: attributes[1],
      class: attributes[2]
    }
  })
}

function checkLocalStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['characters'], function(result) {
      var timeout = Date.now() - (1000 * 60 * 60)
      if (result.characters && result.characters.refreshedAt > timeout) {
        console.log('retrieved characters from local storage')
        resolve(result.characters.characters)
      } else {
        reject()
      }
    });
  })
}
