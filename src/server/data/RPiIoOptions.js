export default class RPiIoOptions {
  static #ioDevices = {
    inputs: {
      digitalInput: { options: ['pull_up', 'active_state', 'bounce_time'] },
      smoothedInput: {
        options: [
          'pull_up',
          'active_state',
          'threshold',
          'queue_len',
          'sample_wait'
        ]
      },
      button: {
        options: [
          'pull_up',
          'active_state',
          'bounce_time',
          'hold_time',
          'hold_repeat'
        ]
      }
    },
    outputs: {
      digitalOutput: {
        options: ['active_high', 'initialValue', 'on_time', 'off_time']
      },
      softwarePwmOutput: {
        options: [
          'active_high',
          'frequency',
          'on_time',
          'off_time',
          'fade_in_time',
          'fade_out_time',
          'blinkNum'
        ]
      },
      hardwarePwmOutput: {
        // channel groups are mutually exclusive
        channels: { 0: [12, 18], 1: [13, 19] },
        options: {}
      }
    },
    devices: {
      i2cDev: {
        // I2C communication
        channels: { 1: [2, 3] },
        options: {}
      },
      spiDev: {
        // SPI Bus device communication
        channels: { 0: [7, 8, 9, 10, 11], 2: [17, 18, 19, 20, 21] },
        options: {}
      },
      uartDev: {
        channels: { 0: [14, 15, 16, 17], 1: [14, 15, 16, 17] },
        options: {}
      }
    }
  };

  static #channelOptions = {
    2: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt0: { type: 'i2cDev', channelGroup: 1, label: 'I2C 1 SDA' }
      }
    },
    3: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt0: { type: 'i2cDev', channelGroup: 1, label: 'I2C 1 SCL' }
      }
    },
    4: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {}
    },
    5: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {}
    },
    6: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {}
    },
    7: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt0: { type: 'spiDev', channelGroup: 0, label: 'SPI 0 CE1' }
      }
    },
    8: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt0: { type: 'spiDev', channelGroup: 0, label: 'SPI 0 CE0' }
      }
    },
    9: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt0: { type: 'spiDev', channelGroup: 0, label: 'SPI 0 MISO' }
      }
    },
    10: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt0: { type: 'spiDev', channelGroup: 0, label: 'SPI 0 MOSI' }
      }
    },
    11: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt0: { type: 'spiDev', channelGroup: 0, label: 'SPI 0 SCLK' }
      }
    },
    12: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' },
        alt0: {
          type: 'hardwarePwmOutput',
          channelGroup: 0,
          label: 'Hardware PWM 0'
        }
      },
      devices: {}
    },
    13: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' },
        alt0: {
          type: 'hardwarePwmOutput',
          channelGroup: 1,
          label: 'Hardware PWM 1'
        }
      },
      devices: {}
    },
    14: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt0: {
          type: 'uartDev',
          channelGroup: 0,
          label: 'UART 0 TX'
        },
        alt5: {
          type: 'uartDev',
          channelGroup: 1,
          label: 'UART 1 TX'
        }
      }
    },
    15: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt0: {
          type: 'uartDev',
          channelGroup: 0,
          label: 'UART 0 RX'
        },
        alt5: {
          type: 'uartDev',
          channelGroup: 1,
          label: 'UART 1 RX'
        }
      }
    },
    16: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt3: {
          type: 'uartDev',
          channelGroup: 0,
          label: 'UART 0 CTS'
        },
        alt5: {
          type: 'uartDev',
          channelGroup: 1,
          label: 'UART 1 CTS'
        }
      }
    },
    17: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt3: {
          type: 'uartDev',
          channelGroup: 0,
          label: 'UART 0 RTS'
        },
        alt5: {
          type: 'uartDev',
          channelGroup: 1,
          label: 'UART 1 RTS'
        },
        alt4: {
          type: 'spiDev',
          channelGroup: 1,
          label: 'SPI 1 CE1'
        }
      }
    },
    18: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' },
        alt5: {
          type: 'hardwarePwmOutput',
          channelGroup: 0,
          label: 'Hardware PWM 0'
        }
      },
      devices: {
        alt4: {
          type: 'spiDev',
          channelGroup: 1,
          label: 'SPI 1 CE0'
        }
      }
    },
    19: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' },
        alt5: {
          type: 'hardwarePwmOutput',
          channelGroup: 1,
          label: 'Hardware PWM 1'
        }
      },
      devices: {
        alt4: {
          type: 'spiDev',
          channelGroup: 1,
          label: 'SPI 1 MISO'
        }
      }
    },
    20: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt4: {
          type: 'spiDev',
          channelGroup: 1,
          label: 'SPI 1 MOSI'
        }
      }
    },
    21: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {
        alt4: {
          type: 'spiDev',
          channelGroup: 1,
          label: 'SPI 1 SCLK'
        }
      }
    },
    22: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {}
    },
    23: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {}
    },
    24: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {}
    },
    25: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {}
    },
    26: {
      inputs: {
        input: { type: 'digitalInput', label: 'Input' }
      },
      outputs: {
        output: { type: 'digitalOutput', label: 'Output' }
      },
      devices: {}
    }
  };

  constructor() {}

  static getChannelOptions(channel) {
    // Lookup and return the channel option object for the specified channel,
    // or return an empty object if channel isn't found.
    let co = this.#channelOptions[channel];
    if (undefined === co) {
      return {};
    }
    // if we get here, the options were found (valid channel)
    return co;
  }

  static getChannelInputOptions(channel) {
    // Lookup the input options if the designated channel has
    // an input designation. Return an empty object if the channel
    // isn't found or if it has no input designaiton.
    let co = this.#channelOptions[channel];
    if (undefined === co) {
      return {};
    }
    let cio = co['inputs'];
    if (undefined === cio) {
      return {};
    }
    // If we get here, the input options were found,
    // meaning we have a valid channel with an input designaiton
    cio.options = this.#ioDevices.inputs;
    return cio;
  }

  static getChannelOutputOptions(channel) {
    // Lookup the output options if the designated channel has
    // an output designation. Return an empty object if the channel
    // isn't found or if it has no output designaiton.
    let co = this.#channelOptions[channel];
    if (undefined === co) {
      return {};
    }
    let coo = co['outputs'];
    if (undefined === coo) {
      return {};
    }
    // If we get here, the output options were found,
    // meaning we have a valid channel with an output designaiton
    coo.options = this.#ioDevices.outputs;
    return coo;
  }

  static getChannelDeviceOptions(channel) {
    // Lookup the output options if the designated channel has
    // an output designation. Return an empty object if the channel
    // isn't found or if it has no output designaiton.
    let co = this.#channelOptions[channel];
    if (undefined === co) {
      return {};
    }
    let cdo = co['devices'];
    if (undefined === cdo) {
      return {};
    }
    // If we get here, the output options were found,
    // meaning we have a valid channel with an output designaiton
    cdo.options = this.#ioDevices.devices;
    return cdo;
  }
}
