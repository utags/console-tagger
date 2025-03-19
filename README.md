# console-tagger

console-tagger

```js
const console = new Console({
  prefix: 'app',
  color: { line: 'white', background: 'red' },
})

console.log('abc')
console.error('test')

globalThis.console.error(
  '%cThere are %d elements in',
  'color:white;background:red;',
  2,
  '333'
)

globalThis.console.log('There are %d elements in', 2, '333')
```
