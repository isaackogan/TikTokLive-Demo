import uvicorn

from api.app.core import config

if __name__ == "__main__":
    uvicorn.run(
        "core:app",
        host="0.0.0.0",
        port=config.PORT,
        lifespan="on",
        reload=True
    )
