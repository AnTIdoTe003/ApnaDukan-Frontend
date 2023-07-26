import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ColorModeScript, ChakraProvider, theme } from "@chakra-ui/react";
import { AuthProvider } from "./context/auth";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { CartProvider } from "./context/cart";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store/store";
import { persistStore } from "redux-persist";
const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AuthProvider>
        <CartProvider>
          <ChakraProvider theme={theme}>
            <ColorModeScript />
            <DevSupport
              ComponentPreviews={ComponentPreviews}
              useInitialHook={useInitial}
            >
              <App />
            </DevSupport>
          </ChakraProvider>
        </CartProvider>
      </AuthProvider>
    </PersistGate>
  </Provider>
);
