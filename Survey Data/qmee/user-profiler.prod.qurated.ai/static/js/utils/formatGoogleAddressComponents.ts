// Get the place details from the autocomplete object.
function formatGoogleAddressComponents(
  addressComponents: google.maps.GeocoderAddressComponent[],
  allowPostcodeSuffix = true,
) {
  let address1 = "";
  let address2 = "";
  let postcode = "";
  let state = "";
  let city = "";

  for (const component of addressComponents) {
    for (const componentType of component.types) {
      switch (componentType) {
        case "street_number": {
          address1 = `${component.long_name} ${address1}`;
          break;
        }

        case "route": {
          address1 += component.long_name || component.short_name;
          break;
        }

        case "postal_code": {
          postcode = `${component.long_name}${postcode}`;
          break;
        }

        case "postal_code_suffix": {
          if (!allowPostcodeSuffix) break;

          postcode = `${postcode}-${component.long_name}`;
          break;
        }

        case "sublocality_level_1":
        case "postal_town": {
          city = component.long_name || component.short_name;
          break;
        }

        case "neighborhood":
        case "locality": {
          if (city) break;
          city = component.long_name || component.short_name;
          break;
        }

        case "administrative_area_level_1": {
          state = component.long_name || component.short_name;
          break;
        }

        case "administrative_area_level_2": {
          if (state) break;

          state = component.long_name || component.short_name;
          break;
        }
      }
    }
  }

  return { postcode, state, city, address1, address2 };
}

export default formatGoogleAddressComponents;
