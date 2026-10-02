var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e2) => e2.name !== markName) : this._entries.filter((e2) => e2.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e2) => e2.name !== measureName) : this._entries.filter((e2) => e2.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e2) => e2.entryType !== "resource" || e2.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e2) => e2.name === name && (!type || e2.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e2) => e2.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../node_modules/.pnpm/@cloudflare+unenv-preset@2._9112b51035bdea59cc57bb2195a07ca4/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../node_modules/.pnpm/@cloudflare+unenv-preset@2._9112b51035bdea59cc57bb2195a07ca4/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../node_modules/.pnpm/wrangler@4.140.0_@types+node@22.20.4/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../node_modules/.pnpm/@cloudflare+unenv-preset@2._9112b51035bdea59cc57bb2195a07ca4/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../node_modules/.pnpm/wrangler@4.140.0_@types+node@22.20.4/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _worker.js/index.js
import { Buffer as t } from "node:buffer";
import { av as e, aN as s, b1 as a } from "./chunks/_/nitro.mjs";
import { setImmediate as i, clearImmediate as n } from "node:timers";
import "node:events";
import "cloudflare:workers";
globalThis._importMeta_ = { url: "file:///_entry.js", env: {} };
"global" in globalThis || (globalThis.global = globalThis);
var p = globalThis.process;
globalThis.process = p ? new Proxy(p, { get: /* @__PURE__ */ __name((t2, s2, a2) => Reflect.has(t2, s2) ? Reflect.get(t2, s2, a2) : Reflect.get(e, s2, a2), "get") }) : e, globalThis.Buffer || (globalThis.Buffer = t), globalThis.setImmediate || (globalThis.setImmediate = i), globalThis.clearImmediate || (globalThis.clearImmediate = n);
var o = { "/index.html": { type: "text/html;charset=utf-8", etag: '"92b1-FPhQOxcmlLj4JUEUgEdQ3czoMs0"', mtime: "2026-10-02T13:56:46.441Z", size: 37553, path: "../index.html" }, "/nitro.json": { type: "application/json", etag: '"12c-oj2cyqwBIKqarXnFpxbMyuAG3bA"', mtime: "2026-10-02T13:56:46.006Z", size: 300, path: "../nitro.json" }, "/_payload.json": { type: "application/json;charset=utf-8", etag: '"8f2-DEbeMHMiZ8bwjhQNL5TqGz7Ao1g"', mtime: "2026-10-02T13:56:46.574Z", size: 2290, path: "../_payload.json" }, "/ai/index.html": { type: "text/html;charset=utf-8", etag: '"a762-Q3IPxtv2lRNKF2mUdLUwVplISog"', mtime: "2026-10-02T13:56:46.579Z", size: 42850, path: "../ai/index.html" }, "/explore/index.html": { type: "text/html;charset=utf-8", etag: '"75b3-n/D4pftxRJJWTgSa/GGGdHLPonE"', mtime: "2026-10-02T13:56:46.580Z", size: 30131, path: "../explore/index.html" }, "/explore/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-PXEYtXSzjVNMUHd0lcjNEmvGaEA"', mtime: "2026-10-02T13:56:46.632Z", size: 69, path: "../explore/_payload.json" }, "/ai/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-PXEYtXSzjVNMUHd0lcjNEmvGaEA"', mtime: "2026-10-02T13:56:46.626Z", size: 69, path: "../ai/_payload.json" }, "/robots.txt": { type: "text/plain; charset=utf-8", etag: '"45-0UrXtjZV6JKvcJ1XNnawL1+ZFPo"', mtime: "2026-09-26T06:43:12.910Z", size: 69, path: "../robots.txt" }, "/fonts/unbounded-200.woff2": { type: "font/woff2", etag: '"4d10-1p8Lcit97aiIdxQDwYuEJASScio"', mtime: "2026-09-27T12:49:03.796Z", size: 19728, path: "../fonts/unbounded-200.woff2" }, "/fonts/dm-serif-display-400.woff2": { type: "font/woff2", etag: '"60a8-PSpDVSW4s1ZVHM5tCahigqTlmNg"', mtime: "2026-09-27T12:49:05.179Z", size: 24744, path: "../fonts/dm-serif-display-400.woff2" }, "/fonts/dm-serif-display-400-italic.woff2": { type: "font/woff2", etag: '"5ffc-tN4W9yXXQD3nF2bXTLee5/xH0bk"', mtime: "2026-09-27T12:49:05.331Z", size: 24572, path: "../fonts/dm-serif-display-400-italic.woff2" }, "/games/index.html": { type: "text/html;charset=utf-8", etag: '"56aa-54sF+7ZddW9HgNX0ZSpylMZ+5q0"', mtime: "2026-10-02T13:56:46.579Z", size: 22186, path: "../games/index.html" }, "/games/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-PXEYtXSzjVNMUHd0lcjNEmvGaEA"', mtime: "2026-10-02T13:56:46.626Z", size: 69, path: "../games/_payload.json" }, "/illustrations/index.html": { type: "text/html;charset=utf-8", etag: '"574e-vqqaADj93a3GTaLNVSzS0oxcDgU"', mtime: "2026-10-02T13:56:46.579Z", size: 22350, path: "../illustrations/index.html" }, "/illustrations/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-PXEYtXSzjVNMUHd0lcjNEmvGaEA"', mtime: "2026-10-02T13:56:46.626Z", size: 69, path: "../illustrations/_payload.json" }, "/movies/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-PXEYtXSzjVNMUHd0lcjNEmvGaEA"', mtime: "2026-10-02T13:56:46.626Z", size: 69, path: "../movies/_payload.json" }, "/movies/index.html": { type: "text/html;charset=utf-8", etag: '"56a0-iuQS+b5rTlKeQvQ0uFhY/hA9nY4"', mtime: "2026-10-02T13:56:46.579Z", size: 22176, path: "../movies/index.html" }, "/news/index.html": { type: "text/html;charset=utf-8", etag: '"6cab-l0aDff7QQzXzB2I50qZIPEk+sWI"', mtime: "2026-10-02T13:56:46.640Z", size: 27819, path: "../news/index.html" }, "/news/_payload.json": { type: "application/json;charset=utf-8", etag: '"8f2-0+AXZqwQSLQEDkUy2B7OvjRflDc"', mtime: "2026-10-02T13:56:46.648Z", size: 2290, path: "../news/_payload.json" }, "/test/index.html": { type: "text/html;charset=utf-8", etag: '"4aab-B4r158hD28ZX/SOHt6g04B0G8VY"', mtime: "2026-10-02T13:56:46.579Z", size: 19115, path: "../test/index.html" }, "/test/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-PXEYtXSzjVNMUHd0lcjNEmvGaEA"', mtime: "2026-10-02T13:56:46.626Z", size: 69, path: "../test/_payload.json" }, "/tools/index.html": { type: "text/html;charset=utf-8", etag: '"59a7-R0u2AuPxDHUCEghON3JNmhDignE"', mtime: "2026-10-02T13:56:46.579Z", size: 22951, path: "../tools/index.html" }, "/is-it-that/index.html": { type: "text/html; charset=utf-8", etag: '"482-tlugHqCfvPeICgZvo9SP2LjrGto"', mtime: "2026-10-02T13:43:59.101Z", size: 1154, path: "../is-it-that/index.html" }, "/fonts/unbounded-400.woff2": { type: "font/woff2", etag: '"4e6c-Vx2e22F+i6j6XQsnyP2+zY2Xtng"', mtime: "2026-09-27T12:49:03.902Z", size: 20076, path: "../fonts/unbounded-400.woff2" }, "/tools/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-PXEYtXSzjVNMUHd0lcjNEmvGaEA"', mtime: "2026-10-02T13:56:46.626Z", size: 69, path: "../tools/_payload.json" }, "/youtube/index.html": { type: "text/html;charset=utf-8", etag: '"5b16-NjRfYlqizjPQ13Bt9aR3CUKWlZE"', mtime: "2026-10-02T13:56:46.580Z", size: 23318, path: "../youtube/index.html" }, "/youtube/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-PXEYtXSzjVNMUHd0lcjNEmvGaEA"', mtime: "2026-10-02T13:56:46.632Z", size: 69, path: "../youtube/_payload.json" }, "/_nuxt/ai.CTG4qaOU.css": { type: "text/css; charset=utf-8", etag: '"159e-WP+qrXdWQb3b11edciMLaVqfp/A"', mtime: "2026-10-02T13:56:41.803Z", size: 5534, path: "../_nuxt/ai.CTG4qaOU.css" }, "/fonts/unbounded-900.woff2": { type: "font/woff2", etag: '"5290-PwEc5LtyeXtuB83WqvgVhDpUCIg"', mtime: "2026-09-27T12:49:05.062Z", size: 21136, path: "../fonts/unbounded-900.woff2" }, "/_nuxt/B4wCSF-E.js": { type: "text/javascript; charset=utf-8", etag: '"49f-9Ko3qDVfbAQqXXxFrif/Q8tlzQ0"', mtime: "2026-10-02T13:56:41.804Z", size: 1183, path: "../_nuxt/B4wCSF-E.js" }, "/_nuxt/B5IWTt7g.js": { type: "text/javascript; charset=utf-8", etag: '"41f-mObOJ81hfJA2q100hLDhKy1oyzo"', mtime: "2026-10-02T13:56:41.804Z", size: 1055, path: "../_nuxt/B5IWTt7g.js" }, "/_nuxt/A5XL6kat.js": { type: "text/javascript; charset=utf-8", etag: '"cc2-Uz4GArK6WcN7BUnvALC5K9LCZeA"', mtime: "2026-10-02T13:56:41.804Z", size: 3266, path: "../_nuxt/A5XL6kat.js" }, "/_nuxt/CaT738VQ.js": { type: "text/javascript; charset=utf-8", etag: '"4f7-VD8WT0/Ya8uc3781cIi19vtmLcM"', mtime: "2026-10-02T13:56:41.804Z", size: 1271, path: "../_nuxt/CaT738VQ.js" }, "/_nuxt/41vlkynO.js": { type: "text/javascript; charset=utf-8", etag: '"1ebc-gDSZgcZSC3CUWLR1SoNjAd9Y5h0"', mtime: "2026-10-02T13:56:41.804Z", size: 7868, path: "../_nuxt/41vlkynO.js" }, "/_nuxt/bu7KJTyd.js": { type: "text/javascript; charset=utf-8", etag: '"26d-Q1Tu4QfDnRIkBzOGh3uwS+ZKrGA"', mtime: "2026-10-02T13:56:41.804Z", size: 621, path: "../_nuxt/bu7KJTyd.js" }, "/_nuxt/BJrrMQY4.js": { type: "text/javascript; charset=utf-8", etag: '"368-SzHfiQODMcjMYDcnrQJKGDUwAQ8"', mtime: "2026-10-02T13:56:41.804Z", size: 872, path: "../_nuxt/BJrrMQY4.js" }, "/_nuxt/CDcg8tn0.js": { type: "text/javascript; charset=utf-8", etag: '"32b-XevOgtBAq4we4wO8VDP+CTE6TLE"', mtime: "2026-10-02T13:56:41.804Z", size: 811, path: "../_nuxt/CDcg8tn0.js" }, "/_nuxt/CjfrzGzW.js": { type: "text/javascript; charset=utf-8", etag: '"2002-LR04F19b5xGu01GRuoIeR1GuSaw"', mtime: "2026-10-02T13:56:41.804Z", size: 8194, path: "../_nuxt/CjfrzGzW.js" }, "/_nuxt/CKCH4-CM.js": { type: "text/javascript; charset=utf-8", etag: '"1299-TPBx9+nIOAoHmZqrx9uGSsrmsgI"', mtime: "2026-10-02T13:56:41.804Z", size: 4761, path: "../_nuxt/CKCH4-CM.js" }, "/_nuxt/Cn-JUk6K.js": { type: "text/javascript; charset=utf-8", etag: '"31e6-zzlDKZyskfyFKJoXOKvhKgdkNec"', mtime: "2026-10-02T13:56:41.805Z", size: 12774, path: "../_nuxt/Cn-JUk6K.js" }, "/_nuxt/CRSAywpS.js": { type: "text/javascript; charset=utf-8", etag: '"4b49-KR/+2TL+f7Indz5v1rpKRADkOrs"', mtime: "2026-10-02T13:56:41.805Z", size: 19273, path: "../_nuxt/CRSAywpS.js" }, "/_nuxt/default.CGZVruvD.css": { type: "text/css; charset=utf-8", etag: '"290d-QYooCtMiACNXYfE3SJMpfVgMhFE"', mtime: "2026-10-02T13:56:41.803Z", size: 10509, path: "../_nuxt/default.CGZVruvD.css" }, "/_nuxt/DDQSxWg9.js": { type: "text/javascript; charset=utf-8", etag: '"ec-SIaRkDTVWI6eUG9v991wYBlxtAM"', mtime: "2026-10-02T13:56:41.805Z", size: 236, path: "../_nuxt/DDQSxWg9.js" }, "/_nuxt/CyzqDnR8.js": { type: "text/javascript; charset=utf-8", etag: '"483b-CuHYoWHS/bsi5kD4++D3CQqPMBw"', mtime: "2026-10-02T13:56:41.804Z", size: 18491, path: "../_nuxt/CyzqDnR8.js" }, "/_nuxt/DNS_g9b0.js": { type: "text/javascript; charset=utf-8", etag: '"45d-lHrn0ybrvWGmTKip5aSgsT8eJa0"', mtime: "2026-10-02T13:56:41.804Z", size: 1117, path: "../_nuxt/DNS_g9b0.js" }, "/_nuxt/entry.DzKk3PdU.css": { type: "text/css; charset=utf-8", etag: '"1533-ixcCfEMr1ZudekPEX7Bc8Pi/24s"', mtime: "2026-10-02T13:56:41.793Z", size: 5427, path: "../_nuxt/entry.DzKk3PdU.css" }, "/_nuxt/explore.5Ycccudo.css": { type: "text/css; charset=utf-8", etag: '"161a-ersa11U50q8c+JQHqcKMn2XioR4"', mtime: "2026-10-02T13:56:41.803Z", size: 5658, path: "../_nuxt/explore.5Ycccudo.css" }, "/_nuxt/DzeXq8Cl.js": { type: "text/javascript; charset=utf-8", etag: '"4f4-xAj8VN4Z1iuT9iThDH6CZ9DpyNk"', mtime: "2026-10-02T13:56:41.804Z", size: 1268, path: "../_nuxt/DzeXq8Cl.js" }, "/_nuxt/games.9mKlv8BP.css": { type: "text/css; charset=utf-8", etag: '"47b-CbcPN6+9CGGDqQj6WwWk/tKpCU4"', mtime: "2026-10-02T13:56:41.803Z", size: 1147, path: "../_nuxt/games.9mKlv8BP.css" }, "/_nuxt/illustrations.ChxbN90D.css": { type: "text/css; charset=utf-8", etag: '"4c3-VxAmZapKgnHqij/6vFgQkRjIuGA"', mtime: "2026-10-02T13:56:41.803Z", size: 1219, path: "../_nuxt/illustrations.ChxbN90D.css" }, "/_nuxt/DiBHr3RI.js": { type: "text/javascript; charset=utf-8", etag: '"2adf-pr74TDYUCfhiHZnUDmAyfigVb0M"', mtime: "2026-10-02T13:56:41.804Z", size: 10975, path: "../_nuxt/DiBHr3RI.js" }, "/_nuxt/DZkqRtCx.js": { type: "text/javascript; charset=utf-8", etag: '"ff4-Rrt05EluMclrzOkM2iAVGV0efqk"', mtime: "2026-10-02T13:56:41.804Z", size: 4084, path: "../_nuxt/DZkqRtCx.js" }, "/_nuxt/index.DM6aWtlb.css": { type: "text/css; charset=utf-8", etag: '"540-qqdl8yfD31anQwZAqklBgma2Z5A"', mtime: "2026-10-02T13:56:41.803Z", size: 1344, path: "../_nuxt/index.DM6aWtlb.css" }, "/_nuxt/index.DxzV4Xnj.css": { type: "text/css; charset=utf-8", etag: '"e63-e2zHqTIi4UvKafkJ/xO9NMkcB+4"', mtime: "2026-10-02T13:56:41.803Z", size: 3683, path: "../_nuxt/index.DxzV4Xnj.css" }, "/_nuxt/movies.CmlxeIVo.css": { type: "text/css; charset=utf-8", etag: '"484-dsNM9D2haH0Lnd4OOv4NrthkkKo"', mtime: "2026-10-02T13:56:41.803Z", size: 1156, path: "../_nuxt/movies.CmlxeIVo.css" }, "/_nuxt/PageHeader.DHb3Cueh.css": { type: "text/css; charset=utf-8", etag: '"2d8-muoVXRqe0KRNxtShfyKwz57e8B0"', mtime: "2026-10-02T13:56:41.803Z", size: 728, path: "../_nuxt/PageHeader.DHb3Cueh.css" }, "/_nuxt/index.BuyYZl1U.css": { type: "text/css; charset=utf-8", etag: '"20ec-ylSMj4J5j5Z4k60lxCvMQfyKd7Q"', mtime: "2026-10-02T13:56:41.804Z", size: 8428, path: "../_nuxt/index.BuyYZl1U.css" }, "/_nuxt/PillButton.BLwxVC8E.css": { type: "text/css; charset=utf-8", etag: '"62c-DBqQHaMlwFaIyJWoBKenCl2dR8M"', mtime: "2026-10-02T13:56:41.804Z", size: 1580, path: "../_nuxt/PillButton.BLwxVC8E.css" }, "/_nuxt/J0zB4vH0.js": { type: "text/javascript; charset=utf-8", etag: '"418-nS3K7uq7S9dSvFoHp7nIe6hpFE0"', mtime: "2026-10-02T13:56:41.804Z", size: 1048, path: "../_nuxt/J0zB4vH0.js" }, "/_nuxt/youtube.B2x5HM7R.css": { type: "text/css; charset=utf-8", etag: '"1cc-mZ4h9tn6Tp8dex294zWiFV/ofLY"', mtime: "2026-10-02T13:56:41.804Z", size: 460, path: "../_nuxt/youtube.B2x5HM7R.css" }, "/_nuxt/_slug_.B9Qsd7vI.css": { type: "text/css; charset=utf-8", etag: '"8fc-KaN+SLGogeIDUpirMG2Y6uteuUA"', mtime: "2026-10-02T13:56:41.803Z", size: 2300, path: "../_nuxt/_slug_.B9Qsd7vI.css" }, "/_nuxt/HAuj5i8y.js": { type: "text/javascript; charset=utf-8", etag: '"ce-8ZXRlthuQEXCQJAmXHQZ1Gymx3Y"', mtime: "2026-10-02T13:56:41.804Z", size: 206, path: "../_nuxt/HAuj5i8y.js" }, "/is-it-that/assets/eye.webm": { type: "video/webm", etag: '"c3f-hbO8kquBjd+SYRLVAXAguaCT4GA"', mtime: "2026-10-01T20:56:53.342Z", size: 3135, path: "../is-it-that/assets/eye.webm" }, "/_nuxt/syWnGQG3.js": { type: "text/javascript; charset=utf-8", etag: '"761-jBb2VuOOBpeTf50NakERp0TO8ko"', mtime: "2026-10-02T13:56:41.804Z", size: 1889, path: "../_nuxt/syWnGQG3.js" }, "/is-it-that/assets/somewhat-creepy-face-a.webm": { type: "video/webm", etag: '"115d-pmK4emVnhtdbQNcngIsHLjtF+uQ"', mtime: "2026-09-30T21:21:43.470Z", size: 4445, path: "../is-it-that/assets/somewhat-creepy-face-a.webm" }, "/news/our-ai-usage/index.html": { type: "text/html;charset=utf-8", etag: '"863a-urGWQDPSIKEB0b+EzbtjbrdxoaA"', mtime: "2026-10-02T13:56:46.732Z", size: 34362, path: "../news/our-ai-usage/index.html" }, "/news/our-ai-usage/_payload.json": { type: "application/json;charset=utf-8", etag: '"b2c-9EqP9CzvxaqAduKopYQP4er2wtU"', mtime: "2026-10-02T13:56:46.738Z", size: 2860, path: "../news/our-ai-usage/_payload.json" }, "/news/website-overhaul/index.html": { type: "text/html;charset=utf-8", etag: '"85bc-y7Vsp4RALSB7Aodz3nOyfSvBuYU"', mtime: "2026-10-02T13:56:46.772Z", size: 34236, path: "../news/website-overhaul/index.html" }, "/_nuxt/_slug_.D9KEDFqY.css": { type: "text/css; charset=utf-8", etag: '"2436-K2XpiZjUXRorcfiy/EWKUAjny+8"', mtime: "2026-10-02T13:56:41.803Z", size: 9270, path: "../_nuxt/_slug_.D9KEDFqY.css" }, "/news/website-overhaul/_payload.json": { type: "application/json;charset=utf-8", etag: '"abf-YPK8fwTFwoxDpsHg5QCGzF83Vms"', mtime: "2026-10-02T13:56:46.776Z", size: 2751, path: "../news/website-overhaul/_payload.json" }, "/news/new-video-dropping-soon/index.html": { type: "text/html;charset=utf-8", etag: '"8093-7pW8DeYQ9bfnOX/OhUpwZLQoR5U"', mtime: "2026-10-02T13:56:46.735Z", size: 32915, path: "../news/new-video-dropping-soon/index.html" }, "/news/new-video-dropping-soon/_payload.json": { type: "application/json;charset=utf-8", etag: '"3ee-4ySARPRTr27jWE0ef6YHUb7LcLE"', mtime: "2026-10-02T13:56:46.738Z", size: 1006, path: "../news/new-video-dropping-soon/_payload.json" }, "/news/what-even-is-sinth/index.html": { type: "text/html;charset=utf-8", etag: '"8471-pNP44z+9rA8AtP43kAOl64J5Bfo"', mtime: "2026-10-02T13:56:46.846Z", size: 33905, path: "../news/what-even-is-sinth/index.html" }, "/news/what-even-is-sinth/_payload.json": { type: "application/json;charset=utf-8", etag: '"8a4-hruXtcZtIkNFVvaR4YxrYbbqqvo"', mtime: "2026-10-02T13:56:46.850Z", size: 2212, path: "../news/what-even-is-sinth/_payload.json" }, "/tools/sinth/index.html": { type: "text/html;charset=utf-8", etag: '"5e44-AgJ55SiCwWWGJZLm5VKI+oMlbmo"', mtime: "2026-10-02T13:56:46.633Z", size: 24132, path: "../tools/sinth/index.html" }, "/tools/sinth/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-D5ezeRKf7QHYAL8/Cq5qDNfZbgE"', mtime: "2026-10-02T13:56:46.640Z", size: 69, path: "../tools/sinth/_payload.json" }, "/tools/not-finished-yet/index.html": { type: "text/html;charset=utf-8", etag: '"5a89-JVpPUAKlxjpN1o3QsQqxlMWK4hI"', mtime: "2026-10-02T13:56:46.633Z", size: 23177, path: "../tools/not-finished-yet/index.html" }, "/tools/not-finished-yet/_payload.json": { type: "application/json;charset=utf-8", etag: '"45-D5ezeRKf7QHYAL8/Cq5qDNfZbgE"', mtime: "2026-10-02T13:56:46.640Z", size: 69, path: "../tools/not-finished-yet/_payload.json" }, "/is-it-that/assets/ball-jumping.webm": { type: "video/webm", etag: '"1120-a89fq9m/cO+ekOI1S07+0WTdDro"', mtime: "2026-09-30T21:22:14.602Z", size: 4384, path: "../is-it-that/assets/ball-jumping.webm" }, "/assets/extra/is-it-that/eye.webm": { type: "video/webm", etag: '"c3f-hbO8kquBjd+SYRLVAXAguaCT4GA"', mtime: "2026-10-01T20:56:53.342Z", size: 3135, path: "../assets/extra/is-it-that/eye.webm" }, "/assets/extra/is-it-that/somewhat-creepy-face-a.webm": { type: "video/webm", etag: '"115d-pmK4emVnhtdbQNcngIsHLjtF+uQ"', mtime: "2026-09-30T21:21:43.470Z", size: 4445, path: "../assets/extra/is-it-that/somewhat-creepy-face-a.webm" }, "/_nuxt/builds/latest.json": { type: "application/json", etag: '"47-JiPsrh8n5UN1mejiP8jGV+oHiDw"', mtime: "2026-10-02T13:56:47.484Z", size: 71, path: "../_nuxt/builds/latest.json" }, "/assets/extra/is-it-that/ball-jumping.webm": { type: "video/webm", etag: '"1120-a89fq9m/cO+ekOI1S07+0WTdDro"', mtime: "2026-09-30T21:22:14.602Z", size: 4384, path: "../assets/extra/is-it-that/ball-jumping.webm" }, "/assets/images/explore/coding.png": { type: "image/png", etag: '"684d-WYRAWHnkrDNnlK7E0owu6tBQduU"', mtime: "2026-10-01T14:02:34.653Z", size: 26701, path: "../assets/images/explore/coding.png" }, "/assets/images/explore/playground.png": { type: "image/png", etag: '"8e36-9M3Zufv+hk3CstU5zVQgh0MKCiQ"', mtime: "2026-10-01T14:02:32.118Z", size: 36406, path: "../assets/images/explore/playground.png" }, "/assets/images/explore/coding.webp": { type: "image/webp", etag: '"7d24-8nTgRJHkAkx33ffZ3dXMQyn1bRo"', mtime: "2026-06-22T19:49:20.052Z", size: 32036, path: "../assets/images/explore/coding.webp" }, "/_i18n/a3a3d9fa/de/messages.json": { type: "application/json", etag: '"31d9-QwPwWFZ8Nj9L0EKN/CDZVMYZgLo"', mtime: "2026-10-02T13:56:46.633Z", size: 12761, path: "../_i18n/a3a3d9fa/de/messages.json" }, "/_i18n/a3a3d9fa/en/messages.json": { type: "application/json", etag: '"17ea-HOLIB2qj1UPA2McMTLyaDTC9PW8"', mtime: "2026-10-02T13:56:46.626Z", size: 6122, path: "../_i18n/a3a3d9fa/en/messages.json" }, "/assets/images/logo/logo.png": { type: "image/png", etag: '"c99a-m5hqy1piD6vBccBLfFtKPqGr3E0"', mtime: "2026-06-22T19:49:20.082Z", size: 51610, path: "../assets/images/logo/logo.png" }, "/assets/images/sinth/sinthbanner-progress.webp": { type: "image/webp", etag: '"7d24-8nTgRJHkAkx33ffZ3dXMQyn1bRo"', mtime: "2026-06-22T19:49:20.052Z", size: 32036, path: "../assets/images/sinth/sinthbanner-progress.webp" }, "/_nuxt/builds/meta/b40e51a6-a88d-4be5-b834-52664e95db54.json": { type: "application/json", etag: '"146-/i7nzGkyoP9vDhbtYHIELKMpu9Y"', mtime: "2026-10-02T13:56:47.484Z", size: 326, path: "../_nuxt/builds/meta/b40e51a6-a88d-4be5-b834-52664e95db54.json" }, "/_nuxt/T-_eqRrz.js": { type: "text/javascript; charset=utf-8", etag: '"45fb7-gMNLqxXRzw8S2WpdSKDGVmCu9/8"', mtime: "2026-10-02T13:56:41.804Z", size: 286647, path: "../_nuxt/T-_eqRrz.js" } };
var m = { "/_nuxt/builds/meta/": { maxAge: 31536e3 }, "/_nuxt/builds/": { maxAge: 1 }, "/_nuxt/": { maxAge: 31536e3 } };
var h = a();
var u = { async fetch(e2, a2, i2) {
  const n2 = new URL(e2.url);
  if (a2.ASSETS && (function(t2 = "") {
    if (o[t2]) return true;
    for (const e3 in m) if (t2.startsWith(e3)) return true;
    return false;
  })(n2.pathname)) return a2.ASSETS.fetch(e2);
  let p2;
  return s(e2) && (p2 = t.from(await e2.arrayBuffer())), globalThis.__env__ = a2, h.localFetch(n2.pathname + n2.search, { context: { waitUntil: /* @__PURE__ */ __name((t2) => i2.waitUntil(t2), "waitUntil"), _platform: { cf: e2.cf, cloudflare: { request: e2, env: a2, context: i2 } } }, host: n2.hostname, protocol: n2.protocol, method: e2.method, headers: e2.headers, body: p2 });
}, scheduled(t2, e2, s2) {
} };
export {
  u as default
};
//# sourceMappingURL=bundledWorker-0.8636974529413487.mjs.map
