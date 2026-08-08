from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.leetcode import router as leetcode_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://leet-tracker-f3modvm77-parthverma733s-projects.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    leetcode_router,
    prefix="/api/leetcode"
)


@app.get("/")
def root():
    return {"message": "Backend working"}