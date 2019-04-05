(function() {
  const INPUT_SELECT = document.getElementById("filter-source")
  const CHOICE_CONTAINER = document.querySelectorAll('#s2id_filter-source .select2-choices')[0]
  const ITEM_TEXT = "My Available Sources"

  var sources = []

  bdndb.features.mySources = {
    shouldRun: () => {
      return INPUT_SELECT !== null
    },

    run: () => {
      chrome.extension.sendMessage({ action: 'getSources'}, (resp) => {
        sources = resp
        injectCustomOption()
      });
    }
  }

  function injectCustomOption () {
    var opt = document.createElement("option")
    opt.innerText = ITEM_TEXT
    opt.value = "bdndb_mySources"
    INPUT_SELECT.prepend(opt)

    var observer = new MutationObserver((mutations) => {
      mutations.forEach(clarifyMutation)
    });
    observer.observe(CHOICE_CONTAINER, { attributes: false, childList: true, subtree: true })
  }

  function clarifyMutation(mutation) {
    mutation.addedNodes.forEach((node) => {
      console.log(node, node.innerText)
      if (node.innerText === ITEM_TEXT.toUpperCase()) {
        selectMySources()
        node.remove()
      }
    })
  }

  function selectMySources() {
    var ids = sources.map(src => { return src.id.toString() })
    
    // Always add basic rules and unearthe arcana (1 and 29)
    ids.push(1, 29)
    Array.prototype.forEach.call(INPUT_SELECT.options, (opt) => {
      if (ids.indexOf(opt.value) >= 0) {
        opt.selected = true
      } else {
        opt.selected = false
      }
    })
    INPUT_SELECT.dispatchEvent(new Event('change'))
  }
})()
