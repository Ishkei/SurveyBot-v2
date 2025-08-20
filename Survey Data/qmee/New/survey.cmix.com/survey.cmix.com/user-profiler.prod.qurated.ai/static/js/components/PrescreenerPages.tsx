import React, { lazy, useContext, useEffect, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RequestCtx } from "../providers/RequestContext";
import MobiworkxLandingPage from "./Mobiworkx/MobiworkxLandingPage";
import LandingPage from "./LandingPage";
import LifepointsLandingPage from "./Lifepoints/LifepointsLandingPage";

const TermsOfService = lazy(() => import("./Terms/TermsOfService"));
const OffBoardingPage = lazy(() => import("./OffBoardingPage"));
const PrivacyPolicy = lazy(() => import("./Terms/PrivacyPolicy"));
const WhyDoWeAskPage = lazy(() => import("./WhyDoWeAskPage"));
const Partners = lazy(() => import("./Terms/Partners"));

interface Props {
  children: React.ReactNode;
  shouldRedirect?: boolean;
}

const PrescreenerPages = ({ children, shouldRedirect }: Props) => {
  const { isLifepointsPanel, showLandingPage, isMobiworkxPanel } =
    useContext(RequestCtx);
  const hasSetupHistoryRef = useRef(false);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hasSetupHistoryRef.current || !shouldRedirect) return;
    hasSetupHistoryRef.current = true;

    if (showLandingPage && pathname === "/prescreener") {
      navigate(`/prescreener/landing_page${search}`);
    } else if (pathname !== "/prescreener/landing_page") {
      navigate(`/prescreener${search}`, { replace: true });
    }
  }, [navigate, search, pathname, shouldRedirect, showLandingPage]);

  return (
    <div>
      <Routes>
        <Route path="/" element={children} />
        <Route
          path="/landing_page"
          element={
            isLifepointsPanel ? (
              <LifepointsLandingPage />
            ) : isMobiworkxPanel ? (
              <MobiworkxLandingPage />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/off_boarding" element={<OffBoardingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/why" element={<WhyDoWeAskPage />} />
      </Routes>
    </div>
  );
};

export default PrescreenerPages;
