const fs = require('fs')
const path = require('path')
const FileType = require('../file-type')

test('png', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.png'))

  expect(await FileType.is(buf, 'png')).toBe(true)
  // expect(await FileType.is(buf, 'webp')).toBe(false)
  // expect(await FileType.is(buf, 'gif')).toBe(false)
  // expect(await FileType.is(buf, 'webp')).toBe(false)
})

test('jpg', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.jpg'))

  expect(await FileType.is(buf, 'jpg')).toBe(true)
  expect(await FileType.is(buf, 'jpeg')).toBe(true)
})

test('gif', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.gif'))

  expect(await FileType.is(buf, 'gif')).toBe(true)
})

test('ico', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.ico'))

  expect(await FileType.is(buf, 'ico')).toBe(true)
})

test('webp', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.webp'))

  expect(await FileType.is(buf, 'webp')).toBe(true)
})

test('pdf', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.pdf'))

  expect(await FileType.is(buf, 'pdf')).toBe(true)
})

test('psd', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.psd'))

  expect(await FileType.is(buf, 'psd')).toBe(true)
})

test('7z', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.7z'))

  expect(await FileType.is(buf, '7z')).toBe(true)
})

test('bz2', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.tar.bz2'))

  expect(await FileType.is(buf, 'bz2')).toBe(true)
})

test('gz', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.tar.gz'))

  expect(await FileType.is(buf, 'gz')).toBe(true)
})

test('zip', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.zip'))

  expect(await FileType.is(buf, 'zip')).toBe(true)
})

test('rar', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.rar'))

  expect(await FileType.is(buf, 'rar')).toBe(true)
})

test('exe', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.exe'))

  expect(await FileType.is(buf, 'exe')).toBe(true)
})

test('mp4', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.mp4'))

  expect(await FileType.is(buf, 'mp4')).toBe(true)
})

test('flv', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.flv'))

  expect(await FileType.is(buf, 'flv')).toBe(true)
})

test('avi', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.avi'))

  expect(await FileType.is(buf, 'avi')).toBe(true)
})

test('sqlite', async () => {
  var buf = fs.readFileSync(path.resolve(__dirname, 'files/test.db'))

  expect(await FileType.is(buf, 'sqlite')).toBe(true)
})
