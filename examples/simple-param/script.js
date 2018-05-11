import * as React from "react";
import ReactDOM from "react-dom";

import { UrlProvider, UrlConsumer } from "./url";
import App from "./app";

ReactDOM.render(
  <UrlProvider>
    <UrlConsumer>
      {context => (
        <App
          state={context.state}
          addParam={context.addParam}
          removeParam={context.removeParam}
        />
      )}
    </UrlConsumer>
  </UrlProvider>,
  document.getElementById("app")
);
