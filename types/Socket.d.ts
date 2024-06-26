import { Buffer } from "buffer";
import { EventEmitter } from "eventemitter3";

/**
 * @typedef {"ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex"} BufferEncoding
 *
 * @typedef {import("react-native").NativeEventEmitter} NativeEventEmitter
 *
 * @typedef {{address: string, family: string, port: number}} AddressInfo
 *
 * @typedef {{localAddress: string, localPort: number, remoteAddress: string, remotePort: number, remoteFamily: string}} NativeConnectionInfo
 *
 * @typedef {{
 * port: number;
 * host?: string;
 * timeout?: number,
 * localAddress?: string,
 * localPort?: number,
 * interface?: "wifi" | "cellular" | "ethernet",
 * reuseAddress?: boolean,
 * tls?: boolean,
 * tlsCheckValidity?: boolean,
 * tlsCert?: any,
 * }} ConnectionOptions
 *
 * @extends {EventEmitter<"connect" | "timeout" | "data" | "error" | "close", any>}
 */
export default class Socket extends EventEmitter {
    /** @private */
    private _id;
    /** @private */
    private _eventEmitter;
    /** @type {number} @private */
    private _timeoutMsecs;
    /** @private */
    private _timeout;
    /** @type {number} @private */
    private _state;
    /** @private */
    private _encoding;
    localAddress: string;
    localPort: number;
    remoteAddress: string;
    remotePort: number;
    remoteFamily: string;
    /**
     * @package
     * @param {number} id
     */
    _setId(id: number): void;
    /**
     * @package
     * @param {NativeConnectionInfo} connectionInfo
     */
    _setConnected(connectionInfo: NativeConnectionInfo): void;
    /**
     * @param {ConnectionOptions} options
     * @param {() => void} [callback]
     */
    connect(options: ConnectionOptions, callback?: () => void): this;
    _destroyed: boolean;
    /**
     * Sets the socket to timeout after `timeout` milliseconds of inactivity on the socket. By default `TcpSocket` do not have a timeout.
     *
     * When an idle timeout is triggered the socket will receive a `"timeout"` event but the connection will not be severed.
     * The user must manually call `socket.end()` or `socket.destroy()` to end the connection.
     *
     * If `timeout` is 0, then the existing idle timeout is disabled.
     *
     * The optional `callback` parameter will be added as a one-time listener for the `"timeout"` event.
     *
     * @param {number} timeout
     * @param {() => void} [callback]
     */
    setTimeout(timeout: number, callback?: () => void): this;
    /**
     * @private
     * @param {number} [timeout]
     */
    private _activateTimer;
    /**
     * @private
     */
    private _clearTimeout;
    /**
     * Set the encoding for the socket as a Readable Stream. By default, no encoding is assigned and stream data will be returned as `Buffer` objects.
     * Setting an encoding causes the stream data to be returned as strings of the specified encoding rather than as Buffer objects.
     *
     * For instance, calling `socket.setEncoding("utf8")` will cause the output data to be interpreted as UTF-8 data, and passed as strings.
     * Calling `socket.setEncoding("hex")` will cause the data to be encoded in hexadecimal string format.
     *
     * @param {BufferEncoding} [encoding]
     */
    setEncoding(encoding?: BufferEncoding): this;
    /**
     * Enable/disable the use of Nagle"s algorithm. When a TCP connection is created, it will have Nagle"s algorithm enabled.
     *
     * Nagle"s algorithm delays data before it is sent via the network. It attempts to optimize throughput at the expense of latency.
     *
     * Passing `true` for `noDelay` or not passing an argument will disable Nagle"s algorithm for the socket. Passing false for noDelay will enable Nagle"s algorithm.
     *
     * @param {boolean} noDelay Default: `true`
     */
    setNoDelay(noDelay?: boolean): this;
    /**
     * Enable/disable keep-alive functionality, and optionally set the initial delay before the first keepalive probe is sent on an idle socket.
     *
     * `initialDelay` is ignored.
     *
     * @param {boolean} enable Default: `false`
     * @param {number} initialDelay ***IGNORED**. Default: `0`
     */
    setKeepAlive(enable?: boolean, initialDelay?: number): this;
    /**
     * Returns the bound `address`, the address `family` name and `port` of the socket as reported
     * by the operating system: `{ port: 12346, family: "IPv4", address: "127.0.0.1" }`.
     *
     * @returns {AddressInfo | {}}
     */
    address(): AddressInfo | {};
    /**
     * @param {string | Buffer | Uint8Array} data
     * @param {BufferEncoding} [encoding]
     */
    end(data: string | Buffer | Uint8Array, encoding?: BufferEncoding): void;
    destroy(): void;
    /**
     * Sends data on the socket. The second parameter specifies the encoding in the case of a string — it defaults to UTF8 encoding.
     *
     * The optional callback parameter will be executed when the data is finally written out, which may not be immediately.
     *
     * @param {string | Buffer | Uint8Array} buffer
     * @param {BufferEncoding} [encoding]
     * @param {(error: string | null) => void} [callback]
     */
    write(buffer: string | Buffer | Uint8Array, encoding?: BufferEncoding, callback?: (error: string | null) => void): void;
    ref(): void;
    unref(): void;
    /**
     * @private
     */
    private _registerEvents;
    _dataListener: any;
    _errorListener: any;
    _closeListener: any;
    _connectListener: any;
    /**
     * @private
     */
    private _unregisterEvents;
    /**
     * @private
     * @param {string | Buffer | Uint8Array} buffer
     * @param {BufferEncoding} [encoding]
     */
    private _generateSendBuffer;
    /**
     * @private
     */
    private _setDisconnected;
}
export type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex";
export type NativeEventEmitter = any;
export type AddressInfo = {
    address: string;
    family: string;
    port: number;
};
export type NativeConnectionInfo = {
    localAddress: string;
    localPort: number;
    remoteAddress: string;
    remotePort: number;
    remoteFamily: string;
};
export type ConnectionOptions = {
    port: number;
    host?: string;
    timeout?: number;
    localAddress?: string;
    localPort?: number;
    interface?: "wifi" | "cellular" | "ethernet";
    reuseAddress?: boolean;
    tls?: boolean;
    tlsCheckValidity?: boolean;
    tlsCert?: any;
};

