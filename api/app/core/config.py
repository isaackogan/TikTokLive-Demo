import os

from dotenv import load_dotenv

if os.environ.get('ENV_PATH'):
    loaded = load_dotenv(os.environ['ENV_PATH'])
    print("Loaded?", loaded)

PORT: int = 7777
