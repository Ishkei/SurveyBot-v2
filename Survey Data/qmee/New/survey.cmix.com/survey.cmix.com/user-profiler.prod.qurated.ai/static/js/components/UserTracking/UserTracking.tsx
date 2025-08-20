import { useEffect, useState, useContext } from "react";
import { TrackingContext } from "./TrackingProvider";

interface Props {
  trackingEnabled: boolean;
}

const UserTracking = ({ trackingEnabled }: Props) => {
  const { trackingConsentGiven } = useContext(TrackingContext);
  const [trackingInitialized, setTrackingInitialized] =
    useState<boolean>(false);

  useEffect(() => {
    if (trackingEnabled && trackingConsentGiven && !trackingInitialized) {
      setTrackingInitialized(true);
    }
  }, [trackingEnabled, trackingConsentGiven, trackingInitialized]);

  return null;
};

export default UserTracking;
