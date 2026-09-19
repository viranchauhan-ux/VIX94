import { DurableObject } from "cloudflare:workers";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/presence") {
      if (request.headers.get("Upgrade") !== "websocket") {
        return new Response("VIX94 presence endpoint", {
          status: 426,
          headers: { "Cache-Control": "no-store" }
        });
      }

      const id = env.PRESENCE.idFromName("vix94-global");
      return env.PRESENCE.get(id).fetch(request);
    }

    return env.ASSETS.fetch(request);
  }
};

export class Presence extends DurableObject {
  async fetch(request) {
    const upgrade = request.headers.get("Upgrade");
    if (!upgrade || upgrade.toLowerCase() !== "websocket") {
      return new Response("WebSocket required", {
        status: 426,
        headers: { "Cache-Control": "no-store" }
      });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];

    this.ctx.acceptWebSocket(server);

    // Send the count to the new listener.
    this.sendCount(server);

    // Update all existing listeners.
    this.broadcastCount();

    return new Response(null, {
      status: 101,
      webSocket: client
    });
  }

  async webSocketMessage(ws) {
    this.sendCount(ws);
  }

  async webSocketClose() {
    this.broadcastCount();
  }

  async webSocketError() {
    this.broadcastCount();
  }

  sendCount(ws) {
    try {
      ws.send(JSON.stringify({
        online: this.ctx.getWebSockets().length
      }));
    } catch (_) {}
  }

  broadcastCount() {
    const message = JSON.stringify({
      online: this.ctx.getWebSockets().length
    });

    for (const ws of this.ctx.getWebSockets()) {
      try {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(message);
        }
      } catch (_) {}
    }
  }
}
