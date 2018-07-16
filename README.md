# Maybe for TypeScript
Inspired by `Maybe` in [Elm](http://elm-lang.org)

## Example
```ts
function logText(Maybe<string> text) {
    switch (text.kind) {
      case MaybeKind.Nothing:
        break;
      case MaybeKind.Just:
        console.log(text.value);
        break;
    }
} 

function main() {
    logText(nothing()); // no log message
    logText(just("Hello World")); // "Hello World"
}
```

## Install
```
npm install -S @abadi199/maybe
```

## Contributing
- Submit a pull request! If you're missing a feature you want to have, or just found a bug, or found an error in the docs, please submit a pull request.
- Create an issue! If you found a bug or want a new feature that you think will make the library better, but don't have time to do it yourself, please submit an issue.