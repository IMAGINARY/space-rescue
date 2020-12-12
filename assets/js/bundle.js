(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CindyApp2 = _interopRequireDefault(require("../common/js/CindyApp.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SpaceApp = /*#__PURE__*/function (_CindyApp) {
  _inherits(SpaceApp, _CindyApp);

  var _super = _createSuper(SpaceApp);

  function SpaceApp() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SpaceApp);

    return _super.call(this, Object.assign(SpaceApp.defaultConfig, config));
  }

  _createClass(SpaceApp, [{
    key: "_initCindyArgs",
    value: function () {
      var _initCindyArgs2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var relativeUrl, SIZE, levelFileUrls, levelFiles, whitespaceRegExp, levelRegExp, processLevelFile, levelSets, wrap, convertLevelFormat, shuffledLevels;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                shuffledLevels = function _shuffledLevels(numLevels) {
                  // keep start index for each set to to avoid selecting the same level twice
                  var setLengths = levelSets.map(function (set) {
                    return set.length;
                  });
                  var levels = new Array(numLevels).fill(0).map(function (v, k) {
                    var setIndex = Math.floor(k * levelSets.length / numLevels);
                    var set = levelSets[setIndex];

                    if (setLengths[setIndex] > 0) {
                      // select a random level and move it to the end of the set to avoid returning duplicate levels
                      var levelIndex = Math.floor(Math.random() * setLengths[setIndex]);
                      var level = set[levelIndex];
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
                };

                convertLevelFormat = function _convertLevelFormat(levelstr) {
                  var objects = [];
                  var robot = [1, 1];
                  var lines = levelstr.split('\n');

                  for (var j = 0; j < lines.length; j++) {
                    for (var i = 0; i < lines[j].length; i++) {
                      var c = lines[i][j];
                      if (c === 'o') objects.push([i + 1, SIZE - j]);else if (c === 'S') robot = [i + 1, SIZE - j];
                    }
                  }

                  return [robot].concat(objects);
                };

                wrap = function _wrap(v) {
                  //converts js-lists of lists of real numbers to CS-object.
                  if (typeof v === "number") {
                    return {
                      "ctype": "number",
                      "value": {
                        'real': v,
                        'imag': 0
                      }
                    };
                  } else if (_typeof(v) === "object" && v.length !== undefined) {
                    return {
                      "ctype": "list",
                      "value": v.map(wrap)
                    };
                  }
                };

                relativeUrl = function relativeUrl(filename) {
                  return "app/".concat(filename);
                };

                SIZE = 7;
                levelFileUrls = ["beginner-1", "beginner-2", "easy-1", "easy-2", "medium-1", "medium-2", "hard", "extreme"].map(function (l) {
                  return relativeUrl("levels/".concat(l, ".txt"));
                });
                _context.next = 8;
                return Promise.all(levelFileUrls.map(function (levelUrl) {
                  return _CindyApp2["default"].request({
                    url: levelUrl
                  });
                }));

              case 8:
                levelFiles = _context.sent;
                // filter out invalid lines and parse level files
                whitespaceRegExp = /\s+/g;
                levelRegExp = /([\.oS]{7}\n){6}([\.oS]{7})/g;

                processLevelFile = function processLevelFile(f) {
                  return f.match(levelRegExp);
                };

                levelSets = levelFiles.map(processLevelFile);
                CindyJS.registerPlugin(1, "spacelevels", function (api) {
                  api.defineFunction("getshuffledlevels", 1, function (args) {
                    var numLevels = api.evaluate(args[0]).value.real | 0;
                    var levels = shuffledLevels(numLevels);
                    return wrap(levels.map(function (level) {
                      return convertLevelFormat(level);
                    }));
                  });
                  api.defineFunction("getshuffledlevels", 0, function (args) {
                    var levels = shuffledLevels(_this.config.numLevels);
                    return wrap(levels.map(function (level) {
                      return convertLevelFormat(level);
                    }));
                  });
                });
                this.canvas.style.backgroundImage = "url('".concat(relativeUrl("img/background.jpg"), "')");
                this.canvas.style.backgroundSize = "cover";
                _context.next = 18;
                return _CindyApp2["default"].loadScripts(relativeUrl('Space_'), ['init', 'draw', 'mousedown', 'mouseup'], '.cs');

              case 18:
                _context.t0 = _context.sent;
                _context.t1 = [{
                  name: "P0",
                  type: "Free",
                  pos: [SIZE + 1.7, 2.5],
                  pinned: true,
                  color: [1, 0, 0],
                  visible: false
                }, {
                  name: "P1",
                  type: "Free",
                  pos: [SIZE + 1.7, SIZE + 0.5],
                  pinned: true,
                  color: [1, 0, 0],
                  visible: false
                }, {
                  name: "seg",
                  type: "Segment",
                  args: ["P0", "P1"],
                  pos: [1, 0, 0],
                  size: 3,
                  color: [1, 1, 1]
                }, {
                  name: "P2",
                  type: "PointOnSegment",
                  args: ["seg"],
                  pos: [SIZE + 2, 1.2],
                  narrow: 100,
                  size: 11,
                  color: [1, 1, 1]
                }];
                _context.t2 = [{
                  element: this.canvas,
                  virtualheight: 750,
                  virtualwidth: 1000,
                  transform: [{
                    visibleRect: [0.2, SIZE + 1.3, SIZE + 2.6, -0.3]
                  }]
                }];
                _context.t3 = {
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
                };
                _context.t4 = [];
                _context.t5 = ["spacelevels"];
                return _context.abrupt("return", {
                  scripts: _context.t0,
                  geometry: _context.t1,
                  ports: _context.t2,
                  images: _context.t3,
                  autoplay: true,
                  behavior: _context.t4,
                  use: _context.t5
                });

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _initCindyArgs() {
        return _initCindyArgs2.apply(this, arguments);
      }

      return _initCindyArgs;
    }()
  }], [{
    key: "defaultConfig",
    get: function get() {
      return {
        appName: 'Space Rescue',
        appDescription: 'Die Astronautin und die Robosatelliten können im Weltall jeweils so weit nach oben, rechts, unten oder links fliegen, bis sie aneinander stoßen. Wie kann die Astronautin in ihr Raumschiff gelangen?',
        appCredits: 'Level & Implemtierung: Aaron Montag. Spielidee inspiriert von Hiroshi Yamamoto.',
        pauseScript: '',
        resumeScript: '',
        numLevels: 10
      };
    }
  }]);

  return SpaceApp;
}(_CindyApp2["default"]);

var _default = SpaceApp;
exports["default"] = _default;

},{"../common/js/CindyApp.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _application = _interopRequireDefault(require("./application.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CindyApp = /*#__PURE__*/function (_Application) {
  _inherits(CindyApp, _Application);

  var _super = _createSuper(CindyApp);

  function CindyApp() {
    var _thisSuper, _this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CindyApp);

    _this = _super.call(this, Object.assign(CindyApp.defaultConfig, config));
    console.log("CindyApp called");
    _this._isCindyPaused = false;
    _this._cindy = null; // trigger loading of cindy arguments

    var cindyArgs = _this.cindyArgs;
    _this._cindyAppReadyPromise = _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(CindyApp.prototype)), "ready", _thisSuper).then(function () {
      return CindyApp.waitForDomInsertion(_this.canvas, document.body);
    }).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.assert(_this.canvas.clientWidth !== 0, 'canvas has 0 clientWidth');
              console.assert(_this.canvas.clientHeight !== 0, 'canvas has 0 clientHeight');
              _context.t0 = CindyJS;
              _context.next = 5;
              return cindyArgs;

            case 5:
              _context.t1 = _context.sent;
              _this._cindy = _context.t0.newInstance.call(_context.t0, _context.t1);

              _this._cindy.startup();

              return _context.abrupt("return", _assertThisInitialized(_this));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))); // for backwards compatibility; should not be used anymore

    _this._cindyPromise = _this._cindyAppReadyPromise.then(function () {
      return _this._cindy;
    });
    return _this;
  }

  _createClass(CindyApp, [{
    key: "_initCindyArgs",
    value: function () {
      var _initCindyArgs2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                throw new Error("Unimplemented. Must be implemented in subclass ".concat(this.constructor.name, "."));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _initCindyArgs() {
        return _initCindyArgs2.apply(this, arguments);
      }

      return _initCindyArgs;
    }()
  }, {
    key: "pause",
    value: function pause() {
      _get(_getPrototypeOf(CindyApp.prototype), "pause", this).call(this);

      if (this._isReady) {
        this.cindy.pause();
        this._isCindyPaused = true;
        this.cindy.evokeCS(this.config.pauseScript);
      }
    }
  }, {
    key: "resume",
    value: function resume() {
      _get(_getPrototypeOf(CindyApp.prototype), "resume", this).call(this);

      if (this._isReady) {
        this.cindy.play();
        this._isCindyPaused = false;
        this.cindy.evokeCS(this.config.resumeScript);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(CindyApp.prototype), "reset", this).call(this);

      if (this._isReady) {
        this.cindy.stop();
        if (!this._isCindyPaused) this.cindy.play();
        this.cindy.evokeCS(this.config.resetScript);
      }
    }
  }, {
    key: "canvas",
    get: function get() {
      if (typeof this._canvas === 'undefined') {
        this._canvas = document.createElement('canvas');
        this._canvas.width = 1560;
        this._canvas.height = 1170;
      }

      return this._canvas;
    }
  }, {
    key: "cindyReady",
    get: function get() {
      return this._cindyPromise;
    }
  }, {
    key: "cindy",
    get: function get() {
      return this._cindy;
    }
  }, {
    key: "cindyArgs",
    get: function get() {
      if (typeof this._cindyArgs === 'undefined') this._cindyArgs = this._initCindyArgs();
      return this._cindyArgs;
    }
  }, {
    key: "ready",
    get: function get() {
      return this._cindyAppReadyPromise;
    }
  }, {
    key: "domElement",
    get: function get() {
      return this.canvas;
    }
  }], [{
    key: "retrieveConfigOverridesJsonByClass",
    value: function () {
      var _retrieveConfigOverridesJsonByClass = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(baseUrl) {
        var url, jsonText;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = new URL(this.name + 'Overrides.json', baseUrl).href;
                _context3.next = 3;
                return CindyApp.request({
                  url: url
                });

              case 3:
                jsonText = _context3.sent;

                if (!(typeof jsonText === 'string')) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", JSON.parse(jsonText));

              case 8:
                if (!(_typeof(jsonText) === 'object')) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", jsonText);

              case 12:
                throw new Error("Error processing config override file ".concat(url));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function retrieveConfigOverridesJsonByClass(_x) {
        return _retrieveConfigOverridesJsonByClass.apply(this, arguments);
      }

      return retrieveConfigOverridesJsonByClass;
    }()
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(obj) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new Promise(function (resolve, reject) {
                  var xhr = new XMLHttpRequest();
                  xhr.open(obj.method || "GET", obj.url);

                  if (obj.headers) {
                    Object.keys(obj.headers).forEach(function (key) {
                      xhr.setRequestHeader(key, obj.headers[key]);
                    });
                  }

                  xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                      resolve(xhr.response);
                    } else {
                      reject(xhr);
                    }
                  };

                  xhr.onerror = function () {
                    return reject(xhr);
                  };

                  xhr.send(obj.body);
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function request(_x2) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "loadScripts",
    value: function () {
      var _loadScripts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(prefix, infixes, suffix) {
        var scripts, promises, _iterator, _step, _loop;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                scripts = {};
                promises = []; // TODO: error handling for failed loads

                _iterator = _createForOfIteratorHelper(infixes);

                try {
                  _loop = function _loop() {
                    var infix = _step.value;
                    promises.push(CindyApp.request({
                      url: prefix + infix + suffix
                    }).then(function (scriptText) {
                      return scripts[infix] = scriptText;
                    }));
                  };

                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _loop();
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context5.next = 6;
                return Promise.all(promises);

              case 6:
                return _context5.abrupt("return", scripts);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function loadScripts(_x3, _x4, _x5) {
        return _loadScripts.apply(this, arguments);
      }

      return loadScripts;
    }()
  }, {
    key: "waitForDomInsertion",
    value: function () {
      var _waitForDomInsertion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(element, root) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", new Promise(function (resolve) {
                  if (element.parentElement === null) {
                    // resolve after insertion of the element into the given DOM subtree
                    var observer = new MutationObserver(function () {
                      if (root.contains(element)) {
                        observer.disconnect();
                        resolve();
                      }
                    });
                    observer.observe(root, {
                      childList: true,
                      subtree: true
                    });
                  } else {
                    // resolve immediately
                    resolve();
                  }
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function waitForDomInsertion(_x6, _x7) {
        return _waitForDomInsertion.apply(this, arguments);
      }

      return waitForDomInsertion;
    }()
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        appName: 'CindyJS app',
        pauseScript: 'pause();',
        resumeScript: 'resume();',
        resetScript: 'reset();'
      };
    }
  }]);

  return CindyApp;
}(_application["default"]);

