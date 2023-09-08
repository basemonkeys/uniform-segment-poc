"use strict";
exports.id = 876;
exports.ids = [876];
exports.modules = {

/***/ 77231:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  v: () => (/* binding */ getProjectMapClient)
});

// EXTERNAL MODULE: ./node_modules/@uniformdev/context/dist/api/api.mjs
var api = __webpack_require__(22733);
// EXTERNAL MODULE: ./node_modules/@uniformdev/canvas/dist/index.mjs
var dist = __webpack_require__(95091);
;// CONCATENATED MODULE: ./node_modules/@uniformdev/project-map/dist/index.mjs
var __accessCheck = (obj, member, msg)=>{
    if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter)=>{
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value)=>{
    if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter)=>{
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
};
var __privateMethod = (obj, member, method)=>{
    __accessCheck(obj, member, "access private method");
    return method;
};
// src/projectMapClient.ts

var ROOT_NODE_PATH = "/";
var ProjectMapClient = class extends api/* ApiClient */.Sl {
    constructor(options){
        super(options);
        /**
     * Get available project map defintions
     */ this.getProjectMapDefinitions = async ()=>{
            const { projectId } = this.options;
            const fetchUri = this.createUrl("/api/v1/project-map", {
                projectId
            });
            return await this.apiClient(fetchUri);
        };
        /**
     * Get specific project map definition
     */ this.getProjectMapDefinition = async (options)=>{
            const { projectId } = this.options;
            const fetchUri = this.createUrl("/api/v1/project-map", {
                ...options,
                projectId
            });
            return await this.apiClient(fetchUri);
        };
        /**
     * Update or insert a project map definition
     */ this.upsertProjectMap = async (options)=>{
            const { projectId } = this.options;
            const fetchUri = this.createUrl("/api/v1/project-map");
            const result = await this.apiClient(fetchUri, {
                method: "PUT",
                body: JSON.stringify({
                    ...options,
                    projectId
                })
            });
            return result.projectMapId;
        };
        /**
     * Delete a project map definition
     */ this.deleteProjectMap = async (options)=>{
            const { projectId } = this.options;
            const fetchUri = this.createUrl("/api/v1/project-map");
            await this.apiClient(fetchUri, {
                method: "DELETE",
                body: JSON.stringify({
                    ...options,
                    projectId
                }),
                expectNoContent: true
            });
        };
        /**
     * Update or insert a list of project map nodes
     */ this.upsertProjectMapNodes = async (options)=>{
            const { projectId } = this.options;
            const fetchUri = this.createUrl("/api/v1/project-map-nodes");
            await this.apiClient(fetchUri, {
                method: "PUT",
                body: JSON.stringify({
                    ...options,
                    projectId,
                    nodes: options.nodes.map((n)=>{
                        return {
                            ...n,
                            node: {
                                ...this.cleanProjectMapNode(n.node)
                            }
                        };
                    })
                }),
                expectNoContent: true
            });
        };
        /**
     * Delete a project map node
     */ this.deleteProjectMapNode = async (options)=>{
            const { projectId } = this.options;
            const fetchUri = this.createUrl("/api/v1/project-map-nodes");
            await this.apiClient(fetchUri, {
                method: "DELETE",
                body: JSON.stringify({
                    ...options,
                    projectId
                }),
                expectNoContent: true
            });
        };
        /**
     * Get a subtree of the project map tree returned in a tree format
     */ this.getSubtree = async (options)=>{
            var _a;
            const fetchOptions = this.setFetchOptions(options);
            fetchOptions["tree"] = "true";
            const fetchUri = this.createUrl("/api/v1/project-map-nodes", fetchOptions);
            const result = await this.apiClient(fetchUri);
            const root = {
                ...result.tree
            };
            const nodes = [
                root
            ];
            while(nodes && nodes.length > 0){
                const currentNode = nodes.pop();
                let lastChild = void 0;
                (_a = currentNode == null ? void 0 : currentNode.children) == null ? void 0 : _a.forEach((child)=>{
                    child.parent = cutReferences(currentNode);
                    child.previousSibling = cutReferences(lastChild);
                    if (lastChild) {
                        lastChild.nextSibling = cutReferences(child);
                    }
                    lastChild = child;
                    nodes.push(child);
                });
            }
            return root;
        };
        /**
     * Get a subtree of the project map tree returned in a list format
     */ this.getNodes = async (options)=>{
            const fetchOptions = this.setFetchOptions(options);
            const fetchUri = this.createUrl("/api/v1/project-map-nodes", fetchOptions);
            return await this.apiClient(fetchUri);
        };
    }
    setFetchOptions(options) {
        const { projectId } = this.options;
        const fetchOptions = {
            projectId
        };
        Object.entries(options).forEach(([key, value])=>{
            if (value === void 0) {
                return;
            }
            if (typeof value === "boolean") {
                if (!value) {
                    return;
                }
                fetchOptions[key] = "true";
                return;
            }
            if (typeof value === "number") {
                fetchOptions[key] = value.toString(10);
                return;
            }
            fetchOptions[key] = value;
        });
        return fetchOptions;
    }
    cleanProjectMapNode(node) {
        var _a, _b, _c;
        return {
            id: ((_c = (_b = (_a = node.id) == null ? void 0 : _a.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)) == null ? void 0 : _b.length) != null ? _c : 0) == 1 ? node.id : void 0,
            path: node.path,
            name: node.name,
            type: node.type,
            order: node.order,
            data: node.data,
            compositionId: node.compositionId,
            description: node.description
        };
    }
};
var UncachedProjectMapClient = class extends (/* unused pure expression or super */ null && (ProjectMapClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
var cutReferences = (node)=>node ? {
        ...node,
        parent: void 0,
        children: void 0
    } : void 0;
// src/util/Route.ts

var _routeInfo, _parseRouteOrPath, parseRouteOrPath_fn, _isDynamicRouteSegment, isDynamicRouteSegment_fn;
var _Route = class _Route {
    constructor(route){
        this.route = route;
        __privateAdd(this, _routeInfo, void 0);
        var _a;
        __privateSet(this, _routeInfo, __privateMethod(_a = _Route, _parseRouteOrPath, parseRouteOrPath_fn).call(_a, this.route));
    }
    get dynamicSegmentCount() {
        return __privateGet(this, _routeInfo).segments.reduce((count, segment)=>{
            var _a;
            return __privateMethod(_a = _Route, _isDynamicRouteSegment, isDynamicRouteSegment_fn).call(_a, segment) ? count + 1 : count;
        }, 0);
    }
    /** Tests if an incoming path matches this route */ matches(path) {
        var _a, _b;
        const { segments: pathSegments, queryParams: pathQuery } = __privateMethod(_a = _Route, _parseRouteOrPath, parseRouteOrPath_fn).call(_a, path);
        const { segments: routeSegments } = __privateGet(this, _routeInfo);
        if (pathSegments.length !== routeSegments.length) {
            return {
                match: false
            };
        }
        const possibleMatch = {
            match: true,
            dynamicSegmentCount: 0,
            pathParams: {},
            queryParams: {}
        };
        for(let i = 0; i < routeSegments.length; i++){
            const routeSegment = routeSegments[i];
            const pathSegment = pathSegments[i];
            if (__privateMethod(_b = _Route, _isDynamicRouteSegment, isDynamicRouteSegment_fn).call(_b, routeSegment)) {
                const key = routeSegment.slice(1);
                possibleMatch.pathParams[key] = pathSegment;
                possibleMatch.dynamicSegmentCount++;
            } else if (routeSegment !== pathSegment) {
                return {
                    match: false
                };
            }
        }
        for (const [key, value] of __privateGet(this, _routeInfo).queryParams){
            possibleMatch.queryParams[key] = pathQuery.has(key) ? pathQuery.get(key) : value;
        }
        return possibleMatch;
    }
    /**
   * Creates an expanded path value for this route given dynamic input values and allowed query string values
   */ expand(options) {
        const { dynamicInputValues = {}, allowedQueryParams = [], doNotEscapeVariables = false } = options != null ? options : {};
        const path = __privateGet(this, _routeInfo).segments.map((segment)=>{
            const dynamicSegmentName = _Route.getDynamicRouteSegmentName(segment);
            if (!dynamicSegmentName) {
                return segment;
            }
            const dynamicSegmentValue = dynamicInputValues[dynamicSegmentName];
            if (!dynamicSegmentValue) {
                console.log("Missing dynamic input value for", dynamicSegmentName, "in", this.route, "using literal value");
                return segment;
            }
            return encodeRouteComponent(dynamicSegmentValue, doNotEscapeVariables);
        }).join("/");
        const queries = allowedQueryParams.filter((qs)=>{
            const type = typeof dynamicInputValues[qs];
            return type === "string" || type === "number" || type === "boolean";
        }).map((qs)=>`${encodeRouteComponent(qs, doNotEscapeVariables)}=${encodeRouteComponent(dynamicInputValues[qs], doNotEscapeVariables)}`);
        const query = queries.length ? `?${queries.join("&")}` : "";
        return `/${path}${query}`;
    }
    static getDynamicRouteSegmentName(segment) {
        var _a;
        if (!__privateMethod(_a = _Route, _isDynamicRouteSegment, isDynamicRouteSegment_fn).call(_a, segment)) {
            return void 0;
        }
        return segment.slice(_Route.dynamicSegmentPrefix.length);
    }
};
_routeInfo = new WeakMap();
_parseRouteOrPath = new WeakSet();
parseRouteOrPath_fn = function(path) {
    if (!path.startsWith("/") || path === "") {
        throw new Error(`Path must start with a slash: ${path}`);
    }
    const pathSegments = path.substring(1).split("/");
    const [lastSegmentWithoutQuery, queryString] = pathSegments[pathSegments.length - 1].split("?");
    pathSegments[pathSegments.length - 1] = lastSegmentWithoutQuery;
    const queryParams = new URLSearchParams(queryString);
    return {
        segments: pathSegments,
        queryParams
    };
};
_isDynamicRouteSegment = new WeakSet();
isDynamicRouteSegment_fn = function(segment) {
    return segment.startsWith(_Route.dynamicSegmentPrefix);
};
__privateAdd(_Route, _parseRouteOrPath);
__privateAdd(_Route, _isDynamicRouteSegment);
_Route.dynamicSegmentPrefix = ":";
var Route = (/* unused pure expression or super */ null && (_Route));
function encodeRouteComponent(value, doNotEscapeVariables) {
    if (!doNotEscapeVariables) {
        return encodeURIComponent(value);
    }
    const result = [];
    (0,dist/* parseVariableExpression */.si)(value.toString(10), (token, type)=>{
        if (type === "variable") {
            result.push((0,dist/* createVariableReference */.m0)(token));
        } else {
            result.push(encodeURIComponent(token));
        }
    });
    return result.join("");
}


;// CONCATENATED MODULE: ./node_modules/@uniformdev/canvas-next-rsc/dist/client/projectMapClient.js

const getProjectMapClient = (options)=>{
    const manifestClient = new ProjectMapClient({
        apiHost: process.env.UNIFORM_API_HOST || process.env.UNIFORM_CLI_BASE_URL,
        apiKey: process.env.UNIFORM_API_KEY,
        projectId: process.env.UNIFORM_PROJECT_ID,
        fetch: (req, init)=>{
            return fetch(req, {
                ...init,
                next: {
                    revalidate: options === null || options === void 0 ? void 0 : options.revalidate
                }
            });
        }
    });
    return manifestClient;
};


/***/ }),

/***/ 4491:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ getRouteClient)
/* harmony export */ });
/* harmony import */ var _uniformdev_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95091);
/* harmony import */ var _utils_draft__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48239);
/* harmony import */ var _utils_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62943);



const getRouteClient = (options)=>{
    const client = new _uniformdev_canvas__WEBPACK_IMPORTED_MODULE_0__/* .RouteClient */ .KK({
        projectId: process.env.UNIFORM_PROJECT_ID,
        apiKey: process.env.UNIFORM_API_KEY,
        edgeApiHost: process.env.UNIFORM_EDGE_API_HOST,
        fetch: (req, init)=>{
            let requestedUrl;
            if (typeof req === "string") {
                requestedUrl = new URL(req);
            } else if (req instanceof URL) {
                requestedUrl = req;
            } else {
                requestedUrl = new URL(req.url);
            }
            const tags = [];
            if (requestedUrl) {
                // this is here so this code breaks if parameters change here
                const pathKey = "path";
                const path = requestedUrl.searchParams.get(pathKey);
                if (path) {
                    // at this point, we do not know if this path is dynamic or not
                    // so apply each segment as a tag so we can clear any segment, ie:
                    // /authors/alex would add /authors and /authors/alex as tags
                    const pieces = path.split("/");
                    for(let i = 0; i < pieces.length; i++){
                        const segmentPieces = pieces.slice(0, i + 1);
                        const segment = segmentPieces.join("/");
                        tags.push((0,_utils_tag__WEBPACK_IMPORTED_MODULE_1__/* .buildPathTag */ ._)(segment));
                    }
                }
            }
            let revalidate;
            let noCache = false;
            if (options === null || options === void 0 ? void 0 : options.revalidate) {
                revalidate = options.revalidate;
            }
            if (revalidate === -1 || (0,_utils_draft__WEBPACK_IMPORTED_MODULE_2__/* .isDevelopmentEnvironment */ .vf)()) {
                noCache = true;
                revalidate = undefined;
            }
            return fetch(req, {
                ...init,
                cache: noCache ? "no-cache" : "force-cache",
                next: {
                    revalidate,
                    tags: tags.length ? tags : undefined
                }
            });
        }
    });
    return client;
};


/***/ }),

/***/ 98844:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  x: () => (/* binding */ resolveRedirectHref),
  y: () => (/* binding */ retrieveRoute)
});

// EXTERNAL MODULE: ./node_modules/@uniformdev/canvas/dist/index.mjs
var dist = __webpack_require__(95091);
// EXTERNAL MODULE: ./node_modules/rfdc/index.js
var rfdc = __webpack_require__(89541);
// EXTERNAL MODULE: ./node_modules/@uniformdev/context/dist/api/api.mjs
var api = __webpack_require__(22733);
;// CONCATENATED MODULE: ./node_modules/@uniformdev/redirect/dist/index.mjs

// src/cache/data/refresher.ts
var Refresher = class {
    /**
   * Create new refresher
   * @param refreshRate - How often the refresher will refresh. Cannot be less than 20000 ms or 20 seconds
   * @param refreshDuration - How many times it should refresh before sleeps until something accesses the cache. Cannot be more than 5
   * @param refresh - Refresh method to run at the refresh rate intervals
   */ constructor({ refreshRate, refreshDuration, refresh }){
        this.refreshCounter = 0;
        this.finalRate = refreshRate >= 2e4 ? refreshRate : 2e4;
        this.finalDuration = refreshDuration <= 5 ? refreshDuration : 5;
        this.refreshCounter = 1;
        this.refresh = refresh;
        this.start();
    }
    /**
   * Start async updating process again, will run for the same duration as the original.  refreshRate * refreshDuration milliseconds
   */ kick() {
        if (this.refreshCounter === 0) {
            this.start();
        }
        this.refreshCounter = 1;
    }
    start() {
        this.interval = setTimeout(async ()=>{
            if (this.refreshCounter > this.finalDuration) {
                this.refreshCounter = 0;
            } else {
                await this.refresh();
                this.refreshCounter++;
                this.start();
            }
        }, this.finalRate);
    }
};
// src/cache/redirectClientCache.ts
var RedirectClientCache = class {
    constructor(options){
        this.options = options;
    }
};
// src/cache/withMemoryCache.ts
var _WithMemoryCache = class _WithMemoryCache extends RedirectClientCache {
    constructor(options){
        super(options);
        if (options.refreshRate && !_WithMemoryCache.refresher) {
            _WithMemoryCache.refresher = new Refresher({
                refreshRate: options.refreshRate,
                refreshDuration: 5,
                refresh: this.refresh
            });
        }
    }
    /* Get data from the cache and debounce pausing refresh */ get(key) {
        var _a, _b, _c;
        (_a = _WithMemoryCache.refresher) == null ? void 0 : _a.kick();
        return (_c = (_b = _WithMemoryCache.trieCache[key]) == null ? void 0 : _b.data) != null ? _c : void 0;
    }
    /* Set new data to the cache and reset the refresh method */ set(key, data, refresh) {
        var _a;
        if (!data) return;
        const setCache = ()=>{
            _WithMemoryCache.trieCache[key] = {
                ..._WithMemoryCache.trieCache[key],
                data,
                refresh
            };
        };
        if (!((_a = _WithMemoryCache.trieCache[key]) == null ? void 0 : _a.data)) {
            setCache();
        } else {
            data.then(()=>{
                setCache();
            });
        }
    }
    refresh() {
        var _a, _b;
        const caches = [];
        for(const key in _WithMemoryCache.trieCache){
            const p = (_b = (_a = _WithMemoryCache.trieCache[key]) == null ? void 0 : _a.refresh) == null ? void 0 : _b.call(_a);
            if (p) {
                caches.push(p.then(()=>{
                    _WithMemoryCache.trieCache[key] = {
                        ..._WithMemoryCache.trieCache[key],
                        data: p
                    };
                }));
            }
        }
        return Promise.all(caches);
    }
};
/* Memory static class level variable to store data across multiple instances of the redirect client */ _WithMemoryCache.trieCache = {};
var WithMemoryCache = (/* unused pure expression or super */ null && (_WithMemoryCache));
// src/data/pathTrie.ts

var dataProp = "~~data~~";
var PathTrie = class {
    constructor(initialData){
        this.map = new PathTrieData();
        this.splitUrl = (url)=>{
            if (url.startsWith("https://")) return [
                "https://",
                ...url.substring("https://".length).split("/")
            ].filter((segment)=>segment.length);
            if (url.startsWith("http://")) return [
                "http://",
                ...url.substring("http://".length).split("/")
            ].filter((segment)=>segment.length);
            return url.split("/").filter((segment)=>segment.length);
        };
        this.clone = rfdc();
        if (initialData) {
            if (Object.hasOwn(initialData, "map")) {
                this.map = initialData.map;
            } else {
                this.map = initialData;
            }
        }
    }
    convertManyInsert(data, key, value) {
        data == null ? void 0 : data.forEach((d)=>{
            if (value) {
                this.insert(key(d), value(d));
            } else {
                this.insert(key(d), d);
            }
        });
    }
    insertMany(data, key) {
        data.forEach((d)=>{
            this.insert(key(d), d);
        });
    }
    insert(path, data) {
        let cur = this.map;
        const segments = this.splitUrl(path);
        for(let i = 0; i < segments.length; i++){
            const segment = segments[i];
            if (i === 0 && segment === "") continue;
            if (!Object.hasOwn(cur, segment)) {
                cur[segment] = new PathTrieData();
            }
            cur = cur[segment];
            if (i == segments.length - 1) {
                if (!cur[dataProp]) {
                    cur[dataProp] = [];
                }
                cur[dataProp].push(data);
            }
        }
    }
    find(path, bestMatch = true) {
        let cur = this.clone(this.map);
        const segments = this.splitUrl(path);
        const wildcards = [];
        const ret = [];
        const splats = [];
        const processed = /* @__PURE__ */ new Set();
        const getVariables = ()=>{
            return wildcards.filter((wildcard)=>Boolean(wildcard) && wildcard.active).reduce((variables, wildcard)=>{
                variables[wildcard.name] = segments[wildcard.start];
                return variables;
            }, new Object());
        };
        const getPropsStartingWithColon = (obj)=>{
            const result = [];
            for(const prop in obj){
                if (prop.startsWith(":")) {
                    result.push(prop);
                }
            }
            return result;
        };
        const scanWildcards = ()=>{
            let wildcard = void 0;
            while((!wildcard || wildcard.active) && wildcards.length){
                wildcard = wildcards.pop();
            }
            if (!wildcard || wildcard.active) return void 0;
            wildcard.active = true;
            cur = wildcard == null ? void 0 : wildcard.startTrie;
            wildcards.push(wildcard);
            if (wildcards.length && wildcards[wildcards.length - 1].start === segments.length - 1 && wildcards[wildcards.length - 1].active && wildcards[wildcards.length - 1].startTrie[dataProp]) {
                wildcards[wildcards.length - 1].startTrie[dataProp].forEach((d)=>ret.push({
                        data: d,
                        variables: getVariables()
                    }));
            }
            return wildcard == null ? void 0 : wildcard.start;
        };
        for(let i = 0; i < segments.length; i++){
            const segment = segments[i];
            if (Object.hasOwn(cur, "*")) {
                cur["*"][dataProp].forEach((splat)=>{
                    const vars = getVariables();
                    vars[":splat"] = segments.slice(i).join("/");
                    splats.push({
                        data: splat,
                        variables: vars
                    });
                });
            }
            getPropsStartingWithColon(cur).forEach((wildcard)=>{
                if (!processed.has(wildcard + i)) {
                    wildcards.push({
                        startTrie: cur[wildcard],
                        start: i,
                        active: false,
                        name: wildcard
                    });
                    processed.add(wildcard + i);
                }
            });
            if (Object.hasOwn(cur, segment)) {
                cur = cur[segment];
                if (i === segments.length - 1) {
                    if (cur[dataProp]) {
                        cur[dataProp].forEach((d)=>ret.push({
                                data: d,
                                variables: getVariables()
                            }));
                    } else {
                        const more = scanWildcards();
                        if (typeof more === "undefined" || ret.length > 0 && bestMatch) return [
                            ...ret,
                            ...splats
                        ];
                        i = more;
                    }
                }
            } else {
                const more = scanWildcards();
                if (typeof more === "undefined" || ret.length > 0 && bestMatch) return [
                    ...ret,
                    ...splats
                ];
                i = more;
                if (ret.length > 0 && bestMatch) return [
                    ...ret,
                    ...splats
                ];
                continue;
            }
            if (i === segments.length - 1 && wildcards.length !== 0) {
                const more = scanWildcards();
                if (typeof more === "undefined" || ret.length > 0 && bestMatch) return [
                    ...ret,
                    ...splats
                ];
                i = more;
            }
            if (ret.length > 0 && bestMatch) return [
                ...ret,
                ...splats
            ];
        }
        return [
            ...ret,
            ...splats
        ];
    }
};
var PathTrieData = class {
};
// src/redirectClient.ts

