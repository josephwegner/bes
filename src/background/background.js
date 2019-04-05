import Utils from './utils.js'

const ACTIONS = {
  getCharacters: function (req, sender, respond) {
    Utils.getCharacters().then(respond)
    return true
  },

  getSources: function (req, sender, respond) {
    Utils.getSources().then(respond)
    return true
  }
}

chrome.runtime.onMessage.addListener((req, sender, respond) => {
  if (!req.action) {
    throw new Error("No action defined")
  } else if (ACTIONS[req.action] === undefined) {
    throw new Error("That action is not defined")
  } else {
    return ACTIONS[req.action](req, sender, respond)
  }
})
