from typing import Optional

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings

import models as models


class Settings(BaseSettings):
    # database configurations
    DATABASE_URL: Optional[str] = None
    DATABASE_NAME: Optional[str] = None
    WEB3_PROVIDER_URL: Optional[str] = None
    CRV_token: Optional[str] = None

    # JWT
    secret_key: str = "secret"
    algorithm: str = "HS256"

    class Config:
        env_file = ".env"
        orm_mode = True


async def initiate_database():
    client = AsyncIOMotorClient(Settings().DATABASE_URL)
    await init_beanie(
        database=client.get_default_database(), document_models=models.__all__
    )