// src/util/url.ts
function processUrl(url) {
    var _a, _b, _c, _d, _e, _f;
    const matches = url.match(/^(https?:\/\/)?(([^:/?#]*)(?:(:[0-9]+))?)?([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    return {
        url,
        protocol: (_a = matches == null ? void 0 : matches[1]) != null ? _a : "",
        domain: (_b = matches == null ? void 0 : matches[3]) != null ? _b : "",
        port: (_c = matches == null ? void 0 : matches[4]) != null ? _c : "",
        path: (_d = matches == null ? void 0 : matches[5]) != null ? _d : "",
        query: (_e = matches == null ? void 0 : matches[6]) != null ? _e : "",
        fragment: (_f = matches == null ? void 0 : matches[7]) != null ? _f : ""
    };
}
// src/redirectClient.ts
var _RedirectClient = class _RedirectClient extends api/* ApiClient */.Sl {
    constructor(options){
        super(options);
        this.getRedirect = async (options)=>{
            var _a;
            const { projectId } = this.options;
            const fetchUri = this.createUrl("/api/v1/redirect", {
                ...options,
                projectId
            });
            const results = await this.apiClient(fetchUri);
            return (_a = results.redirects) == null ? void 0 : _a[0];
        };
        this.getRedirects = async (options)=>{
            const { projectId } = this.options;
            const fetchUri = this.createUrl("/api/v1/redirect", {
                ...options,
                projectId
            });
            const results = await this.apiClient(fetchUri);
            return results;
        };
        this.getRedirectTrie = async (options)=>{
            var _a, _b;
            const { projectId } = this.options;
            const key = projectId;
            const cachePromise = (options == null ? void 0 : options.bypassDataCache) ? void 0 : (_a = this.options.dataCache) == null ? void 0 : _a.get(key);
            if (cachePromise) {
                const result = await cachePromise;
                if (result) return result;
            }
            const ret = this.assembleTrie();
            (_b = this.options.dataCache) == null ? void 0 : _b.set(key, ret, ()=>this.assembleTrie());
            return ret;
        };
        this.resetRedirectTrieDataCache = async ()=>{
            var _a;
            await ((_a = this.options.dataCache) == null ? void 0 : _a.refresh());
        };
        this.upsertRedirect = async (redirect)=>{
            const { id, sourceUrl, targetStatusCode, targetUrl, labelAsSystem, projectMapId, sourceMustMatchDomain, sourceProjectMapNodeId, sourceRetainQuerystring, targetMergeQuerystring, targetPreserveIncomingDomain, targetPreserveIncomingProtocol, targetProjectMapNodeId } = redirect;
            const fetchUri = this.createUrl("/api/v1/redirect");
            const result = await this.apiClient(fetchUri, {
                method: "PUT",
                body: JSON.stringify({
                    redirect: {
                        id,
                        sourceUrl,
                        targetStatusCode,
                        targetUrl,
                        labelAsSystem,
                        projectMapId,
                        sourceMustMatchDomain,
                        sourceProjectMapNodeId,
                        sourceRetainQuerystring,
                        targetMergeQuerystring,
                        targetPreserveIncomingDomain,
                        targetPreserveIncomingProtocol,
                        targetProjectMapNodeId
                    },
                    projectId: this.options.projectId
                })
            });
            return result.id;
        };
        this.deleteRedirect = async (id)=>{
            const fetchUri = this.createUrl("/api/v1/redirect");
            const result = await this.apiClient(fetchUri, {
                method: "DELETE",
                body: JSON.stringify({
                    id,
                    projectId: this.options.projectId
                })
            });
            this.resetRedirectTrieDataCache();
            return result.id;
        };
        this.processUrlBestMatch = async (url, options, useTrie)=>{
            var _a, _b;
            const sanitizedUrl = url.endsWith("/") ? url.replace(/\/+$/, "") : url;
            if (!useTrie) {
                const redirects = await this.getRedirects((options == null ? void 0 : options.reverse) ? {
                    targetUrl: sanitizedUrl
                } : {
                    sourceUrl: sanitizedUrl
                });
                const processedUrl = processUrl(sanitizedUrl);
                const redirect = (_a = redirects == null ? void 0 : redirects.redirects) == null ? void 0 : _a[0];
                if (!redirect) return void 0;
                return _RedirectClient.processDefinitionToResults(processedUrl, redirect, _RedirectClient.getSourceVariables(processedUrl.path, processUrl((options == null ? void 0 : options.reverse) ? redirect.redirect.targetUrl : redirect.redirect.sourceUrl).path), options);
            }
            const trie = await this.getRedirectTrie();
            return (_b = _RedirectClient.processHops(sanitizedUrl, trie, true, options)) == null ? void 0 : _b[0];
        };
        this.processUrlAllMatches = async (url, options, useTrie)=>{
            const sanitizedUrl = url.endsWith("/") ? url.replace(/\/+$/, "") : url;
            if (!useTrie) {
                const redirects = await this.getRedirects((options == null ? void 0 : options.reverse) ? {
                    targetUrl: sanitizedUrl
                } : {
                    sourceUrl: sanitizedUrl
                });
                const processedUrl = processUrl(sanitizedUrl);
                return redirects.redirects.filter((redirect)=>redirect.redirect).map((redirect)=>{
                    return _RedirectClient.processDefinitionToResults(processedUrl, redirect, _RedirectClient.getSourceVariables(processedUrl.path, processUrl((options == null ? void 0 : options.reverse) ? redirect.redirect.targetUrl : redirect.redirect.sourceUrl).path), options);
                });
            }
            const trie = await this.getRedirectTrie();
            return _RedirectClient.processHops(sanitizedUrl, trie, false, options);
        };
        if (options.dataCache && options.dataCache.options.prePopulate) {
            if (!options.dataCache.get(options.projectId)) {
                options.dataCache.set(options.projectId, this.getRedirectTrie(), ()=>this.getRedirectTrie({
                        bypassDataCache: true
                    }));
            }
        }
    }
    async *getAllRedirects(orderBy = "updated_at desc") {
        var _a, _b;
        const { projectId } = this.options;
        let requestCount = 0;
        let results = void 0;
        while(requestCount === 0 || ((_a = results == null ? void 0 : results.redirects) == null ? void 0 : _a.length)){
            const fetchUri = this.createUrl("/api/v1/redirect", {
                limit: 500,
                offset: requestCount * 500,
                orderBy,
                projectId
            });
            results = await this.apiClient(fetchUri);
            const redirectCount = results.redirects.length;
            for(let i = 0; i < redirectCount; i++){
                yield {
                    total: results.total,
                    ...results.redirects[i]
                };
            }
            requestCount++;
            if (requestCount * 500 > ((_b = results.total) != null ? _b : 0)) {
                break;
            }
        }
    }
    async assembleTrie() {
        if (!_RedirectClient.assembling) {
            _RedirectClient.assembling = true;
            _RedirectClient.assemblingPromise = (async ()=>{
                const trie = new PathTrie();
                for await (const redirect of this.getAllRedirects()){
                    const source = processUrl(redirect.redirect.sourceUrl);
                    const target = processUrl(redirect.redirect.targetUrl);
                    trie.insert(source.path, {
                        redirect: redirect.redirect,
                        metadata: redirect.metadata,
                        reverse: false
                    });
                    trie.insert(target.path.replace(/\/:/, "/~~"), {
                        redirect: redirect.redirect,
                        metadata: redirect.metadata,
                        reverse: true
                    });
                }
                _RedirectClient.assembling = false;
                return trie;
            })();
        }
        return await _RedirectClient.assemblingPromise;
    }
    static processHops(initialUrl, trie, bestMatch, options) {
        const url = (options == null ? void 0 : options.reverse) ? initialUrl.replace(/\/:/, "/~~") : initialUrl;
        const isCycle = (id, result)=>{
            var _a;
            if (!id || !result.lastHop) return false;
            const set = /* @__PURE__ */ new Set([
                id
            ]);
            const cycleStack = [
                result
            ];
            while(cycleStack.length > 0){
                const cur = cycleStack.pop();
                const redirect = (_a = cur == null ? void 0 : cur.definition) == null ? void 0 : _a.redirect;
                if (!(redirect == null ? void 0 : redirect.id)) continue;
                if (set.has(redirect.id)) return true;
                set.add(redirect.id);
                if (cur == null ? void 0 : cur.lastHop) {
                    cycleStack.push(cur.lastHop);
                }
            }
            return false;
        };
        const stack = this.processHop(url, trie, bestMatch, options);
        const ret = [];
        while(stack.length > 0){
            const result = stack.pop();
            if (!(result == null ? void 0 : result.url)) continue;
            const hop = this.processHop(result == null ? void 0 : result.url, trie, bestMatch, options).filter((h)=>{
                var _a, _b;
                return ((_a = h.definition) == null ? void 0 : _a.redirect.id) && !isCycle((_b = h.definition) == null ? void 0 : _b.redirect.id, result);
            });
            if (hop.length === 0) {
                ret.unshift(result);
            }
            hop.forEach((h)=>{
                stack.push({
                    ...h,
                    lastHop: result
                });
            });
        }
        return ret;
    }
    static processHop(url, trie, bestMatch, options) {
        const processedUrl = processUrl(url);
        const definition = trie.find(processedUrl.path, false);
        if (definition == null ? void 0 : definition.length) {
            return definition.filter((def)=>def.data.reverse === Boolean(options == null ? void 0 : options.reverse) && _RedirectClient.validateRedirect(url, def.data.redirect)).map((def)=>this.processDefinitionToResults(processedUrl, def.data, def.variables, options)).filter((r)=>Boolean(r));
        }
        return [];
    }
    /**
   * Taking the url, found definition and variables and returning a redirect result object
   * @param processedUrl - Propertly formatted url input
   * @param definition - Redirect definition found to match the processed url
   * @param variables - Wildcard variables found during definition discovery
   * @param options - Different options available to the redirect engine
   */ static processDefinitionToResults(processedUrl, definition, variables, options) {
        const resultUrl = (options == null ? void 0 : options.reverse) ? definition.redirect.sourceUrl : definition.redirect.targetUrl;
        const processedResult = processUrl(resultUrl);
        const redirect = definition == null ? void 0 : definition.redirect;
        if (redirect.sourceMustMatchDomain && processedUrl.domain !== processedResult.domain) return void 0;
        const finalUrl = (options == null ? void 0 : options.reverse) ? "n/a" : _RedirectClient.getTargetVariableExpandedUrl(processedUrl.url, redirect);
        return {
            url: finalUrl,
            definition,
            label: (options == null ? void 0 : options.label) ? Object.keys(variables).reduce((cur, o)=>{
                return cur.replace(variables[o], `<em>${variables[o]}</em>`);
            }, finalUrl) : void 0
        };
    }
    static validateRedirect(url, redirectDefinition) {
        const processedSource = processUrl(redirectDefinition.sourceUrl);
        const processedUrl = processUrl(url);
        if (redirectDefinition.sourceMustMatchDomain && processedSource.domain !== processedUrl.domain) return false;
        if (processedSource.query && !processedUrl.query) return false;
        if (processedSource.query && processedUrl.query) {
            const sourceqs = new URLSearchParams(processedSource.query);
            const urlqs = new URLSearchParams(processedUrl.query);
            for (const [key] of sourceqs){
                if (!urlqs.has(key) || urlqs.get(key) !== sourceqs.get(key)) return false;
            }
        }
        return true;
    }
    static getTargetVariableExpandedUrl(url, redirectDefinition, isVariable) {
        const processedTarget = processUrl(redirectDefinition.targetUrl);
        const processedSource = processUrl(redirectDefinition.sourceUrl);
        let finalUrlPath = processedTarget.path;
        const processedUrl = processUrl(url);
        const variables = this.getSourceVariables(processedUrl.path, processedSource.path, isVariable);
        for(const variable in variables){
            finalUrlPath = finalUrlPath.replace(variable, variables[variable]);
        }
        let protocol = redirectDefinition.targetPreserveIncomingProtocol || processedTarget.protocol === "" ? processedUrl.protocol : processedTarget.protocol;
        const domain = protocol !== "" ? redirectDefinition.targetPreserveIncomingDomain || processedTarget.domain === "" ? processedUrl.domain : processedTarget.domain : "";
        if (domain === "" && protocol !== "") {
            protocol = "";
        }
        const port = domain === "" ? "" : redirectDefinition.targetPreserveIncomingDomain || processedTarget.domain === "" ? processedUrl.port : processedTarget.port;
        const query = redirectDefinition.sourceRetainQuerystring && redirectDefinition.targetMergeQuerystring ? this.mergeQueryStrings(processedUrl.query, processedTarget.query) : !redirectDefinition.targetMergeQuerystring && redirectDefinition.sourceRetainQuerystring ? processedUrl.query : processedTarget.query;
        const fragment = redirectDefinition.sourceRetainQuerystring && redirectDefinition.targetMergeQuerystring ? this.mergeQueryStrings(processedUrl.fragment, processedTarget.fragment) : !redirectDefinition.targetMergeQuerystring && redirectDefinition.sourceRetainQuerystring ? processedUrl.fragment : processedTarget.fragment;
        return `${protocol}${domain}${port}${finalUrlPath}${query}${fragment}`;
    }
    static mergeQueryStrings(qs1, qs2) {
        let fragment = false;
        if (qs1.startsWith("#")) {
            fragment = true;
            qs1 = qs1.substring(1);
        }
        if (qs2.startsWith("#")) {
            fragment = true;
            qs2 = qs2.substring(1);
        }
        const params1 = new URLSearchParams(qs1);
        const params2 = new URLSearchParams(qs2);
        const merged = new URLSearchParams([
            ...params1,
            ...params2
        ]).toString();
        if (merged.length > 0) return (fragment ? "#" : "?") + merged;
        return "";
    }
    static getSourceVariables(path, source, isVariable = (pathSegment, isLast)=>pathSegment.startsWith(":") || pathSegment === "*" && isLast) {
        const variables = {};
        const pathSegments = path.split("/");
        const sourceSegments = source.split("/");
        if (pathSegments.length !== sourceSegments.length && !source.endsWith("/*")) {
            throw new Error("Path and source have different numbers of path segments, must be the same");
        }
        sourceSegments.forEach((sourceSegment, i)=>{
            if (isVariable(sourceSegment, i === sourceSegments.length - 1)) {
                variables[sourceSegment] = pathSegments[i];
            }
        });
        return variables;
    }
};
_RedirectClient.processUrlBestMatch = async (url, trie, options)=>{
    var _a;
    return (_a = _RedirectClient.processHops(url, trie, true, options)) == null ? void 0 : _a[0];
};
_RedirectClient.assembling = false;
_RedirectClient.assemblingPromise = new Promise(()=>new PathTrie());
var RedirectClient = _RedirectClient;
var UncachedRedirectClient = class extends (/* unused pure expression or super */ null && (RedirectClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
// src/util/RedirectFileConverter.ts
var getDefaultClient = async ()=>{
    const dotenv = await __webpack_require__.e(/* import() */ 160).then(__webpack_require__.bind(__webpack_require__, 73160));
    dotenv.config();
    return new RedirectClient({
        apiKey: process.env.UNIFORM_API_KEY,
        apiHost: process.env.UNIFORM_BASE_URL,
        projectId: process.env.UNIFORM_PROJECT_ID
    });
};
function ExtractWildcards(url) {
    let last = "";
    let wildcardStart = -1;
    const terminators = [
        "/",
        "?",
        "&",
        "#"
    ];
    const ret = [];
    for(let i = 0; i < url.length; i++){
        const cur = url.charAt(i);
        if (terminators.includes(last) && cur === ":") {
            wildcardStart = i;
        }
        if (terminators.includes(cur) && wildcardStart !== -1) {
            ret.push({
                index: wildcardStart,
                pathSegment: url.substring(wildcardStart, i)
            });
            wildcardStart = -1;
        }
        last = cur;
    }
    if (wildcardStart > -1) {
        ret.push({
            index: wildcardStart,
            pathSegment: url.substring(wildcardStart)
        });
    }
    if (last === "*") {
        ret.push({
            index: url.length,
            pathSegment: "*"
        });
    }
    return ret;
}
async function RedirectFileConverter({ client, redirectEntryObject, wildcardConverter = (s)=>s, writeFile }) {
    if (!client) {
        client = await getDefaultClient();
    }
    let redirects = (await client.getRedirects({
        limit: 50,
        offset: 0
    })).redirects;
    let count = 0;
    const ret = [];
    while(redirects.length){
        const redirect = redirects.pop();
        if (redirect == null ? void 0 : redirect.redirect) {
            const st = wildcardConverter({
                ...redirect.redirect,
                sourceWildcards: ExtractWildcards(redirect.redirect.sourceUrl),
                targetWildcards: ExtractWildcards(redirect.redirect.targetUrl)
            });
            ret.push(redirectEntryObject({
                metadata: redirect.metadata,
                redirect: {
                    ...redirect.redirect,
                    sourceUrl: st.sourceUrl,
                    targetUrl: st.targetUrl
                }
            }));
        }
        if (!redirects.length) {
            count++;
            redirects = (await client.getRedirects({
                limit: 50,
                offset: count * 50
            })).redirects;
        }
    }
    writeFile(ret);
}


// EXTERNAL MODULE: ./node_modules/@vercel/edge-config/dist/index.js
var edge_config_dist = __webpack_require__(49069);
// EXTERNAL MODULE: ./node_modules/@uniformdev/canvas-next-rsc/dist/client/routeClient.js
var client_routeClient = __webpack_require__(4491);
// EXTERNAL MODULE: ./node_modules/@uniformdev/canvas-next-rsc/dist/config/helpers.js
var helpers = __webpack_require__(67533);
// EXTERNAL MODULE: ./node_modules/@uniformdev/canvas-next-rsc/dist/config/uniform.server.config.js
var uniform_server_config = __webpack_require__(10920);
// EXTERNAL MODULE: ./node_modules/@uniformdev/canvas-next-rsc/dist/utils/draft.js
var draft = __webpack_require__(48239);
// EXTERNAL MODULE: ./node_modules/@uniformdev/canvas-next-rsc/dist/utils/tag.js
var tag = __webpack_require__(62943);
// EXTERNAL MODULE: ./node_modules/@uniformdev/canvas-next-rsc/dist/utils/url.js
var utils_url = __webpack_require__(76555);
;// CONCATENATED MODULE: ./node_modules/@uniformdev/canvas-next-rsc/dist/components/retrieveRoute.js









const retrieveRoute = async (data)=>{
    void resolveRouteByEdgeConfig(data);
    void resolveRouteByRouteApi(data);
    const edgeConfigValue = await resolveRouteByEdgeConfig(data);
    let result;
    if (edgeConfigValue) {
        result = edgeConfigValue;
    } else {
        const routeApiValue = await resolveRouteByRouteApi(data);
        result = routeApiValue;
    }
    // fall back to draft if requesting editor state
    if (result.type === "notFound" && data.state === dist/* CANVAS_EDITOR_STATE */.tX) {
        return retrieveRoute({
            ...data,
            state: dist/* CANVAS_DRAFT_STATE */.ej
        });
    }
    return result;
};
const resolveRedirectHref = (resolveResult, path)=>{
    let href;
    if (resolveResult.redirect.targetProjectMapNodeId) {
        const requestUrl = `${(0,utils_url/* getBaseUrl */.S)()}${path}`;
        const expandedUrl = RedirectClient.getTargetVariableExpandedUrl(requestUrl, resolveResult.redirect);
        const url = new URL(expandedUrl);
        href = url.pathname;
    } else {
        href = resolveResult.redirect.targetUrl;
    }
    return href;
};
const resolveRouteByEdgeConfig = async (data)=>{
    var _a;
    if (!((_a = uniform_server_config/* default */.Z.experimental) === null || _a === void 0 ? void 0 : _a.edgeRedirects) || !process.env.EDGE_CONFIG) {
        return undefined;
    }
    const sourcePathKey = (0,tag/* buildPathTag */._)(data.path);
    const key = sourcePathKey.replace(/\W+/g, "");
    let edgeConfig;
    try {
        edgeConfig = await (0,edge_config_dist/* get */.U2)(key);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn("Failed to retrieve edge config", e);
    }
    if (!edgeConfig) {
        return undefined;
    }
    return edgeConfig;
};
const resolveRouteByRouteApi = async (data)=>{
    const routeClient = (0,client_routeClient/* getRouteClient */.d)({
        revalidate: (0,helpers/* getRouteRevalidateInterval */.Pe)({
            searchParams: data.searchParams
        })
    });
    const routeResult = await routeClient.getRoute({
        path: data.path,
        state: data.state,
        withComponentIDs: data.state === dist/* CANVAS_DRAFT_STATE */.ej || data.state === dist/* CANVAS_EDITOR_STATE */.tX,
        withContentSourceMap: (0,draft/* isOnVercelPreviewEnvironment */.OG)()
    });
    return routeResult;
};


/***/ }),

/***/ 67533:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Db: () => (/* binding */ getManifestRevalidateInterval),
/* harmony export */   Pe: () => (/* binding */ getRouteRevalidateInterval)
/* harmony export */ });
/* unused harmony export getCanvasRevalidateInterval */
/* harmony import */ var _utils_draft__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48239);
/* harmony import */ var _uniform_server_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10920);


const getCanvasRevalidateInterval = (options)=>{
    if (isDraftModeEnabled({
        searchParams: options.searchParams
    }) || isOnVercelPreviewEnvironment()) {
        return -1;
    }
    return "canvasRevalidateInterval" in config ? config.canvasRevalidateInterval : undefined;
};
const getManifestRevalidateInterval = (options)=>{
    if ((0,_utils_draft__WEBPACK_IMPORTED_MODULE_0__/* .isDraftModeEnabled */ .S1)({
        searchParams: options.searchParams
    }) || (0,_utils_draft__WEBPACK_IMPORTED_MODULE_0__/* .isOnVercelPreviewEnvironment */ .OG)()) {
        return -1;
    }
    return "manifestRevalidateInterval" in _uniform_server_config__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z ? _uniform_server_config__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z.manifestRevalidateInterval : undefined;
};
const getRouteRevalidateInterval = (options)=>{
    if ((0,_utils_draft__WEBPACK_IMPORTED_MODULE_0__/* .isDraftModeEnabled */ .S1)({
        searchParams: options.searchParams
    }) || (0,_utils_draft__WEBPACK_IMPORTED_MODULE_0__/* .isOnVercelPreviewEnvironment */ .OG)()) {
        return -1;
    }
    return "routeRevalidateInterval" in _uniform_server_config__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z ? _uniform_server_config__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z.routeRevalidateInterval : undefined;
};


/***/ }),

/***/ 10920:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// NOTE: this file will be replaced at build time with (project root)/uniform.client.config.js (if it exists)
const config = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);


/***/ }),

/***/ 71090:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Jn: () => (/* binding */ getSlotComponents),
/* harmony export */   Xr: () => (/* binding */ getComponent),
/* harmony export */   y: () => (/* binding */ getAllComponents)
/* harmony export */ });
/* harmony import */ var _uniformdev_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95091);

const getAllComponents = (composition)=>{
    const ids = {};
    (0,_uniformdev_canvas__WEBPACK_IMPORTED_MODULE_0__/* .walkComponentTree */ .oO)(composition, (component, ancestors)=>{
        if (component._id) {
            const [self, parent] = ancestors;
            ids[component._id] = {
                parentId: parent === null || parent === void 0 ? void 0 : parent.component._id,
                slot: self === null || self === void 0 ? void 0 : self.parentSlot,
                slotIndex: self === null || self === void 0 ? void 0 : self.parentSlotIndex,
                component
            };
        }
    });
    return ids;
};
const getComponent = (composition, id)=>{
    let result;
    (0,_uniformdev_canvas__WEBPACK_IMPORTED_MODULE_0__/* .walkComponentTree */ .oO)(composition, (component)=>{
        if (component._id === id) {
            result = component;
        }
    });
    return result;
};
const getSlotComponents = ({ components, slot, parentId })=>{
    const slotComponents = [];
    Object.keys(components).forEach((cid)=>{
        if (components[cid].parentId === parentId && components[cid].slot === slot) {
            slotComponents.push({
                ...components[cid],
                id: cid
            });
        }
    });
    // sort by slot index
    slotComponents.sort((a, b)=>{
        if (a.slotIndex === b.slotIndex) {
            return 0;
        }
        if (typeof a.slotIndex === "number" && typeof b.slotIndex === "number") {
            return a.slotIndex - b.slotIndex;
        }
        return 0;
    });
    return slotComponents;
};


/***/ }),

/***/ 33382:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  eA: () => (/* binding */ ComponentDiffType),
  Hg: () => (/* binding */ diff)
});

// UNUSED EXPORTS: isSlotTheSame

// EXTERNAL MODULE: ./node_modules/@uniformdev/canvas/dist/index.mjs
var dist = __webpack_require__(95091);
;// CONCATENATED MODULE: ./node_modules/dequal/dist/index.mjs
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key) {
    for (key of iter.keys()){
        if (dequal(key, tar)) return key;
    }
}
function dequal(foo, bar) {
    var ctor, len, tmp;
    if (foo === bar) return true;
    if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
        if (ctor === Date) return foo.getTime() === bar.getTime();
        if (ctor === RegExp) return foo.toString() === bar.toString();
        if (ctor === Array) {
            if ((len = foo.length) === bar.length) {
                while(len-- && dequal(foo[len], bar[len]));
            }
            return len === -1;
        }
        if (ctor === Set) {
            if (foo.size !== bar.size) {
                return false;
            }
            for (len of foo){
                tmp = len;
                if (tmp && typeof tmp === "object") {
                    tmp = find(bar, tmp);
                    if (!tmp) return false;
                }
                if (!bar.has(tmp)) return false;
            }
            return true;
        }
        if (ctor === Map) {
            if (foo.size !== bar.size) {
                return false;
            }
            for (len of foo){
                tmp = len[0];
                if (tmp && typeof tmp === "object") {
                    tmp = find(bar, tmp);
                    if (!tmp) return false;
                }
                if (!dequal(len[1], bar.get(tmp))) {
                    return false;
                }
            }
            return true;
        }
        if (ctor === ArrayBuffer) {
            foo = new Uint8Array(foo);
            bar = new Uint8Array(bar);
        } else if (ctor === DataView) {
            if ((len = foo.byteLength) === bar.byteLength) {
                while(len-- && foo.getInt8(len) === bar.getInt8(len));
            }
            return len === -1;
        }
        if (ArrayBuffer.isView(foo)) {
            if ((len = foo.byteLength) === bar.byteLength) {
                while(len-- && foo[len] === bar[len]);
            }
            return len === -1;
        }
        if (!ctor || typeof foo === "object") {
            len = 0;
            for(ctor in foo){
                if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
                if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
            }
            return Object.keys(bar).length === len;
        }
    }
    return foo !== foo && bar !== bar;
}

// EXTERNAL MODULE: ./node_modules/@uniformdev/canvas-next-rsc/dist/utils/comp.js
var comp = __webpack_require__(71090);
;// CONCATENATED MODULE: ./node_modules/@uniformdev/canvas-next-rsc/dist/utils/diff.js



var ComponentDiffType;
(function(ComponentDiffType) {
    ComponentDiffType["ComponentRemoved"] = "cr";
    ComponentDiffType["ComponentAdded"] = "ca";
    ComponentDiffType["ComponentMoved"] = "cm";
    ComponentDiffType["ParameterChanged"] = "pc";
    ComponentDiffType["ParameterRemoved"] = "pr";
})(ComponentDiffType || (ComponentDiffType = {}));
const diff = (existingComposition, composition)=>{
    const entries = [];
    const existingComponents = (0,comp/* getAllComponents */.y)(existingComposition);
    const newComponents = (0,comp/* getAllComponents */.y)(composition);
    // check all of the existing components, see if they still exist
    for(const id in existingComponents){
        if (!newComponents[id]) {
            entries.push({
                type: ComponentDiffType.ComponentRemoved,
                id
            });
        }
    }
    // check all of the components in the new composition, see if they are new
    for(const id in newComponents){
        if (!existingComponents[id]) {
            const reference = newComponents[id];
            const { slots, ...rest } = reference.component;
            entries.push({
                ...reference,
                type: ComponentDiffType.ComponentAdded,
                id,
                component: {
                    ...rest
                }
            });
        }
    }
    // check all of the components in the new composition, see if they have moved
    // to save space, only record properties that have changed
    for(const id in newComponents){
        const existingComponent = existingComponents[id];
        if (existingComponent) {
            const component = newComponents[id];
            let changedSlot;
            let changedSlotIndex;
            let changedParentId;
            if ((existingComponent === null || existingComponent === void 0 ? void 0 : existingComponent.slot) !== component.slot) {
                changedSlot = component.slot;
            }
            if ((existingComponent === null || existingComponent === void 0 ? void 0 : existingComponent.slotIndex) !== component.slotIndex) {
                changedSlotIndex = component.slotIndex;
            }
            if ((existingComponent === null || existingComponent === void 0 ? void 0 : existingComponent.parentId) !== component.parentId) {
                changedParentId = component.parentId;
            }
            const hasNotableChange = changedSlot || typeof changedSlotIndex !== "undefined" || changedParentId;
            if (hasNotableChange && !isSlotTheSame({
                existingComposition: existingComponents,
                components: newComponents,
                parentId: component.parentId,
                slot: component.slot
            })) {
                entries.push({
                    type: ComponentDiffType.ComponentMoved,
                    id,
                    parentId: changedParentId,
                    slot: changedSlot,
                    slotIndex: changedSlotIndex
                });
            }
        }
    }
    // walk the tree and look at parameters
    (0,dist/* walkComponentTree */.oO)(composition, (component)=>{
        var _a, _b, _c, _d;
        const existingComponent = (0,comp/* getComponent */.Xr)(existingComposition, component._id);
        const wasAdded = entries.find((e)=>e.type === ComponentDiffType.ComponentAdded && e.id === component._id);
        if (!wasAdded) {
            // check all of our new parameters
            if (component.parameters) {
                for(const key in component.parameters){
                    // does the value match?
                    const existingValue = (_b = (_a = existingComponent === null || existingComponent === void 0 ? void 0 : existingComponent.parameters) === null || _a === void 0 ? void 0 : _a[key]) === null || _b === void 0 ? void 0 : _b.value;
                    const newValue = (_c = component.parameters[key]) === null || _c === void 0 ? void 0 : _c.value;
                    const areBothFalsey = !existingValue && !newValue;
                    if (!areBothFalsey && dequal(existingValue, newValue) === false) {
                        entries.push({
                            type: ComponentDiffType.ParameterChanged,
                            componentId: component._id,
                            parameterName: key,
                            value: component.parameters[key].value
                        });
                    }
                }
            }
            // check all of the old parameters, see if they have been removed
            if (existingComponent === null || existingComponent === void 0 ? void 0 : existingComponent.parameters) {
                for(const key in existingComponent.parameters){
                    if (typeof ((_d = component.parameters) === null || _d === void 0 ? void 0 : _d[key]) === "undefined") {
                        entries.push({
                            type: ComponentDiffType.ParameterRemoved,
                            componentId: component._id,
                            parameterName: key
                        });
                    }
                }
            }
        }
    });
    return entries;
};
const isSlotTheSame = ({ existingComposition, components, slot, parentId })=>{
    const existingSlot = (0,comp/* getSlotComponents */.Jn)({
        components: existingComposition,
        slot,
        parentId
    });
    const newSlot = (0,comp/* getSlotComponents */.Jn)({
        components,
        slot,
        parentId
    });
    if (newSlot.length > existingSlot.length) {
        return false;
    }
    const newSlotIds = newSlot.map((c)=>c.id);
    const existingSlotIds = existingSlot.map((c)=>c.id);
    // just pretend the base existing slot is the new slot
    // and we will check the order of components against this pretend slot
    // if its different, then something moved inside the slot, otherwise
    // any other changes should be handled by add / remove ops
    const pretendExistingSlotIds = existingSlotIds.filter((c)=>newSlotIds.includes(c));
    for(let i = 0; i < newSlotIds.length; i++){
        const newComponent = newSlotIds[i];
        const existingComponent = pretendExistingSlotIds === null || pretendExistingSlotIds === void 0 ? void 0 : pretendExistingSlotIds[i];
        if (newComponent !== existingComponent) {
            return false;
        }
    }
    return true;
};


