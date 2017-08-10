# user-packages

pulls simple metadata for all npm packages by user

## Install

```sh
npm install user-packages --save
```

## Usage
Create a readable stream of metadata objects for each package belonging to a specific user:
```javascript
const userPackages = require('user-packages')

const user = 'npm'
const npmPackages = userPackages.createStream(user)

npmPackages.on('data',console.log)
```

##### Output Example

```
{ lastPublish: { maintainer: 'ehsalazar', time: '2017-01-13T04:00:41.207Z' },
  name: 'extnode',
  description: 'This package is no longer supported and has been deprecated. To avoid malicious use, npm is hanging on to the package name.',
  maintainers: [ 'npm' ],
  'dist-tags': { latest: '5.0.0' },
  permissions: 'write',
  isPrivate: false }

{ lastPublish: { maintainer: 'fac3', time: '2017-06-15T20:02:26.247Z' },
  name: 'biotix',
  description: 'A JavaScript class system',
  maintainers: [ 'npm' ],
  'dist-tags': { latest: '0.1.0-a' },
  permissions: 'write',
  isPrivate: false }

/* ...more packages... */

```

## Dependencies

- [axios](https://github.com/mzabriskie/axios): Promise based HTTP client for the browser and node.js

## License

ISC
