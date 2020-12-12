import CindyApp from "../common/js/CindyApp.js";

class SpaceApp extends CindyApp {
  constructor(config = {}) {
    super(Object.assign(SpaceApp.defaultConfig, config));
  }

  static get defaultConfig() {
    return {
      appName: 'Space Rescue',
      appDescription: 'Die Astronautin und die Robosatelliten können im Weltall jeweils so weit nach oben, rechts, unten oder links fliegen, bis sie aneinander stoßen. Wie kann die Astronautin in ihr Raumschiff gelangen?',
      appCredits: 'Level & Implemtierung: Aaron Montag. Spielidee inspiriert von Hiroshi Yamamoto.',
      pauseScript: '',
      resumeScript: '',
      numLevels: 10
    };
  }

  async _initCindyArgs() {
    const relativeUrl = filename => `app/${filename}`;
    const SIZE = 7;

    const levelFileUrls = [
      "beginner-1",
      "beginner-2",
      "easy-1",
      "easy-2",
      "medium-1",
      "medium-2",
      "hard",
      "extreme"
    ].map(l => relativeUrl(`levels/${l}.txt`));
    const levelFiles = await Promise.all(levelFileUrls.map(levelUrl => CindyApp.request({url: levelUrl})));

    // filter out invalid lines and parse level files
    const whitespaceRegExp = /\s+/g;
    const levelRegExp = /([\.oS]{7}\n){6}([\.oS]{7})/g;

    const processLevelFile = f => f.match(levelRegExp);
    const levelSets = levelFiles.map(processLevelFile);

    function wrap(v) { //converts js-lists of lists of real numbers to CS-object.
      if (typeof v === "number") {
        return {
          "ctype": "number",
          "value": {
            'real': v,
            'imag': 0
          }
        };
      } else if (typeof v === "object" && v.length !== undefined) {
        return {
          "ctype": "list",
          "value": v.map(wrap)
        }
      }
    }

    function convertLevelFormat(levelstr) {
      let objects = [];
      let robot = [1, 1];
      let lines = levelstr.split('\n');
      for (let j = 0; j < lines.length; j++) {
        for (let i = 0; i < lines[j].length; i++) {
          let c = lines[i][j];
          if (c === 'o')
            objects.push([i + 1, SIZE - j]);
          else if (c === 'S')
            robot = [i + 1, SIZE - j];
        }
      }
      return [robot].concat(objects);
    }

    function shuffledLevels(numLevels) {
      // keep start index for each set to to avoid selecting the same level twice
      const setLengths = levelSets.map(set => set.length);
      const levels = new Array(numLevels).fill(0).map((v, k) => {
        const setIndex = Math.floor((k * (levelSets.length)) / (numLevels));
        const set = levelSets[setIndex];
        if (setLengths[setIndex] > 0) {
          // select a random level and move it to the end of the set to avoid returning duplicate levels
          const levelIndex = Math.floor(Math.random() * setLengths[setIndex]);
          const level = set[levelIndex];
          set[levelIndex] = set[setLengths[setIndex] - 1];
          set[setLengths[setIndex] - 1] = level;
          setLengths[setIndex]--;
          return level;
        } else {
          // can not select levels without having duplicates, so just choose a random one
          if (levelSets.length === 0) {
            throw new Error("Space Rescue level set is empty");
          } else {
            return set[Math.floor(Math.random() * set.length)];
          }
        }
      });
      return levels;
    }

    CindyJS.registerPlugin(1, "spacelevels", (api) => {
      api.defineFunction("getshuffledlevels", 1, (args) => {
        const numLevels = api.evaluate(args[0]).value.real | 0;
        const levels = shuffledLevels(numLevels);
        return wrap(levels.map(level => convertLevelFormat(level)));
      });
      api.defineFunction("getshuffledlevels", 0, (args) => {
        const levels = shuffledLevels(this.config.numLevels);
        return wrap(levels.map(level => convertLevelFormat(level)));
      });
    });


    this.canvas.style.backgroundImage = `url('${relativeUrl("img/background.jpg")}')`;
    this.canvas.style.backgroundSize = "cover";

    return {
      scripts: await CindyApp.loadScripts(relativeUrl('Space_'), ['init', 'draw', 'mousedown', 'mouseup'], '.cs'),
      geometry: [{
          name: "P0",
          type: "Free",
          pos: [SIZE + 1.7, 2.5],
          pinned: true,
          color: [1, 0, 0],
          visible: false
        },
        {
          name: "P1",
          type: "Free",
          pos: [SIZE + 1.7, SIZE+0.5],
          pinned: true,
          color: [1, 0, 0],
          visible: false
        },
        {
          name: "seg",
          type: "Segment",
          args: ["P0", "P1"],
          pos: [1, 0, 0],
          size: 3,
          color: [1, 1, 1]
        },
        {
          name: "P2",
          type: "PointOnSegment",
          args: ["seg"],
          pos: [SIZE + 2, 1.2],
          narrow: 100,
          size: 11,
          color: [1, 1, 1]
        },
      ],
      ports: [{
        element: this.canvas,
        virtualheight: 750,
        virtualwidth: 1000,
        transform: [{
          visibleRect: [0.2, SIZE + 1, SIZE + 2.2, 0]
        }]
      }],
      images: {
        target: relativeUrl("img/target.png"),
        o1: relativeUrl("img/o1.png"),
        o2: relativeUrl("img/o2.png"),
        o3: relativeUrl("img/o3.png"),
        o4: relativeUrl("img/o4.png"),
        o5: relativeUrl("img/o5.png"),
        o6: relativeUrl("img/o6.png"),
        o7: relativeUrl("img/o7.png"),
        o8: relativeUrl("img/o8.png"),
        o9: relativeUrl("img/o9.png"),
        o10: relativeUrl("img/o10.png"),
        selected: relativeUrl("img/selected.png")
      },
      autoplay: true,
      behavior: [],
      use: ["spacelevels"]
    };
  }
}

export default SpaceApp;
