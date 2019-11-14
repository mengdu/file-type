# file-type

A file type checking library

> Detect the file type from Buffer, ArrayBuffer, File, Bolb

```ls
npm install file-type-js
```

```js
const FileType = require('file-type-js')
const buf = fs.readFileSync(path.resolve(__dirname, 'files/test.jpg'))

console.log(await FileType.is(buf, 'jpg'))
```

**browser**

```html
<script src="./file-type.js"></script>
<script>
  fileInput.addEventListener('change', function () {
    console.log(fileInput.files)
    var file = fileInput.files[0]

    if (!file) return

    var extname = (file.name.match(/\.(\w*)$/)[1]).toLocaleLowerCase()

    $FileType.is(file, extname).then(function (valid) {
      console.log(extname, valid)
    })
  })
</script>
```

## Other

[file-type](https://github.com/sindresorhus/file-type)