/***/ }),

/***/ 48239:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OG: () => (/* binding */ isOnVercelPreviewEnvironment),
/* harmony export */   Rh: () => (/* binding */ isIncontextEditingEnabled),
/* harmony export */   S1: () => (/* binding */ isDraftModeEnabled),
/* harmony export */   vf: () => (/* binding */ isDevelopmentEnvironment)
/* harmony export */ });
/* harmony import */ var _uniformdev_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95091);
/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40063);
/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_headers__WEBPACK_IMPORTED_MODULE_0__);


const isDraftModeEnabled = ({ searchParams })=>{
    // workaround for this https://github.com/vercel/next.js/issues/49927, as draftMode() is not working in dev mode
    // so we just need to check if the query string contains the IN_CONTEXT_EDITOR_QUERY_STRING_PARAM blindly
    if (isDevelopmentEnvironment()) {
        return isIncontextEditingEnabled({
            searchParams
        });
    }
    return (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.draftMode)().isEnabled;
};
const isIncontextEditingEnabled = ({ searchParams })=>{
    // workaround for this https://github.com/vercel/next.js/issues/49927, as draftMode() is not working in dev mode
    // so we just need to check if the query string contains the IN_CONTEXT_EDITOR_QUERY_STRING_PARAM blindly
    if (isDevelopmentEnvironment() || (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.draftMode)().isEnabled) {
        const containsKey = typeof (searchParams === null || searchParams === void 0 ? void 0 : searchParams[_uniformdev_canvas__WEBPACK_IMPORTED_MODULE_1__/* .IN_CONTEXT_EDITOR_QUERY_STRING_PARAM */ .pt]) !== "undefined";
        return containsKey;
    }
    return false;
};
const isOnVercelPreviewEnvironment = ()=>{
    return process.env.VERCEL_ENV === "preview";
};
const isDevelopmentEnvironment = ()=>{
    return "production" === "development";
};


/***/ }),

/***/ 62943:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ buildPathTag),
/* harmony export */   h: () => (/* binding */ buildCompositionTag)
/* harmony export */ });
const buildPathTag = (path)=>{
    const actualPath = path.startsWith("/") ? path : `/${path}`;
    return `path:${actualPath}`.toLowerCase();
};
const buildCompositionTag = (compositionId)=>{
    return `composition:${compositionId}`.toLowerCase();
};


/***/ }),

/***/ 76555:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ getBaseUrl)
/* harmony export */ });
function getBaseUrl() {
    var _a;
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.RENDER_INTERNAL_HOSTNAME) {
        return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
    }
    return `http://localhost:${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000}`;
}


/***/ }),

/***/ 61363:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* eslint-disable import/no-extraneous-dependencies */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createProxy", ({
    enumerable: true,
    get: function() {
        return createProxy;
    }
}));
const _serveredge = __webpack_require__(89642);
const createProxy = _serveredge.createClientModuleProxy; //# sourceMappingURL=module-proxy.js.map


/***/ }),

/***/ 12271:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "bailoutToClientRendering", ({
    enumerable: true,
    get: function() {
        return bailoutToClientRendering;
    }
}));
const _dynamicnossr = __webpack_require__(5070);
const _staticgenerationasyncstorage = __webpack_require__(13539);
function bailoutToClientRendering() {
    const staticGenerationStore = _staticgenerationasyncstorage.staticGenerationAsyncStorage.getStore();
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.forceStatic) {
        return true;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.isStaticGeneration) {
        (0, _dynamicnossr.suspense)();
    }
    return false;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=bailout-to-client-rendering.js.map


/***/ }),

/***/ 84713:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "clientHookInServerComponentError", ({
    enumerable: true,
    get: function() {
        return clientHookInServerComponentError;
    }
}));
const _interop_require_default = __webpack_require__(73297);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(62947));
function clientHookInServerComponentError(hookName) {
    if (false) {}
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=client-hook-in-server-component-error.js.map


/***/ }),

/***/ 67158:
/***/ ((module, exports, __webpack_require__) => {

// useLayoutSegments() // Only the segments for the current place. ['children', 'dashboard', 'children', 'integrations'] -> /dashboard/integrations (/dashboard/layout.js would get ['children', 'dashboard', 'children', 'integrations'])

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return ReadonlyURLSearchParams;
    },
    useSearchParams: function() {
        return useSearchParams;
    },
    usePathname: function() {
        return usePathname;
    },
    ServerInsertedHTMLContext: function() {
        return _serverinsertedhtml.ServerInsertedHTMLContext;
    },
    useServerInsertedHTML: function() {
        return _serverinsertedhtml.useServerInsertedHTML;
    },
    useRouter: function() {
        return useRouter;
    },
    useParams: function() {
        return useParams;
    },
    useSelectedLayoutSegments: function() {
        return useSelectedLayoutSegments;
    },
    useSelectedLayoutSegment: function() {
        return useSelectedLayoutSegment;
    },
    redirect: function() {
        return _redirect.redirect;
    },
    notFound: function() {
        return _notfound.notFound;
    }
});
const _react = __webpack_require__(62947);
const _approutercontext = __webpack_require__(26021);
const _hooksclientcontext = __webpack_require__(64629);
const _clienthookinservercomponenterror = __webpack_require__(84713);
const _getsegmentvalue = __webpack_require__(85891);
const _serverinsertedhtml = __webpack_require__(99107);
const _redirect = __webpack_require__(75287);
const _notfound = __webpack_require__(92241);
const INTERNAL_URLSEARCHPARAMS_INSTANCE = Symbol("internal for urlsearchparams readonly");
function readonlyURLSearchParamsError() {
    return new Error("ReadonlyURLSearchParams cannot be modified");
}
class ReadonlyURLSearchParams {
    [Symbol.iterator]() {
        return this[INTERNAL_URLSEARCHPARAMS_INSTANCE][Symbol.iterator]();
    }
    append() {
        throw readonlyURLSearchParamsError();
    }
    delete() {
        throw readonlyURLSearchParamsError();
    }
    set() {
        throw readonlyURLSearchParamsError();
    }
    sort() {
        throw readonlyURLSearchParamsError();
    }
    constructor(urlSearchParams){
        this[INTERNAL_URLSEARCHPARAMS_INSTANCE] = urlSearchParams;
        this.entries = urlSearchParams.entries.bind(urlSearchParams);
        this.forEach = urlSearchParams.forEach.bind(urlSearchParams);
        this.get = urlSearchParams.get.bind(urlSearchParams);
        this.getAll = urlSearchParams.getAll.bind(urlSearchParams);
        this.has = urlSearchParams.has.bind(urlSearchParams);
        this.keys = urlSearchParams.keys.bind(urlSearchParams);
        this.values = urlSearchParams.values.bind(urlSearchParams);
        this.toString = urlSearchParams.toString.bind(urlSearchParams);
        this.size = urlSearchParams.size;
    }
}
function useSearchParams() {
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useSearchParams");
    const searchParams = (0, _react.useContext)(_hooksclientcontext.SearchParamsContext);
    // In the case where this is `null`, the compat types added in
    // `next-env.d.ts` will add a new overload that changes the return type to
    // include `null`.
    const readonlySearchParams = (0, _react.useMemo)(()=>{
        if (!searchParams) {
            // When the router is not ready in pages, we won't have the search params
            // available.
            return null;
        }
        return new ReadonlyURLSearchParams(searchParams);
    }, [
        searchParams
    ]);
    if (true) {
        // AsyncLocalStorage should not be included in the client bundle.
        const { bailoutToClientRendering } = __webpack_require__(12271);
        if (bailoutToClientRendering()) {
            // TODO-APP: handle dynamic = 'force-static' here and on the client
            return readonlySearchParams;
        }
    }
    return readonlySearchParams;
}
function usePathname() {
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("usePathname");
    // In the case where this is `null`, the compat types added in `next-env.d.ts`
    // will add a new overload that changes the return type to include `null`.
    return (0, _react.useContext)(_hooksclientcontext.PathnameContext);
}
function useRouter() {
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useRouter");
    const router = (0, _react.useContext)(_approutercontext.AppRouterContext);
    if (router === null) {
        throw new Error("invariant expected app router to be mounted");
    }
    return router;
}
// this function performs a depth-first search of the tree to find the selected
// params
function getSelectedParams(tree, params) {
    if (params === void 0) params = {};
    const parallelRoutes = tree[1];
    for (const parallelRoute of Object.values(parallelRoutes)){
        const segment = parallelRoute[0];
        const isDynamicParameter = Array.isArray(segment);
        const segmentValue = isDynamicParameter ? segment[1] : segment;
        if (!segmentValue || segmentValue.startsWith("__PAGE__")) continue;
        // Ensure catchAll and optional catchall are turned into an array
        const isCatchAll = isDynamicParameter && (segment[2] === "c" || segment[2] === "oc");
        if (isCatchAll) {
            params[segment[0]] = segment[1].split("/");
        } else if (isDynamicParameter) {
            params[segment[0]] = segment[1];
        }
        params = getSelectedParams(parallelRoute, params);
    }
    return params;
}
function useParams() {
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useParams");
    const globalLayoutRouterContext = (0, _react.useContext)(_approutercontext.GlobalLayoutRouterContext);
    if (!globalLayoutRouterContext) {
        // This only happens in `pages`. Type is overwritten in navigation.d.ts
        return null;
    }
    return getSelectedParams(globalLayoutRouterContext.tree);
}
// TODO-APP: handle parallel routes
/**
 * Get the canonical parameters from the current level to the leaf node.
 */ function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first, segmentPath) {
    if (first === void 0) first = true;
    if (segmentPath === void 0) segmentPath = [];
    let node;
    if (first) {
        // Use the provided parallel route key on the first parallel route
        node = tree[1][parallelRouteKey];
    } else {
        // After first parallel route prefer children, if there's no children pick the first parallel route.
        const parallelRoutes = tree[1];
        var _parallelRoutes_children;
        node = (_parallelRoutes_children = parallelRoutes.children) != null ? _parallelRoutes_children : Object.values(parallelRoutes)[0];
    }
    if (!node) return segmentPath;
    const segment = node[0];
    const segmentValue = (0, _getsegmentvalue.getSegmentValue)(segment);
    if (!segmentValue || segmentValue.startsWith("__PAGE__")) return segmentPath;
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
}
function useSelectedLayoutSegments(parallelRouteKey) {
    if (parallelRouteKey === void 0) parallelRouteKey = "children";
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useSelectedLayoutSegments");
    const { tree } = (0, _react.useContext)(_approutercontext.LayoutRouterContext);
    return getSelectedLayoutSegmentPath(tree, parallelRouteKey);
}
function useSelectedLayoutSegment(parallelRouteKey) {
    if (parallelRouteKey === void 0) parallelRouteKey = "children";
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useSelectedLayoutSegment");
    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
    if (selectedLayoutSegments.length === 0) {
        return null;
    }
    return selectedLayoutSegments[0];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.js.map


/***/ }),

/***/ 85891:
/***/ ((module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getSegmentValue", ({
    enumerable: true,
    get: function() {
        return getSegmentValue;
    }
}));
function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-segment-value.js.map


/***/ }),

/***/ 15153:
/***/ ((__unused_webpack_module, exports) => {

/**
 * @license React
 * react-dom-server-rendering-stub.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
var d = {
    usingClientEntryPoint: !1,
    Events: null,
    Dispatcher: {
        current: null
    }
};
function e(b) {
    for(var a = "https://reactjs.org/docs/error-decoder.html?invariant=" + b, c = 1; c < arguments.length; c++)a += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + b + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var f = d.Dispatcher;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = d;
exports.createPortal = function() {
    throw Error(e(448));
};
exports.experimental_useFormStatus = function() {
    throw Error(e(248));
};
exports.flushSync = function() {
    throw Error(e(449));
};
exports.preconnect = function(b, a) {
    var c = f.current;
    c && c.preconnect(b, a);
};
exports.prefetchDNS = function(b) {
    var a = f.current;
    a && a.prefetchDNS(b);
};
exports.preinit = function(b, a) {
    var c = f.current;
    c && c.preinit(b, a);
};
exports.preload = function(b, a) {
    var c = f.current;
    c && c.preload(b, a);
};
exports.unstable_batchedUpdates = function(b, a) {
    return b(a);
};
exports.version = "18.3.0-canary-1a001dac6-20230812";


/***/ }),

/***/ 52060:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


if (true) {
    module.exports = __webpack_require__(15153);
} else {}


/***/ }),

/***/ 19200:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @license React
 * react-server-dom-webpack-server.edge.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
