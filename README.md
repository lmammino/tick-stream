# tick-stream

[![npm version](https://badge.fury.io/js/tick-stream.svg)](http://badge.fury.io/js/tick-stream)
[![CircleCI](https://circleci.com/gh/lmammino/tick-stream.svg?style=shield)](https://circleci.com/gh/lmammino/tick-stream)
[![codecov.io](https://codecov.io/gh/lmammino/tick-stream/coverage.svg?branch=master)](https://codecov.io/gh/lmammino/tick-stream)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple transform stream that can log a tick every time data is pushed through a pipe.


## Rationale

You have a long running pipe of streams doing stuff. It's very common that, while the
pipe is being processed, you want to see some progress. How many times did you have
to implement your own stream just to console log some sort of progress?

Well, now you don't have to do that anymore and you can simply use `tick-stream` for that:

```JavaScript
const TickStream = require('tick-stream')

// initialize stream1, stream2 and stream3 somehow here

stream1
  .pipe(stream2)
  .pipe(stream3)
  .pipe(new TickStream())
```

This code will produce an output similar to this:

```plain
tick: 0
tick: 1
tick: 2
tick: 3
```

Every line is outputted once a chunk of data has been processed by the stream.


## Install

With NPM:

```bash
npm install --save tick-stream
```


## Usage

`tick-stream` is a [`Transform` stream](https://nodejs.org/api/stream.html#stream_class_stream_transform)
that logs a message to show progress and passes the received data to the next
stream without applying any change to it.

By default the log message will count the number of chunks processed (`ticks`) using
`console.log`.

You can provide your own custom logging function with the `logFunction` option:

```javascript
const TickStream = require('tick-stream')

const tick = new TickStream({
  logFunction: (chunk, encoding, tick) => {
    console.log(`I am processing chunk #${tick}`, chunk)
  }
})
```

In case you are working with object streams you will need to initialize your `tick-stream`
instance in `objectMode`:

```javascript
const TickStream = require('tick-stream')

const tick = new TickStream({ objectMode: true })
```


## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/tick-stream/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
