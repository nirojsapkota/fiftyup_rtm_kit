const hybridLoginView = {
  disclaimerProps: {
    disclaimerText: `*Origin Saver is available to residential customers only. It is not available for all areas and for all properties being connected for the first time. Discounts apply to usage charges only (off Origin's published Origin Supply usage charges) and do not apply to GreenPower, Green Gas or supply charges.
    <br>
    <br>
    **Solar Boost - your solar PV system must be net metered and must not be larger than 10kW. You will also receive a guaranteed discount on the electricity usage charges for 12 months from the supply start date. The Feed-in Tariff (FIT) offer is 20 cents/kWh.
    <br>
    <br>
    Offer available until 30th June 2019. You should check about any exit or cancellation fees from your current provider. Terms and conditions apply. One Big Switch earns a fee for each customer that takes up the offer.
    <br>
    <br>
    Basic Plan Information Documents are available <a href="https://buyinggroup.originenergy.com.au/custom/origin/energy/price-fact/OBS/home">here</a>`,
  },
  title: 'Login panel title',
  authenticityToken:
    'I7t3w13syZv9gWaz0kbQA3fL6NqrhwiZlfIt9HixtbKNZIy5nsB36XE8eQHC+AtA5lT2p7Kt182TIrUDgSZ+gw==',
  hiddenFields: {
    registering_campaign_id: 276,
    jump_path: '/campaigns/OBS_BES_2017_Offers',
  },
  loginUrl: '/guest_sessions',
  autocompletePostcodeUrl: '/suburbs/autocomplete_postcode',
  heroImageUrl: 'https://placehold.it/1080x454',
  entity: {
    brand: 'obs',
    footer_items: {},
    header_items: {},
  },
  howItWorksProps: {
    header:
      'One Big Switch takes the stress out of getting value on your household bills by doing the negotiating for you!',
    icons: [
      {
        glyph: 'user-help',
        title: 'You join the movement for free',
      },
      {
        glyph: 'balance',
        title: 'We negotiate Group Discounts',
      },
      {
        glyph: 'hands-shake-2',
        title: 'You decide what’s right for you',
      },
    ],
  },
};

export default hybridLoginView;
