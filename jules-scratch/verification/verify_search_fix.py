
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("http://localhost:4000")

        # Fill the search input and click the search button
        await page.fill('input[placeholder="Search for a song..."]', "test")
        await page.click('button:has-text("Search")')

        # Wait for the search results to appear (optional, but good practice)
        await page.wait_for_selector('.search-results')

        await page.screenshot(path="jules-scratch/verification/verification.png")
        await browser.close()

asyncio.run(main())
