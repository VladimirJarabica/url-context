import * as React from "react";
import * as R from "ramda";

// ================
// Helper functions
// TODO: add tests
export const makeQuery = params =>
  R.compose(
    R.concat("?"),
    R.join("&"),
    R.map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    ),
    R.keys
  )(params);

export const parseQuery = query =>
  R.compose(
    R.reduce((acc, keyParam) => {
      const [key, param] = R.split("=")(keyParam);
      return R.assoc(decodeURIComponent(key), decodeURIComponent(param), acc);
    }, {}),
    R.filter(Boolean),
    R.split("&"),
    R.ifElse(query => R.head(query) === "?", R.tail, R.identity)
  )(query);

const pushUrlToWindow = query => {
  if (!window) return;
  window.history.pushState(
    {},
    null,
    `${window.location.origin}${window.location.pathname}${query}`
  );
};

// =======
// Context

function urlContext() {
  const { Provider, Consumer } = React.createContext({});

  class UrlProvider extends React.PureComponent {
    state = {
      params: {}
    };

    static defaultProps = {
      pushUrl: pushUrlToWindow
    };

    constructor(props) {
      super(props);

      const initialState = R.compose(
        parseQuery,
        R.pathOr("", ["location", "search"])
      )(window);

      this.state = {
        params: initialState
      };
    }

    addParam = (key, param) => {
      const params = R.assoc(key, param, this.state.params);
      this.props.pushUrl(makeQuery(params));
      this.setState({
        params
      });
    };

    removeParam = key => {
      const params = R.dissoc(key, this.state.params);
      this.props.pushUrl(makeQuery(params));
      this.setState({
        params
      });
    };

    render() {
      return (
        <Provider
          value={{
            state: this.state.params,
            addParam: this.addParam,
            removeParam: this.removeParam
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
  }

  return {
    UrlProvider,
    UrlConsumer: Consumer
  };
}

export default urlContext;
