// const callback  = () =>{(suggestion, 'OK')}

export const setupGoogleMock = zero_result => {
  /*** Mock Google Maps JavaScript API ***/
  const google = {
    maps: {
      places: {
        AutocompleteService: class {
          getPlacePredictions(_filters, callback) {
            zero_result
              ? callback([], 'ZERO_RESULTS')
              : callback(suggestion, 'OK');
          }
        },
        PlacesServiceStatus: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
      },
      Geocoder: class {
        geocode(_placeId, callback) {
          callback(selected, 'OK');
        }
      },
      GeocoderStatus: {
        ERROR: 'ERROR',
        INVALID_REQUEST: 'INVALID_REQUEST',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },
  };
  global.window.google = google;
};

export const suggestion = [
  {
    description: '37/7 Belgrave Street, Kogarah NSW, Australia',
    matched_substrings: [{ length: 15, offset: 5 }],
    place_id:
      'EiwzNy83IEJlbGdyYXZlIFN0cmVldCwgS29nYXJhaCBOU1csIEF1c3RyYWxpYSI4GjYKMBIuChQKEgnf1wd05LkSaxG_ewaS8_mRjRAHKhQKEglN0AVl5LkSaxGoDUnI6qFnLxICMzc',
    reference:
      'EiwzNy83IEJlbGdyYXZlIFN0cmVldCwgS29nYXJhaCBOU1csIEF1c3RyYWxpYSI4GjYKMBIuChQKEgnf1wd05LkSaxG_ewaS8_mRjRAHKhQKEglN0AVl5LkSaxGoDUnI6qFnLxICMzc',
    structured_formatting: {
      main_text: '37/7 Belgrave Street',
      main_text_matched_substrings: [{ length: 15, offset: 5 }],
      secondary_text: 'Kogarah NSW, Australia',
    },
    terms: [
      { offset: 0, value: '37/7' },
      { offset: 5, value: 'Belgrave Street' },
      { offset: 22, value: 'Kogarah' },
      { offset: 30, value: 'NSW' },
      { offset: 35, value: 'Australia' },
    ],
    types: ['subpremise', 'geocode'],
  },
  {
    description: '37/7 Belgrave Street, Manly NSW, Australia',
    matched_substrings: [{ length: 15, offset: 5 }],
    place_id:
      'EiozNy83IEJlbGdyYXZlIFN0cmVldCwgTWFubHkgTlNXLCBBdXN0cmFsaWEiOBo2CjASLgoUChIJfXrl3AirEmsRds9k7TAOlOMQByoUChIJHz9mwQirEmsRwrSEmvyWFwISAjM3',
    reference:
      'EiozNy83IEJlbGdyYXZlIFN0cmVldCwgTWFubHkgTlNXLCBBdXN0cmFsaWEiOBo2CjASLgoUChIJfXrl3AirEmsRds9k7TAOlOMQByoUChIJHz9mwQirEmsRwrSEmvyWFwISAjM3',
    structured_formatting: {
      main_text: '37/7 Belgrave Street',
      main_text_matched_substrings: [{ length: 15, offset: 5 }],
      secondary_text: 'Manly NSW, Australia',
    },
    terms: [
      { offset: 0, value: '37/7' },
      { offset: 5, value: 'Belgrave Street' },
      { offset: 22, value: 'Manly' },
      { offset: 28, value: 'NSW' },
      { offset: 33, value: 'Australia' },
    ],
    types: ['subpremise', 'geocode'],
  },
  {
    description: '37/7 Belgrave Street, Bronte NSW, Australia',
    matched_substrings: [{ length: 15, offset: 5 }],
    place_id:
      'EiszNy83IEJlbGdyYXZlIFN0cmVldCwgQnJvbnRlIE5TVywgQXVzdHJhbGlhIjgaNgowEi4KFAoSCXEUc-aLrRJrEcETguZnfQETEAcqFAoSCfm3lFuJrRJrEYWMyVt7sV69EgIzNw',
    reference:
      'EiszNy83IEJlbGdyYXZlIFN0cmVldCwgQnJvbnRlIE5TVywgQXVzdHJhbGlhIjgaNgowEi4KFAoSCXEUc-aLrRJrEcETguZnfQETEAcqFAoSCfm3lFuJrRJrEYWMyVt7sV69EgIzNw',
    structured_formatting: {
      main_text: '37/7 Belgrave Street',
      main_text_matched_substrings: [{ length: 15, offset: 5 }],
      secondary_text: 'Bronte NSW, Australia',
    },
    terms: [
      { offset: 0, value: '37/7' },
      { offset: 5, value: 'Belgrave Street' },
      { offset: 22, value: 'Bronte' },
      { offset: 29, value: 'NSW' },
      { offset: 34, value: 'Australia' },
    ],
    types: ['subpremise', 'geocode'],
  },
];

const selected = [
  {
    address_components: [
      { long_name: '7', short_name: '7', types: ['street_number'] },
      {
        long_name: 'Belgrave Street',
        short_name: 'Belgrave St',
        types: ['route'],
      },
      {
        long_name: 'Kogarah',
        short_name: 'Kogarah',
        types: ['locality', 'political'],
      },
      {
        long_name: 'Georges River Council',
        short_name: 'Georges River Council',
        types: ['administrative_area_level_2', 'political'],
      },
      {
        long_name: 'New South Wales',
        short_name: 'NSW',
        types: ['administrative_area_level_1', 'political'],
      },
      {
        long_name: 'Australia',
        short_name: 'AU',
        types: ['country', 'political'],
      },
      { long_name: '2217', short_name: '2217', types: ['postal_code'] },
    ],
    formatted_address: '7 Belgrave St, Kogarah NSW 2217, Australia',
    geometry: {
      location: { lat: -33.9649012, lng: 151.1332705 },
      location_type: 'ROOFTOP',
      viewport: {
        northeast: { lat: -33.9635522197085, lng: 151.1346194802915 },
        southwest: { lat: -33.9662501802915, lng: 151.1319215197085 },
      },
    },
    place_id: 'ChIJF233ZuS5EmsRTzjs2tsUiRw',
    types: ['street_address'],
  },
];
