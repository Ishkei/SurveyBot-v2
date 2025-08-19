import { useState, Suspense } from "react";
import { RequestCtx, getRequestContext } from "./providers/RequestContext";
import "./App.scss";
import "./assets/styling/Svg.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PanelBrandSettingsProvider } from "./providers/PanelBrandSettingsProvider";
import ErrorBoundary from "./ErrorBoundary";
import PopupMessageProvider from "./providers/PopupMessageContext";
import TranslationWrapper from "./components/common/TranslationWrapper";
import LoadingPage from "./components/common/LoadingPage";
import Profile from "./pages/Profile";
import Prescreener from "./pages/Prescreener";

function App() {
  const [brandSettingsApplied, setBrandSettingsApplied] =
    useState<Boolean>(false);

  return (
    <RequestCtx.Provider value={getRequestContext()}>
      <TranslationWrapper namespace="common">
        <ErrorBoundary>
          <Suspense fallback={<LoadingPage />}>
            <PopupMessageProvider>
              <PanelBrandSettingsProvider
                setBrandSettingsApplied={setBrandSettingsApplied}
              >
                <div>
                  {!brandSettingsApplied && <LoadingPage />}
                  <BrowserRouter>
                    <Routes>
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/prescreener/*" element={<Prescreener />} />
                    </Routes>
                  </BrowserRouter>
                </div>
              </PanelBrandSettingsProvider>
            </PopupMessageProvider>
          </Suspense>
        </ErrorBoundary>
      </TranslationWrapper>
    </RequestCtx.Provider>
  );
}


export default App;
