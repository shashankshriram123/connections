import requests
import re

def is_instagram_username_taken(username: str) -> bool:
    url = f"https://www.instagram.com/{username}/"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    try:
        response = requests.get(url, headers=headers, timeout=5)
        if response.status_code == 404:
            return False

        # Check for "not found" title
        match = re.search(r"<title>(.*?)</title>", response.text, re.IGNORECASE)
        if match:
            title = match.group(1).strip().lower()
            if "page not found" in title or "not available" in title or "instagram" not in title:
                return False

        return True
    except requests.RequestException:
        return False

print(is_instagram_username_taken("shashank_pransana_venatash_4477_i_was_bornon_2002123"))
