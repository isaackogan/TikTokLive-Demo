import dataclasses
import os

import socketio
from TikTokLive import TikTokLiveClient
from TikTokLive.client.web.web_settings import WebDefaults
from TikTokLive.events import ConnectEvent, JoinEvent, CommentEvent

WebDefaults.tiktok_sign_api_key = os.environ.get('SIGN_API_KEY')


class ChatSocketClient(TikTokLiveClient):

    def __init__(
            self,
            io: socketio.AsyncServer,
            unique_id: str,
            session_id: str
    ):
        self._io: socketio.AsyncServer = io
        self._unique_id: str = unique_id
        self._session_id: str = session_id

        super().__init__(unique_id=unique_id)

        self.add_forwarder("ConnectEvent", ConnectEvent)
        self.add_forwarder("JoinEvent", JoinEvent)
        self.add_forwarder("CommentEvent", CommentEvent)

    def add_forwarder(self, emit_name: str, event) -> None:
        async def on_event(e: event):
            await self._send(event=emit_name, data=dataclasses.asdict(e))

        self.add_listener(event, on_event)

    async def _send(self, event: str, data: dict):
        await self._io.emit(event=event, data=data, to=self._session_id)
