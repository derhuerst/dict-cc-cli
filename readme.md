# dict-cc-cli

**Offline [dict.cc](http://www.dict.cc/) lookup in the command line.**

[![npm version](https://img.shields.io/npm/v/dict-cc-cli.svg)](https://www.npmjs.com/package/dict-cc-cli)
[![dependency status](https://img.shields.io/david/derhuerst/dict-cc-cli.svg)](https://david-dm.org/derhuerst/dict-cc-cli)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/dict-cc-cli.svg)](https://david-dm.org/derhuerst/dict-cc-cli#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/dict-cc-cli.svg)


## Installing & building the dictionary

- [Create & download a dict.cc dump.](http://www1.dict.cc/translation_file_request.php?l=)
- You will get an e-mail with a link. Confirm by opening.
- You will get another e-mail with another link.
- `git clone https://github.com/derhuerst/dict-cc-cli.git dict-cc-cli`.
- `cd dict-cc-cli`.
- `curl -s '<link>' > data.zip`.
- `unzip data.zip && rm data.zip`.
- `npm install` to install build dependencies.
- `cat cbgoogdbsk-80153119142-e8iuei.txt | node build.js e8iuei`.

Note that the exact file name & code will be different.


## Usage

```shell
./bin.js <query string>
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/dict-cc-cli/issues).
