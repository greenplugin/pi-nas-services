'use strict'

const Transform = require('readable-stream').Transform
const duplexify = require('duplexify')
const WS = require('ws')
// @ts-ignore
const Buffer = require('safe-buffer').Buffer

function buildProxy(options: any, socketWrite: any, socketEnd: any) {
    var proxy = new Transform({
        objectMode: options.objectMode
    })

    proxy._write = socketWrite
    proxy._flush = socketEnd

    return proxy
}

export function WebSocketStream(target: any, protocols: any, options: any) {
    let stream: any, socket: any

    let isBrowser = process.title === 'browser'
    // @ts-ignore
    let isNative = !!global.WebSocket
    let socketWrite = isBrowser ? socketWriteBrowser : socketWriteNode

    if (protocols && !Array.isArray(protocols) && 'object' === typeof protocols) {
        // accept the "options" Object as the 2nd argument
        options = protocols
        protocols = null

        if (typeof options.protocol === 'string' || Array.isArray(options.protocol)) {
            protocols = options.protocol;
        }
    }

    if (!options) options = {}

    if (options.objectMode === undefined) {
        options.objectMode = !(options.binary === true || options.binary === undefined)
    }

    let proxy = buildProxy(options, socketWrite, socketEnd)

    if (!options.objectMode) {
        proxy._writev = writev
    }

    // browser only: sets the maximum socket buffer size before throttling
    let bufferSize = options.browserBufferSize || 1024 * 512

    // browser only: how long to wait when throttling
    let bufferTimeout = options.browserBufferTimeout || 1000

    // use existing WebSocket object that was passed in
    if (typeof target === 'object') {
        socket = target
        // otherwise make a new one
    } else {
        // special constructor treatment for native websockets in browsers, see
        // https://github.com/maxogden/websocket-stream/issues/82
        if (isNative && isBrowser) {
            socket = new WS(target, protocols)
        } else {
            socket = new WS(target, protocols, options)
        }

        socket.binaryType = 'arraybuffer'
    }

    // according to https://github.com/baygeldin/ws-streamify/issues/1
    // Nodejs WebSocketServer cause memory leak
    // Handlers like onerror, onclose, onmessage and onopen are accessible via setter/getter
    // And setter first of all fires removeAllListeners, that doesnt make inner array of clients on WebSocketServer cleared ever
    let eventListenerSupport = ('undefined' === typeof socket.addEventListener)

    // was already open when passed in
    if (socket.readyState === socket.OPEN) {
        stream = proxy
    } else {
        stream = stream = duplexify(undefined, undefined, options)
        if (!options.objectMode) {
            stream._writev = writev
        }

        if (eventListenerSupport) {
            socket.addEventListener('open', onopen)
        } else {
            socket.onopen = onopen
        }
    }

    stream.socket = socket

    if (eventListenerSupport) {
        socket.addEventListener('close', onclose)
        socket.addEventListener('error', onerror)
        socket.addEventListener('message', onmessage)
    } else {
        socket.onclose = onclose
        socket.onerror = onerror
        socket.onmessage = onmessage
    }

    proxy.on('close', destroy)

    let coerceToBuffer = !options.objectMode

    function socketWriteNode(chunk: any, enc: any, next: any) {
        // avoid errors, this never happens unless
        // destroy() is called
        if (socket.readyState !== socket.OPEN) {
            next()
            return
        }

        if (coerceToBuffer && typeof chunk === 'string') {
            chunk = Buffer.from(chunk, 'utf8')
        }
        socket.send(chunk, next)
    }

    function socketWriteBrowser(chunk: any, enc: any, next: any) {
        if (socket.bufferedAmount > bufferSize) {
            setTimeout(socketWriteBrowser, bufferTimeout, chunk, enc, next)
            return
        }

        if (coerceToBuffer && typeof chunk === 'string') {
            chunk = Buffer.from(chunk, 'utf8')
        }

        try {
            socket.send(chunk)
        } catch (err) {
            return next(err)
        }

        next()
    }

    function socketEnd(done: any) {
        socket.close()
        done()
    }

    function onopen() {
        stream.setReadable(proxy)
        stream.setWritable(proxy)
        stream.emit('connect')
    }

    function onclose() {
        stream.end()
        stream.destroy()
    }

    function onerror(err: any) {
        stream.destroy(err)
    }

    function onmessage(event: any) {
        let data = event.data
        if (data instanceof ArrayBuffer) data = Buffer.from(data)
        else data = Buffer.from(data, 'utf8')
        proxy.push(data)
    }

    function destroy() {
        socket.close()
    }

    // this is to be enabled only if objectMode is false
    function writev(chunks: any, cb: any) {
        let buffers = new Array(chunks.length)
        for (let i = 0; i < chunks.length; i++) {
            if (typeof chunks[i].chunk === 'string') {
                buffers[i] = Buffer.from(chunks[i], 'utf8')
            } else {
                buffers[i] = chunks[i].chunk
            }
        }

        // @ts-ignore
        this._write(Buffer.concat(buffers), 'binary', cb)
    }

    return stream
}
