export default function getSources () {
  return new Promise((resolve, reject) => {
    Promise.all(SOURCES.map((src) => {
      return new Promise((resolve, reject) => {
        fetch(src.testResource)
          .then((resp) => {
            if (resp.redirected) {
              resolve(false)
            } else {
              resolve(src)
            }
          })
      })
    })).then((availableSources) => {
      var sources = []
      availableSources.forEach((src) => {
        if(src) { sources.push(src) }
      })

      resolve(sources)
    })
  })
}

const SOURCES = [
  {
    id: 2,
    name: "Player's Handbook",
    testResource: "https://www.dndbeyond.com/magic-items/adamantine-armor"
  },
  {
    id: 3,
    name: "Dungeon Master's Guide",
    testResource: "https://www.dndbeyond.com/magic-items/scroll-of-protection"
  },
  // Skipping Elemental Evil Player's Companion - no lockedcontent
  {
    id: 5,
    name: "Monster Manual",
    testResource: "https://www.dndbeyond.com/monsters/aarakocra"
  },
  {
    id: 6,
    name: "Curse of Strahd",
    testResource: "https://www.dndbeyond.com/monsters/animated-halberd"
  },
  {
    id: 7,
    name: "Hoard of the Dragon Queen",
    testResource: "https://www.dndbeyond.com/monsters/ambush-drake"
  },
  {
    id: 8,
    name: "Lost Mine of Phandelver",
    testResource: "https://www.dndbeyond.com/monsters/ash-zombie"
  },
  {
    id: 9,
    name: "Out of the Abyss",
    testResource: "https://www.dndbeyond.com/monsters/amarith-coppervein"
  },
  {
    id: 10,
    name: "Princes of the Apocalypse",
    testResource: "https://www.dndbeyond.com/monsters/aerisi-kalinoth"
  },
  {
    id: 11,
    name: "Rise of Tiamat",
    testResource: "https://www.dndbeyond.com/monsters/diderius"
  },
  {
    id: 12,
    name: "Storm King's Thunder",
    testResource: "https://www.dndbeyond.com/monsters/aarakocra-simulacrum"
  },
  {
    id: 13,
    name: "Sword Coast Adventurer's Guide",
    testResource: "https://www.dndbeyond.com/spells/booming-blade"
  },
  {
    id: 15,
    name: "Volo's Guide to Monsters",
    testResource: "https://www.dndbeyond.com/monsters/boggle"
  },
  {
    id: 16,
    name: "The Sunless Citadel",
    testResource: "https://www.dndbeyond.com/monsters/belak-the-outcast"
  },
  {
    id: 17,
    name: "The Forge of Fury",
    testResource: "https://www.dndbeyond.com/monsters/animated-table"
  },
  {
    id: 18,
    name: "The Hidden Shrine of Tamoachan",
    testResource: "https://www.dndbeyond.com/monsters/amphisbaena"
  },
  {
    id: 19,
    name: "White Plume Mountain",
    testResource: "https://www.dndbeyond.com/monsters/huge-giant-crab"
  },
  {
    id: 20,
    name: "Dead in Thay",
    testResource: "https://www.dndbeyond.com/monsters/choker"
  },
  {
    id: 21,
    name: "Against the Giants",
    testResource: "https://www.dndbeyond.com/magic-items/hell-hound-cloak"
  },
  {
    id: 22,
    name: "Tomb of Horrors",
    testResource: "https://www.dndbeyond.com/monsters/four-armed-gargoyle"
  },
  {
    id: 25,
    name: "Tomb of Annihalation",
    testResource: "https://www.dndbeyond.com/monsters/acererak"
  },
  {
    id: 27,
    name: "Xanathar's Guide to Everything",
    testResource: "https://www.dndbeyond.com/spells/catnap"
  },
  {
    id: 28,
    name: "The Tortle Package",
    testResource: "https://www.dndbeyond.com/monsters/decapus"
  },
  {
    id: 33,
    name: "Mordenkainen’s Tome of Foes",
    testResource: "https://www.dndbeyond.com/monsters/abyssal-wretch"
  },
  {
    id: 35,
    name: "Waterdeep Dragon Heist",
    testResource: "https://www.dndbeyond.com/monsters/ahmaergo"
  },
  {
    id: 36,
    name: "Waterdeep Dungeon of the Mad Mage",
    testResource: "https://www.dndbeyond.com/monsters/animated-ballista"
  },
  {
    id: 37,
    name: "Wayfinder's Guide to Eberron",
    testResource: "https://www.dndbeyond.com/monsters/clawfoot-raptor",
  },
  {
    id: 38,
    name: "Guildmasters' Guide to Ravnica",
    testResource: "https://www.dndbeyond.com/monsters/anarch"
  },
  {
    id: 40,
    name: "Lost Laboratory of Kwalish",
    testResource: "https://www.dndbeyond.com/monsters/brain-in-a-jar"
  }
  // Skipping Tactical Maps Reincarnated - no dndb content
  // Skipping Ghosts of Saltmarsh - no dndb content
  // Skipping Acquisitions Incorporated - unreleased
]
