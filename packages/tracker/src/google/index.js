/* eslint-disable no-console */
const categoryKeys = {
  signin: ["category", "action", "hybrid_nonhybrid"],
  energy: [
    "category",
    "action",
    "internal_external",
    "state",
    "fuel_type",
    "solar_nonsolar",
  ],
  generic: ["category", "action"],
};

class Google {
  static sendData(tracking) {
    const keys = categoryKeys[tracking.category] || categoryKeys.generic;
    const values = keys.map(
      key => tracking[key] || (tracking.meta && tracking.meta[key]) || undefined
    );
    if (!values.every(value => value !== undefined)) {
      // TODO: alert 3rd-party service
      console.log("Missing keys for google analytics pageview:");
      console.table(
        keys.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {})
      );
    } else {
      const eventPath = values.join("/");
      if (typeof window.ga === "function") {
        window.ga("send", {
          hitType: "pageview",
          page: `virtual/${eventPath}`,
        });
      }
    }
  }
}

export default Google;
