# Url context
Helper utility for managing url params using React context API

## Instalation
`npm install --save url-context`
or
`yarn add url-context`

## Usage
### Provider
```javascript
import urlContext from "url-context";

const {
  UrlProvider,
  UrlConsumer
} = urlContext();

ReactDOM.render(
  <UrlProvider>
    <Root />
  </UrlProvider>,
  document.getElementById("app"),
);

```

### Connect Consumer
```javascript
const Root = () =>
  <UrlConsumer>
    {context => (
      <App
        state={context.state}
        addParam={context.addParam}
        removeParam={context.removeParam}
      />
    )}
  </UrlConsumer>
```
Inside _Consumer component_ you'll have access to props:
- `state` - object of `key: value` pairs of params in url
- `addParam` - function taking `key: string` and `value> string` to be set in url
- `removeParam` - function taking `key: string` of param to be removed from url
```javascript
const App = (props) =>
  <div>
    <span>Result: {props.state.number}</span>
   <button
     onClick={() =>
       props.addParam("number", props.state.number + 1)}
    >Add 1</button>
    <button
      onClick={() =>
        props.addParam("number", props.state.number - 1)}
    >Take 1</button>
    <button onClick={() => props.removeParam("number")}>
      Remove
    </button>
  </div>
```

## Examples
For running particular example run one of commands:
`yarn example:simple-param`