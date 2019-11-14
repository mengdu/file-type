# file-type

A file type checking library

> Detect the file type from Buffer, ArrayBuffer, File, Bolb

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
