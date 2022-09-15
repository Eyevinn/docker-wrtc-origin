# docker-wrtc-origin

Docker container of a WHIP endpoint based on `@eyevinn/whip-endpoint` library.

Example docker-compose file:

```
version: "3.7"

services:
  sfu:
    image: eyevinntechnology/wrtc-sfu:v0.2.0
    network_mode: "host"
    cap_add:
      - SYS_NICE
    ulimits:
      rtprio: 99
    environment:
      - HTTP_PORT=8280
      - API_KEY=example
  ingest:
    image: eyevinntechnology/wrtc-origin:latest
    depends_on:
      - sfu
    network_mode: "host"
    environment:
      - PORT=8080
      - EXT_PORT=8080
      - ORIGIN_SFU_URL=http://localhost:8280/conferences/
      - SFU_API_KEY=example
      - EDGE_LIST_CONFIG=/etc/edge-list-config.json
    volumes:
      - ./edge-list-config.json:/etc/edge-list-config.json
```

## Configuration

Default configuration can be changed by setting these environment variables:
- `PORT`
- `EXT_PORT`
- `HOSTNAME`
- `USE_HTTPS`
- `ORIGIN_SFU_URL` : Url to SFU management API
- `SFU_API_KEY` : API-Key for SFU management API
- `EDGE_LIST_CONFIG` : path to a JSON file containing a list of edges

Example of edge list configuration json.

```
[
    { 
        "sfuApiUrl": "http://sfu-edgeA:8380/conferences/", 
        "egressApiUrl": "http://egressA:8300/api"
    }
]
```

