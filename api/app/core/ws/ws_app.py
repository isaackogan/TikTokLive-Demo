import asyncio
import logging
import traceback
import urllib.parse
from typing import Optional

import socketio

from app.core.ws.ws_client import ChatSocketClient


class ChatSocketManager(socketio.AsyncServer):
    """
    Socket.IO Server for facilitating chat forwarding

    """

    def __init__(self, **kwargs):
        super().__init__(cors_allowed_origins='*', async_mode='asgi', transports=['websocket'], **kwargs)

        self.clients: dict[str, ChatSocketClient] = {}

        # Register events
        self.on('connect', self.on_connect)

    async def initialize(self) -> None:
        asyncio.get_event_loop().create_task(self.death_heartbeat())

    async def death_heartbeat(self) -> None:

        while True:
            await asyncio.sleep(30)

    async def on_connect(self, session_id: str, data: dict) -> bool:
        params: dict = urllib.parse.parse_qs(data['QUERY_STRING'])
        unique_id_param: Optional[str] = params.get('unique_id', [])

        if len(unique_id_param) < 1:
            return False

        # Create a client
        client: ChatSocketClient = ChatSocketClient(
            io=self,
            unique_id=unique_id_param[0],
            session_id=session_id
        )

        # Connect client
        try:
            await client.start()
            self.clients[session_id] = client
            return True
        except Exception:
            logging.error("Connection failed!" + traceback.format_exc())
            return False

    async def on_disconnect(self, session_id: str, _: dict) -> None:
        try:
            client: ChatSocketClient = self.clients.pop(session_id)
        except Exception:
            return

        if client.connected:
            await client.disconnect()
