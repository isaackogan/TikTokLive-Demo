import logging
import traceback

from TikTokLive.client.web.web_client import TikTokWebClient
from fastapi import APIRouter
from starlette.requests import Request
from starlette.responses import JSONResponse

router = APIRouter(prefix="/api")


@router.get("/room_info")
async def get_room_info(request: Request, room_id: str):
    http: TikTokWebClient = request.app.tiktok_api

    try:
        return JSONResponse(status_code=200, content=await http.fetch_room_info(room_id))
    except Exception:
        logging.error("Failed to fetch room info! " + traceback.format_exc())
        return JSONResponse(status_code=500, content={"error": "Failed to fetch!"})
