const { WhipEndpoint, BroadcasterClient } = require("@eyevinn/whip-endpoint");

const whipEndpoint = new WhipEndpoint({
  port: parseInt(process.env.PORT || "8000"),
  extPort: parseInt(process.env.EXT_PORT || "8000"),
  hostname: process.env.HOSTNAME,
  https: process.env.USE_HTTPS && process.env.USE_HTTPS === "true",
  enabledWrtcPlugins: [ "sfu-broadcaster" ],
});

const client = new BroadcasterClient({
  url: process.env.WHPP_API_URL,
  egressUrl: process.env.WHPP_EGRESS_URL
});

whipEndpoint.registerBroadcasterClient(client);
whipEndpoint.listen();