var aa = __webpack_require__(62947), ba = __webpack_require__(52060), l = null, m = 0;
function n(a, b) {
    if (0 !== b.byteLength) if (512 < b.byteLength) 0 < m && (a.enqueue(new Uint8Array(l.buffer, 0, m)), l = new Uint8Array(512), m = 0), a.enqueue(b);
    else {
        var d = l.length - m;
        d < b.byteLength && (0 === d ? a.enqueue(l) : (l.set(b.subarray(0, d), m), a.enqueue(l), b = b.subarray(d)), l = new Uint8Array(512), m = 0);
        l.set(b, m);
        m += b.byteLength;
    }
    return !0;
}
var p = new TextEncoder;
function ca(a, b) {
    "function" === typeof a.error ? a.error(b) : a.close();
}
var q = Symbol.for("react.client.reference"), t = Symbol.for("react.server.reference");
function u(a, b, d) {
    return Object.defineProperties(a, {
        $$typeof: {
            value: q
        },
        $$id: {
            value: b
        },
        $$async: {
            value: d
        }
    });
}
var da = Function.prototype.bind, ea = Array.prototype.slice;
function fa() {
    var a = da.apply(this, arguments);
    if (this.$$typeof === t) {
        var b = ea.call(arguments, 1);
        a.$$typeof = t;
        a.$$id = this.$$id;
        a.$$bound = this.$$bound ? this.$$bound.concat(b) : b;
    }
    return a;
}
var ha = Promise.prototype, ia = {
    get: function(a, b) {
        switch(b){
            case "$$typeof":
                return a.$$typeof;
            case "$$id":
                return a.$$id;
            case "$$async":
                return a.$$async;
            case "name":
                return a.name;
            case "displayName":
                return;
            case "defaultProps":
                return;
            case "toJSON":
                return;
            case Symbol.toPrimitive:
                return Object.prototype[Symbol.toPrimitive];
            case "Provider":
                throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
        }
        throw Error("Cannot access " + (String(a.name) + "." + String(b)) + " on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.");
    },
    set: function() {
        throw Error("Cannot assign to a client module from a server module.");
    }
}, ja = {
    get: function(a, b) {
        switch(b){
            case "$$typeof":
                return a.$$typeof;
            case "$$id":
                return a.$$id;
            case "$$async":
                return a.$$async;
            case "name":
                return a.name;
            case "defaultProps":
                return;
            case "toJSON":
                return;
            case Symbol.toPrimitive:
                return Object.prototype[Symbol.toPrimitive];
            case "__esModule":
                var d = a.$$id;
                a.default = u(function() {
                    throw Error("Attempted to call the default export of " + d + " from the server but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                }, a.$$id + "#", a.$$async);
                return !0;
            case "then":
                if (a.then) return a.then;
                if (a.$$async) return;
                var c = u({}, a.$$id, !0), e = new Proxy(c, ja);
                a.status = "fulfilled";
                a.value = e;
                return a.then = u(function(f) {
                    return Promise.resolve(f(e));
                }, a.$$id + "#then", !1);
        }
        c = a[b];
        c || (c = u(function() {
            throw Error("Attempted to call " + String(b) + "() from the server but " + String(b) + " is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
        }, a.$$id + "#" + b, a.$$async), Object.defineProperty(c, "name", {
            value: b
        }), c = a[b] = new Proxy(c, ia));
        return c;
    },
    getPrototypeOf: function() {
        return ha;
    },
    set: function() {
        throw Error("Cannot assign to a client module from a server module.");
    }
}, pa = {
    prefetchDNS: ka,
    preconnect: la,
    preload: ma,
    preinit: na
};
function ka(a, b) {
    if ("string" === typeof a) {
        var d = v();
        if (d) {
            var c = d.hints, e = "D" + a;
            c.has(e) || (c.add(e), b ? w(d, "D", [
                a,
                b
            ]) : w(d, "D", a), x(d));
        }
    }
}
function la(a, b) {
    if ("string" === typeof a) {
        var d = v();
        if (d) {
            var c = d.hints, e = null == b || "string" !== typeof b.crossOrigin ? null : "use-credentials" === b.crossOrigin ? "use-credentials" : "";
            e = "C" + (null === e ? "null" : e) + "|" + a;
            c.has(e) || (c.add(e), b ? w(d, "C", [
                a,
                b
            ]) : w(d, "C", a), x(d));
        }
    }
}
function ma(a, b) {
    if ("string" === typeof a) {
        var d = v();
        if (d) {
            var c = d.hints, e = "L" + a;
            c.has(e) || (c.add(e), w(d, "L", [
                a,
                b
            ]), x(d));
        }
    }
}
function na(a, b) {
    if ("string" === typeof a) {
        var d = v();
        if (d) {
            var c = d.hints, e = "I" + a;
            c.has(e) || (c.add(e), w(d, "I", [
                a,
                b
            ]), x(d));
        }
    }
}
var qa = ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Dispatcher, ra = "function" === typeof AsyncLocalStorage, sa = ra ? new AsyncLocalStorage : null, C = Symbol.for("react.element"), ta = Symbol.for("react.fragment"), ua = Symbol.for("react.provider"), va = Symbol.for("react.server_context"), wa = Symbol.for("react.forward_ref"), xa = Symbol.for("react.suspense"), ya = Symbol.for("react.suspense_list"), za = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), Aa = Symbol.for("react.default_value"), Ba = Symbol.for("react.memo_cache_sentinel"), Ca = Symbol.iterator, E = null;
function F(a, b) {
    if (a !== b) {
        a.context._currentValue = a.parentValue;
        a = a.parent;
        var d = b.parent;
        if (null === a) {
            if (null !== d) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
        } else {
            if (null === d) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
            F(a, d);
            b.context._currentValue = b.value;
        }
    }
}
function Da(a) {
    a.context._currentValue = a.parentValue;
    a = a.parent;
    null !== a && Da(a);
}
function Ea(a) {
    var b = a.parent;
    null !== b && Ea(b);
    a.context._currentValue = a.value;
}
function Fa(a, b) {
    a.context._currentValue = a.parentValue;
    a = a.parent;
    if (null === a) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    a.depth === b.depth ? F(a, b) : Fa(a, b);
}
function Ga(a, b) {
    var d = b.parent;
    if (null === d) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    a.depth === d.depth ? F(a, d) : Ga(a, d);
    b.context._currentValue = b.value;
}
function Ha(a) {
    var b = E;
    b !== a && (null === b ? Ea(a) : null === a ? Da(b) : b.depth === a.depth ? F(b, a) : b.depth > a.depth ? Fa(b, a) : Ga(b, a), E = a);
}
function Ia(a, b) {
    var d = a._currentValue;
    a._currentValue = b;
    var c = E;
    return E = a = {
        parent: c,
        depth: null === c ? 0 : c.depth + 1,
        context: a,
        parentValue: d,
        value: b
    };
}
var Ja = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`");
function Ka() {}
function La(a, b, d) {
    d = a[d];
    void 0 === d ? a.push(b) : d !== b && (b.then(Ka, Ka), b = d);
    switch(b.status){
        case "fulfilled":
            return b.value;
        case "rejected":
            throw b.reason;
        default:
            if ("string" !== typeof b.status) switch(a = b, a.status = "pending", a.then(function(c) {
                if ("pending" === b.status) {
                    var e = b;
                    e.status = "fulfilled";
                    e.value = c;
                }
            }, function(c) {
                if ("pending" === b.status) {
                    var e = b;
                    e.status = "rejected";
                    e.reason = c;
                }
            }), b.status){
                case "fulfilled":
                    return b.value;
                case "rejected":
                    throw b.reason;
            }
            G = b;
            throw Ja;
    }
}
var G = null;
function Ma() {
    if (null === G) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
    var a = G;
    G = null;
    return a;
}
var H = null, I = 0, J = null;
function Na() {
    var a = J;
    J = null;
    return a;
}
function Oa(a) {
    return a._currentValue;
}
var Sa = {
    useMemo: function(a) {
        return a();
    },
    useCallback: function(a) {
        return a;
    },
    useDebugValue: function() {},
    useDeferredValue: K,
    useTransition: K,
    readContext: Oa,
    useContext: Oa,
    useReducer: K,
    useRef: K,
    useState: K,
    useInsertionEffect: K,
    useLayoutEffect: K,
    useImperativeHandle: K,
    useEffect: K,
    useId: Pa,
    useSyncExternalStore: K,
    useCacheRefresh: function() {
        return Qa;
    },
    useMemoCache: function(a) {
        for(var b = Array(a), d = 0; d < a; d++)b[d] = Ba;
        return b;
    },
    use: Ra
};
function K() {
    throw Error("This Hook is not supported in Server Components.");
}
function Qa() {
    throw Error("Refreshing the cache is not supported in Server Components.");
}
function Pa() {
    if (null === H) throw Error("useId can only be used while React is rendering");
    var a = H.identifierCount++;
    return ":" + H.identifierPrefix + "S" + a.toString(32) + ":";
}
function Ra(a) {
    if (null !== a && "object" === typeof a || "function" === typeof a) {
        if ("function" === typeof a.then) {
            var b = I;
            I += 1;
            null === J && (J = []);
            return La(J, a, b);
        }
        if (a.$$typeof === va) return a._currentValue;
    }
    throw Error("An unsupported type was passed to use(): " + String(a));
}
function Ta() {
    return (new AbortController).signal;
}
function Ua() {
    var a = v();
    return a ? a.cache : new Map;
}
var Va = {
    getCacheSignal: function() {
        var a = Ua(), b = a.get(Ta);
        void 0 === b && (b = Ta(), a.set(Ta, b));
        return b;
    },
    getCacheForType: function(a) {
        var b = Ua(), d = b.get(a);
        void 0 === d && (d = a(), b.set(a, d));
        return d;
    }
}, Wa = Array.isArray;
function Xa(a) {
    return Object.prototype.toString.call(a).replace(/^\[object (.*)\]$/, function(b, d) {
        return d;
    });
}
function Ya(a) {
    switch(typeof a){
        case "string":
            return JSON.stringify(10 >= a.length ? a : a.slice(0, 10) + "...");
        case "object":
            if (Wa(a)) return "[...]";
            a = Xa(a);
            return "Object" === a ? "{...}" : a;
        case "function":
            return "function";
        default:
            return String(a);
    }
}
function L(a) {
    if ("string" === typeof a) return a;
    switch(a){
        case xa:
            return "Suspense";
        case ya:
            return "SuspenseList";
    }
    if ("object" === typeof a) switch(a.$$typeof){
        case wa:
            return L(a.render);
        case za:
            return L(a.type);
        case D:
            var b = a._payload;
            a = a._init;
            try {
                return L(a(b));
            } catch (d) {}
    }
    return "";
}
function M(a, b) {
    var d = Xa(a);
    if ("Object" !== d && "Array" !== d) return d;
    d = -1;
    var c = 0;
    if (Wa(a)) {
        var e = "[";
        for(var f = 0; f < a.length; f++){
            0 < f && (e += ", ");
            var g = a[f];
            g = "object" === typeof g && null !== g ? M(g) : Ya(g);
            "" + f === b ? (d = e.length, c = g.length, e += g) : e = 10 > g.length && 40 > e.length + g.length ? e + g : e + "...";
        }
        e += "]";
    } else if (a.$$typeof === C) e = "<" + L(a.type) + "/>";
    else {
        e = "{";
        f = Object.keys(a);
        for(g = 0; g < f.length; g++){
            0 < g && (e += ", ");
            var k = f[g], h = JSON.stringify(k);
            e += ('"' + k + '"' === h ? k : h) + ": ";
            h = a[k];
            h = "object" === typeof h && null !== h ? M(h) : Ya(h);
            k === b ? (d = e.length, c = h.length, e += h) : e = 10 > h.length && 40 > e.length + h.length ? e + h : e + "...";
        }
        e += "}";
    }
    return void 0 === b ? e : -1 < d && 0 < c ? (a = " ".repeat(d) + "^".repeat(c), "\n  " + e + "\n  " + a) : "\n  " + e;
}
var Za = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, $a = Za.ContextRegistry, N = JSON.stringify, ab = Za.ReactCurrentDispatcher, bb = Za.ReactCurrentCache;
function cb(a) {
    console.error(a);
}
function db(a, b, d, c, e) {
    if (null !== bb.current && bb.current !== Va) throw Error("Currently React only supports one RSC renderer at a time.");
    qa.current = pa;
    bb.current = Va;
    var f = new Set, g = [], k = new Set, h = {
        status: 0,
        flushScheduled: !1,
        fatalError: null,
        destination: null,
        bundlerConfig: b,
        cache: new Map,
        nextChunkId: 0,
        pendingChunks: 0,
        hints: k,
        abortableTasks: f,
        pingedTasks: g,
        completedImportChunks: [],
        completedHintChunks: [],
        completedRegularChunks: [],
        completedErrorChunks: [],
        writtenSymbols: new Map,
        writtenClientReferences: new Map,
        writtenServerReferences: new Map,
        writtenProviders: new Map,
        identifierPrefix: e || "",
        identifierCount: 1,
        onError: void 0 === d ? cb : d,
        toJSON: function(r, y) {
            return eb(h, this, r, y);
        }
    };
    h.pendingChunks++;
    b = fb(c);
    a = gb(h, a, b, f);
    g.push(a);
    return h;
}
var O = null;
function v() {
    if (O) return O;
    if (ra) {
        var a = sa.getStore();
        if (a) return a;
    }
    return null;
}
var hb = {};
function ib(a, b) {
    a.pendingChunks++;
    var d = gb(a, null, E, a.abortableTasks);
    switch(b.status){
        case "fulfilled":
            return d.model = b.value, jb(a, d), d.id;
        case "rejected":
            var c = P(a, b.reason);
            Q(a, d.id, c);
            return d.id;
        default:
            "string" !== typeof b.status && (b.status = "pending", b.then(function(e) {
                "pending" === b.status && (b.status = "fulfilled", b.value = e);
            }, function(e) {
                "pending" === b.status && (b.status = "rejected", b.reason = e);
            }));
    }
    b.then(function(e) {
        d.model = e;
        jb(a, d);
    }, function(e) {
        d.status = 4;
        e = P(a, e);
        Q(a, d.id, e);
        null !== a.destination && R(a, a.destination);
    });
    return d.id;
}
function kb(a) {
    if ("fulfilled" === a.status) return a.value;
    if ("rejected" === a.status) throw a.reason;
    throw a;
}
function lb(a) {
    switch(a.status){
        case "fulfilled":
        case "rejected":
            break;
        default:
            "string" !== typeof a.status && (a.status = "pending", a.then(function(b) {
                "pending" === a.status && (a.status = "fulfilled", a.value = b);
            }, function(b) {
                "pending" === a.status && (a.status = "rejected", a.reason = b);
            }));
    }
    return {
        $$typeof: D,
        _payload: a,
        _init: kb
    };
}
function S(a, b, d, c, e, f) {
    if (null !== c && void 0 !== c) throw Error("Refs cannot be used in Server Components, nor passed to Client Components.");
    if ("function" === typeof b) {
        if (b.$$typeof === q) return [
            C,
            b,
            d,
            e
        ];
        I = 0;
        J = f;
        e = b(e);
        return "object" === typeof e && null !== e && "function" === typeof e.then ? "fulfilled" === e.status ? e.value : lb(e) : e;
    }
    if ("string" === typeof b) return [
        C,
        b,
        d,
        e
    ];
    if ("symbol" === typeof b) return b === ta ? e.children : [
        C,
        b,
        d,
        e
    ];
    if (null != b && "object" === typeof b) {
        if (b.$$typeof === q) return [
            C,
            b,
            d,
            e
        ];
        switch(b.$$typeof){
            case D:
                var g = b._init;
                b = g(b._payload);
                return S(a, b, d, c, e, f);
            case wa:
                return a = b.render, I = 0, J = f, a(e, void 0);
            case za:
                return S(a, b.type, d, c, e, f);
            case ua:
                return Ia(b._context, e.value), [
                    C,
                    b,
                    d,
                    {
                        value: e.value,
                        children: e.children,
                        __pop: hb
                    }
                ];
        }
    }
    throw Error("Unsupported Server Component type: " + Ya(b));
}
function jb(a, b) {
    var d = a.pingedTasks;
    d.push(b);
    1 === d.length && (a.flushScheduled = null !== a.destination, setTimeout(function() {
        return mb(a);
    }, 0));
}
function gb(a, b, d, c) {
    var e = {
        id: a.nextChunkId++,
        status: 0,
        model: b,
        context: d,
        ping: function() {
            return jb(a, e);
        },
        thenableState: null
    };
    c.add(e);
    return e;
}
function T(a) {
    return "$" + a.toString(16);
}
function nb(a, b, d, c) {
    var e = c.$$async ? c.$$id + "#async" : c.$$id, f = a.writtenClientReferences, g = f.get(e);
    if (void 0 !== g) return b[0] === C && "1" === d ? "$L" + g.toString(16) : T(g);
    try {
        var k = a.bundlerConfig, h = c.$$id;
        g = "";
        var r = k[h];
        if (r) g = r.name;
        else {
            var y = h.lastIndexOf("#");
            -1 !== y && (g = h.slice(y + 1), r = k[h.slice(0, y)]);
            if (!r) throw Error('Could not find the module "' + h + '" in the React Client Manifest. This is probably a bug in the React Server Components bundler.');
        }
        var z = {
            id: r.id,
            chunks: r.chunks,
            name: g,
            async: !!c.$$async
        };
        a.pendingChunks++;
        var A = a.nextChunkId++, oa = N(z), B = A.toString(16) + ":I" + oa + "\n";
        var Fb = p.encode(B);
        a.completedImportChunks.push(Fb);
        f.set(e, A);
        return b[0] === C && "1" === d ? "$L" + A.toString(16) : T(A);
    } catch (Gb) {
        return a.pendingChunks++, b = a.nextChunkId++, d = P(a, Gb), Q(a, b, d), T(b);
    }
}
function ob(a, b) {
    a.pendingChunks++;
    var d = a.nextChunkId++;
    b = pb(a, d, b);
    a.completedRegularChunks.push(b);
    return d;
}
function eb(a, b, d, c) {
    switch(c){
        case C:
            return "$";
    }
    for(; "object" === typeof c && null !== c && (c.$$typeof === C || c.$$typeof === D);)try {
        switch(c.$$typeof){
            case C:
                var e = c;
                c = S(a, e.type, e.key, e.ref, e.props, null);
                break;
            case D:
                var f = c._init;
                c = f(c._payload);
        }
    } catch (g) {
        d = g === Ja ? Ma() : g;
        if ("object" === typeof d && null !== d && "function" === typeof d.then) return a.pendingChunks++, a = gb(a, c, E, a.abortableTasks), c = a.ping, d.then(c, c), a.thenableState = Na(), "$L" + a.id.toString(16);
        a.pendingChunks++;
        c = a.nextChunkId++;
        d = P(a, d);
        Q(a, c, d);
        return "$L" + c.toString(16);
    }
    if (null === c) return null;
    if ("object" === typeof c) {
        if (c.$$typeof === q) return nb(a, b, d, c);
        if ("function" === typeof c.then) return "$@" + ib(a, c).toString(16);
        if (c.$$typeof === ua) return c = c._context._globalName, b = a.writtenProviders, d = b.get(d), void 0 === d && (a.pendingChunks++, d = a.nextChunkId++, b.set(c, d), c = qb(a, d, "$P" + c), a.completedRegularChunks.push(c)), T(d);
        if (c === hb) {
            a = E;
            if (null === a) throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
            c = a.parentValue;
            a.context._currentValue = c === Aa ? a.context._defaultValue : c;
            E = a.parent;
            return;
        }
        return c instanceof Map ? "$Q" + ob(a, Array.from(c)).toString(16) : c instanceof Set ? "$W" + ob(a, Array.from(c)).toString(16) : !Wa(c) && (null === c || "object" !== typeof c ? a = null : (a = Ca && c[Ca] || c["@@iterator"], a = "function" === typeof a ? a : null), a) ? Array.from(c) : c;
    }
    if ("string" === typeof c) {
        if ("Z" === c[c.length - 1] && b[d] instanceof Date) return "$D" + c;
        if (1024 <= c.length) return a.pendingChunks += 2, d = a.nextChunkId++, c = p.encode(c), b = c.byteLength, b = d.toString(16) + ":T" + b.toString(16) + ",", b = p.encode(b), a.completedRegularChunks.push(b, c), T(d);
        a = "$" === c[0] ? "$" + c : c;
        return a;
    }
    if ("boolean" === typeof c) return c;
    if ("number" === typeof c) return a = c, Number.isFinite(a) ? 0 === a && -Infinity === 1 / a ? "$-0" : a : Infinity === a ? "$Infinity" : -Infinity === a ? "$-Infinity" : "$NaN";
    if ("undefined" === typeof c) return "$undefined";
    if ("function" === typeof c) {
        if (c.$$typeof === q) return nb(a, b, d, c);
        if (c.$$typeof === t) return d = a.writtenServerReferences, b = d.get(c), void 0 !== b ? a = "$F" + b.toString(16) : (b = c.$$bound, b = {
            id: c.$$id,
            bound: b ? Promise.resolve(b) : null
        }, a = ob(a, b), d.set(c, a), a = "$F" + a.toString(16)), a;
        if (/^on[A-Z]/.test(d)) throw Error("Event handlers cannot be passed to Client Component props." + M(b, d) + "\nIf you need interactivity, consider converting part of this to a Client Component.");
        throw Error('Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".' + M(b, d));
    }
    if ("symbol" === typeof c) {
        e = a.writtenSymbols;
        f = e.get(c);
        if (void 0 !== f) return T(f);
        f = c.description;
        if (Symbol.for(f) !== c) throw Error("Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + (c.description + ") cannot be found among global symbols.") + M(b, d));
        a.pendingChunks++;
        d = a.nextChunkId++;
        b = qb(a, d, "$S" + f);
        a.completedImportChunks.push(b);
        e.set(c, d);
        return T(d);
    }
    if ("bigint" === typeof c) return "$n" + c.toString(10);
    throw Error("Type " + typeof c + " is not supported in Client Component props." + M(b, d));
}
function P(a, b) {
    a = a.onError;
    b = a(b);
    if (null != b && "string" !== typeof b) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof b + '" instead');
    return b || "";
}
function rb(a, b) {
    null !== a.destination ? (a.status = 2, ca(a.destination, b)) : (a.status = 1, a.fatalError = b);
}
function Q(a, b, d) {
    d = {
        digest: d
    };
    b = b.toString(16) + ":E" + N(d) + "\n";
    b = p.encode(b);
    a.completedErrorChunks.push(b);
}
function w(a, b, d) {
    var c = a.nextChunkId++;
    d = N(d);
    b = "H" + b;
    c = c.toString(16) + ":" + b;
    c = p.encode(c + d + "\n");
    a.completedHintChunks.push(c);
}
function mb(a) {
    var b = ab.current;
    ab.current = Sa;
    var d = O;
    H = O = a;
    try {
        var c = a.pingedTasks;
        a.pingedTasks = [];
        for(var e = 0; e < c.length; e++){
            var f = c[e];
            var g = a;
            if (0 === f.status) {
                Ha(f.context);
                try {
                    var k = f.model;
                    if ("object" === typeof k && null !== k && k.$$typeof === C) {
                        var h = k, r = f.thenableState;
                        f.model = k;
                        k = S(g, h.type, h.key, h.ref, h.props, r);
                        for(f.thenableState = null; "object" === typeof k && null !== k && k.$$typeof === C;)h = k, f.model = k, k = S(g, h.type, h.key, h.ref, h.props, null);
                    }
                    var y = pb(g, f.id, k);
                    g.completedRegularChunks.push(y);
                    g.abortableTasks.delete(f);
                    f.status = 1;
                } catch (B) {
                    var z = B === Ja ? Ma() : B;
                    if ("object" === typeof z && null !== z && "function" === typeof z.then) {
                        var A = f.ping;
                        z.then(A, A);
                        f.thenableState = Na();
                    } else {
                        g.abortableTasks.delete(f);
                        f.status = 4;
                        var oa = P(g, z);
                        Q(g, f.id, oa);
                    }
                }
            }
        }
        null !== a.destination && R(a, a.destination);
    } catch (B) {
        P(a, B), rb(a, B);
    } finally{
        ab.current = b, H = null, O = d;
    }
}
function R(a, b) {
    l = new Uint8Array(512);
    m = 0;
    try {
        for(var d = a.completedImportChunks, c = 0; c < d.length; c++)a.pendingChunks--, n(b, d[c]);
        d.splice(0, c);
        var e = a.completedHintChunks;
        for(c = 0; c < e.length; c++)n(b, e[c]);
        e.splice(0, c);
        var f = a.completedRegularChunks;
        for(c = 0; c < f.length; c++)a.pendingChunks--, n(b, f[c]);
        f.splice(0, c);
        var g = a.completedErrorChunks;
        for(c = 0; c < g.length; c++)a.pendingChunks--, n(b, g[c]);
        g.splice(0, c);
    } finally{
        a.flushScheduled = !1, l && 0 < m && (b.enqueue(new Uint8Array(l.buffer, 0, m)), l = null, m = 0);
    }
    0 === a.pendingChunks && b.close();
}
function sb(a) {
    a.flushScheduled = null !== a.destination;
    ra ? setTimeout(function() {
        return sa.run(a, mb, a);
    }, 0) : setTimeout(function() {
        return mb(a);
    }, 0);
}
function x(a) {
    if (!1 === a.flushScheduled && 0 === a.pingedTasks.length && null !== a.destination) {
        var b = a.destination;
        a.flushScheduled = !0;
        setTimeout(function() {
            return R(a, b);
        }, 0);
    }
}
function tb(a, b) {
    try {
        var d = a.abortableTasks;
        if (0 < d.size) {
            var c = P(a, void 0 === b ? Error("The render was aborted by the server without a reason.") : b);
            a.pendingChunks++;
            var e = a.nextChunkId++;
            Q(a, e, c);
            d.forEach(function(f) {
                f.status = 3;
                var g = T(e);
                f = qb(a, f.id, g);
                a.completedErrorChunks.push(f);
            });
            d.clear();
        }
        null !== a.destination && R(a, a.destination);
    } catch (f) {
        P(a, f), rb(a, f);
    }
}
function fb(a) {
    if (a) {
        var b = E;
        Ha(null);
        for(var d = 0; d < a.length; d++){
            var c = a[d], e = c[0];
            c = c[1];
            $a[e] || ($a[e] = aa.createServerContext(e, Aa));
            Ia($a[e], c);
        }
        a = E;
        Ha(b);
        return a;
    }
    return null;
}
function pb(a, b, d) {
    a = N(d, a.toJSON);
    b = b.toString(16) + ":" + a + "\n";
    return p.encode(b);
}
function qb(a, b, d) {
    a = N(d);
    b = b.toString(16) + ":" + a + "\n";
    return p.encode(b);
}
function ub(a, b) {
    var d = "", c = a[b];
    if (c) d = c.name;
    else {
        var e = b.lastIndexOf("#");
        -1 !== e && (d = b.slice(e + 1), c = a[b.slice(0, e)]);
        if (!c) throw Error('Could not find the module "' + b + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.');
    }
    return {
        id: c.id,
        chunks: c.chunks,
        name: d,
        async: !1
    };
}
var U = new Map;
function vb(a) {
    var b = globalThis.__next_require__(a);
    if ("function" !== typeof b.then || "fulfilled" === b.status) return null;
    b.then(function(d) {
        b.status = "fulfilled";
        b.value = d;
    }, function(d) {
        b.status = "rejected";
        b.reason = d;
    });
    return b;
}
function wb() {}
function xb(a) {
    for(var b = a.chunks, d = [], c = 0; c < b.length; c++){
        var e = b[c], f = U.get(e);
        if (void 0 === f) {
            f = globalThis.__next_chunk_load__(e);
            d.push(f);
            var g = U.set.bind(U, e, null);
            f.then(g, wb);
            U.set(e, f);
        } else null !== f && d.push(f);
    }
    return a.async ? 0 === d.length ? vb(a.id) : Promise.all(d).then(function() {
        return vb(a.id);
    }) : 0 < d.length ? Promise.all(d) : null;
}
function V(a) {
    var b = globalThis.__next_require__(a.id);
    if (a.async && "function" === typeof b.then) if ("fulfilled" === b.status) b = b.value;
    else throw b.reason;
    return "*" === a.name ? b : "" === a.name ? b.__esModule ? b.default : b : b[a.name];
}
function W(a, b, d, c) {
    this.status = a;
    this.value = b;
    this.reason = d;
    this._response = c;
}
W.prototype = Object.create(Promise.prototype);
W.prototype.then = function(a, b) {
    switch(this.status){
        case "resolved_model":
            yb(this);
    }
    switch(this.status){
        case "fulfilled":
            a(this.value);
            break;
        case "pending":
        case "blocked":
            a && (null === this.value && (this.value = []), this.value.push(a));
            b && (null === this.reason && (this.reason = []), this.reason.push(b));
            break;
        default:
            b(this.reason);
    }
};
function zb(a, b) {
    for(var d = 0; d < a.length; d++)(0, a[d])(b);
}
function Ab(a, b) {
    if ("pending" === a.status || "blocked" === a.status) {
        var d = a.reason;
        a.status = "rejected";
        a.reason = b;
        null !== d && zb(d, b);
    }
}
function Bb(a, b, d, c, e, f) {
    var g = ub(a._bundlerConfig, b);
    a = xb(g);
    if (d) d = Promise.all([
        d,
        a
    ]).then(function(k) {
        k = k[0];
        var h = V(g);
        return h.bind.apply(h, [
            null
        ].concat(k));
    });
    else if (a) d = Promise.resolve(a).then(function() {
        return V(g);
    });
    else return V(g);
    d.then(Cb(c, e, f), Db(c));
    return null;
}
var X = null, Y = null;
function yb(a) {
    var b = X, d = Y;
    X = a;
    Y = null;
    try {
        var c = JSON.parse(a.value, a._response._fromJSON);
        null !== Y && 0 < Y.deps ? (Y.value = c, a.status = "blocked", a.value = null, a.reason = null) : (a.status = "fulfilled", a.value = c);
    } catch (e) {
        a.status = "rejected", a.reason = e;
    } finally{
        X = b, Y = d;
    }
}
function Eb(a, b) {
    a._chunks.forEach(function(d) {
        "pending" === d.status && Ab(d, b);
    });
}
function Z(a, b) {
    var d = a._chunks, c = d.get(b);
    c || (c = a._formData.get(a._prefix + b), c = null != c ? new W("resolved_model", c, null, a) : new W("pending", null, null, a), d.set(b, c));
    return c;
}
function Cb(a, b, d) {
    if (Y) {
        var c = Y;
        c.deps++;
    } else c = Y = {
        deps: 1,
        value: null
    };
    return function(e) {
        b[d] = e;
        c.deps--;
        0 === c.deps && "blocked" === a.status && (e = a.value, a.status = "fulfilled", a.value = c.value, null !== e && zb(e, c.value));
    };
}
function Db(a) {
    return function(b) {
        return Ab(a, b);
    };
}
function Hb(a, b) {
    a = Z(a, b);
    "resolved_model" === a.status && yb(a);
    if ("fulfilled" !== a.status) throw a.reason;
    return a.value;
}
function Ib(a, b, d, c) {
    if ("$" === c[0]) switch(c[1]){
        case "$":
            return c.slice(1);
        case "@":
            return b = parseInt(c.slice(2), 16), Z(a, b);
        case "S":
            return Symbol.for(c.slice(2));
        case "F":
            return c = parseInt(c.slice(2), 16), c = Hb(a, c), Bb(a, c.id, c.bound, X, b, d);
        case "Q":
            return b = parseInt(c.slice(2), 16), a = Hb(a, b), new Map(a);
        case "W":
            return b = parseInt(c.slice(2), 16), a = Hb(a, b), new Set(a);
        case "K":
            b = c.slice(2);
            var e = a._prefix + b + "_", f = new FormData;
            a._formData.forEach(function(g, k) {
                k.startsWith(e) && f.append(k.slice(e.length), g);
            });
            return f;
        case "I":
            return Infinity;
        case "-":
            return "$-0" === c ? -0 : -Infinity;
        case "N":
            return NaN;
        case "u":
            return;
        case "D":
            return new Date(Date.parse(c.slice(2)));
        case "n":
            return BigInt(c.slice(2));
        default:
            c = parseInt(c.slice(1), 16);
            a = Z(a, c);
            switch(a.status){
                case "resolved_model":
                    yb(a);
            }
            switch(a.status){
                case "fulfilled":
                    return a.value;
                case "pending":
                case "blocked":
                    return c = X, a.then(Cb(c, b, d), Db(c)), null;
                default:
                    throw a.reason;
            }
    }
    return c;
}
function Jb(a, b) {
    var d = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : new FormData, c = new Map, e = {
        _bundlerConfig: a,
        _prefix: b,
        _formData: d,
        _chunks: c,
        _fromJSON: function(f, g) {
            return "string" === typeof g ? Ib(e, this, f, g) : g;
        }
    };
    return e;
}
function Kb(a) {
    Eb(a, Error("Connection closed."));
}
function Lb(a, b, d) {
    var c = ub(a, b);
    a = xb(c);
    return d ? Promise.all([
        d,
        a
    ]).then(function(e) {
        e = e[0];
        var f = V(c);
        return f.bind.apply(f, [
            null
        ].concat(e));
    }) : a ? Promise.resolve(a).then(function() {
        return V(c);
    }) : Promise.resolve(V(c));
}
exports.createClientModuleProxy = function(a) {
    a = u({}, a, !1);
    return new Proxy(a, ja);
};
exports.decodeAction = function(a, b) {
    var d = new FormData, c = null;
    a.forEach(function(e, f) {
        if (f.startsWith("$ACTION_")) if (f.startsWith("$ACTION_REF_")) {
            e = "$ACTION_" + f.slice(12) + ":";
            e = Jb(b, e, a);
            Kb(e);
            e = Z(e, 0);
            e.then(function() {});
            if ("fulfilled" !== e.status) throw e.reason;
            e = e.value;
            c = Lb(b, e.id, e.bound);
        } else f.startsWith("$ACTION_ID_") && (e = f.slice(11), c = Lb(b, e, null));
        else d.append(f, e);
    });
    return null === c ? null : c.then(function(e) {
        return e.bind(null, d);
    });
};
exports.decodeReply = function(a, b) {
    if ("string" === typeof a) {
        var d = new FormData;
        d.append("0", a);
        a = d;
    }
    a = Jb(b, "", a);
    Kb(a);
    return Z(a, 0);
};
exports.registerClientReference = function(a, b, d) {
    return u(a, b + "#" + d, !1);
};
exports.registerServerReference = function(a, b, d) {
    return Object.defineProperties(a, {
        $$typeof: {
            value: t
        },
        $$id: {
            value: null === d ? b : b + "#" + d
        },
        $$bound: {
            value: null
        },
        bind: {
            value: fa
        }
    });
};
exports.renderToReadableStream = function(a, b, d) {
    var c = db(a, b, d ? d.onError : void 0, d ? d.context : void 0, d ? d.identifierPrefix : void 0);
    if (d && d.signal) {
        var e = d.signal;
        if (e.aborted) tb(c, e.reason);
        else {
            var f = function() {
                tb(c, e.reason);
                e.removeEventListener("abort", f);
            };
            e.addEventListener("abort", f);
        }
    }
    return new ReadableStream({
        type: "bytes",
        start: function() {
            sb(c);
        },
        pull: function(g) {
            if (1 === c.status) c.status = 2, ca(g, c.fatalError);
            else if (2 !== c.status && null === c.destination) {
                c.destination = g;
                try {
                    R(c, g);
                } catch (k) {
                    P(c, k), rb(c, k);
                }
            }
        },
        cancel: function() {}
    }, {
        highWaterMark: 0
    });
};


/***/ }),

/***/ 89642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


if (true) {
    module.exports = __webpack_require__(19200);
} else {}


/***/ }),

/***/ 29446:
/***/ ((__unused_webpack_module, exports) => {

/**
 * @license React
 * react.shared-subset.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
var m = Object.assign, n = {
    current: null
};
function p() {
    return new Map;
}
if ("function" === typeof fetch) {
    var q = fetch, r = function(a, b) {
        var d = n.current;
        if (!d || b && b.signal && b.signal !== d.getCacheSignal()) return q(a, b);
        if ("string" !== typeof a || b) {
            var c = "string" === typeof a || a instanceof URL ? new Request(a, b) : a;
            if ("GET" !== c.method && "HEAD" !== c.method || c.keepalive) return q(a, b);
            var e = JSON.stringify([
                c.method,
                Array.from(c.headers.entries()),
                c.mode,
                c.redirect,
                c.credentials,
                c.referrer,
                c.referrerPolicy,
                c.integrity
            ]);
            c = c.url;
        } else e = '["GET",[],null,"follow",null,null,null,null]', c = a;
        var f = d.getCacheForType(p);
        d = f.get(c);
        if (void 0 === d) a = q(a, b), f.set(c, [
            e,
            a
        ]);
        else {
            c = 0;
            for(f = d.length; c < f; c += 2){
                var h = d[c + 1];
                if (d[c] === e) return a = h, a.then(function(g) {
                    return g.clone();
                });
            }
            a = q(a, b);
            d.push(e, a);
        }
        return a.then(function(g) {
            return g.clone();
        });
    };
    m(r, q);
    try {
        fetch = r;
    } catch (a) {
        try {
            globalThis.fetch = r;
        } catch (b) {
            console.warn("React was unable to patch the fetch() function in this environment. Suspensey APIs might not work correctly as a result.");
        }
    }
}
var t = Symbol.for("react.element"), u = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), y = Symbol.for("react.provider"), z = Symbol.for("react.server_context"), A = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), C = Symbol.for("react.memo"), aa = Symbol.for("react.lazy"), D = Symbol.for("react.default_value"), E = Symbol.iterator;
function ba(a) {
    if (null === a || "object" !== typeof a) return null;
    a = E && a[E] || a["@@iterator"];
    return "function" === typeof a ? a : null;
}
function F(a) {
    for(var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, d = 1; d < arguments.length; d++)b += "&args[]=" + encodeURIComponent(arguments[d]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var G = {
    isMounted: function() {
        return !1;
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}, H = {};
function I(a, b, d) {
    this.props = a;
    this.context = b;
    this.refs = H;
    this.updater = d || G;
}
I.prototype.isReactComponent = {};
I.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(F(85));
    this.updater.enqueueSetState(this, a, b, "setState");
};
I.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function J() {}
J.prototype = I.prototype;
function K(a, b, d) {
    this.props = a;
    this.context = b;
    this.refs = H;
    this.updater = d || G;
}
var L = K.prototype = new J;
L.constructor = K;
m(L, I.prototype);
L.isPureReactComponent = !0;
var M = Array.isArray, N = Object.prototype.hasOwnProperty, O = {
    current: null
}, P = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function ca(a, b) {
    return {
        $$typeof: t,
        type: a.type,
        key: b,
        ref: a.ref,
        props: a.props,
        _owner: a._owner
    };
}
function Q(a) {
    return "object" === typeof a && null !== a && a.$$typeof === t;
}
function escape(a) {
    var b = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + a.replace(/[=:]/g, function(d) {
        return b[d];
    });
}
var R = /\/+/g;
function S(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function T(a, b, d, c, e) {
    var f = typeof a;
    if ("undefined" === f || "boolean" === f) a = null;
    var h = !1;
    if (null === a) h = !0;
    else switch(f){
        case "string":
        case "number":
            h = !0;
            break;
        case "object":
            switch(a.$$typeof){
                case t:
                case u:
                    h = !0;
            }
    }
    if (h) return h = a, e = e(h), a = "" === c ? "." + S(h, 0) : c, M(e) ? (d = "", null != a && (d = a.replace(R, "$&/") + "/"), T(e, b, d, "", function(l) {
        return l;
    })) : null != e && (Q(e) && (e = ca(e, d + (!e.key || h && h.key === e.key ? "" : ("" + e.key).replace(R, "$&/") + "/") + a)), b.push(e)), 1;
    h = 0;
    c = "" === c ? "." : c + ":";
    if (M(a)) for(var g = 0; g < a.length; g++){
        f = a[g];
        var k = c + S(f, g);
        h += T(f, b, d, k, e);
    }
    else if (k = ba(a), "function" === typeof k) for(a = k.call(a), g = 0; !(f = a.next()).done;)f = f.value, k = c + S(f, g++), h += T(f, b, d, k, e);
    else if ("object" === f) throw b = String(a), Error(F(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
    return h;
}
function U(a, b, d) {
    if (null == a) return a;
    var c = [], e = 0;
    T(a, c, "", "", function(f) {
        return b.call(d, f, e++);
    });
    return c;
}
function da(a) {
    if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(d) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = d;
        }, function(d) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = d;
        });
        -1 === a._status && (a._status = 0, a._result = b);
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
}
function ea() {
    return new WeakMap;
}
function V() {
    return {
        s: 0,
        v: void 0,
        o: null,
        p: null
    };
}
var W = {
    current: null
}, X = {
    transition: null
}, Y = {
    ReactCurrentDispatcher: W,
    ReactCurrentCache: n,
    ReactCurrentBatchConfig: X,
    ReactCurrentOwner: O,
    ContextRegistry: {}
}, Z = Y.ContextRegistry;
exports.Children = {
    map: U,
    forEach: function(a, b, d) {
        U(a, function() {
            b.apply(this, arguments);
        }, d);
    },
    count: function(a) {
        var b = 0;
        U(a, function() {
            b++;
        });
        return b;
    },
    toArray: function(a) {
        return U(a, function(b) {
            return b;
        }) || [];
    },
    only: function(a) {
        if (!Q(a)) throw Error(F(143));
        return a;
    }
};
exports.Fragment = v;
exports.Profiler = x;
exports.StrictMode = w;
exports.Suspense = B;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y;
exports.cache = function(a) {
    return function() {
        var b = n.current;
        if (!b) return a.apply(null, arguments);
        var d = b.getCacheForType(ea);
        b = d.get(a);
        void 0 === b && (b = V(), d.set(a, b));
        d = 0;
        for(var c = arguments.length; d < c; d++){
            var e = arguments[d];
            if ("function" === typeof e || "object" === typeof e && null !== e) {
                var f = b.o;
                null === f && (b.o = f = new WeakMap);
                b = f.get(e);
                void 0 === b && (b = V(), f.set(e, b));
            } else f = b.p, null === f && (b.p = f = new Map), b = f.get(e), void 0 === b && (b = V(), f.set(e, b));
        }
        if (1 === b.s) return b.v;
        if (2 === b.s) throw b.v;
        try {
            var h = a.apply(null, arguments);
            d = b;
            d.s = 1;
            return d.v = h;
        } catch (g) {
            throw h = b, h.s = 2, h.v = g, g;
        }
    };
};
exports.cloneElement = function(a, b, d) {
    if (null === a || void 0 === a) throw Error(F(267, a));
    var c = m({}, a.props), e = a.key, f = a.ref, h = a._owner;
    if (null != b) {
        void 0 !== b.ref && (f = b.ref, h = O.current);
        void 0 !== b.key && (e = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for(k in b)N.call(b, k) && !P.hasOwnProperty(k) && (c[k] = void 0 === b[k] && void 0 !== g ? g[k] : b[k]);
    }
    var k = arguments.length - 2;
    if (1 === k) c.children = d;
    else if (1 < k) {
        g = Array(k);
        for(var l = 0; l < k; l++)g[l] = arguments[l + 2];
        c.children = g;
    }
    return {
        $$typeof: t,
        type: a.type,
        key: e,
        ref: f,
        props: c,
        _owner: h
    };
};
exports.createElement = function(a, b, d) {
    var c, e = {}, f = null, h = null;
    if (null != b) for(c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (f = "" + b.key), b)N.call(b, c) && !P.hasOwnProperty(c) && (e[c] = b[c]);
    var g = arguments.length - 2;
    if (1 === g) e.children = d;
    else if (1 < g) {
        for(var k = Array(g), l = 0; l < g; l++)k[l] = arguments[l + 2];
        e.children = k;
    }
    if (a && a.defaultProps) for(c in g = a.defaultProps, g)void 0 === e[c] && (e[c] = g[c]);
    return {
        $$typeof: t,
        type: a,
        key: f,
        ref: h,
        props: e,
        _owner: O.current
    };
};
exports.createRef = function() {
    return {
        current: null
    };
};
exports.createServerContext = function(a, b) {
    var d = !0;
    if (!Z[a]) {
        d = !1;
        var c = {
            $$typeof: z,
            _currentValue: b,
            _currentValue2: b,
            _defaultValue: b,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _globalName: a
        };
        c.Provider = {
            $$typeof: y,
            _context: c
        };
        Z[a] = c;
    }
    c = Z[a];
    if (c._defaultValue === D) c._defaultValue = b, c._currentValue === D && (c._currentValue = b), c._currentValue2 === D && (c._currentValue2 = b);
    else if (d) throw Error(F(429, a));
    return c;
};
exports.forwardRef = function(a) {
    return {
        $$typeof: A,
        render: a
    };
};
exports.isValidElement = Q;
exports.lazy = function(a) {
    return {
        $$typeof: aa,
        _payload: {
            _status: -1,
            _result: a
        },
        _init: da
    };
};
exports.memo = function(a, b) {
    return {
        $$typeof: C,
        type: a,
        compare: void 0 === b ? null : b
    };
};
exports.startTransition = function(a) {
    var b = X.transition;
    X.transition = {};
    try {
        a();
    } finally{
        X.transition = b;
    }
};
exports.use = function(a) {
    return W.current.use(a);
};
exports.useCallback = function(a, b) {
    return W.current.useCallback(a, b);
};
exports.useContext = function(a) {
    return W.current.useContext(a);
};
exports.useDebugValue = function() {};
exports.useId = function() {
    return W.current.useId();
};
exports.useMemo = function(a, b) {
    return W.current.useMemo(a, b);
};
exports.version = "18.3.0-canary-1a001dac6-20230812";


/***/ }),

/***/ 62947:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


if (true) {
    module.exports = __webpack_require__(29446);
} else {}


/***/ }),

/***/ 26021:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(61363);
module.exports = createProxy("/Users/seth.hall/apps/uniform/node_modules/next/dist/shared/lib/app-router-context.js");
 //# sourceMappingURL=app-router-context.js.map


/***/ }),

/***/ 64629:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(61363);
module.exports = createProxy("/Users/seth.hall/apps/uniform/node_modules/next/dist/shared/lib/hooks-client-context.js");
 //# sourceMappingURL=hooks-client-context.js.map


/***/ }),

/***/ 5070:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(61363);
module.exports = createProxy("/Users/seth.hall/apps/uniform/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-no-ssr.js");
 //# sourceMappingURL=dynamic-no-ssr.js.map


/***/ }),

/***/ 99107:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(61363);
module.exports = createProxy("/Users/seth.hall/apps/uniform/node_modules/next/dist/shared/lib/server-inserted-html.js");
 //# sourceMappingURL=server-inserted-html.js.map


/***/ }),

/***/ 40063:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = __webpack_require__(74937);


/***/ }),

/***/ 64980:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = __webpack_require__(67158);


/***/ }),

/***/ 21173:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const Queue = __webpack_require__(2077);
const pLimit = (concurrency)=>{
    if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
        throw new TypeError("Expected `concurrency` to be a number from 1 and up");
    }
    const queue = new Queue();
    let activeCount = 0;
    const next = ()=>{
        activeCount--;
        if (queue.size > 0) {
            queue.dequeue()();
        }
    };
    const run = async (fn, resolve, ...args)=>{
        activeCount++;
        const result = (async ()=>fn(...args))();
        resolve(result);
        try {
            await result;
        } catch  {}
        next();
    };
    const enqueue = (fn, resolve, ...args)=>{
        queue.enqueue(run.bind(null, fn, resolve, ...args));
        (async ()=>{
            // This function needs to wait until the next microtask before comparing
            // `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
            // when the run function is dequeued and called. The comparison in the if-statement
            // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
            await Promise.resolve();
            if (activeCount < concurrency && queue.size > 0) {
                queue.dequeue()();
            }
        })();
    };
    const generator = (fn, ...args)=>new Promise((resolve)=>{
            enqueue(fn, resolve, ...args);
        });
    Object.defineProperties(generator, {
        activeCount: {
            get: ()=>activeCount
        },
        pendingCount: {
            get: ()=>queue.size
        },
        clearQueue: {
            value: ()=>{
                queue.clear();
            }
        }
    });
    return generator;
};
module.exports = pLimit;