var _default = CindyApp;
exports["default"] = _default;

},{"./application.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _configOverridesPromises = {};

var Application = /*#__PURE__*/function () {
  function Application() {
    var _this = this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Application);

    this._config = Object.assign(Application.defaultConfig, config);
    this._applicationReadyPromise = Promise.resolve();
    this._isReady = false; // the this.ready might be overwritten by a superclass, so we only query it after the stack has become empty

    Promise.resolve().then(function () {
      return _this.ready.then(function () {
        return _this._isReady = true;
      });
    });
  }

  _createClass(Application, [{
    key: "pause",
    value: function pause() {
      if (this.isReady) {
        console.log("pausing ".concat(this.constructor.name));
      } else {
        console.log("pausing ".concat(this.constructor.name, " failed, because app is not ready yet"));
      }
    }
  }, {
    key: "resume",
    value: function resume() {
      if (this.isReady) {
        console.log("resuming ".concat(this.constructor.name));
      } else {
        console.log("resuming ".concat(this.constructor.name, " failed, because app is not ready yet"));
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.isReady) {
        console.log("resetting ".concat(this.constructor.name));
      } else {
        console.log("resetting ".concat(this.constructor.name, " failed, because app is not ready yet"));
      }
    }
  }, {
    key: "restart",
    value: function restart(pauseAfterRestart) {
      this.reset();
      if (pauseAfterRestart) this.pause();else this.resume();
    }
  }, {
    key: "isReady",
    get: function get() {
      return this._isReady;
    }
  }, {
    key: "ready",
    get: function get() {
      return this._applicationReadyPromise;
    }
  }, {
    key: "domElement",
    get: function get() {
      if (typeof this._domElement === 'undefined') this._domElement = document.createElement('div');
      return this._domElement;
    }
  }, {
    key: "config",
    get: function get() {
      return this._config;
    }
  }, {
    key: "name",
    get: function get() {
      return this._config.appName;
    }
  }, {
    key: "description",
    get: function get() {
      return this._config.appDescription;
    }
  }, {
    key: "credits",
    get: function get() {
      return this._config.appCredits;
    }
  }], [{
    key: "retrieveConfigOverrides",
    value: function () {
      var _retrieveConfigOverrides = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", Promise.resolve([]));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function retrieveConfigOverrides() {
        return _retrieveConfigOverrides.apply(this, arguments);
      }

      return retrieveConfigOverrides;
    }()
    /***
     * This method returns an array of config overrides for the class in question.
     * The format is `{type:'..', config: {...}}`. `type` determines how to interpret the override such that an
     * application can check whether the override applies or not. If it does, `config` contains the properties
     * to override. Several overrides may or may not be combined when passing them to the class constructor.
     */

  }, {
    key: "getConfigOverrides",
    value: function () {
      var _getConfigOverrides = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (typeof _configOverridesPromises[this.name] === 'undefined') _configOverridesPromises[this.name] = this.retrieveConfigOverrides(); // when overwritten in a subclass, it will be called on the subclass

                return _context2.abrupt("return", _configOverridesPromises[this.name]);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getConfigOverrides() {
        return _getConfigOverrides.apply(this, arguments);
      }

      return getConfigOverrides;
    }()
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        appName: 'App name',
        appDescription: '',
        appCredits: ''
      };
    }
  }]);

  return Application;
}();

var _default = Application;
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

var _SpaceApp = _interopRequireDefault(require("../../app/SpaceApp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

$('[data-component=game]').each(function (_, container) {
  var game = new _SpaceApp["default"]();
  $(container).append(game.domElement);
});

},{"../../app/SpaceApp":1}]},{},[4])

