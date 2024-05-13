from contextlib import asynccontextmanager
from typing import AsyncContextManager

from TikTokLive.client.web.web_client import TikTokWebClient
from fastapi import FastAPI
from socketio import ASGIApp
from starlette.staticfiles import StaticFiles

from app.core import routes
from app.core.ws.ws_app import ChatSocketManager


class TikTokLiveReaderAPI(FastAPI):

    def __init__(self, **extra: dict):
        super().__init__(lifespan=self.app_lifespan, **extra)

        # Create the manager
        self.sio: ChatSocketManager = ChatSocketManager()
        self.sio_app: ASGIApp = ASGIApp(self.sio, socketio_path="/ws")
        self.tiktok_api = TikTokWebClient()

        self.include_router(routes.router)
        self.mount("/ws", self.sio_app)
        self.mount("/", StaticFiles(directory="../resources/web", html=True), name="web")

    @staticmethod
    @asynccontextmanager
    async def app_lifespan(self) -> AsyncContextManager[None]:
        """
        Handle the lifespan of the app

        :return: Context manager for Criadex

        """

        # Initialization
        await self.sio.initialize()

        # Shutdown is after yield
        yield


app: TikTokLiveReaderAPI = TikTokLiveReaderAPI()
