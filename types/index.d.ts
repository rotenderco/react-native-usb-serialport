/**
 * @param {(socket: Socket) => void} connectionListener
 * @returns {Server}
 */
export function createServer(connectionListener: (socket: Socket) => void): Server;
/**
 * @param {import("./Socket").ConnectionOptions} options
 * @param {() => void} callback
 * @returns {Socket}
 */
export function createConnection(options: import("./Socket").ConnectionOptions, callback: () => void): Socket;
import Server from "./Server";
import Socket from "./Socket";

export { Server };
export { Socket };


export interface IDevice {
  name: string;
  vendorId: number;
  productId: number;
}

export type Devices = Array<IDevice> | null;

export interface IOnReadData {
  deviceName: string;
  payload: string | Array<number>
}
export interface IOnError {
  status: boolean;
  errorCode: number;
  errorMessage: string;
  exceptionErrorMessage?: string;
}
export interface IOnServiceStarted {
  deviceAttached: boolean
}

interface DefinitionsStatic {
  DATA_BITS: {
    DATA_BITS_5: number
    DATA_BITS_6: number;
    DATA_BITS_7: number;
    DATA_BITS_8: number;
  };
  STOP_BITS: {
    STOP_BITS_1: number;
    STOP_BITS_15: number;
    STOP_BITS_2: number;
  };
  PARITIES: {
    PARITY_NONE: number;
    PARITY_ODD: number;
    PARITY_EVEN: number;
    PARITY_MARK: number;
    PARITY_SPACE: number;
  };
  FLOW_CONTROLS: {
    FLOW_CONTROL_OFF: number;
    FLOW_CONTROL_RTS_CTS: number;
    FLOW_CONTROL_DSR_DTR: number;
    FLOW_CONTROL_XON_XOFF: number;
  };
  RETURNED_DATA_TYPES: {
    INTARRAY: number;
    HEXSTRING: number;
  };
  DRIVER_TYPES: {
    AUTO: string,
    CDC: string,
    CH34x: string,
    CP210x: string,
    FTDI: string,
    PL2303: string
  };
}
export var definitions: DefinitionsStatic;

interface ActionsStatic {
  ON_SERVICE_STARTED: string,
  ON_SERVICE_STOPPED: string,
  ON_DEVICE_ATTACHED: string,
  ON_DEVICE_DETACHED: string,
  ON_ERROR: string,
  ON_CONNECTED: string,
  ON_DISCONNECTED: string,
  ON_READ_DATA: string
}
export var actions: ActionsStatic;

export type DataBits = 5 | 6 | 7 | 8;
export type StopBits = 1 | 2 | 3;
export type Parities = 0 | 1 | 2 | 3 | 4;
export type FlowControls = 0 | 1 | 2 | 3;
export type ReturnedDataTypes = 1 | 2;
export type Drivers = "AUTO" | "cdc" | "ch34x" | "cp210x" | "ftdi" | "pl2303";

interface RNSerialportStatic {
  /**
   * Starts the service and Usb listener
   *
   * @memberof RNSerialportStatic
   */
  startUsbService(): void;
  /**
   * Stops the service and Usb listener
   *
   * @memberof RNSerialportStatic
   */
  stopUsbService(): void;

  /**
   * Returns status via Promise
   *
   * @param {string} deviceName
   * @returns {Promise<boolean>}
   * @memberof RNSerialportStatic
   */
  isOpen(deviceName: string): Promise<boolean>

  /**
   * Returns status boolean via Promise
   *
   * @returns {Promise<boolean>}
   * @memberof RNSerialportStatic
   */
  isServiceStarted(): Promise<boolean>

  /**
   * Returns support status
   * 
   * @param {string} deviceName
   * @returns {Promise<boolean>}
   * @memberof RNSerialportStatic
   */
  isSupported(deviceName: string): Promise<boolean>;

  //Begin setter methods

  /**
   * Set the returned data type
   *
   * @param {ReturnedDataTypes} type
   * @memberof RNSerialportStatic
   */
  setReturnedDataType(type: ReturnedDataTypes): void;

  /**
   * Set the interface
   *
   * @param {number} iFace
   * @memberof RNSerialportStatic
   */
  setInterface(iFace: number): void;