/***/ }),

/***/ 89541:
/***/ ((module) => {


module.exports = rfdc;
function copyBuffer(cur) {
    if (cur instanceof Buffer) {
        return Buffer.from(cur);
    }
    return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
}
function rfdc(opts) {
    opts = opts || {};
    if (opts.circles) return rfdcCircles(opts);
    return opts.proto ? cloneProto : clone;
    function cloneArray(a, fn) {
        var keys = Object.keys(a);
        var a2 = new Array(keys.length);
        for(var i = 0; i < keys.length; i++){
            var k = keys[i];
            var cur = a[k];
            if (typeof cur !== "object" || cur === null) {
                a2[k] = cur;
            } else if (cur instanceof Date) {
                a2[k] = new Date(cur);
            } else if (ArrayBuffer.isView(cur)) {
                a2[k] = copyBuffer(cur);
            } else {
                a2[k] = fn(cur);
            }
        }
        return a2;
    }
    function clone(o) {
        if (typeof o !== "object" || o === null) return o;
        if (o instanceof Date) return new Date(o);
        if (Array.isArray(o)) return cloneArray(o, clone);
        if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone));
        if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone));
        var o2 = {};
        for(var k in o){
            if (Object.hasOwnProperty.call(o, k) === false) continue;
            var cur = o[k];
            if (typeof cur !== "object" || cur === null) {
                o2[k] = cur;
            } else if (cur instanceof Date) {
                o2[k] = new Date(cur);
            } else if (cur instanceof Map) {
                o2[k] = new Map(cloneArray(Array.from(cur), clone));
            } else if (cur instanceof Set) {
                o2[k] = new Set(cloneArray(Array.from(cur), clone));
            } else if (ArrayBuffer.isView(cur)) {
                o2[k] = copyBuffer(cur);
            } else {
                o2[k] = clone(cur);
            }
        }
        return o2;
    }
    function cloneProto(o) {
        if (typeof o !== "object" || o === null) return o;
        if (o instanceof Date) return new Date(o);
        if (Array.isArray(o)) return cloneArray(o, cloneProto);
        if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto));
        if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto));
        var o2 = {};
        for(var k in o){
            var cur = o[k];
            if (typeof cur !== "object" || cur === null) {
                o2[k] = cur;
            } else if (cur instanceof Date) {
                o2[k] = new Date(cur);
            } else if (cur instanceof Map) {
                o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
            } else if (cur instanceof Set) {
                o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
            } else if (ArrayBuffer.isView(cur)) {
                o2[k] = copyBuffer(cur);
            } else {
                o2[k] = cloneProto(cur);
            }
        }
        return o2;
    }
}
function rfdcCircles(opts) {
    var refs = [];
    var refsNew = [];
    return opts.proto ? cloneProto : clone;
    function cloneArray(a, fn) {
        var keys = Object.keys(a);
        var a2 = new Array(keys.length);
        for(var i = 0; i < keys.length; i++){
            var k = keys[i];
            var cur = a[k];
            if (typeof cur !== "object" || cur === null) {
                a2[k] = cur;
            } else if (cur instanceof Date) {
                a2[k] = new Date(cur);
            } else if (ArrayBuffer.isView(cur)) {
                a2[k] = copyBuffer(cur);
            } else {
                var index = refs.indexOf(cur);
                if (index !== -1) {
                    a2[k] = refsNew[index];
                } else {
                    a2[k] = fn(cur);
                }
            }
        }
        return a2;
    }
    function clone(o) {
        if (typeof o !== "object" || o === null) return o;
        if (o instanceof Date) return new Date(o);
        if (Array.isArray(o)) return cloneArray(o, clone);
        if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone));
        if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone));
        var o2 = {};
        refs.push(o);
        refsNew.push(o2);
        for(var k in o){
            if (Object.hasOwnProperty.call(o, k) === false) continue;
            var cur = o[k];
            if (typeof cur !== "object" || cur === null) {
                o2[k] = cur;
            } else if (cur instanceof Date) {
                o2[k] = new Date(cur);
            } else if (cur instanceof Map) {
                o2[k] = new Map(cloneArray(Array.from(cur), clone));
            } else if (cur instanceof Set) {
                o2[k] = new Set(cloneArray(Array.from(cur), clone));
            } else if (ArrayBuffer.isView(cur)) {
                o2[k] = copyBuffer(cur);
            } else {
                var i = refs.indexOf(cur);
                if (i !== -1) {
                    o2[k] = refsNew[i];
                } else {
                    o2[k] = clone(cur);
                }
            }
        }
        refs.pop();
        refsNew.pop();
        return o2;
    }
    function cloneProto(o) {
        if (typeof o !== "object" || o === null) return o;
        if (o instanceof Date) return new Date(o);
        if (Array.isArray(o)) return cloneArray(o, cloneProto);
        if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto));
        if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto));
        var o2 = {};
        refs.push(o);
        refsNew.push(o2);
        for(var k in o){
            var cur = o[k];
            if (typeof cur !== "object" || cur === null) {
                o2[k] = cur;
            } else if (cur instanceof Date) {
                o2[k] = new Date(cur);
            } else if (cur instanceof Map) {
                o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
            } else if (cur instanceof Set) {
                o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
            } else if (ArrayBuffer.isView(cur)) {
                o2[k] = copyBuffer(cur);
            } else {
                var i = refs.indexOf(cur);
                if (i !== -1) {
                    o2[k] = refsNew[i];
                } else {
                    o2[k] = cloneProto(cur);
                }
            }
        }
        refs.pop();
        refsNew.pop();
        return o2;
    }
}


/***/ }),

/***/ 2077:
/***/ ((module) => {


class Node {
    /// value;
    /// next;
    constructor(value){
        this.value = value;
        // TODO: Remove this when targeting Node.js 12.
        this.next = undefined;
    }
}
class Queue {
    // TODO: Use private class fields when targeting Node.js 12.
    // #_head;
    // #_tail;
    // #_size;
    constructor(){
        this.clear();
    }
    enqueue(value) {
        const node = new Node(value);
        if (this._head) {
            this._tail.next = node;
            this._tail = node;
        } else {
            this._head = node;
            this._tail = node;
        }
        this._size++;
    }
    dequeue() {
        const current = this._head;
        if (!current) {
            return;
        }
        this._head = this._head.next;
        this._size--;
        return current.value;
    }
    clear() {
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
    }
    get size() {
        return this._size;
    }
    *[Symbol.iterator]() {
        let current = this._head;
        while(current){
            yield current.value;
            current = current.next;
        }
    }
}
module.exports = Queue;


/***/ }),

/***/ 73297:
/***/ ((__unused_webpack_module, exports) => {


exports._ = exports._interop_require_default = _interop_require_default;
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}


/***/ }),

