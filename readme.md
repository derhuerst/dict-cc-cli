# dict-cc-cli

**Offline [dict.cc](http://www.dict.cc/) lookup in the command line.**

[![npm version](https://img.shields.io/npm/v/dict-cc-cli.svg)](https://www.npmjs.com/package/dict-cc-cli)
[![dependency status](https://img.shields.io/david/derhuerst/dict-cc-cli.svg)](https://david-dm.org/derhuerst/dict-cc-cli)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/dict-cc-cli.svg)](https://david-dm.org/derhuerst/dict-cc-cli#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/dict-cc-cli.svg)


## Installing

```shell
npm install -g dict-cc-cli
```


### Building the dictionary

- [Create & download a dict.cc dump.](http://www1.dict.cc/translation_file_request.php?l=)
- You will get an e-mail with a link. Confirm by opening.
- You will get another e-mail with another link.

```shell
curl -s '<link>' > data.zip

unzip data.zip && rm data.zip

cat path-to-dump.txt | dict-cc-import <watermark>
```

The dump file will be named something like `cmfkobmobk-18522520842-e6u765.txt`, where the watermark is `e6u765`.


## Usage

```shell
dict-cc <query string>
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/dict-cc-cli/issues).