  /**
   * Set the data bit
   *
   * @param {DataBits} bit
   * @memberof RNSerialportStatic
   */
  setDataBit(bit: DataBits): void;

  /**
   * Set the stop bit
   *
   * @param {StopBits} bit
   * @memberof RNSerialportStatic
   */
  setStopBit(bit: StopBits): void;

  /**
   * Set the parity
   *
   * @param {Parities} parity
   * @memberof RNSerialportStatic
   */
  setParity(parity: Parities): void;

  /**
   *  Set the flow control
   *
   * @param {FlowControls} control
   * @memberof RNSerialportStatic
   */
  setFlowControl(control: FlowControls): void;

  /**
   * Set the auto connection baudrate
   *
   * @param {number} baudRate
   * @memberof RNSerialportStatic
   */
  setAutoConnectBaudRate(baudRate: number): void;

  /**
   * Set the auto connection status
   *
   * @param {boolean} status
   * @memberof RNSerialportStatic
   */
  setAutoConnect(status: boolean): void;

  /**
   * Set the driver type
   *
   * @param {Drivers} driver
   * @memberof RNSerialportStatic
   */
  setDriver(driver: Drivers): void;

  /**
   * Set native gateway
   * 
   * @param isNativeGateway 
   * @memberof RNSerialportStatic
   */
  setIsNativeGateway(isNativeGateway: boolean): void;

  /**
   * Set is native gateway js eventemit on serialport data
   * 
   * @param isNativeGatewayJsEventEmitOnSerialportData 
   * @memberof RNSerialportStatic
   */
  setIsNativeGatewayJsEventEmitOnSerialportData(isNativeGatewayJsEventEmitOnSerialportData: boolean): void;

  //End setter methods

  /**
   * Load the default connection settings
   *
   * @memberof RNSerialportStatic
   */
  loadDefaultConnectionSetting(): void;

  /**
   * Returns the device list via Promise
   *
   * @returns {Promise<Device>}
   * @memberof RNSerialportStatic
   */
  getDeviceList(): Promise<Devices>;

  /**
   * Connect to device with device name and baud rate
   *
   * @param {string} deviceName
   * @param {number} baudRate
   * @memberof RNSerialportStatic
   */
  connectDevice(deviceName: string, baudRate: number): void;

  /**
   * Closes the connection
   *
   * @param {string} deviceName
   * @memberof RNSerialportStatic
   */
  disconnectDevice(deviceName: string): void;

  /**
   * Closes all of connections
   * 
   * @memberof RNSerialportStatic
   */
  disconnectAllDevices(): void;

  /**
   * Writes bytes to port
   * 
   * @param {string} deviceName 
   * @param {Array<number>} data 
   * @memberof RNSerialportStatic
   */
  writeBytes(deviceName: string, data: Array<number>): void;

  /**
   * Writes string to port
   *
   * @param {string} deviceName 
   * @param {string} data
   * @memberof RNSerialportStatic
   */
  writeString(deviceName: string, data: string): void;

  /**
   * Writes Base64 string to port
   *
   * @param {string} deviceName 
   * @param {string} data
   * @memberof RNSerialportStatic
   */
  writeBase64(deviceName: string, data: string): void;

  /**
   * Writes hex string to port
   *
   * @param {string} deviceName 
   * @param {string} data
   * @memberof RNSerialportStatic
   */
  writeHexString(deviceName: string, data: string): void


  /**
   * Set the mapping of the app bus index and the device name.
   * 
   * @param appBusIndex 
   * @param deviceName 
   * @memberof RNSerialportStatic
   */
  appBus2DeviceNamePut(appBusIndex: number, deviceName: string): void;

  /**
   * Integer array convert to Utf16 string
   *
   * @param {Array<number>} intArray
   * @returns {string}
   * @memberof RNSerialportStatic
   */
  intArrayToUtf16(intArray: Array<number>): string

  /**
   * Hex string convert to Utf16 string
   *
   * @param {string} hex
   * @returns {string}
   * @memberof RNSerialportStatic
   */
  hexToUtf16(hex: string): string
}
export var RNSerialport: RNSerialportStatic;