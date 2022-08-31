# docker-wrtc-origin

Docker container of a WHIP endpoint based on `@eyevinn/whip-endpoint` library.

Example docker-compose file:

```
version: "3.7"

services:
  sfu:
    image: eyevinntechnology/wrtc-sfu:latest
    network_mode: "host"
    cap_add:
      - SYS_NICE
    ulimits:
      rtprio: 99
    environment:
      - HTTP_PORT=8280
  ingest:
    image: eyevinntechnology/wrtc-origin:latest
    depends_on:
      - sfu
    network_mode: "host"
    environment:
      - PORT=8080
      - EXT_PORT=8080
      - SMB_URL=http://localhost:8280/conferences/
      - WHPP_API_URL=http://<WHPP-EGRESS-HOST>:8201/api
      - WHPP_EGRESS_URL=http://<WHPP-EGRESS-HOST>:8201/whpp
```

## Configuration

Default configuration can be changed by setting these environment variables:
- `PORT`
- `EXT_PORT`
- `HOSTNAME`
- `USE_HTTPS`
- `SMB_URL`
- `WHPP_API_URL`
- `WHPP_EGRESS_URL`

