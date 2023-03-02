// WordGraphs | https://github.com/gotenxds/WordGraphs
// MIT License
!function(t, e) { if ("object" == typeof exports && "object" == typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else { var n = e(); for (var r in n) ("object" == typeof exports ? exports : t)[r] = n[r] } }(this, function() { return function(t) { function e(r) { if (n[r]) return n[r].exports; var i = n[r] = { i: r, l: !1, exports: {} }; return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports } var n = {}; return e.m = t, e.c = n, e.i = function(t) { return t }, e.d = function(t, e, n) { Object.defineProperty(t, e, { configurable: !1, enumerable: !0, get: n }) }, e.n = function(t) { var n = t && t.__esModule ? function() { return t["default"] } : function() { return t }; return e.d(n, "a", n), n }, e.o = function(t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, e.p = "", e(e.s = 9) }([function(t, e, n) { "use strict"; var r = n(2), i = function() { function t() { this._states = {}, this._final = !1, this._id = t.nextId++ } return Object.defineProperty(t.prototype, "id", { get: function() { return this._id }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "states", { get: function() { return this._states }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "final", { get: function() { return this._final }, set: function(t) { this._final = t }, enumerable: !0, configurable: !0 }), t.prototype.nodeOf = function(t) { return this._states[t] }, t.prototype.addState = function(t, e) { r.throwIfAbsent(t, "node"), r.throwIfAbsent(e, "character"), this._states[e] = t }, t.prototype.equals = function(t) { return this["final"] === t["final"] && Object.keys(this.states).length === Object.keys(t.states).length && this.equalRightLanguage(t) }, t.prototype.equalRightLanguage = function(t) { if (this.shallowSize() !== t.shallowSize()) return !1; for (var e = 0, n = Object.keys(this.states); e < n.length; e++) { var r = n[e], i = this.nodeOf(r), o = t.nodeOf(r), s = o && o.equals(i); if (!s) return !1 } return !0 }, t.prototype.signatureToString = function() { for (var t = this["final"] ? "1" : "0", e = 0, n = Object.keys(this.states).sort(); e < n.length; e++) { var r = n[e]; t += "" + r + this.nodeOf(r).id } return t }, t.prototype.shallowSize = function() { return Object.keys(this.states).length }, t.prototype.size = function() { return this.count() }, t.prototype.count = function(t) { if (void 0 === t && (t = new Set), !t.has(this.signatureToString())) { t.add(this.signatureToString()); for (var e = 1, n = 0, r = Object.keys(this.states); n < r.length; n++) { var i = r[n]; e += this.nodeOf(i).count(t) } return e } return 0 }, t.nextId = 0, t }(); e.Node = i }, function(t, e) { "use strict"; var n = function() { function t() { } return t.endsWith = function() { for (var t = [], e = 0; e < arguments.length; e++)t[e - 0] = arguments[e]; return function(e, n, r) { return t.some(function(t) { return r.endsWith(t) }) } }, t.containsAny = function() { for (var t = [], e = 0; e < arguments.length; e++)t[e - 0] = arguments[e]; return function(e, n, r) { return t.some(function(t) { return RegExp(t).test(r) }) } }, t.containsAll = function() { for (var t = [], e = 0; e < arguments.length; e++)t[e - 0] = arguments[e]; return function(e, n, r) { return t.every(function(t) { return RegExp(t).test(r) }) } }, t.containsOnly = function() { for (var t = [], e = 0; e < arguments.length; e++)t[e - 0] = arguments[e]; var n = RegExp("^((" + t.join(")|(") + "))*$"); return function(t, e, r) { return n.test(r) } }, t.exclude = function() { for (var e = [], n = 0; n < arguments.length; n++)e[n - 0] = arguments[n]; return function(n, r, i) { return !t.containsAny.apply(t, e)(n, r, i) } }, t.maxLength = function(t) { return function(e, n, r) { return r.length <= t } }, t.minLength = function(t) { return function(e, n, r) { return r.length >= t } }, t }(); e.Predicates = n }, function(t, e) { "use strict"; function n(t, e, n) { if (!r(t)) throw n ? n : new Error("Error: " + e + " was not given.") } function r(t) { return void 0 !== t && null !== t } e.throwIfAbsent = n, e.isPresent = r }, function(t, e) { "use strict"; function n(t, e, n) { return void 0 === n && (n = { maxDistance: 3, maxResults: Number.MAX_VALUE }), r(t, e, n) } function r(t, e, n, s, a) { void 0 === n && (n = { maxDistance: 3, maxResults: Number.MAX_VALUE }), void 0 === s && (s = ""), void 0 === a && (a = o(e.length)); for (var c = [], u = 0, d = Object.keys(t.states); u < d.length; u++) { for (var h = d[u], f = s + h, l = 0; l <= e.length; l++) { var p = f.length; a[l][p] = i({ wordIndex: l, currentWordIndex: p, word: e, comparedWord: f, table: a }) } var y = a[e.length][f.length]; if (t.nodeOf(h)["final"] && y <= n.maxDistance && c.push(f), c.length >= n.maxResults) return c.slice(0, n.maxResults); c = c.concat(r(t.nodeOf(h), e, n, f, a)) } return c.slice(0, n.maxResults) } function i(t) { var e = t.table, n = t.wordIndex, r = t.currentWordIndex; if (0 === Math.min(n, r)) return Math.max(n, r); var i = t.word[n - 1] === t.comparedWord[r - 1] ? 0 : 1; return Math.min(e[n][r - 1] + 1, e[n - 1][r] + 1, e[n - 1][r - 1] + i) } function o(t) { for (var e = [], n = 0; n <= t; n++)e[n] = [n]; return e } e.editDistance = n }, function(t, e, n) { "use strict"; var r = n(0), i = n(1), o = n(2), s = n(3), a = function() { function t() { this._root = new r.Node } return Object.defineProperty(t.prototype, "root", { get: function() { return this._root }, enumerable: !0, configurable: !0 }), t.prototype.add = function(t) { o.throwIfAbsent(t, "word") }, t.prototype.lookup = function(t) { var e = this.climbTo(t); return !!e && e["final"] }, t.prototype.startsWith = function(t) { for (var e = [], n = 1; n < arguments.length; n++)e[n - 1] = arguments[n]; var r = this.climbTo(t); if (!r) return []; var i = []; return this.wordShouldBeAdded(r, e, t[t.length - 1], t) && i.push(t), i.concat(this.getWord.apply(this, [r, t, !1].concat(e))) }, t.prototype.endsWith = function(t) { return this.getWord(this.root, "", !1, i.Predicates.endsWith(t)) }, t.prototype.containsAny = function(t) { return this.getWord(this.root, "", !1, i.Predicates.containsAny.apply(i.Predicates, t)) }, t.prototype.containsAll = function(t) { return this.getWord(this.root, "", !1, i.Predicates.containsAll.apply(i.Predicates, t)) }, t.prototype.containsOnly = function(t) { for (var e = [], n = RegExp("^(" + t.join("|") + ")*$"), r = 0, i = t; r < i.length; r++) { var o = i[r], s = this.climbTo(o); s && (e = e.concat(this.getWord(s, o, !0, function(t, e, r) { return n.test(r) }))) } return e }, t.prototype.getWord = function(t, e, n) { var r = this; void 0 === e && (e = ""), void 0 === n && (n = !1); for (var i = [], o = 3; o < arguments.length; o++)i[o - 3] = arguments[o]; var s = []; return Object.keys(t.states).forEach(function(o) { var a = t.states[o], c = e + o; r.wordShouldBeAdded(a, i, o, c) ? (s.push(c), s = s.concat(r.getWord.apply(r, [a, c, n].concat(i)))) : (!a["final"] || a["final"] && !n) && (s = s.concat(r.getWord.apply(r, [a, c, n].concat(i)))) }), s }, t.prototype.similarTo = function(t, e) { return void 0 === e && (e = { maxDistance: 3, maxResults: Number.MAX_VALUE }), s.editDistance(this.root, t, e) }, t.prototype.size = function() { return this.root.size() }, t.prototype.climbTo = function(t) { for (var e = this.root, n = 0, r = t; n < r.length; n++) { var i = r[n]; if (e = e.nodeOf(i), !e) return null } return e }, t.prototype.wordShouldBeAdded = function(t, e, n, r) { return t["final"] && e.every(function(e) { return e(t, n, r) }) }, t }(); e.WordGraph = a }, function(t, e, n) { "use strict"; var r = n(6); e.MinimalWordGraph = r.MinimalWordGraph; var i = n(8); e.Trie = i.Trie; var o = n(7); e.QueryBuilder = o.QueryBuilder; var s = n(3); e.editDistance = s.editDistance }, function(t, e, n) { "use strict"; var r = function(t, e) { function n() { this.constructor = t } for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]); t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n) }, i = n(4), o = n(0), s = function(t) { function e() { t.apply(this, arguments), this.lastWordAdded = "", this.registry = {} } return r(e, t), e.prototype.add = function(e) { if (t.prototype.add.call(this, e), this.isImmutable()) throw "This MinimalWordGraph(DAWG) is immutable and words may no longer be added to it."; if (e < this.lastWordAdded) throw "Words need to be added in lexicographical order. " + e + " after " + this.lastWordAdded; var n = this.climbUntilEmpty(e), r = n.node, i = n.index; if (i < this.lastWordAdded.length && "" !== this.lastWordAdded) { var s = this.minimize(r.nodeOf(this.lastWordAdded[i]), this.lastWordAdded.substr(i + 1)); r.addState(s, this.lastWordAdded[i]) } for (i; i < e.length; i++) { var a = new o.Node; r.addState(a, e[i]), r = a } r["final"] = !0, this.lastWordAdded = e }, e.prototype.minimize = function(t, e) { if ("" !== e) { var n = this.minimize(t.nodeOf(e[0]), e.substr(1)); t.addState(n, e[0]) } var r = t.signatureToString(), i = this.registry[r]; return i || (this.registry[r] = t, i = t), i }, e.prototype.size = function() { return this.isImmutable() ? this.immutableSize : t.prototype.size.call(this) }, e.prototype.makeImmutable = function() { this.minimize(this.root, this.lastWordAdded), this.lastWordAdded = null, this.registry = null, this.immutableSize = t.prototype.size.call(this) }, e.prototype.isImmutable = function() { return null === this.registry }, e.prototype.climbUntilEmpty = function(t) { var e = this._root, n = 0; for (n; n < t.length; n++) { var r = e.nodeOf(t[n]); if (!r) break; e = r } return { node: e, index: n } }, e }(i.WordGraph); e.MinimalWordGraph = s }, function(t, e, n) { "use strict"; var r = n(1), i = function() { function t(t) { this.startsWithPatterns = [], this.endsWithPatterns = [], this.containsAllPatterns = [], this.containsAnyPatterns = [], this.containsOnlyPatterns = [], this.excludePatterns = [], this.predicates = { userPredicates: [] }, this.wordGraph = t } return t.prototype.startsWith = function() { for (var t = [], e = 0; e < arguments.length; e++)t[e - 0] = arguments[e]; return this.startsWithPatterns = this.startsWithPatterns.concat(t), this }, t.prototype.endsWith = function() { for (var t = [], e = 0; e < arguments.length; e++)t[e - 0] = arguments[e]; return this.endsWithPatterns = this.endsWithPatterns.concat(t), this.predicates.endsWithPatterns = r.Predicates.endsWith.apply(r.Predicates, t), this }, t.prototype.containsAll = function() { for (var t = [], e = 0; e < arguments.length; e++)t[e - 0] = arguments[e]; return this.containsAllPatterns = this.containsAllPatterns.concat(t), this.predicates.containsAll = r.Predicates.containsAll.apply(r.Predicates, t), this }, t.prototype.containsAny = function() { for (var t = [], e = 0; e < arguments.length; e++)t[e - 0] = arguments[e]; return this.containsAnyPatterns = this.containsAnyPatterns.concat(t), this.predicates.containsAny = r.Predicates.containsAny.apply(r.Predicates, t), this }, t.prototype.containsOnly = function() { for (var t = [], e = 0; e < arguments.length; e++)t[e - 0] = arguments[e]; return this.containsOnlyPatterns = this.containsOnlyPatterns.concat(t), this.predicates.containsOnly = r.Predicates.containsOnly.apply(r.Predicates, t), this }, t.prototype.exclude = function() { for (var t = [], e = 0; e < arguments.length; e++)t[e - 0] = arguments[e]; return this.excludePatterns = this.excludePatterns.concat(t), this.predicates.exclude = r.Predicates.exclude.apply(r.Predicates, t), this }, t.prototype.maxLength = function(t) { return this.predicates.minLength = r.Predicates.maxLength(t), this }, t.prototype.minLength = function(t) { return this.predicates.minLength = r.Predicates.minLength(t), this }, t.prototype.addPredicate = function(t) { return this.predicates.userPredicates.push(t), this }, t.prototype.build = function() { var t = this, e = this.createAndSortPredicates(); return 0 === this.startsWithPatterns.length && this.startsWithPatterns.push(""), function() { var n = []; return t.startsWithPatterns.forEach(function(r) { return n = n.concat((i = t.wordGraph).startsWith.apply(i, [r].concat(e))); var i }), n } }, t.prototype.createAndSortPredicates = function() { var t = this.predicates.userPredicates; delete this.predicates.userPredicates; for (var e = 0, n = Object.keys(this.predicates); e < n.length; e++) { var r = n[e]; t.push(this.predicates[r]) } return t.sort(function(t) { return t.precidence }), t }, t }(); e.QueryBuilder = i }, function(t, e, n) { "use strict"; var r = function(t, e) { function n() { this.constructor = t } for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]); t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n) }, i = n(4), o = n(0), s = function(t) { function e() { t.apply(this, arguments) } return r(e, t), e.prototype.add = function(e) { t.prototype.add.call(this, e); for (var n = this._root, r = 0; r < e.length; r++) { var i = n.nodeOf(e[r]); if (i) n = i; else { var s = new o.Node; n.addState(s, e[r]), n = s } } n["final"] = !0 }, e.prototype.minimize = function() { this.minimizeFrom(this.root) }, e.prototype.minimizeFrom = function(t, e) { void 0 === e && (e = []); for (var n = 0, r = Object.keys(t.states); n < r.length; n++) { var i = r[n]; t.addState(this.minimizeFrom(t.nodeOf(i), e), i) } var o = t.signatureToString(), s = e[o]; return s || (e[o] = t, s = t), s }, e }(i.WordGraph); e.Trie = s }, function(t, e, n) { "use strict"; function r(t) { for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]) } r(n(5)) }]) });
