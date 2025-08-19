import {
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { RequestCtx } from "../../providers/RequestContext";
import formatIso3ToIso2 from "../../utils/iso3ToIso2";
import TextControls, { TextControlProps } from "./TextControls";

interface PlaceAutocompleteProps extends TextControlProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const GooglePlacesTextControl = ({
  onPlaceSelect,
  question,
  ...props
}: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");
  const requestContext = useContext(RequestCtx);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options: any = {
      fields: ["name", "address_components"],
    };

    const iso2CountryCode = formatIso3ToIso2(requestContext?.countryCode || "");

    if (iso2CountryCode) {
      options.componentRestrictions = {
        country: iso2CountryCode.toLowerCase(),
      };
    }

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places, requestContext?.countryCode]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    const updatePlaces = () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    };

    placeAutocomplete.addListener("place_changed", updatePlaces);

    return () => {
      google.maps.event.clearInstanceListeners(placeAutocomplete);
    };
  }, [onPlaceSelect, placeAutocomplete]);


  return (
    <TextControls
      question={question}
      timeout={0}
      ref={inputRef}
      {...props}
    />
  )
};

export default GooglePlacesTextControl;
