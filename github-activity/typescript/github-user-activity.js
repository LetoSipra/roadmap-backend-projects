var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function fetchEvents(username) {
    return __awaiter(this, void 0, void 0, function () {
        var url, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.github.com/users/".concat(encodeURIComponent(username), "/events");
                    return [4 /*yield*/, fetch(url, {
                            headers: { "User-Agent": "github-activity-cli" },
                        })];
                case 1:
                    res = _a.sent();
                    if (res.status === 404) {
                        throw new Error("User \"".concat(username, "\" not found (404)."));
                    }
                    if (!res.ok) {
                        throw new Error("GitHub API error: ".concat(res.status, " ").concat(res.statusText));
                    }
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, (_a.sent())];
            }
        });
    });
}
function summarizeEvent(e) {
    var _a, _b;
    var repo = e.repo.name;
    switch (e.type) {
        case "PushEvent": {
            var count = (_b = (_a = e.payload.commits) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
            return "Pushed ".concat(count, " commit").concat(count !== 1 ? "s" : "", " to ").concat(repo);
        }
        case "IssuesEvent": {
            var action = e.payload.action;
            return "".concat(action.charAt(0).toUpperCase() + action.slice(1), " an issue in ").concat(repo);
        }
        case "IssueCommentEvent": {
            var action = e.payload.action;
            return "".concat(action.charAt(0).toUpperCase() + action.slice(1), " a comment on an issue in ").concat(repo);
        }
        case "PullRequestEvent": {
            var action = e.payload.action;
            return "".concat(action.charAt(0).toUpperCase() + action.slice(1), " a pull request in ").concat(repo);
        }
        case "WatchEvent": {
            // 'started', 'deleted' (unwatch)
            var action = e.payload.action === "started" ? "Starred" : "Unstarred";
            return "".concat(action, " ").concat(repo);
        }
        case "ForkEvent":
            return "Forked ".concat(repo);
        default:
            // Generic fallback
            return "".concat(e.type.replace(/Event$/, ""), " on ").concat(repo);
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, events, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = process.argv, username = _a[2];
                    if (!username) {
                        console.error("Usage: github-activity <username>");
                        process.exit(1);
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    console.log("Fetching recent activity for \"".concat(username, "\"...\n"));
                    return [4 /*yield*/, fetchEvents(username)];
                case 2:
                    events = _b.sent();
                    if (events.length === 0) {
                        console.log("No recent public activity found.");
                        return [2 /*return*/];
                    }
                    // Show up to 10 most recent events
                    events.slice(0, 10).forEach(function (e) {
                        var when = new Date(e.created_at).toLocaleString();
                        console.log("- ".concat(summarizeEvent(e), " (").concat(when, ")"));
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    console.error("Error: ".concat(err_1.message));
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
main();