/***/ 95091:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KK: () => (/* binding */ RouteClient),
/* harmony export */   Mc: () => (/* binding */ CANVAS_PERSONALIZE_SLOT),
/* harmony export */   Oh: () => (/* binding */ CANVAS_PERSONALIZATION_PARAM),
/* harmony export */   QC: () => (/* binding */ CANVAS_TEST_TYPE),
/* harmony export */   T_: () => (/* binding */ CanvasClient),
/* harmony export */   Wf: () => (/* binding */ mapSlotToPersonalizedVariations),
/* harmony export */   Z0: () => (/* binding */ CANVAS_PERSONALIZE_TYPE),
/* harmony export */   Zs: () => (/* binding */ PLACEHOLDER_ID),
/* harmony export */   bX: () => (/* binding */ CANVAS_PUBLISHED_STATE),
/* harmony export */   by: () => (/* binding */ generateHash),
/* harmony export */   c9: () => (/* binding */ CANVAS_LOCALE_TAG_PARAM),
/* harmony export */   ej: () => (/* binding */ CANVAS_DRAFT_STATE),
/* harmony export */   ig: () => (/* binding */ CANVAS_LOCALIZATION_TYPE),
/* harmony export */   jw: () => (/* binding */ CANVAS_ENRICHMENT_TAG_PARAM),
/* harmony export */   lY: () => (/* binding */ mapSlotToTestVariations),
/* harmony export */   m0: () => (/* binding */ createVariableReference),
/* harmony export */   oO: () => (/* binding */ walkComponentTree),
/* harmony export */   pt: () => (/* binding */ IN_CONTEXT_EDITOR_QUERY_STRING_PARAM),
/* harmony export */   si: () => (/* binding */ parseVariableExpression),
/* harmony export */   sq: () => (/* binding */ IN_CONTEXT_EDITOR_COMPONENT_START_ROLE),
/* harmony export */   tX: () => (/* binding */ CANVAS_EDITOR_STATE),
/* harmony export */   uF: () => (/* binding */ CANVAS_TEST_SLOT)
/* harmony export */ });
/* unused harmony exports ATTRIBUTE_COMPONENT_ID, ATTRIBUTE_MULTILINE, ATTRIBUTE_PARAMETER_ID, ATTRIBUTE_PARAMETER_TYPE, ATTRIBUTE_PARAMETER_VALUE, ATTRIBUTE_PLACEHOLDER, BatchEntry, CANVAS_INTENT_TAG_PARAM, CANVAS_LOCALIZATION_SLOT, CANVAS_TEST_VARIANT_PARAM, CanvasClientError, CategoryClient, ChildEnhancerBuilder, ContentClient, DataSourceClient, DataTypeClient, EDGE_CACHE_DISABLED, EDGE_DEFAULT_CACHE_TTL, EDGE_DEFAULT_L2_CACHE_TTL_IN_HOURS, EDGE_MAX_CACHE_TTL, EDGE_MAX_L2_CACHE_TTL_IN_HOURS, EDGE_MIN_CACHE_TTL, EDGE_MIN_L2_CACHE_TTL_IN_HOURS, EMPTY_COMPOSITION, EnhancerBuilder, IN_CONTEXT_EDITOR_COMPONENT_END_ROLE, IN_CONTEXT_EDITOR_EMBED_SCRIPT_ID, IS_RENDERED_BY_UNIFORM_ATTRIBUTE, UncachedCanvasClient, UncachedCategoryClient, UncachedContentClient, UniqueBatchEntries, bindVariables, bindVariablesToObject, compose, createBatchEnhancer, createCanvasChannel, createEventBus, createLimitPolicy, createUniformApiEnhancer, enhance, extractLocales, getChannelName, getComponentJsonPointer, getComponentPath, getParameterAttributes, isAddComponentMessage, isDismissPlaceholderMessage, isMovingComponentMessage, isReadyMessage, isReportRenderedCompositionsMessage, isSelectComponentMessage, isSelectParameterMessage, isSystemComponentDefinition, isTriggerCompositionActionMessage, isUpdateComponentParameterMessage, isUpdateCompositionInternalMessage, isUpdateCompositionMessage, isUpdateContextualEditingStateInternalMessage, isUpdatePreviewSettingsMessage, localize, nullLimitPolicy, subscribeToComposition, unstable_CompositionRelationshipClient */
/* harmony import */ var _uniformdev_context_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22733);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod)=>function __require() {
        return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
            exports: {}
        }).exports, mod), mod.exports;
    };
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toESM = (mod, isNodeMode, target)=>(target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod));
var __accessCheck = (obj, member, msg)=>{
    if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter)=>{
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value)=>{
    if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
// ../../node_modules/.pnpm/retry@0.13.1/node_modules/retry/lib/retry_operation.js
var require_retry_operation = __commonJS({
    "../../node_modules/.pnpm/retry@0.13.1/node_modules/retry/lib/retry_operation.js" (exports, module) {
        "use strict";
        function RetryOperation(timeouts, options) {
            if (typeof options === "boolean") {
                options = {
                    forever: options
                };
            }
            this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
            this._timeouts = timeouts;
            this._options = options || {};
            this._maxRetryTime = options && options.maxRetryTime || Infinity;
            this._fn = null;
            this._errors = [];
            this._attempts = 1;
            this._operationTimeout = null;
            this._operationTimeoutCb = null;
            this._timeout = null;
            this._operationStart = null;
            this._timer = null;
            if (this._options.forever) {
                this._cachedTimeouts = this._timeouts.slice(0);
            }
        }
        module.exports = RetryOperation;
        RetryOperation.prototype.reset = function() {
            this._attempts = 1;
            this._timeouts = this._originalTimeouts.slice(0);
        };
        RetryOperation.prototype.stop = function() {
            if (this._timeout) {
                clearTimeout(this._timeout);
            }
            if (this._timer) {
                clearTimeout(this._timer);
            }
            this._timeouts = [];
            this._cachedTimeouts = null;
        };
        RetryOperation.prototype.retry = function(err) {
            if (this._timeout) {
                clearTimeout(this._timeout);
            }
            if (!err) {
                return false;
            }
            var currentTime = /* @__PURE__ */ new Date().getTime();
            if (err && currentTime - this._operationStart >= this._maxRetryTime) {
                this._errors.push(err);
                this._errors.unshift(new Error("RetryOperation timeout occurred"));
                return false;
            }
            this._errors.push(err);
            var timeout = this._timeouts.shift();
            if (timeout === void 0) {
                if (this._cachedTimeouts) {
                    this._errors.splice(0, this._errors.length - 1);
                    timeout = this._cachedTimeouts.slice(-1);
                } else {
                    return false;
                }
            }
            var self = this;
            this._timer = setTimeout(function() {
                self._attempts++;
                if (self._operationTimeoutCb) {
                    self._timeout = setTimeout(function() {
                        self._operationTimeoutCb(self._attempts);
                    }, self._operationTimeout);
                    if (self._options.unref) {
                        self._timeout.unref();
                    }
                }
                self._fn(self._attempts);
            }, timeout);
            if (this._options.unref) {
                this._timer.unref();
            }
            return true;
        };
        RetryOperation.prototype.attempt = function(fn, timeoutOps) {
            this._fn = fn;
            if (timeoutOps) {
                if (timeoutOps.timeout) {
                    this._operationTimeout = timeoutOps.timeout;
                }
                if (timeoutOps.cb) {
                    this._operationTimeoutCb = timeoutOps.cb;
                }
            }
            var self = this;
            if (this._operationTimeoutCb) {
                this._timeout = setTimeout(function() {
                    self._operationTimeoutCb();
                }, self._operationTimeout);
            }
            this._operationStart = /* @__PURE__ */ new Date().getTime();
            this._fn(this._attempts);
        };
        RetryOperation.prototype.try = function(fn) {
            console.log("Using RetryOperation.try() is deprecated");
            this.attempt(fn);
        };
        RetryOperation.prototype.start = function(fn) {
            console.log("Using RetryOperation.start() is deprecated");
            this.attempt(fn);
        };
        RetryOperation.prototype.start = RetryOperation.prototype.try;
        RetryOperation.prototype.errors = function() {
            return this._errors;
        };
        RetryOperation.prototype.attempts = function() {
            return this._attempts;
        };
        RetryOperation.prototype.mainError = function() {
            if (this._errors.length === 0) {
                return null;
            }
            var counts = {};
            var mainError = null;
            var mainErrorCount = 0;
            for(var i = 0; i < this._errors.length; i++){
                var error = this._errors[i];
                var message = error.message;
                var count = (counts[message] || 0) + 1;
                counts[message] = count;
                if (count >= mainErrorCount) {
                    mainError = error;
                    mainErrorCount = count;
                }
            }
            return mainError;
        };
    }
});
// ../../node_modules/.pnpm/retry@0.13.1/node_modules/retry/lib/retry.js
var require_retry = __commonJS({
    "../../node_modules/.pnpm/retry@0.13.1/node_modules/retry/lib/retry.js" (exports) {
        "use strict";
        var RetryOperation = require_retry_operation();
        exports.operation = function(options) {
            var timeouts = exports.timeouts(options);
            return new RetryOperation(timeouts, {
                forever: options && (options.forever || options.retries === Infinity),
                unref: options && options.unref,
                maxRetryTime: options && options.maxRetryTime
            });
        };
        exports.timeouts = function(options) {
            if (options instanceof Array) {
                return [].concat(options);
            }
            var opts = {
                retries: 10,
                factor: 2,
                minTimeout: 1 * 1e3,
                maxTimeout: Infinity,
                randomize: false
            };
            for(var key in options){
                opts[key] = options[key];
            }
            if (opts.minTimeout > opts.maxTimeout) {
                throw new Error("minTimeout is greater than maxTimeout");
            }
            var timeouts = [];
            for(var i = 0; i < opts.retries; i++){
                timeouts.push(this.createTimeout(i, opts));
            }
            if (options && options.forever && !timeouts.length) {
                timeouts.push(this.createTimeout(i, opts));
            }
            timeouts.sort(function(a, b) {
                return a - b;
            });
            return timeouts;
        };
        exports.createTimeout = function(attempt, opts) {
            var random = opts.randomize ? Math.random() + 1 : 1;
            var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
            timeout = Math.min(timeout, opts.maxTimeout);
            return timeout;
        };
        exports.wrap = function(obj, options, methods) {
            if (options instanceof Array) {
                methods = options;
                options = null;
            }
            if (!methods) {
                methods = [];
                for(var key in obj){
                    if (typeof obj[key] === "function") {
                        methods.push(key);
                    }
                }
            }
            for(var i = 0; i < methods.length; i++){
                var method = methods[i];
                var original = obj[method];
                obj[method] = (function retryWrapper(original2) {
                    var op = exports.operation(options);
                    var args = Array.prototype.slice.call(arguments, 1);
                    var callback = args.pop();
                    args.push(function(err) {
                        if (op.retry(err)) {
                            return;
                        }
                        if (err) {
                            arguments[0] = op.mainError();
                        }
                        callback.apply(this, arguments);
                    });
                    op.attempt(function() {
                        original2.apply(obj, args);
                    });
                }).bind(obj, original);
                obj[method].options = options;
            }
        };
    }
});
// ../../node_modules/.pnpm/retry@0.13.1/node_modules/retry/index.js
var require_retry2 = __commonJS({
    "../../node_modules/.pnpm/retry@0.13.1/node_modules/retry/index.js" (exports, module) {
        "use strict";
        module.exports = require_retry();
    }
});
// src/CanvasClient.ts

// src/enhancement/createLimitPolicy.ts

// ../../node_modules/.pnpm/p-retry@5.1.2/node_modules/p-retry/index.js
var import_retry = __toESM(require_retry2(), 1);
var networkErrorMsgs = /* @__PURE__ */ new Set([
    "Failed to fetch",
    // Chrome
    "NetworkError when attempting to fetch resource.",
    // Firefox
    "The Internet connection appears to be offline.",
    // Safari
    "Network request failed",
    // `cross-fetch`
    "fetch failed"
]);
var AbortError = class extends Error {
    constructor(message){
        super();
        if (message instanceof Error) {
            this.originalError = message;
            ({ message } = message);
        } else {
            this.originalError = new Error(message);
            this.originalError.stack = this.stack;
        }
        this.name = "AbortError";
        this.message = message;
    }
};
var decorateErrorWithCounts = (error, attemptNumber, options)=>{
    const retriesLeft = options.retries - (attemptNumber - 1);
    error.attemptNumber = attemptNumber;
    error.retriesLeft = retriesLeft;
    return error;
};
var isNetworkError = (errorMessage)=>networkErrorMsgs.has(errorMessage);
var getDOMException = (errorMessage)=>globalThis.DOMException === void 0 ? new Error(errorMessage) : new DOMException(errorMessage);
async function pRetry(input, options) {
    return new Promise((resolve, reject)=>{
        options = {
            onFailedAttempt () {},
            retries: 10,
            ...options
        };
        const operation = import_retry.default.operation(options);
        operation.attempt(async (attemptNumber)=>{
            try {
                resolve(await input(attemptNumber));
            } catch (error) {
                if (!(error instanceof Error)) {
                    reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
                    return;
                }
                if (error instanceof AbortError) {
                    operation.stop();
                    reject(error.originalError);
                } else if (error instanceof TypeError && !isNetworkError(error.message)) {
                    operation.stop();
                    reject(error);
                } else {
                    decorateErrorWithCounts(error, attemptNumber, options);
                    try {
                        await options.onFailedAttempt(error);
                    } catch (error2) {
                        reject(error2);
                        return;
                    }
                    if (!operation.retry(error)) {
                        reject(operation.mainError());
                    }
                }
            }
        });
        if (options.signal && !options.signal.aborted) {
            options.signal.addEventListener("abort", ()=>{
                operation.stop();
                const reason = options.signal.reason === void 0 ? getDOMException("The operation was aborted.") : options.signal.reason;
                reject(reason instanceof Error ? reason : getDOMException(reason));
            }, {
                once: true
            });
        }
    });
}
// ../../node_modules/.pnpm/p-throttle@5.0.0/node_modules/p-throttle/index.js
var AbortError2 = class extends Error {
    constructor(){
        super("Throttled function aborted");
        this.name = "AbortError";
    }
};
function pThrottle({ limit, interval, strict }) {
    if (!Number.isFinite(limit)) {
        throw new TypeError("Expected `limit` to be a finite number");
    }
    if (!Number.isFinite(interval)) {
        throw new TypeError("Expected `interval` to be a finite number");
    }
    const queue = /* @__PURE__ */ new Map();
    let currentTick = 0;
    let activeCount = 0;
    function windowedDelay() {
        const now = Date.now();
        if (now - currentTick > interval) {
            activeCount = 1;
            currentTick = now;
            return 0;
        }
        if (activeCount < limit) {
            activeCount++;
        } else {
            currentTick += interval;
            activeCount = 1;
        }
        return currentTick - now;
    }
    const strictTicks = [];
    function strictDelay() {
        const now = Date.now();
        if (strictTicks.length < limit) {
            strictTicks.push(now);
            return 0;
        }
        const earliestTime = strictTicks.shift() + interval;
        if (now >= earliestTime) {
            strictTicks.push(now);
            return 0;
        }
        strictTicks.push(earliestTime);
        return earliestTime - now;
    }
    const getDelay = strict ? strictDelay : windowedDelay;
    return (function_)=>{
        const throttled = function(...args) {
            if (!throttled.isEnabled) {
                return (async ()=>function_.apply(this, args))();
            }
            let timeout;
            return new Promise((resolve, reject)=>{
                const execute = ()=>{
                    resolve(function_.apply(this, args));
                    queue.delete(timeout);
                };
                timeout = setTimeout(execute, getDelay());
                queue.set(timeout, reject);
            });
        };
        throttled.abort = ()=>{
            for (const timeout of queue.keys()){
                clearTimeout(timeout);
                queue.get(timeout)(new AbortError2());
            }
            queue.clear();
            strictTicks.splice(0, strictTicks.length);
        };
        throttled.isEnabled = true;
        return throttled;
    };
}
// src/enhancement/createLimitPolicy.ts
function createLimitPolicy({ throttle = {
    interval: 1e3,
    limit: 10
}, retry: retry2 = {
    retries: 1,
    factor: 1.66
} }) {
    const throttler = throttle ? pThrottle(throttle) : null;
    return function limitPolicy(func) {
        let currentFunc = async ()=>await func();
        if (throttler) {
            const throttleFunc = currentFunc;
            currentFunc = throttler(throttleFunc);
        }
        if (retry2) {
            const retryFunc = currentFunc;
            currentFunc = ()=>pRetry(retryFunc, {
                    ...retry2,
                    onFailedAttempt: async (error)=>{
                        if (retry2.onFailedAttempt) {
                            await retry2.onFailedAttempt(error);
                        }
                        if (error instanceof _uniformdev_context_api__WEBPACK_IMPORTED_MODULE_0__/* .ApiClientError */ .GY && typeof error.statusCode === "number" && error.statusCode.toString().startsWith("4")) {
                            throw error;
                        }
                    }
                });
        }
        return currentFunc();
    };
}
var nullLimitPolicy = async (func)=>await func();
// src/CanvasClient.ts
var CANVAS_URL = "/api/v1/canvas";
var CanvasClient = class extends _uniformdev_context_api__WEBPACK_IMPORTED_MODULE_0__/* .ApiClient */ .Sl {
    constructor(options){
        var _a;
        if (!options.limitPolicy) {
            options.limitPolicy = createLimitPolicy({});
        }
        super(options);
        this.edgeApiHost = (_a = options.edgeApiHost) != null ? _a : "https://uniform.global";
    }
    /** Fetches lists of Canvas compositions, optionally by type */ async getCompositionList(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(CANVAS_URL, {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
    getCompositionByNodePath(options) {
        return this.getOneComposition(options);
    }
    getCompositionByNodeId(options) {
        return this.getOneComposition(options);
    }
    getCompositionBySlug(options) {
        return this.getOneComposition(options);
    }
    getCompositionById(options) {
        return this.getOneComposition(options);
    }
    getCompositionDefaults(options) {
        return this.getOneComposition(options);
    }
    /** Fetches historical versions of a composition or pattern */ async unstable_getCompositionHistory(options) {
        const edgeUrl = this.createUrl("/api/v1/canvas-history", {
            ...options,
            projectId: this.options.projectId
        });
        return this.apiClient(edgeUrl);
    }
    getOneComposition({ skipDataResolution, diagnostics, ...params }) {
        const { projectId } = this.options;
        if (skipDataResolution) {
            return this.apiClient(this.createUrl(CANVAS_URL, {
                ...params,
                projectId
            }));
        }
        const edgeParams = {
            ...params,
            projectId,
            ...diagnostics ? {
                diagnostics: "true"
            } : {}
        };
        const edgeUrl = this.createUrl("/api/v1/composition", edgeParams, this.edgeApiHost);
        return this.apiClient(edgeUrl);
    }
    /** Updates or creates a Canvas component definition */ async updateComposition(body) {
        const fetchUri = this.createUrl(CANVAS_URL);
        await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    /** Deletes a Canvas component definition */ async removeComposition(body) {
        const fetchUri = this.createUrl(CANVAS_URL);
        const { projectId } = this.options;
        await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                ...body,
                projectId
            }),
            expectNoContent: true
        });
    }
    /** Fetches all Canvas component definitions */ async getComponentDefinitions(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl("/api/v1/canvas-definitions", {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
    /** Updates or creates a Canvas component definition */ async updateComponentDefinition(body) {
        const fetchUri = this.createUrl("/api/v1/canvas-definitions");
        await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    /** Deletes a Canvas component definition */ async removeComponentDefinition(body) {
        const fetchUri = this.createUrl("/api/v1/canvas-definitions");
        await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
};
var UncachedCanvasClient = class extends (/* unused pure expression or super */ null && (CanvasClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
// src/CategoryClient.ts

var CATEGORIES_URL = "/api/v1/categories";
var CategoryClient = class extends (/* unused pure expression or super */ null && (ApiClient2)) {
    constructor(options){
        if (!options.limitPolicy) {
            options.limitPolicy = createLimitPolicy({});
        }
        super(options);
    }
    /** Fetches all categories created in given project */ async getCategories(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl("/api/v1/categories", {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
    /** Updates or creates a category, also used to re-order them */ async upsertCategories(categories) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(CATEGORIES_URL);
        return await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                categories,
                projectId
            }),
            expectNoContent: true
        });
    }
    /** Deletes a category */ async removeCategory(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(CATEGORIES_URL);
        return await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                projectId,
                categoryId: options.categoryId
            }),
            expectNoContent: true
        });
    }
};
var UncachedCategoryClient = class extends (/* unused pure expression or super */ null && (CategoryClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
// src/CompositionRelationshipClient.ts

var COMPOSITION_RELATIONSHIP_URL = "/api/v1/composition-relationships";
var unstable_CompositionRelationshipClient = class extends (/* unused pure expression or super */ null && (ApiClient3)) {
    constructor(options){
        super(options);
        this.getDefinitionsRelationships = async ({ definitionIds, withCompositions })=>{
            const url = this.createUrl(COMPOSITION_RELATIONSHIP_URL, {
                type: "definition",
                projectId: this._options.projectId,
                definitionIds: definitionIds.join(","),
                withCompositions
            });
            return this.apiClient(url);
        };
        this.clearAllRelationships = async ()=>{
            const url = this.createUrl(COMPOSITION_RELATIONSHIP_URL);
            return this.apiClient(url, {
                method: "POST",
                body: JSON.stringify({
                    type: "clear",
                    projectId: this._options.projectId
                })
            });
        };
        this.indexCompositionRelationships = async ({ state, compositionId })=>{
            const url = this.createUrl(COMPOSITION_RELATIONSHIP_URL);
            return this.apiClient(url, {
                method: "POST",
                body: JSON.stringify({
                    type: "index",
                    projectId: this._options.projectId,
                    state,
                    compositionId
                })
            });
        };
        this.getVersion = async ()=>{
            const url = this.createUrl("/api/v1/usage-tracking", {
                projectId: this._options.projectId
            });
            return this.apiClient(url).then((response)=>response.version);
        };
        this.setVersion = async (version)=>{
            const url = this.createUrl("/api/v1/usage-tracking");
            return this.apiClient(url, {
                method: "POST",
                body: JSON.stringify({
                    projectId: this._options.projectId,
                    version
                })
            });
        };
        this._options = options;
    }
};
// src/ContentClient.ts

var _contentTypesUrl, _entriesUrl;
var _ContentClient = class _ContentClient extends _uniformdev_context_api__WEBPACK_IMPORTED_MODULE_0__/* .ApiClient */ .Sl {
    constructor(options){
        var _a;
        super(options);
        this.edgeApiHost = (_a = options.edgeApiHost) != null ? _a : "https://uniform.global";
    }
    getContentTypes(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(__privateGet(_ContentClient, _contentTypesUrl), {
            ...options,
            projectId
        });
        return this.apiClient(fetchUri);
    }
    getEntries(options) {
        const { projectId } = this.options;
        const { skipDataResolution, ...params } = options;
        const fetchUri = skipDataResolution ? this.createUrl(__privateGet(_ContentClient, _entriesUrl), {
            ...params,
            projectId
        }) : this.createUrl(__privateGet(_ContentClient, _entriesUrl), this.getEdgeOptions(params), this.edgeApiHost);
        return this.apiClient(fetchUri);
    }
    async upsertContentType(body) {
        const fetchUri = this.createUrl(__privateGet(_ContentClient, _contentTypesUrl));
        await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    async upsertEntry(body) {
        const fetchUri = this.createUrl(__privateGet(_ContentClient, _entriesUrl));
        await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    async deleteContentType(body) {
        const fetchUri = this.createUrl(__privateGet(_ContentClient, _contentTypesUrl));
        await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    async deleteEntry(body) {
        const fetchUri = this.createUrl(__privateGet(_ContentClient, _entriesUrl));
        await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    getEdgeOptions(options) {
        const { projectId } = this.options;
        const { skipDataResolution, ...params } = options;
        return {
            projectId,
            ...params,
            diagnostics: (options == null ? void 0 : options.diagnostics) ? "true" : void 0
        };
    }
};
_contentTypesUrl = new WeakMap();
_entriesUrl = new WeakMap();
__privateAdd(_ContentClient, _contentTypesUrl, "/api/v1/content-types");
__privateAdd(_ContentClient, _entriesUrl, "/api/v1/entries");
var ContentClient = (/* unused pure expression or super */ null && (_ContentClient));
var UncachedContentClient = class extends (/* unused pure expression or super */ null && (ContentClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
// src/DataSourceClient.ts

var dataSourceUrl = "/api/v1/data-source";
var dataSourcesUrl = "/api/v1/data-sources";
var DataSourceClient = class extends (/* unused pure expression or super */ null && (ApiClient5)) {
    constructor(options){
        super(options);
    }
    /** Fetches all DataSources for a project */ async get(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(dataSourceUrl, {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
    /** Fetches all DataSources for a project */ async getList(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(dataSourcesUrl, {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
    /** Updates or creates (based on id) a DataSource */ async upsert(body) {
        const fetchUri = this.createUrl(dataSourceUrl);
        await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    /** Deletes a DataSource */ async remove(body) {
        const fetchUri = this.createUrl(dataSourceUrl);
        await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
};
// src/DataTypeClient.ts

var _url;
var _DataTypeClient = class _DataTypeClient extends _uniformdev_context_api__WEBPACK_IMPORTED_MODULE_0__/* .ApiClient */ .Sl {
    constructor(options){
        super(options);
    }
    /** Fetches all DataTypes for a project */ async get(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(__privateGet(_DataTypeClient, _url), {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
    /** Updates or creates (based on id) a DataType */ async upsert(body) {
        const fetchUri = this.createUrl(__privateGet(_DataTypeClient, _url));
        await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    /** Deletes a DataType */ async remove(body) {
        const fetchUri = this.createUrl(__privateGet(_DataTypeClient, _url));
        await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
};
_url = new WeakMap();
__privateAdd(_DataTypeClient, _url, "/api/v1/data-types");
var DataTypeClient = (/* unused pure expression or super */ null && (_DataTypeClient));
// src/enhancement/batchEnhancer.ts
var BatchEntry = class {
    constructor(_resolve, _reject, args){
        this._resolve = _resolve;
        this._reject = _reject;
        this.args = args;
        this._isCompleted = false;
    }
    /** Mark the batch entry as successfully completed. */ resolve(result) {
        this._resolve(result);
        this._isCompleted = true;
    }
    /** Mark the batch entry as failed. */ reject(reason) {
        this._reject(reason);
        this._isCompleted = true;
    }
    /** @return Whether the batch entry has been completed (resolved or rejected). */ get isCompleted() {
        return this._isCompleted;
    }
};
function createBatchEnhancer({ handleBatch, shouldQueue, limitPolicy }) {
    let queue = [];
    const batchedFn = async (options)=>{
        if (!shouldQueue || shouldQueue(options)) {
            return new Promise((resolve, reject)=>{
                queue.push(new BatchEntry(resolve, reject, options));
            });
        } else {
            return void 0;
        }
    };
    const complete = async ()=>{
        if (queue.length > 0) {
            try {
                await handleBatch(queue);
            } catch (e) {
                queue.forEach((entry)=>entry.reject(e));
            }
            if (queue.some((entry)=>!entry.isCompleted)) {
                throw new Error("The completeAll() function failed to resolve or reject all promises in the batch!");
            }
        }
        const processed = queue.length;
        queue = [];
        return processed;
    };
    return {
        enhanceOne: batchedFn,
        completeAll: complete,
        limitPolicy
    };
}
// src/enhancement/compose.ts
var compose = (input, ...composers)=>{
    const composed = {
        enhanceOne: (value)=>{
            let result = "enhanceOne" in input ? input.enhanceOne(value) : input(value);
            for (const currentComposed of composers){
                const current = isPromise(result) ? result : Promise.resolve(result);
                const enhanceOne = "enhanceOne" in currentComposed ? currentComposed.enhanceOne : currentComposed;
                result = current.then((res)=>enhanceOne({
                        ...value,
                        parameter: {
                            type: value.parameter.type,
                            value: res
                        }
                    }));
            }
            return result;
        },
        completeAll: async ()=>{
            var _a, _b;
            for (const currentComposed of composers){
                if ("completeAll" in currentComposed) {
                    throw new Error("Only the first enhancer in a compose chain can use the completeAll function (batching)");
                }
            }
            return (_b = "completeAll" in input ? (_a = input.completeAll) == null ? void 0 : _a.call(input) : 0) != null ? _b : 0;
        }
    };
    return composed;
};
function isPromise(obj) {
    return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
// src/enhancement/walkComponentTree.ts
function walkComponentTree(component, visitor, initialContext) {
    var _a;
    const componentQueue = [
        {
            ancestorsAndSelf: [
                {
                    component,
                    parentSlot: void 0,
                    parentSlotIndex: void 0
                }
            ],
            context: initialContext
        }
    ];
    const childContexts = /* @__PURE__ */ new Map();
    do {
        const currentQueueEntry = componentQueue.pop();
        if (!currentQueueEntry) continue;
        const currentComponent = currentQueueEntry.ancestorsAndSelf[0];
        let visitDescendants = true;
        let descendantContext = (_a = childContexts.get(currentComponent.component)) != null ? _a : currentQueueEntry.context;
        visitor(currentComponent.component, currentQueueEntry.ancestorsAndSelf, {
            replaceComponent: (replacementComponent)=>{
                Object.assign(currentComponent.component, replacementComponent);
                const propertiesToCheck = [
                    "parameters",
                    "variant",
                    "slots",
                    "data",
                    "_pattern",
                    "_patternError"
                ];
                propertiesToCheck.forEach((property)=>{
                    if (!replacementComponent[property]) {
                        delete currentComponent.component[property];
                    }
                });
            },
            removeComponent: ()=>{
                const { parentSlot, parentSlotIndex } = currentQueueEntry.ancestorsAndSelf[0];
                const parentComponent = currentQueueEntry.ancestorsAndSelf[1];
                if (parentSlot && typeof parentSlotIndex !== "undefined") {
                    parentComponent.component.slots[parentSlot].splice(parentSlotIndex, 1);
                } else {
                    throw new Error("Unable to delete composition.");
                }
            },
            insertAfter: (components)=>{
                const componentsToInsert = Array.isArray(components) ? components : [
                    components
                ];
                const { parentSlot, parentSlotIndex } = currentQueueEntry.ancestorsAndSelf[0];
                const parentComponent = currentQueueEntry.ancestorsAndSelf[1];
                if (parentSlot && typeof parentSlotIndex !== "undefined") {
                    parentComponent.component.slots[parentSlot].splice(parentSlotIndex + 1, 0, ...componentsToInsert);
                    componentQueue.unshift(...componentsToInsert.map((enqueueingComponent)=>({
                            ancestorsAndSelf: [
                                {
                                    component: enqueueingComponent,
                                    parentSlot,
                                    get parentSlotIndex () {
                                        return parentComponent.component.slots[parentSlot].findIndex((x)=>x === enqueueingComponent);
                                    }
                                },
                                ...currentQueueEntry.ancestorsAndSelf
                            ],
                            context: descendantContext
                        })));
                } else {
                    throw new Error("Unable to insert after a component not in a slot.");
                }
            },
            stopProcessingDescendants () {
                visitDescendants = false;
            },
            setDescendantsContext (context) {
                descendantContext = context;
            },
            setChildContext (child, context) {
                childContexts.set(child, context);
            }
        }, descendantContext);
        const slots = currentComponent.component.slots;
        if (visitDescendants && slots) {
            const slotKeys = Object.keys(slots);
            for(let slotIndex = slotKeys.length - 1; slotIndex >= 0; slotIndex--){
                const slotKey = slotKeys[slotIndex];
                const components = slots[slotKey];
                for(let componentIndex = components.length - 1; componentIndex >= 0; componentIndex--){
                    const enqueueingComponent = components[componentIndex];
                    componentQueue.push({
                        ancestorsAndSelf: [
                            {
                                component: enqueueingComponent,
                                parentSlot: slotKey,
                                get parentSlotIndex () {
                                    return currentComponent.component.slots[slotKey].findIndex((x)=>x === enqueueingComponent);
                                }
                            },
                            ...currentQueueEntry.ancestorsAndSelf
                        ],
                        context: descendantContext
                    });
                }
            }
        }
    }while (componentQueue.length > 0);
}
function getComponentPath(ancestorsAndSelf) {
    const path = [];
    for(let i = ancestorsAndSelf.length - 1; i >= 0; i--){
        const { parentSlot, parentSlotIndex } = ancestorsAndSelf[i];
        if (parentSlot && parentSlotIndex !== void 0) {
            path.push(`${parentSlot}[${parentSlotIndex}]`);
        }
    }
    return `.${path.join(".")}`;
}
function getComponentJsonPointer(ancestorsAndSelf, { withSlots = false } = {}) {
    const path = [];
    for(let i = ancestorsAndSelf.length - 1; i >= 0; i--){
        const { parentSlot, parentSlotIndex } = ancestorsAndSelf[i];
        if (parentSlot && parentSlotIndex !== void 0) {
            path.push(`${parentSlot}/${parentSlotIndex}`);
        }
    }
    return withSlots ? `/slots/${path.join("/slots/")}` : `/${path.join("/")}`;
}
// src/enhancement/enhance.ts
async function enhance({ composition, enhancers, context, onErrors = (errors)=>{
    throw new Error(errors.map((error)=>`${error.message}
 ${typeof error.error === "object" && "stack" in error.error ? error.error.stack : error.error}`).join("\n\n"));
} }) {
    const promises = [];
    const usedComponentEnhancers = /* @__PURE__ */ new Set();
    const usedParameterEnhancers = /* @__PURE__ */ new Set();
    walkComponentTree(composition, (currentComponent, componentContext)=>{
        var _a;
        Object.entries((_a = currentComponent.parameters) != null ? _a : {}).forEach(([paramName, paramValue])=>{
            const enhancer = enhancers.resolveParameterEnhancer(currentComponent, paramName, paramValue);
            if (enhancer) {
                usedParameterEnhancers.add(enhancer);
                promises.push(enhanceParameter(currentComponent, componentContext, paramName, paramValue, enhancer, context));
            }
        });
        const componentEnhancers = enhancers.resolveComponentEnhancers(currentComponent);
        promises.push(enhanceComponent(currentComponent, componentContext, componentEnhancers, context));
        usedComponentEnhancers.add(componentEnhancers);
    });
    promises.push(...Array.from(usedComponentEnhancers).flatMap((enhancerSet)=>Array.from(enhancerSet).map(async ([, enhancer])=>{
            var _a;
            try {
                if (enhancer.completeAll) {
                    const limitPolicy = (_a = enhancer.limitPolicy) != null ? _a : nullLimitPolicy;
                    await limitPolicy(()=>enhancer.completeAll());
                }
            } catch (error) {
                return {
                    error,
                    message: "Batch component enhancer failed. Individual failed components should receive their own rejections."
                };
            }
        })));
    promises.push(...Array.from(usedParameterEnhancers).map(async (enhancer)=>{
        var _a;
        try {
            if (enhancer.completeAll) {
                const limitPolicy = (_a = enhancer.limitPolicy) != null ? _a : nullLimitPolicy;
                await limitPolicy(()=>enhancer.completeAll());
            }
        } catch (error) {
            return {
                error,
                message: "Batch parameter enhancer failed. Individual failed parameters should receive their own rejections."
            };
        }
    }));
    const issues = (await Promise.all(promises)).flatMap((issue)=>Array.isArray(issue) ? issue : [
            issue
        ]).filter((issue)=>issue);
    if (issues.length) {
        onErrors(issues);
    }
}
async function enhanceComponent(component, componentContext, enhancers, context) {
    if (enhancers.size) {
        component.data = {};
    }
    return await Promise.all(Array.from(enhancers).map(async ([enhancerName, enhancer])=>{
        var _a;
        try {
            const limitPolicy = enhancer.completeAll ? nullLimitPolicy : (_a = enhancer.limitPolicy) != null ? _a : nullLimitPolicy;
            const result = await limitPolicy(async ()=>enhancer.enhanceOne({
                    component,
                    context
                }));
            if (result !== void 0 && result !== null) {
                component.data[enhancerName] = result;
            }
        } catch (error) {
            const message = `Component ${getComponentPath(componentContext)} (type: ${component.type}): data.${enhancerName} enhancer threw exception. Data key will not be present.`;
            delete component.data[enhancerName];
            return {
                message,
                error
            };
        }
    }));
}
async function enhanceParameter(component, componentContext, parameterName, parameter, enhancer, context) {
    var _a;
    try {
        const limitPolicy = enhancer.completeAll ? nullLimitPolicy : (_a = enhancer.limitPolicy) != null ? _a : nullLimitPolicy;
        const enhancedValue = await limitPolicy(async ()=>enhancer.enhanceOne({
                parameter,
                parameterName,
                component,
                context
            }));
        if (enhancedValue === null) {
            delete component.parameters[parameterName];
        } else if (typeof enhancedValue === "undefined") {
            component.parameters[parameterName] = {
                ...parameter,
                value: parameter.value
            };
        } else {
            component.parameters[parameterName] = {
                ...parameter,
                value: enhancedValue
            };
        }
    } catch (error) {
        const message = `Component ${getComponentPath(componentContext)} (type: ${component.type}): enhancing parameter ${parameterName} (type: ${parameter.type}) threw exception. Parameter will be removed.`;
        delete component.parameters[parameterName];
        return {
            message,
            error
        };
    }
}
// src/enhancement/EnhancerBuilder.ts
var ChildEnhancerBuilder = class {
    constructor(){
        this._paramMatches = Array();
        this._dataMatches = /* @__PURE__ */ new Map();
    }
    /** Targets an enhancer to modify the value of any parameter */ parameter(enhancer) {
        this._paramMatches.push({
            enhancer: this._resolveParameterEnhancer(enhancer)
        });
        return this;
    }
    /** Targets an enhancer to modify the value of any parameter with a specific name */ parameterName(name, enhancer) {
        const names = Array.isArray(name) ? name : [
            name
        ];
        names.forEach((name2)=>this._paramMatches.push({
                name: name2,
                enhancer: this._resolveParameterEnhancer(enhancer)
            }));
        return this;
    }
    /** Targets an enhancer to modify the value of any parameter with a specific type */ parameterType(type, enhancer) {
        const types = Array.isArray(type) ? type : [
            type
        ];
        types.forEach((type2)=>this._paramMatches.push({
                type: type2,
                enhancer: this._resolveParameterEnhancer(enhancer)
            }));
        return this;
    }
    /**
   * Targets an enhancer to set a specific object key on the component's `data` property.
   * Note: an exception will be thrown if the same key is registered more than once.
   */ data(name, enhancer) {
        if (this._dataMatches.has(name)) {
            throw new Error(`${name} enhancer data key has been used more than once. This will cause data loss.`);
        }
        this._dataMatches.set(name, typeof enhancer === "function" ? {
            enhanceOne: enhancer
        } : enhancer);
        return this;
    }
    /**
   * Resolves the parameter enhancer for a given parameter, if one exists.
   * The first matching enhancer by registration order is returned, if more than one could match.
   */ resolveParameterEnhancer(parameterName, parameter) {
        var _a;
        return (_a = this._paramMatches.find((m)=>m.name && m.name === parameterName || m.type && m.type === parameter.type || !m.type && !m.name)) == null ? void 0 : _a.enhancer;
    }
    /**
   * Resolves component enhancer(s) for a given component.
   * Returns a Map where the key is the name of the data property and the value is the enhancer.
   */ resolveComponentEnhancers() {
        return this._dataMatches;
    }
    _resolveParameterEnhancer(enhancer) {
        if (typeof enhancer === "function") {
            return {
                enhanceOne: enhancer
            };
        } else {
            return enhancer;
        }
    }
};
var EnhancerBuilder = class {
    constructor(){
        this._componentIndex = {};
        this._rootBuilder = new ChildEnhancerBuilder();
    }
    /** Targets an enhancer to modify the value of any parameter */ parameter(enhancer) {
        this._rootBuilder.parameter(enhancer);
        return this;
    }
    /** Targets an enhancer to modify the value of any parameter with a specific name */ parameterName(name, enhancer) {
        this._rootBuilder.parameterName(name, enhancer);
        return this;
    }
    /** Targets an enhancer to modify the value of any parameter with a specific type */ parameterType(type, enhancer) {
        this._rootBuilder.parameterType(type, enhancer);
        return this;
    }
    /**
   * Targets an enhancer to set a specific object key on the component's `data` property.
   * Note: an exception will be thrown if the same key is registered more than once.
   */ data(name, enhancer) {
        this._rootBuilder.data(name, enhancer);
        return this;
    }
    /**
   * Targets a subset of enhancers at a specific component type.
   * Global enhancers will still be run if no matching enhancer is registered for this component's properties.
   */ component(name, builder) {
        const names = Array.isArray(name) ? name : [
            name
        ];
        names.forEach((name2)=>{
            this._componentIndex[name2] = this._componentIndex[name2] || new ChildEnhancerBuilder();
            builder(this._componentIndex[name2]);
        });
        return this;
    }
    /**
   * Resolves the parameter enhancer for a given parameter, if one exists.
   * The first matching enhancer by registration order is returned, if more than one could match.
   */ resolveParameterEnhancer(component, parameterName, parameter) {
        const eb = this._componentIndex[component.type];
        if (eb) {
            const targetedResolver = eb.resolveParameterEnhancer(parameterName, parameter);
            if (targetedResolver) {
                return targetedResolver;
            }
        }
        return this._rootBuilder.resolveParameterEnhancer(parameterName, parameter);
    }
    /**
   * Resolves component enhancer(s) for a given component.
   * Returns a Map where the key is the name of the data property and the value is the enhancer.
   */ resolveComponentEnhancers(component) {
        let componentEnhancers = this._rootBuilder.resolveComponentEnhancers();
        const eb = this._componentIndex[component.type];
        if (eb) {
            componentEnhancers = new Map(componentEnhancers);
            for (const [key, value] of eb.resolveComponentEnhancers()){
                componentEnhancers.set(key, value);
            }
        }
        return componentEnhancers;
    }
};
// src/utils/constants.ts
var CANVAS_PERSONALIZE_TYPE = "$personalization";
var CANVAS_TEST_TYPE = "$test";
var CANVAS_LOCALIZATION_TYPE = "$localization";
var CANVAS_INTENT_TAG_PARAM = "intentTag";
var CANVAS_LOCALE_TAG_PARAM = "locale";
var CANVAS_PERSONALIZE_SLOT = "pz";
var CANVAS_TEST_SLOT = "test";
var CANVAS_LOCALIZATION_SLOT = "localized";
var CANVAS_DRAFT_STATE = 0;
var CANVAS_PUBLISHED_STATE = 64;
var CANVAS_EDITOR_STATE = 63;
var CANVAS_PERSONALIZATION_PARAM = "$pzCrit";
var CANVAS_TEST_VARIANT_PARAM = "$tstVrnt";
var CANVAS_ENRICHMENT_TAG_PARAM = "$enr";
var IN_CONTEXT_EDITOR_QUERY_STRING_PARAM = "is_incontext_editing_mode";
var IN_CONTEXT_EDITOR_COMPONENT_START_ROLE = "uniform-component-start";
var IN_CONTEXT_EDITOR_COMPONENT_END_ROLE = "uniform-component-end";
var IN_CONTEXT_EDITOR_EMBED_SCRIPT_ID = "uniform-canvas-preview-script";
var IS_RENDERED_BY_UNIFORM_ATTRIBUTE = "data-is-rendered-by-uniform";
var PLACEHOLDER_ID = "placeholder";
var EMPTY_COMPOSITION = {
    _id: "_empty_composition_id",
    _name: "An empty composition used for contextual editing",
    type: "_empty_composition_type"
};
var EDGE_MIN_CACHE_TTL = 15;
var EDGE_MAX_CACHE_TTL = 600;
var EDGE_DEFAULT_CACHE_TTL = 30;
var EDGE_CACHE_DISABLED = (/* unused pure expression or super */ null && (-1));
var EDGE_MIN_L2_CACHE_TTL_IN_HOURS = 1;
var EDGE_MAX_L2_CACHE_TTL_IN_HOURS = (/* unused pure expression or super */ null && (4 * 7 * 24));
var EDGE_DEFAULT_L2_CACHE_TTL_IN_HOURS = 24;
// src/enhancement/localize.ts
function extractLocales({ component }) {
    var _a;
    const variations = {};
    const slot = (_a = component.slots) == null ? void 0 : _a[CANVAS_LOCALIZATION_SLOT];
    slot == null ? void 0 : slot.forEach((slotComponent)=>{
        var _a2;
        const localeParameter = (_a2 = slotComponent.parameters) == null ? void 0 : _a2[CANVAS_LOCALE_TAG_PARAM];
        if ((localeParameter == null ? void 0 : localeParameter.value) && typeof localeParameter.value === "string") {
            variations[localeParameter.value] = variations[localeParameter.value] || [];
            variations[localeParameter.value].push(slotComponent);
        }
    });
    return variations;
}
function localize({ composition, locale }) {
    walkComponentTree(composition, (currentComponent, _componentContext, actions)=>{
        if (currentComponent.type === CANVAS_LOCALIZATION_TYPE) {
            const locales = extractLocales({
                component: currentComponent
            });
            const resolvedLocale = typeof locale === "string" ? locale : locale({
                component: currentComponent,
                locales
            });
            let replaceComponent;
            if (resolvedLocale) {
                replaceComponent = locales[resolvedLocale];
            }
            if (replaceComponent == null ? void 0 : replaceComponent.length) {
                const [first, ...rest] = replaceComponent;
                actions.replaceComponent(first);
                if (rest.length) {
                    actions.insertAfter(rest);
                }
            } else {
                actions.removeComponent();
            }
        }
    });
}
// src/enhancement/UniqueBatchEntries.ts
var UniqueBatchEntries = class {
    constructor(entries, uniqueKeySelector){
        this.groups = entries.reduce((acc, task)=>{
            var _a;
            const key = uniqueKeySelector(task.args);
            acc[key] = (_a = acc[key]) != null ? _a : [];
            acc[key].push(task);
            return acc;
        }, {});
    }
    /** Resolves all entries in a group key with the same result value. */ resolveKey(key, result) {
        this.groups[key].forEach((task)=>task.resolve(result));
    }
    /** Resolves all remaining entries that have not been otherwise resolved with a specific value */ resolveRemaining(value) {
        Object.keys(this.groups).forEach((key)=>{
            this.groups[key].forEach((task)=>{
                if (!task.isCompleted) {
                    task.resolve(value);
                }
            });
        });
    }
};
// src/utils/hash.ts
var generateHash = ({ composition, secret })=>{
    if (!secret) {
        return void 0;
    }
    const str = `${JSON.stringify(composition)}-${secret}`;
    let hash = 0;
    for(let i = 0; i < str.length; i++){
        const chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
};
// src/messaging/channel.ts
var isSelectComponentMessage = (message)=>{
    return message.type === "select-component" && message.id !== void 0;
};
var isReadyMessage = (message)=>{
    return message.type === "ready";
};
var isUpdateCompositionMessage = (message)=>{
    return message.type === "update-composition";
};
var isUpdateCompositionInternalMessage = (message)=>{
    return message.type === "update-composition-internal";
};
var isAddComponentMessage = (message)=>{
    return message.type === "add-component";
};
var isMovingComponentMessage = (message)=>{
    return message.type === "move-component";
};
var isUpdateComponentParameterMessage = (message)=>{
    return message.type === "update-component-parameter";
};
var isDismissPlaceholderMessage = (message)=>{
    return message.type === "dismiss-placeholder";
};
var isTriggerCompositionActionMessage = (message)=>{
    return message.type === "trigger-composition-action";
};
var isUpdatePreviewSettingsMessage = (message)=>{
    return message.type === "update-preview-settings";
};
var isUpdateContextualEditingStateInternalMessage = (message)=>{
    return message.type === "update-contextual-editing-state-internal";
};
var isReportRenderedCompositionsMessage = (message)=>{
    return message.type === "report-rendered-compositions";
};
var isSelectParameterMessage = (message)=>{
    return message.type === "select-parameter";
};
var createCanvasChannel = ({ listenTo, broadcastTo })=>{
    let handlerCounter = 0;
    const handlers = {};
    const broadcastToItems = [
        ...broadcastTo
    ];
    const postMessage = (message)=>{
        broadcastToItems.forEach((item)=>item.postMessage(JSON.stringify(message), "*"));
    };
    const selectComponent = (id)=>{
        const message = {
            type: "select-component",
            id
        };
        postMessage(message);
    };
    const ready = ()=>{
        var _a, _b;
        if (true) {
            return;
        }
        const framework = (_a = window.__UNIFORM_CONTEXTUAL_EDITING__) == null ? void 0 : _a.framework;
        const version = (_b = window.__UNIFORM_CONTEXTUAL_EDITING__) == null ? void 0 : _b.version;
        const message = {
            type: "ready",
            framework,
            version
        };
        postMessage(message);
    };
    const on = (types, handler)=>{
        const handlerId = ++handlerCounter;
        handlers[handlerId] = {
            types: Array.isArray(types) ? types : [
                types
            ],
            handler
        };
        return ()=>{
            delete handlers[handlerId];
        };
    };
    const updateComposition = (composition, secret)=>{
        const message = {
            type: "update-composition",
            composition,
            hash: generateHash({
                composition,
                secret
            })
        };
        postMessage(message);
    };
    const updateCompositionInternal = (composition, hash)=>{
        const message = {
            type: "update-composition-internal",
            composition,
            hash
        };
        postMessage(message);
    };
    const addComponent = (options)=>{
        const message = {
            ...options,
            type: "add-component"
        };
        postMessage(message);
    };
    const moveComponent = (options)=>{
        const message = {
            ...options,
            type: "move-component"
        };
        postMessage(message);
    };
    const updateComponentParameter = (options)=>{
        const message = {
            ...options,
            type: "update-component-parameter"
        };
        postMessage(message);
    };
    const dismissPlaceholder = (options)=>{
        const message = {
            ...options,
            type: "dismiss-placeholder"
        };
        postMessage(message);
    };
    const triggerCompositionAction = (options)=>{
        const message = {
            ...options,
            type: "trigger-composition-action"
        };
        postMessage(message);
    };
    const updatePreviewSettings = (options)=>{
        const message = {
            ...options,
            type: "update-preview-settings"
        };
        postMessage(message);
    };
    const updateContextualEditingStateInternal = (options)=>{
        const message = {
            ...options,
            type: "update-contextual-editing-state-internal"
        };
        postMessage(message);
    };
    const reportRenderedCompositions = (options)=>{
        const message = {
            ...options,
            type: "report-rendered-compositions"
        };
        postMessage(message);
    };
    const selectParameter = (options)=>{
        const message = {
            ...options,
            type: "select-parameter"
        };
        postMessage(message);
    };
    const editorStateUpdated = ()=>{
        const message = {
            type: "editor-state-updated"
        };
        postMessage(message);
    };
    const messageEventListener = (event)=>{
        if (typeof event.data !== "string") {
            return;
        }
        let message = null;
        try {
            const parsedMessage = JSON.parse(event.data);
            if (Object.hasOwn(parsedMessage, "type")) {
                message = parsedMessage;
            }
        } catch (e) {}
        if (!message) {
            return;
        }
        for(const handlerId in handlers){
            const handler = handlers[handlerId];
            if (handler.types.includes(message.type)) {
                handler.handler(message, event);
            }
        }
    };
    listenTo.forEach((item)=>item.addEventListener("message", messageEventListener));
    const destroy = ()=>{
        listenTo.forEach((item)=>item.removeEventListener("message", messageEventListener));
    };
    return {
        ready,
        destroy,
        selectComponent,
        updateComposition,
        updateCompositionInternal,
        on,
        addComponent,
        moveComponent,
        updateComponentParameter,
        dismissPlaceholder,
        triggerCompositionAction,
        updatePreviewSettings,
        updateContextualEditingStateInternal,
        selectParameter,
        reportRenderedCompositions,
        editorStateUpdated
    };
};
// src/preview/createEventBus.ts
var PUSHER_SRC = "https://js.pusher.com/7.0.3/pusher.min.js";
async function loadPusher() {
    if (typeof document === "undefined" || "undefined" === "undefined") {
        return;
    }
    if (window.Pusher) {
        return window.Pusher;
    }
    return new Promise((resolve, reject)=>{
        const timeout = setTimeout(()=>{
            if (window.Pusher) {
                resolve(window.Pusher);
            }
            reject(`Unable to load pusher.js; Uniform Canvas live preview disabled. Consider adding <script src="${PUSHER_SRC}"></script> manually.`);
        }, 5e3);
        const pusher = document.createElement("script");
        pusher.src = PUSHER_SRC;
        pusher.addEventListener("load", ()=>{
            clearTimeout(timeout);
            resolve(window.Pusher);
        });
        document.head.appendChild(pusher);
    });
}
async function createEventBus() {
    const WindowPusher = await loadPusher();
    if (!WindowPusher) {
        return;
    }
    let bus = window.__UNIFORM_EVENT_BUS__;
    if (!bus) {
        const pusher = new WindowPusher("7b5f5abd160fea549ffe", {
            cluster: "mt1"
        });
        pusher.connect();
        console.log("[canvas] \uD83D\uDD25 preview connected");
        bus = window.__UNIFORM_EVENT_BUS__ = {
            subscribe: (channel)=>{
                const channelObj = pusher.subscribe(channel);
                return {
                    unsubscribe: ()=>pusher.unsubscribe(channel),
                    addEventHandler: (eventName, handler)=>{
                        channelObj.bind(eventName, handler);
                        return ()=>channelObj.unbind(eventName, handler);
                    }
                };
            }
        };
    }
    return bus;
}
// src/preview/getChannelName.ts
function getChannelName(projectId, compositionId, state) {
    return `${projectId}.${compositionId}@${state}`;
}
// src/preview/subscribeToComposition.ts
function subscribeToComposition({ projectId, compositionId, compositionState = 0, eventBus: { subscribe }, callback, event = "updated" }) {
    const channelName = getChannelName(projectId, compositionId, compositionState);
    const channel = subscribe(channelName);
    const off = channel.addEventHandler(event, callback);
    return ()=>{
        off();
        channel.unsubscribe();
    };
}
// src/RouteClient.ts

var ROUTE_URL = "/api/v1/route";
var RouteClient = class extends _uniformdev_context_api__WEBPACK_IMPORTED_MODULE_0__/* .ApiClient */ .Sl {
    constructor(options){
        var _a;
        if (!options.limitPolicy) {
            options.limitPolicy = createLimitPolicy({});
        }
        super(options);
        this.edgeApiHost = (_a = options.edgeApiHost) != null ? _a : "https://uniform.global";
    }
    /** Fetches lists of Canvas compositions, optionally by type */ async getRoute(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(ROUTE_URL, {
            ...options,
            projectId
        }, this.edgeApiHost);
        return await this.apiClient(fetchUri);
    }
};
// src/utils/createApiEnhancer.ts
var createUniformApiEnhancer = ({ apiUrl })=>{
    return async (message)=>{
        const response = await fetch(apiUrl, {
            method: "post",
            body: JSON.stringify({
                composition: message.composition,
                hash: message.hash
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        if (!response.ok) {
            throw new Error("Error reading enhanced composition");
        }
        const body = json;
        return body.composition;
    };
};
// src/utils/getParameterAttributes.ts
var ATTRIBUTE_COMPONENT_ID = "data-uniform-component-id";
var ATTRIBUTE_PARAMETER_ID = "data-uniform-parameter-id";
var ATTRIBUTE_PARAMETER_VALUE = "data-uniform-parameter-value";
var ATTRIBUTE_PARAMETER_TYPE = "data-uniform-parameter-type";
var ATTRIBUTE_PLACEHOLDER = "data-uniform-placeholder";
var ATTRIBUTE_MULTILINE = "data-uniform-is-multiline";
var getParameterAttributes = ({ id, component, placeholder, isMultiline = false })=>{
    var _a, _b, _c;
    const componentId = component == null ? void 0 : component._id;
    const parameter = (_a = component == null ? void 0 : component.parameters) == null ? void 0 : _a[id];
    const value = parameter == null ? void 0 : parameter.value;
    const type = parameter == null ? void 0 : parameter.type;
    const isEditable = (_c = (_b = parameter == null ? void 0 : parameter._contextualEditing) == null ? void 0 : _b.isEditable) != null ? _c : false;
    return {
        [ATTRIBUTE_COMPONENT_ID]: componentId,
        [ATTRIBUTE_PARAMETER_ID]: id,
        [ATTRIBUTE_PARAMETER_VALUE]: String(value != null ? value : ""),
        [ATTRIBUTE_PARAMETER_TYPE]: type,
        [ATTRIBUTE_PLACEHOLDER]: placeholder,
        [ATTRIBUTE_MULTILINE]: isMultiline,
        contentEditable: isEditable
    };
};
// src/utils/isSystemComponentDefinition.ts
var isSystemComponentDefinition = (componentType)=>{
    return componentType.startsWith("$");
};
// src/utils/mapSlotToPersonalizedVariations.ts
function mapSlotToPersonalizedVariations(slot) {
    if (!slot) return [];
    return slot.map((v, i)=>{
        var _a, _b;
        const contextTag = (_b = (_a = v.parameters) == null ? void 0 : _a[CANVAS_PERSONALIZATION_PARAM]) == null ? void 0 : _b.value;
        const id = (contextTag == null ? void 0 : contextTag.name) || `pz-${i}-${v.type}`;
        return {
            ...v,
            id,
            pz: contextTag
        };
    });
}
// src/utils/mapSlotToTestVariations.ts
function mapSlotToTestVariations(slot) {
    if (!slot) return [];
    return slot.map((v, i)=>{
        var _a, _b, _c;
        const contextTag = (_b = (_a = v.parameters) == null ? void 0 : _a[CANVAS_TEST_VARIANT_PARAM]) == null ? void 0 : _b.value;
        const id = (_c = contextTag == null ? void 0 : contextTag.id) != null ? _c : "testId" in v ? v.testId : `ab-${i}-${v.type}`;
        return {
            ...v,
            id
        };
    });
}
// src/utils/variables/parseVariableExpression.ts
var escapeCharacter = "\\";
var variablePrefix = "${";
var variableSuffix = "}";
function parseVariableExpression(serialized, onToken) {
    let bufferStartIndex = 0;
    let bufferEndIndex = 0;
    let tokenCount = 0;
    const handleToken = (token, type)=>{
        tokenCount++;
        return onToken == null ? void 0 : onToken(token, type);
    };
    let state = "text";
    for(let index = 0; index < serialized.length; index++){
        const char = serialized[index];
        if (bufferStartIndex > bufferEndIndex) {
            bufferEndIndex = bufferStartIndex;
        }
        if (char === variablePrefix[0] && serialized[index + 1] === variablePrefix[1]) {
            if (serialized[index - 1] === escapeCharacter) {
                bufferEndIndex -= escapeCharacter.length;
                if (handleToken(serialized.substring(bufferStartIndex, bufferEndIndex), "text") === false) {
                    return tokenCount;
                }
                bufferStartIndex = index;
                bufferEndIndex = index + 1;
                continue;
            }
            state = "variable";
            if (bufferEndIndex > bufferStartIndex) {
                if (handleToken(serialized.substring(bufferStartIndex, bufferEndIndex), "text") === false) {
                    return tokenCount;
                }
                bufferStartIndex = bufferEndIndex;
            }
            index += variablePrefix.length - 1;
            bufferStartIndex += variablePrefix.length;
            continue;
        }
        if (char === variableSuffix && state === "variable") {
            state = "text";
            if (bufferEndIndex > bufferStartIndex) {
                if (handleToken(serialized.substring(bufferStartIndex, bufferEndIndex), "variable") === false) {
                    return tokenCount;
                }
                bufferStartIndex = bufferEndIndex + variableSuffix.length;
            }
            continue;
        }
        bufferEndIndex++;
    }
    if (bufferEndIndex > bufferStartIndex) {
        if (state === "variable") {
            state = "text";
            bufferStartIndex -= variablePrefix.length;
        }
        handleToken(serialized.substring(bufferStartIndex), state);
    }
    return tokenCount;
}
// src/utils/variables/bindVariables.ts
function bindVariables({ variables, value, errorPrefix = "Variable", handleBinding }) {
    let boundCount = 0;
    let tokenCount = 0;
    const errors = [];
    const defaultHandleBinding = (variableName, variables2, errors2)=>{
        const variableValue = variables2[variableName];
        if (variableValue === void 0) {
            errors2.push(`${errorPrefix} "${variableName}" is not defined`);
            return "";
        }
        return variableValue;
    };
    const result = [];
    parseVariableExpression(value, (token, tokenType)=>{
        tokenCount++;
        if (tokenType === "text") {
            result.push(token);
            return;
        }
        const variableValue = (handleBinding != null ? handleBinding : defaultHandleBinding)(token, variables, errors);
        boundCount++;
        result.push(variableValue);
    });
    return {
        result: tokenCount === 1 ? result[0] : result.join(""),
        boundCount,
        errors: errors.length > 0 ? errors : void 0
    };
}
// src/utils/variables/bindVariablesToObject.ts

// src/utils/variables/createVariableReference.ts
function createVariableReference(variableName) {
    return `\${${variableName}}`;
}
// src/utils/variables/bindVariablesToObject.ts
function bindVariablesToObject(options) {
    return bindVariablesToObjectRecursive(options);
}
function bindVariablesToObjectRecursive({ value, recursivePath, ...bindVariablesOptions }) {
    let boundCount = 0;
    const errors = [];
    if (typeof value === "string") {
        return bindVariables({
            ...bindVariablesOptions,
            value
        });
    }
    if (typeof value !== "object" || value === null) {
        return {
            boundCount: 0,
            result: value
        };
    }
    const richTextNodeResult = handleRichTextNodeBinding(value, bindVariablesOptions);
    if (richTextNodeResult !== void 0) {
        return richTextNodeResult;
    }
    const result = produce(value, (draft)=>{
        Object.entries(draft).forEach(([property, oldValue])=>{
            const currentObjectPath = recursivePath ? `${recursivePath}.${property}` : property;
            if (typeof oldValue === "string") {
                const bindResult = bindVariables({
                    ...bindVariablesOptions,
                    value: oldValue
                });
                if (oldValue !== bindResult.result || bindResult.errors) {
                    boundCount += bindResult.boundCount;
                    draft[property] = bindResult.result;
                    if (bindResult.errors) {
                        errors.push(...bindResult.errors.map((e)=>`${currentObjectPath}: ${e}`));
                    }
                }
                return;
            }
            const childBind = bindVariablesToObjectRecursive({
                ...bindVariablesOptions,
                value: oldValue,
                recursivePath: currentObjectPath
            });
            if (childBind.boundCount || childBind.errors) {
                boundCount += childBind.boundCount;
                draft[property] = childBind.result;
                if (childBind.errors) {
                    errors.push(...childBind.errors);
                }
            }
        });
    });
    return {
        boundCount,
        result,
        errors: errors.length > 0 ? errors : void 0
    };
}
function handleRichTextNodeBinding(object, options) {
    if ("type" in object && object.type === "variable" && "reference" in object && typeof object.reference === "string" && "version" in object && object.version === 1) {
        const value = createVariableReference(object.reference);
        const bindResult = bindVariables({
            ...options,
            value
        });
        const bindResultAsTextNode = {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: bindResult.result,
            type: "text",
            version: 1
        };
        return {
            ...bindResult,
            result: bindResultAsTextNode
        };
    }
    return void 0;
}
// src/index.ts

var CanvasClientError = (/* unused pure expression or super */ null && (ApiClientError2));



/***/ }),

/***/ 22733:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GY: () => (/* binding */ ApiClientError),
/* harmony export */   Mn: () => (/* binding */ ManifestClient),
/* harmony export */   Sl: () => (/* binding */ ApiClient)
/* harmony export */ });
/* unused harmony exports AggregateClient, CachedAggregateClient, CachedContextClient, CachedDimensionClient, CachedEnrichmentClient, CachedManifestClient, CachedQuirkClient, CachedSignalClient, CachedTestClient, ContextClient, DimensionClient, EnrichmentClient, QuirkClient, SignalClient, TestClient, UncachedAggregateClient, UncachedContextClient, UncachedDimensionClient, UncachedEnrichmentClient, UncachedManifestClient, UncachedQuirkClient, UncachedSignalClient, UncachedTestClient, computeDimensionDefinitionDisplayData, computeDimensionDisplayData, computeDimensionDisplayName, defaultLimitPolicy, handleRateLimits, nullLimitPolicy */
/* harmony import */ var p_limit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21173);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
var __accessCheck = (obj, member, msg)=>{
    if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter)=>{
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value)=>{
    if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
// src/api/apiClientUtils.ts

var nullLimitPolicy = async (func)=>await func();
var defaultLimitPolicy = p_limit__WEBPACK_IMPORTED_MODULE_0__(6);
var ApiClientError = class _ApiClientError extends Error {
    constructor(errorMessage, fetchMethod, fetchUri, statusCode, statusText, requestId){
        super(`${errorMessage}
 ${statusCode}${statusText ? " " + statusText : ""} (${fetchMethod} ${fetchUri}${requestId ? ` Request ID: ${requestId}` : ""})`);
        this.errorMessage = errorMessage;
        this.fetchMethod = fetchMethod;
        this.fetchUri = fetchUri;
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.requestId = requestId;
        Object.setPrototypeOf(this, _ApiClientError.prototype);
    }
};
// src/api/ApiClient.ts
var ApiClient = class _ApiClient {
    constructor(options){
        __publicField(this, "options");
        var _a, _b, _c, _d, _e;
        if (!options.apiKey && !options.bearerToken) {
            throw new Error("You must provide an API key or a bearer token");
        }
        let leFetch = options.fetch;
        if (!leFetch) {
            if (false) {} else if (typeof fetch !== "undefined") {
                leFetch = fetch;
            } else {
                throw new Error("You must provide or polyfill a fetch implementation when not in a browser");
            }
        }
        this.options = {
            ...options,
            fetch: leFetch,
            apiHost: this.ensureApiHost(options.apiHost),
            apiKey: (_a = options.apiKey) != null ? _a : null,
            projectId: (_b = options.projectId) != null ? _b : null,
            bearerToken: (_c = options.bearerToken) != null ? _c : null,
            limitPolicy: (_d = options.limitPolicy) != null ? _d : defaultLimitPolicy,
            bypassCache: (_e = options.bypassCache) != null ? _e : false
        };
    }
    async apiClient(fetchUri, options) {
        return this.options.limitPolicy(async ()=>{
            var _a;
            const coreHeaders = this.options.apiKey ? {
                "x-api-key": this.options.apiKey
            } : {
                Authorization: `Bearer ${this.options.bearerToken}`
            };
            if (this.options.bypassCache) {
                coreHeaders["x-bypass-cache"] = "true";
            }
            const { fetch: fetch2 } = this.options;
            const callApi = ()=>fetch2(fetchUri.toString(), {
                    ...options,
                    headers: {
                        ...options == null ? void 0 : options.headers,
                        ...coreHeaders
                    }
                });
            const apiResponse = await handleRateLimits(callApi);
            if (!apiResponse.ok) {
                let message = "";
                try {
                    const responseText = await apiResponse.text();
                    try {
                        const parsed = JSON.parse(responseText);
                        if (parsed.errorMessage) {
                            message = Array.isArray(parsed.errorMessage) ? parsed.errorMessage.join(", ") : parsed.errorMessage;
                        } else {
                            message = responseText;
                        }
                    } catch (e) {
                        message = responseText;
                    }
                } catch (e) {
                    message = `General error`;
                }
                throw new ApiClientError(message, (_a = options == null ? void 0 : options.method) != null ? _a : "GET", fetchUri.toString(), apiResponse.status, apiResponse.statusText, _ApiClient.getRequestId(apiResponse));
            }
            if (options == null ? void 0 : options.expectNoContent) {
                return null;
            }
            return await apiResponse.json();
        });
    }
    createUrl(path, queryParams, hostOverride) {
        const url = new URL(`${hostOverride != null ? hostOverride : this.options.apiHost}${path}`);
        Object.entries(queryParams != null ? queryParams : {}).forEach(([key, value])=>{
            var _a;
            if (typeof value !== "undefined" && value !== null) {
                url.searchParams.append(key, Array.isArray(value) ? value.join(",") : (_a = value == null ? void 0 : value.toString()) != null ? _a : "");
            }
        });
        return url;
    }
    ensureApiHost(apiHost) {
        if (!apiHost) return "https://uniform.app";
        if (!(apiHost == null ? void 0 : apiHost.startsWith("http"))) {
            throw new Error('Your apiHost must start with "http"');
        }
        if (apiHost.indexOf("/", 8) > -1) {
            throw new Error("Your apiHost must not contain a path element after the domain");
        }
        if (apiHost.indexOf("?") > -1) {
            throw new Error("Your apiHost must not contain a query string");
        }
        if (apiHost == null ? void 0 : apiHost.endsWith("/")) {
            apiHost = apiHost.substring(0, apiHost.length - 1);
        }
        return apiHost;
    }
    static getRequestId(response) {
        const apigRequestId = response.headers.get("apigw-requestid");
        if (apigRequestId) {
            return apigRequestId;
        }
        return void 0;
    }
};
async function handleRateLimits(callApi) {
    var _a;
    const backoffRetries = 5;
    let backoffRetriesLeft = backoffRetries;
    let response;
    while(backoffRetriesLeft > 0){
        response = await callApi();
        if (response.status !== 429) {
            break;
        }
        let resetWait = 0;
        try {
            const dateHeader = response.headers.get("date");
            const serverTime = dateHeader ? new Date(dateHeader).getTime() : void 0;
            const body = await response.json();
            const resetTime = (_a = body == null ? void 0 : body.info) == null ? void 0 : _a.reset;
            if (typeof serverTime === "number" && typeof resetTime === "number") {
                resetWait = Math.max(0, Math.min(Math.round(1.1 * (resetTime - serverTime)), 1e4));
            }
        } catch (err) {}
        const base = Math.pow(2, backoffRetries - backoffRetriesLeft) * 333;
        const backoffWait = base + Math.round(Math.random() * (base / 2)) * (Math.random() > 0.5 ? 1 : -1);
        await new Promise((resolve)=>setTimeout(resolve, resetWait + backoffWait));
        backoffRetriesLeft -= 1;
    }
    return response;
}
// src/api/AggregateClient.ts
var _url;
var _AggregateClient = class _AggregateClient extends ApiClient {
    constructor(options){
        super(options);
    }
    /** Fetches all aggregates for a project */ async get(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(__privateGet(_AggregateClient, _url), {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
    /** Updates or creates (based on id) an Aggregate */ async upsert(body) {
        const fetchUri = this.createUrl(__privateGet(_AggregateClient, _url));
        await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    /** Deletes an Aggregate */ async remove(body) {
        const fetchUri = this.createUrl(__privateGet(_AggregateClient, _url));
        await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
};
_url = new WeakMap();
__privateAdd(_AggregateClient, _url, "/api/v2/aggregate");
var AggregateClient = (/* unused pure expression or super */ null && (_AggregateClient));
var UncachedAggregateClient = class extends (/* unused pure expression or super */ null && (AggregateClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
var CachedAggregateClient = class extends (/* unused pure expression or super */ null && (AggregateClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: false
        });
    }
};
// src/manifest/constants.ts
var ENR_SEPARATOR = "_";
// src/api/computeDimensionDisplayName.ts
function computeDimensionDefinitionDisplayData(dim) {
    const type = dim.category === "ENR" ? "Enrichment" : dim.category === "SIG" ? "Signal" : dim.subcategory === "1" ? "Intent" : dim.subcategory === "0" ? "Audience" : "Aggregate";
    return {
        dim: dim.dim,
        name: dim.name,
        type,
        category: dim.category === "ENR" ? dim.subcategory : void 0
    };
}
function computeDimensionDisplayData(dim, manifest) {
    var _a, _b, _c, _d;
    if ((_b = (_a = manifest.project.pz) == null ? void 0 : _a.agg) == null ? void 0 : _b[dim]) {
        return {
            dim,
            name: dim,
            type: "Aggregate"
        };
    } else if ((_d = (_c = manifest.project.pz) == null ? void 0 : _c.sig) == null ? void 0 : _d[dim]) {
        return {
            dim,
            name: dim,
            type: "Signal"
        };
    } else if (dim.indexOf(ENR_SEPARATOR) >= 0) {
        const [cat, value] = dim.split(ENR_SEPARATOR);
        return {
            dim,
            name: value,
            type: "Enrichment",
            category: cat
        };
    }
    return void 0;
}
function computeDimensionDisplayName(dim) {
    const { type, name } = computeDimensionDefinitionDisplayData(dim);
    return `${type}: ${name}`;
}
// src/api/DimensionClient.ts
var _url2;
var _DimensionClient = class _DimensionClient extends ApiClient {
    constructor(options){
        super(options);
    }
    /** Fetches the known score dimensions for a project */ async get(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(__privateGet(_DimensionClient, _url2), {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
};
_url2 = new WeakMap();
__privateAdd(_DimensionClient, _url2, "/api/v2/dimension");
var DimensionClient = (/* unused pure expression or super */ null && (_DimensionClient));
var UncachedDimensionClient = class extends (/* unused pure expression or super */ null && (DimensionClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
var CachedDimensionClient = class extends (/* unused pure expression or super */ null && (DimensionClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: false
        });
    }
};
// src/api/EnrichmentClient.ts
var _url3, _valueUrl;
var _EnrichmentClient = class _EnrichmentClient extends ApiClient {
    constructor(options){
        super(options);
    }
    /** Fetches all enrichments and values for a project, grouped by category */ async get(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(__privateGet(_EnrichmentClient, _url3), {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
    /** Updates or creates (based on id) an enrichment category */ async upsertCategory(body) {
        const fetchUri = this.createUrl(__privateGet(_EnrichmentClient, _url3));
        await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    /** Deletes an enrichment category */ async removeCategory(body) {
        const fetchUri = this.createUrl(__privateGet(_EnrichmentClient, _url3));
        await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    /** Updates or creates (based on id) an enrichment value within an enrichment category */ async upsertValue(body) {
        const fetchUri = this.createUrl(__privateGet(_EnrichmentClient, _valueUrl));
        await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    /** Deletes an enrichment value within an enrichment category. The category is left alone. */ async removeValue(body) {
        const fetchUri = this.createUrl(__privateGet(_EnrichmentClient, _valueUrl));
        await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
};
_url3 = new WeakMap();
_valueUrl = new WeakMap();
__privateAdd(_EnrichmentClient, _url3, "/api/v1/enrichments");
__privateAdd(_EnrichmentClient, _valueUrl, "/api/v1/enrichment-values");
var EnrichmentClient = (/* unused pure expression or super */ null && (_EnrichmentClient));
var UncachedEnrichmentClient = class extends (/* unused pure expression or super */ null && (EnrichmentClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
var CachedEnrichmentClient = class extends (/* unused pure expression or super */ null && (EnrichmentClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: false
        });
    }
};
// src/api/ManifestClient.ts
var _url4;
var _ManifestClient = class _ManifestClient extends ApiClient {
    constructor(options){
        super(options);
    }
    /** Fetches the Context manifest for a project */ async get(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(__privateGet(_ManifestClient, _url4), {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
    /** Publishes the Context manifest for a project */ async publish() {
        const { projectId } = this.options;
        const fetchUri = this.createUrl("/api/v1/publish", {
            siteId: projectId
        });
        await this.apiClient(fetchUri, {
            method: "POST",
            expectNoContent: true
        });
    }
};
_url4 = new WeakMap();
__privateAdd(_ManifestClient, _url4, "/api/v2/manifest");
var ManifestClient = _ManifestClient;
var UncachedManifestClient = class extends (/* unused pure expression or super */ null && (ManifestClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
var CachedManifestClient = class extends (/* unused pure expression or super */ null && (ManifestClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: false
        });
    }
};
// src/api/QuirkClient.ts
var _url5;
var _QuirkClient = class _QuirkClient extends ApiClient {
    constructor(options){
        super(options);
    }
    /** Fetches all Quirks for a project */ async get(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(__privateGet(_QuirkClient, _url5), {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
    /** Updates or creates (based on id) a Quirk */ async upsert(body) {
        const fetchUri = this.createUrl(__privateGet(_QuirkClient, _url5));
        await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    /** Deletes a Quirk */ async remove(body) {
        const fetchUri = this.createUrl(__privateGet(_QuirkClient, _url5));
        await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
};
_url5 = new WeakMap();
__privateAdd(_QuirkClient, _url5, "/api/v2/quirk");
var QuirkClient = (/* unused pure expression or super */ null && (_QuirkClient));
var UncachedQuirkClient = class extends (/* unused pure expression or super */ null && (QuirkClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
var CachedQuirkClient = class extends (/* unused pure expression or super */ null && (QuirkClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: false
        });
    }
};
// src/api/SignalClient.ts
var _url6;
var _SignalClient = class _SignalClient extends ApiClient {
    constructor(options){
        super(options);
    }
    /** Fetches all Signals for a project */ async get(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(__privateGet(_SignalClient, _url6), {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
    /** Updates or creates (based on id) a Signal */ async upsert(body) {
        const fetchUri = this.createUrl(__privateGet(_SignalClient, _url6));
        await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    /** Deletes a Signal */ async remove(body) {
        const fetchUri = this.createUrl(__privateGet(_SignalClient, _url6));
        await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
};
_url6 = new WeakMap();
__privateAdd(_SignalClient, _url6, "/api/v2/signal");
var SignalClient = (/* unused pure expression or super */ null && (_SignalClient));
var UncachedSignalClient = class extends (/* unused pure expression or super */ null && (SignalClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
var CachedSignalClient = class extends (/* unused pure expression or super */ null && (SignalClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: false
        });
    }
};
// src/api/TestClient.ts
var _url7;
var _TestClient = class _TestClient extends ApiClient {
    constructor(options){
        super(options);
    }
    /** Fetches all Tests for a project */ async get(options) {
        const { projectId } = this.options;
        const fetchUri = this.createUrl(__privateGet(_TestClient, _url7), {
            ...options,
            projectId
        });
        return await this.apiClient(fetchUri);
    }
    /** Updates or creates (based on id) a Test */ async upsert(body) {
        const fetchUri = this.createUrl(__privateGet(_TestClient, _url7));
        await this.apiClient(fetchUri, {
            method: "PUT",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
    /** Deletes a Test */ async remove(body) {
        const fetchUri = this.createUrl(__privateGet(_TestClient, _url7));
        await this.apiClient(fetchUri, {
            method: "DELETE",
            body: JSON.stringify({
                ...body,
                projectId: this.options.projectId
            }),
            expectNoContent: true
        });
    }
};
_url7 = new WeakMap();
__privateAdd(_TestClient, _url7, "/api/v2/test");
var TestClient = (/* unused pure expression or super */ null && (_TestClient));
var UncachedTestClient = class extends (/* unused pure expression or super */ null && (TestClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
var CachedTestClient = class extends (/* unused pure expression or super */ null && (TestClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: false
        });
    }
};
// src/api/ContextClient.ts
var ContextClient = class {
    constructor(options){
        __publicField(this, "enrichments");
        __publicField(this, "aggregates");
        __publicField(this, "dimensions");
        __publicField(this, "manifest");
        __publicField(this, "quirks");
        __publicField(this, "signals");
        __publicField(this, "tests");
        this.enrichments = new EnrichmentClient(options);
        this.aggregates = new AggregateClient(options);
        this.dimensions = new DimensionClient(options);
        this.manifest = new ManifestClient(options);
        this.quirks = new QuirkClient(options);
        this.signals = new SignalClient(options);
        this.tests = new TestClient(options);
    }
};
var UncachedContextClient = class extends (/* unused pure expression or super */ null && (ContextClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: true
        });
    }
};
var CachedContextClient = class extends (/* unused pure expression or super */ null && (ContextClient)) {
    constructor(options){
        super({
            ...options,
            bypassCache: false
        });
    }
};



/***/ }),

/***/ 49069:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U2: () => (/* binding */ W),
/* harmony export */   Xh: () => (/* binding */ k)
/* harmony export */ });
/* unused harmony exports createClient, digest, getAll, has */
/* harmony import */ var _vercel_edge_config_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93977);

var w = "@vercel/edge-config", y = "0.2.1";
var a = {
    UNEXPECTED: "@vercel/edge-config: Unexpected error",
    UNAUTHORIZED: "@vercel/edge-config: Unauthorized",
    NETWORK: "@vercel/edge-config: Network error",
    EDGE_CONFIG_NOT_FOUND: "@vercel/edge-config: Edge Config not found"
};
function C(e, n) {
    return Object.prototype.hasOwnProperty.call(e, n);
}
function P(e, n) {
    let i = {};
    return n.forEach((o)=>{
        i[o] = e[o];
    }), i;
}
function p(e) {
    if (typeof e != "string") throw new Error("@vercel/edge-config: Expected key to be a string");
}
function v(e) {
    if (!Array.isArray(e) || e.some((n)=>typeof n != "string")) throw new Error("@vercel/edge-config: Expected keys to be an array of string");
}
function l(e) {
    return typeof structuredClone == "function" ? structuredClone(e) : e === void 0 ? e : JSON.parse(JSON.stringify(e));
}
function k(e) {
    try {
        let n = new URL(e);
        if (n.host !== "edge-config.vercel.com" || n.protocol !== "https:" || !n.pathname.startsWith("/ecfg")) return null;
        let i = n.pathname.split("/")[1];
        if (!i) return null;
        let o = n.searchParams.get("token");
        return !o || o === "" ? null : {
            id: i,
            token: o
        };
    } catch  {
        return null;
    }
}
var u = (e)=>e instanceof Error && C(e, "digest") && e.digest === "DYNAMIC_SERVER_USAGE";
var R = new Map;
async function h(e, n = {}) {
    let { headers: i = new Headers, ...o } = n, d = i.get("Authorization"), r = `${e},${d || ""}`, s = R.get(r);
    if (s) {
        let { etag: U, response: D } = s, N = new Headers(i);
        N.set("If-None-Match", U);
        let g = await fetch(e, {
            ...o,
            headers: N
        });
        if (g.status === 304) return g.cachedResponseBody = JSON.parse(D), g;
        let x = g.headers.get("ETag");
        return g.ok && x && R.set(r, {
            etag: x,
            response: await g.clone().text()
        }), g;
    }
    let t = await fetch(e, n), c = t.headers.get("ETag");
    return t.ok && c && R.set(r, {
        etag: c,
        response: await t.clone().text()
    }), t;
}
async function E(e) {
    if (e.type !== "vercel" || !process.env.AWS_LAMBDA_FUNCTION_NAME) return null;
    try {
        let n = await (0,_vercel_edge_config_fs__WEBPACK_IMPORTED_MODULE_0__.readFile)(`/opt/edge-config/${e.id}.json`, "utf-8");
        return JSON.parse(n);
    } catch  {
        return null;
    }
}
async function T(e) {
    typeof EdgeRuntime == "undefined" && await e.arrayBuffer();
}
function A(e) {
    let n = e.startsWith("https://edge-config.vercel.com/"), i = n ? k(e) : null;
    if (n && i) return {
        type: "vercel",
        baseUrl: `https://edge-config.vercel.com/${i.id}`,
        id: i.id,
        version: "1",
        token: i.token
    };
    try {
        let o = new URL(e), d = o.searchParams.get("id"), r = o.searchParams.get("token"), s = o.searchParams.get("version") || "1";
        (!d || o.pathname.startsWith("/ecfg_")) && (d = o.pathname.split("/")[1] || null);
        for (let t of o.searchParams.keys())o.searchParams.delete(t);
        return !d || !r ? null : {
            type: "external",
            baseUrl: o.toString(),
            id: d,
            token: r,
            version: s
        };
    } catch  {
        return null;
    }
}
function j(e) {
    if (!e) throw new Error("@vercel/edge-config: No connection string provided");
    let n = A(e);
    if (!n) throw new Error("@vercel/edge-config: Invalid connection string provided");
    let i = n.baseUrl, o = n.version, d = {
        Authorization: `Bearer ${n.token}`
    };
    return typeof process != "undefined" && process.env.VERCEL_ENV && (d["x-edge-config-vercel-env"] = process.env.VERCEL_ENV), typeof w == "string" && typeof y == "string" && (d["x-edge-config-sdk"] = `${w}@${y}`), {
        async get (r) {
            let s = await E(n);
            return s ? (p(r), Promise.resolve(l(s.items[r]))) : (p(r), h(`${i}/item/${r}?version=${o}`, {
                headers: new Headers(d),
                cache: "no-store"
            }).then(async (t)=>{
                if (t.ok) return t.json();
                if (await T(t), t.status === 401) throw new Error(a.UNAUTHORIZED);
                if (t.status === 404) {
                    if (t.headers.has("x-edge-config-digest")) return;
                    throw new Error(a.EDGE_CONFIG_NOT_FOUND);
                }
                if (t.cachedResponseBody !== void 0) return t.cachedResponseBody;
                throw new Error(a.UNEXPECTED);
            }, (t)=>{
                throw u(t) ? t : new Error(a.NETWORK);
            }));
        },
        async has (r) {
            let s = await E(n);
            return s ? (p(r), Promise.resolve(C(s.items, r))) : (p(r), fetch(`${i}/item/${r}?version=${o}`, {
                method: "HEAD",
                headers: new Headers(d),
                cache: "no-store"
            }).then((t)=>{
                if (t.status === 401) throw new Error(a.UNAUTHORIZED);
                if (t.status === 404) {
                    if (t.headers.has("x-edge-config-digest")) return !1;
                    throw new Error(a.EDGE_CONFIG_NOT_FOUND);
                }
                if (t.ok) return !0;
                throw new Error(a.UNEXPECTED);
            }, (t)=>{
                throw u(t) ? t : new Error(a.NETWORK);
            }));
        },
        async getAll (r) {
            let s = await E(n);
            if (s) return r === void 0 ? Promise.resolve(l(s.items)) : (v(r), Promise.resolve(l(P(s.items, r))));
            Array.isArray(r) && v(r);
            let t = Array.isArray(r) ? new URLSearchParams(r.map((c)=>[
                    "key",
                    c
                ])).toString() : null;
            return t === "" ? Promise.resolve({}) : h(`${i}/items?version=${o}${t === null ? "" : `&${t}`}`, {
                headers: new Headers(d),
                cache: "no-store"
            }).then(async (c)=>{
                if (c.ok) return c.json();
                if (await T(c), c.status === 401) throw new Error(a.UNAUTHORIZED);
                if (c.status === 404) throw new Error(a.EDGE_CONFIG_NOT_FOUND);
                if (c.cachedResponseBody !== void 0) return c.cachedResponseBody;
                throw new Error(a.UNEXPECTED);
            }, (c)=>{
                throw u(c) ? c : new Error(a.NETWORK);
            });
        },
        async digest () {
            let r = await E(n);
            return r ? Promise.resolve(r.digest) : h(`${i}/digest?version=${o}`, {
                headers: new Headers(d),
                cache: "no-store"
            }).then(async (s)=>{
                if (s.ok) return s.json();
                if (await T(s), s.cachedResponseBody !== void 0) return s.cachedResponseBody;
                throw new Error(a.UNEXPECTED);
            }, (s)=>{
                throw u(s) ? s : new Error(a.NETWORK);
            });
        }
    };
}
var f;
function m() {
    f || (f = j(process.env.EDGE_CONFIG));
}
var W = (...e)=>(m(), f.get(...e)), B = (...e)=>(m(), f.getAll(...e)), G = (...e)=>(m(), f.has(...e)), V = (...e)=>(m(), f.digest(...e));



/***/ })

};
;