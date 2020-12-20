export default class RPiIoOptions {
  static #ioDevices = {
    digitalInput: {
      genericInput: {
        options: {
          pullUpDown: {
            label: 'Pull Up/Down Resistor',
            default: false,
            options: [
              { label: 'Pull Up', type: 'pick', value: true },
              { label: 'Pull Down', type: 'pick', value: false },
              { label: 'None', type: 'pick', value: 'none' }
            ]
          },
          active_state: {
            label: 'Active State',
            default: 'none',
            options: [
              { label: 'High', type: 'pick', value: true },
              { label: 'Low', type: 'pick', value: false },
              { label: 'None', type: 'pick', value: 'none' }
            ]
          },
          bounce_time: {
            label: 'Bounce Time',
            default: 0.0,
            options: [
              { label: 'Sec.', type: 'float' },
              { label: 'None', type: 'pick', value: 'none' }
            ]
          }
        }
      },
      smoothedInput: {
        options: {
          pullUpDown: {
            label: 'Pull Up/Down Resistor',
            default: false,
            options: [
              { label: 'Pull Up', type: 'pick', value: true },
              { label: 'Pull Down', type: 'pick', value: false },
              { label: 'None', type: 'pick', value: 'none' }
            ]
          },
          active_state: {
            label: 'Active State',
            default: 'none',
            options: [
              { label: 'High', type: 'pick', value: true },
              { label: 'Low', type: 'pick', value: false },
              { label: 'None', type: 'pick', value: 'none' }
            ]
          },
          threshold: {
            label: 'Threshold',
            default: 0.5,
            options: [{ label: 'Sig. Level', type: 'float' }]
          },
          queue_len: {
            label: 'Queue Length',
            default: 5,
            options: [{ label: 'length', type: 'int' }]
          },
          sample_wait: {
            label: 'Sample Wait',
            default: 0.0,
            options: [{ label: 'Sec.', type: 'float' }]
          }
        }
      },
      button: {
        options: {
          pullUpDown: {
            label: 'Pull Up/Down Resistor',
            default: false,
            options: [
              { label: 'Pull Up', type: 'pick', value: true },
              { label: 'Pull Down', type: 'pick', value: false },
              { label: 'None', type: 'pick', value: 'none' }
            ]
          },
          active_state: {
            label: 'Active State',
            default: 'none',
            options: [
              { label: 'High', type: 'pick', value: true },
              { label: 'Low', type: 'pick', value: false },
              { label: 'None', type: 'pick', value: 'none' }
            ]
          },
          bounce_time: {
            label: 'Bounce Time',
            default: 0.0,
            options: [
              { label: 'Sec.', type: 'float' },
              { label: 'None', type: 'pick', value: 'none' }
            ]
          },
          hold_time: {
            label: 'Hold Time',
            default: 1.0,
            options: [{ label: 'Sec.', type: 'float' }]
          },
          hold_repeat: {
            label: 'Repeat on Hold',
            default: false,
            options: [
              { label: 'Repeat on hold', type: 'pick', value: true },
              { label: 'Once per hold', type: 'pick', value: false },
            ]
        }
      }
    },
    digitalOutput: {
      genericOutput: {
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
    device: {
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
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {
        alt0: { type: 'i2cDev', channelGroup: 1, label: 'I2C 1 SDA' }
      }
    },
    3: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {
        alt0: { type: 'i2cDev', channelGroup: 1, label: 'I2C 1 SCL' }
      }
    },
    4: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {}
    },
    5: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {}
    },
    6: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {}
    },
    7: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {
        alt0: { type: 'spiDev', channelGroup: 0, label: 'SPI 0 CE1' }
      }
    },
    8: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {
        alt0: { type: 'spiDev', channelGroup: 0, label: 'SPI 0 CE0' }
      }
    },
    9: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {
        alt0: { type: 'spiDev', channelGroup: 0, label: 'SPI 0 MISO' }
      }
    },
    10: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {
        alt0: { type: 'spiDev', channelGroup: 0, label: 'SPI 0 MOSI' }
      }
    },
    11: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {
        alt0: { type: 'spiDev', channelGroup: 0, label: 'SPI 0 SCLK' }
      }
    },
    12: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' },
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
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' },
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
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
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
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
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
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
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
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
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
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' },
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
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' },
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
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
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
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
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
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {}
    },
    23: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {}
    },
    24: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {}
    },
    25: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
      },
      devices: {}
    },
    26: {
      inputs: {
        digitalInput: { label: 'Digital Input' }
      },
      outputs: {
        digitalOutput: { label: 'Digital Output' }
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
    // isn't found, or if it has no input designaiton, or if there are
    // no input types specified.
    let co = this.getChannelOptions(channel);
    if (0 === Object.keys(co).length) {
      return {};
    }
    // If we get here, the options were found (valid channel)
    // Get the input options
    let cio = co['inputs'];
    if (undefined === cio) {
      return {};
    }
    // If we get here, the input options were found,
    // meaning we have a valid channel with an input designaiton
    // Get the digital input options, and put them into an initially
    // empty object. If it stays empty, there was nothing to add.
    let ciOptions = {};
    for (let key in cio) {
      let dev = this.#ioDevices[key];
      if (undefined !== dev) {
        ciOptions[key] = dev;
      }
    }
    return ciOptions;
  }

  static getChannelOutputOptions(channel) {
    // Lookup the output options if the designated channel has
    // an output designation. Return an empty object if the channel
    // isn't found, or if it has no output designaiton, or if there are
    // no output types specified.
    let co = this.getChannelOptions(channel);
    if (0 === Object.keys(co).length) {
      return {};
    }
    // If we get here, the options were found (valid channel)
    // Get the output options
    let coo = co['outputs'];
    if (undefined === coo) {
      return {};
    }
    // If we get here, the output options were found,
    // meaning we have a valid channel with an output designaiton
    // Get the digital output options, and put them into an initially
    // empty object. If it stays empty, there was nothing to add.
    let coOptions = {};
    for (let key in coo) {
      let dev = this.#ioDevices[key];
      if (undefined !== dev) {
        coOptions[key] = dev;
      }
    }
    return coOptions;
  }
}
