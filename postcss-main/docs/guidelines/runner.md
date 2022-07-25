# PostCSS Runner Guidelines

A PostCSS runner is a tool that processes CSS through a user-defined list
of plugins; for example, [`postcss-cli`] or [`gulp‑postcss`].
These rules are mandatory for any such runners.

For single-plugin tools, like [`gulp-autoprefixer`],
these rules are not mandatory but are highly recommended.

See also [ClojureWerkz’s recommendations] for open source projects.

[ClojureWerkz’s recommendations]: http://blog.clojurewerkz.org/blog/2013/04/20/how-to-make-your-open-source-project-really-awesome/
[`gulp-autoprefixer`]: https://github.com/sindresorhus/gulp-autoprefixer
[`gulp‑postcss`]:      https://github.com/w0rm/gulp-postcss
[`postcss-cli`]:       https://github.com/postcss/postcss-cli


## 1. API

### 1.1. Accept functions in plugin parameters

If your runner uses a config file, it must be written in JavaScript, so that
it can support plugins which accept a function, such as [`postcss-assets`]:

```js
module.exports = [
  require('postcss-assets')({
    cachebuster: function (file) {
      return fs.statSync(file).mtime.getTime().toString(16)
    }
  })
]
```

[`postcss-assets`]: https://github.com/borodean/postcss-assets


## 2. Processing

### 2.1. Set `from` and `to` processing options

To ensure that PostCSS generates source maps and displays better syntax errors,
runners must specify the `from` and `to` options. If your runner does not handle
writing to disk (for example, a gulp transform), you should set both options
to point to the same file:

```js
processor.process({ from: file.path, to: file.path })
```


### 2.2. Use only the asynchronous API

PostCSS runners must use only the asynchronous API.
The synchronous API is provided only for debugging, is slower,
and can’t work with asynchronous plugins.

```js
processor.process(opts).then(result => {
  // processing is finished
});
```


### 2.3. Use only the public PostCSS API

PostCSS runners must not rely on undocumented properties or methods,
which may be subject to change in any minor release. The public API
is described in [API docs].

[API docs]: https://postcss.org/api/


## 3. Dependencies

### 3.1. Rebuild when dependencies change

PostCSS plugins may declare file or directory dependencies by attaching
messages to the `result`. Runners should watch these and ensure that the
CSS is rebuilt when they change.

```js
for (let message of result.messages) {
  if (message.type === 'dependency') {
    watcher.addFile(message.file)
  } else if (message.type === 'dir-dependency' && message.glob) {
    watcher.addPattern(file.join(message.dir, message.glob))
  } else if (message.type === 'dir-dependency') {
    watcher.addPattern(file.join(message.dir, '**', '*'))
  }
}
```

Directories should be watched recursively by default, but `dir-dependency`
messages may contain an optional `glob` property indicating which files
within the directory are depended on (e.g. `**/*.css`). If `glob` is
specified then runners should only watch files matching the glob pattern,
where possible.


## 4. Output

### 4.1. Don’t show JS stack for `CssSyntaxError`

PostCSS runners must not show a stack trace for CSS syntax errors,
as the runner can be used by developers who are not familiar with JavaScript.
Instead, handle such errors gracefully:

```js
processor.process(opts).catch(error => {
  if (error.name === 'CssSyntaxError') {
    process.stderr.write(error.message + error.showSourceCode())
  } else {
    throw error
  }
})
```


### 4.2. Display `result.warnings()`

PostCSS runners must output warnings from `result.warnings()`:

```js
result.warnings().forEach(warn => {
  process.stderr.write(warn.toString())
})
```

See also [postcss-log-warnings] and [postcss-messages] plugins.

[postcss-log-warnings]: https://github.com/davidtheclark/postcss-log-warnings
[postcss-messages]:     https://github.com/postcss/postcss-messages


### 4.3. Allow the user to write source maps to different files

PostCSS by default will inline source maps in the generated file; however,
PostCSS runners must provide an option to save the source map in a different
file:

```js
if (result.map) {
  fs.writeFile(opts.to + '.map', result.map.toString())
}
```


## 5. Documentation

### 5.1. Document your runner in English

PostCSS runners must have their `README.md` written in English. Do not be afraid
of your English skills, as the open source community will fix your errors.

Of course, you are welcome to write documentation in other languages;
just name them appropriately (e.g. `README.ja.md`).


### 5.2. Maintain a changelog

PostCSS runners must describe changes of all releases in a separate file,
such as `ChangeLog.md`, `History.md`, or with [GitHub Releases].
Visit [Keep A Changelog] for more information on how to write one of these.

Of course, you should use [SemVer].

[Keep A Changelog]: https://keepachangelog.com/
[GitHub Releases]:  https://help.github.com/articles/creating-releases/
[SemVer]:           https://semver.org/


### 5.3. `postcss-runner` keyword in `package.json`

PostCSS runners written for npm must have the `postcss-runner` keyword
in their `package.json`. This special keyword will be useful for feedback about
the PostCSS ecosystem.

For packages not published to npm, this is not mandatory, but recommended
if the package format is allowed to contain keywords.


### 5.4. Keep `postcss` to `peerDependencies`

AST can be broken because of different `postcss` version in different plugins.
Different plugins could use a different node creators (like `postcss.decl()`).

```json
{
  "peerDependencies": {
    "postcss": "^8.0.0"
  }
}
```
