import React from "react";
import CookieDialog from "./CookieDialog";
import Modal from "react-modal";
import Cookies from "js-cookie";
import "./TrackingProvider.scss";

interface SettingDataType {
  settings: Array<string>;
  consentDate: number;
}

interface Props {
  trackingEnabled: boolean;
  children: React.ReactNode;
}

function getTrackingConsentGiven(cookieSettings: SettingDataType) {
  return cookieSettings?.settings.includes("tra");
}

const modalStyles = {
  overlay: {
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
};

function getShowCookieBanner(cookieSettings: SettingDataType, trackingEnabled: boolean) {
  // if there are no settings AND not in an iFrame
  return !cookieSettings && trackingEnabled;
}

export const TrackingContext = React.createContext({
  trackingConsentGiven: false,
  shouldShowCookieOverlay: false,
});

function readSettingsFromCookies() {
  const rawCookieData = Cookies.get("cookie-consent");
  if (rawCookieData) {
    return JSON.parse(rawCookieData);
  }
  return null;
}

function saveSettingsCookie(settingsData: SettingDataType) {
  Cookies.set("cookie-consent", JSON.stringify(settingsData), {
    secure: window.location.protocol === "https:",
    expires: 365,
  });
}

const TrackingProvider = ({ trackingEnabled, children }: Props) => {
  const [cookieSettings, setCookieSettings] = React.useState(
    readSettingsFromCookies()
  );
  const [showCookieBanner, setShowCookieBanner] = React.useState(true);

  const contextValue = {
    trackingConsentGiven: getTrackingConsentGiven(cookieSettings),
    shouldShowCookieOverlay: getShowCookieBanner(
      cookieSettings,
      trackingEnabled
    ),
  };

  const askForCookies = () => !!contextValue.shouldShowCookieOverlay;

  const handleHideCookieBanner = () => {
    setShowCookieBanner(false);
  };

  const saveCookieSetting = (settingsData: SettingDataType) => {
    saveSettingsCookie(settingsData);
    setCookieSettings(readSettingsFromCookies());
    setShowCookieBanner(false);
  };

  const handleRejectTracking = () => {
    const settingsData = {
      settings: [],
      consentDate: Date.now(),
    };
    saveCookieSetting(settingsData);
  };

  const handleAcceptTracking = () => {
    const settingsData = {
      settings: ["tra"],
      consentDate: Date.now(),
    };
    saveCookieSetting(settingsData);
  };

  return (
    <TrackingContext.Provider value={contextValue}>
      <>
        <Modal
          isOpen={showCookieBanner && askForCookies()}
          onRequestClose={handleHideCookieBanner}
          style={modalStyles}
          className="close-modal-content"
          portalClassName="cookie-banner-popup"
        >
          <CookieDialog
            handleReject={handleRejectTracking}
            handleAccept={handleAcceptTracking}
            handleClose={handleHideCookieBanner}
          />
        </Modal>
        {children}
      </>
    </TrackingContext.Provider>
  );
};

export default TrackingProvider;

TrackingProvider.defaultProps = {
  trackingEnabled: false,
  children: <div />,
};

