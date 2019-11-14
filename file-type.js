;(function (root, factory) {
  if (typeof exports === 'object' && typeof module !== undefined) {
    module.exports = factory(root)
  } else if (typeof define === 'function' && define.amd) {
    define('file-type', [], factory.bind(null, root))
  } else {
    root.$FileType = factory(root)
  }
})(this, function (root) {

  function blob2ArrayBuffer (blob) {
    return new Promise(function (resolve) {
      if (blob.arrayBuffer) {
        blob.arrayBuffer().then(function (data) {
          resolve(data)
        })
      } else {
        var read= new FileReader()

        read.onload = function () {
          resolve(read.result)
        }

        read.readAsArrayBuffer(blob)
      }
    })
  }

  function buffer2Array (buf) {
    return new Uint8Array(buf)
  }

  function isArray (v) {
    return Object.prototype.toString.call(v) === '[object Array]'
  }

  // arr1 以 arr2 开始
  function startWith (arr1, arr2) {
    if (arr2.length > arr1.length) return false

    for (var i in arr2) {
      if (arr2[i] !== arr1[i]) return false
    }

    return true
  }

  /**
   * @param {File|Blob|ArrayBuffer|Buffer} data
   * @param {string} type
   * @return {Promise<boolean>}
   * **/
  function is (data, type) {
    return new Promise(function (resolve, reject) {
      if (!data && data.length < 1) {
        resolve(false)
      }

      var fileDefine = fileTypes[type]
      if (!fileDefine) {
        reject(new Error('Unsupported type: ' + type))
      }

      var isCustom = !isArray(fileDefine) && typeof fileDefine === 'object'
      var sliceLen = fileDefine.length || data.length
      var offset = fileDefine.offset || 0

      if (root.Blob && data instanceof root.Blob) {
        blob2ArrayBuffer(data.slice(offset, sliceLen + offset)).then(function (buf) {
          var arr = buffer2Array(buf)
          if (isCustom) {
            resolve(fileDefine.check(arr))
          } else {
            resolve(startWith(arr, fileDefine))
          }
        })
      } else if (data instanceof ArrayBuffer || (Buffer && data instanceof Buffer)) {
        var arr = buffer2Array(data.slice(offset, sliceLen + offset))
        if (isCustom) {
          resolve(fileDefine.check(arr))
        } else {
          resolve(startWith(arr, fileDefine))
        }
      } else {
        reject(new Error('The data must be File, Blob, ArrayBuffer or Buffer'))
      }
    })
  }

  // see: https://github.com/sindresorhus/file-type/blob/master/index.js
  var fileTypes = {
    png: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
    jpg: [0xFF, 0xD8, 0xFF], // image/jpeg
    jpeg: [0xFF, 0xD8, 0xFF], // image/jpeg
    gif: [0x47, 0x49, 0x46],
    webp: {
      offset: 8,
      length: 4,
      check (arr) {
        return startWith(arr, [0x57, 0x45, 0x42, 0x50])
      }
    },
    ico: [0x00, 0x00, 0x01, 0x00], // image/x-icon

    mid: [0x4D, 0x54, 0x68, 0x64], // 'audio/midi'
    wav: {
      length: 12,
      check (arr) {
        return startWith(arr, [0x52, 0x49, 0x46, 0x46]) && startWith(arr.slice(8, 12), [0x57, 0x41, 0x56, 0x45])
      }
    }, // audio/vnd.wave
    ogg: {
      offset: 28,
      length: 7,
      check (arr) {
        return startWith(arr, [0x01, 0x76, 0x6F, 0x72, 0x62, 0x69, 0x73])
      }
    }, // audio/ogg

    mp4: {
      length: 12,
      check (arr) {
        if (startWith(arr.slice(4, 8), [0x66, 0x74, 0x79, 0x70]) &&
          ((arr[8] & 0x60) !== 0x00 && (arr[9] & 0x60) !== 0x00 && (arr[10] & 0x60) !== 0x00 && (arr[11] & 0x60) !== 0x00)
        ) {
          // var extname = String.fromCharCode.apply(String, arr.slice(8, 12))
          return true
        } else return false
      }
    },
    flv: [0x46, 0x4C, 0x56, 0x01], // video/x-flv
    mov: { // video/quicktime
      length: 4,
      offset: 4,
      check (arr) {
        return (startWith(arr, [0x66, 0x72, 0x65, 0x65]) || // `free`
          startWith(arr, [0x6D, 0x64, 0x61, 0x74]) || // `mdat` MJPEG
          startWith(arr, [0x6D, 0x6F, 0x6F, 0x76]) || // `moov`
          startWith(arr, [0x77, 0x69, 0x64, 0x65]) // `wide`
          )
      }
    },
    avi: {
      length: 11,
      check (arr) {
        return startWith(arr, [0x52, 0x49, 0x46, 0x46]) && startWith(arr.slice(8, 11), [0x41, 0x56, 0x49])
      }
    }, // video/vnd.avi

    bmp: [0x42, 0x4D], // image/bmp
    psd: [0x38, 0x42, 0x50, 0x53], // image/vnd.adobe.photoshop

    gz: [0x1F, 0x8B, 0x8], // application/gzip
    bz2: [0x42, 0x5A, 0x68], // application/x-bzip2
    zip: {
      length: 4,
      check (arr) {
        return arr[0] === 0x50 && arr[1] === 0x4B &&
          (arr[2] === 0x3 || arr[2] === 0x5 || arr[2] === 0x7) &&
          (arr[3] === 0x4 || arr[3] === 0x6 || arr[3] === 0x8)
      }
    },
    rar: {
      length: 7,
      check (arr) {
        return startWith(arr, [0x52, 0x61, 0x72, 0x21, 0x1A, 0x7]) && (arr[6] === 0x0 || arr[6] === 0x1)
      }
    }, // 'application/x-rar-compressed'
    '7z': [0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C], // application/x-7z-compressed
    dmg: [0x78, 0x01], // application/x-apple-diskimage
    exe: [0x4D, 0x5A], // application/x-msdownload
    pdf: [0x25, 0x50, 0x44, 0x46], // application/pdf
    wasm: [0x00, 0x61, 0x73, 0x6D], // application/wasm
    sqlite: [0x53, 0x51, 0x4C, 0x69], // application/x-sqlite3
    ttf: [0x00, 0x01, 0x00, 0x00, 0x00], // font/ttf
    otf: [0x4F, 0x54, 0x54, 0x4F, 0x00] // font/otf
  }

  return {
    blob2ArrayBuffer: blob2ArrayBuffer,
    buffer2Array: buffer2Array,
    fileTypes: fileTypes,
    is: is
  }
})
