const { WhipEndpoint, BroadcasterClient } = require("@eyevinn/whip-endpoint");

const whipEndpoint = new WhipEndpoint({
  port: parseInt(process.env.PORT || "8000"),
  extPort: parseInt(process.env.EXT_PORT || "8000"),
  hostname: process.env.HOSTNAME,
  https: process.env.USE_HTTPS && process.env.USE_HTTPS === "true",
  enabledWrtcPlugins: [ "sfu-broadcaster" ],
});
whipEndpoint.setOriginSfuUrl(process.env.ORIGIN_SFU_URL);
whipEndpoint.setSfuApiKey(process.env.SFU_API_KEY);

const edgeList = require(process.env.EDGE_LIST_CONFIG);
edgeList.forEach((pair) => {
  whipEndpoint.registerBroadcasterClient({
    client: new BroadcasterClient(pair.egressApiUrl),
    sfuUrl: pair.sfuApiUrl,
  });
});

whipEndpoint.listen();