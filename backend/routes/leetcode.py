from fastapi import APIRouter, HTTPException, Query
import httpx

router = APIRouter()

LEETCODE_URL = "https://leetcode.com/graphql"


@router.get("/problems")
async def get_problems(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    difficulty: str | None = None,
    topic: str | None = None,
):
    query = """
    query problemsetQuestionList(
      $categorySlug: String
      $limit: Int
      $skip: Int
      $filters: QuestionListFilterInput
    ) {
      questionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        totalNum
        data {
          questionFrontendId
          title
          titleSlug
          difficulty
          acRate
          isPaidOnly
          topicTags {
            name
            slug
          }
        }
      }
    }
    """

    filters = {}

    if difficulty:
        filters["difficulty"] = difficulty.upper()

    if topic:
        filters["tags"] = [topic.lower()]

    variables = {
        "categorySlug": "",
        "skip": skip,
        "limit": limit,
        "filters": filters
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                LEETCODE_URL,
                json={
                    "query": query,
                    "variables": variables
                },
                headers={
                    "Content-Type": "application/json",
                    "Referer": "https://leetcode.com",
                    "User-Agent": "Mozilla/5.0"
                },
                timeout=20
            )

        response.raise_for_status()

        result = response.json()

        if result.get("errors"):
            raise HTTPException(
                status_code=500,
                detail=result["errors"]
            )

        return result["data"]["questionList"]

    except httpx.HTTPError as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )




@router.get("/profile/{username}")
async def get_profile(username: str):
    query = """
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username

        profile {
          realName
          ranking
          reputation
          userAvatar
        }

        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
    """

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                LEETCODE_URL,
                json={
                    "query": query,
                    "variables": {
                        "username": username
                    }
                },
                headers={
                    "Content-Type": "application/json",
                    "Referer": "https://leetcode.com",
                    "User-Agent": "Mozilla/5.0"
                },
                timeout=20
            )

        response.raise_for_status()

        result = response.json()

        if result.get("errors"):
            raise HTTPException(
                status_code=500,
                detail=result["errors"]
            )

        user = result["data"]["matchedUser"]

        if not user:
            raise HTTPException(
                status_code=404,
                detail="LeetCode user not found"
            )

        return user

    except httpx.HTTPError as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/recent/{username}")
async def get_recent_submissions(username: str):
    query = """
    query recentAcSubmissions($username: String!) {
      recentAcSubmissionList(username: $username) {
        id
        title
        titleSlug
        timestamp
      }
    }
    """

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                LEETCODE_URL,
                json={
                    "query": query,
                    "variables": {
                        "username": username
                    }
                },
                headers={
                    "Content-Type": "application/json",
                    "Referer": "https://leetcode.com",
                    "User-Agent": "Mozilla/5.0"
                },
                timeout=20
            )

        response.raise_for_status()

        result = response.json()

        if result.get("errors"):
            raise HTTPException(
                status_code=500,
                detail=result["errors"]
            )

        return result["data"]["recentAcSubmissionList"]

    except httpx.HTTPError as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )