# PublishFlow – Use Case Summary

## Overview

PublishFlow is a lightweight content-publishing assistant designed to help individual LinkedIn users plan, draft, and manually publish posts more efficiently.

The application focuses on responsible content creation and operates fully within LinkedIn’s API policies.

## Primary Use Case

PublishFlow enables users to:

- Draft LinkedIn post content with AI assistance
- Preview content before publishing
- Manually publish posts to their own LinkedIn profile or LinkedIn Pages they manage

All publishing actions are explicitly initiated by the user and require OAuth authorization via LinkedIn.

## API Usage

PublishFlow uses:

- **Share on LinkedIn API (Default Tier)**

No other LinkedIn APIs are requested or used.

## What PublishFlow Does NOT Do

- No automated engagement (likes, comments, follows, messages)
- No scraping of LinkedIn data
- No background or scheduled posting without user interaction
- No advertising, lead generation, or analytics tracking
- No resale or sharing of LinkedIn data

## Intended Users

- Individual professionals
- Content creators
- Small business owners managing their own LinkedIn presence

## Data Handling & Privacy

- Access tokens are used solely to publish content requested by the user
- No personal data is stored beyond what is required for the posting session
- Users can revoke access at any time via their LinkedIn account settings
- PublishFlow complies with LinkedIn API Terms of Service and data protection requirements

## Purpose

The goal of PublishFlow is to support responsible, user-controlled content publishing on LinkedIn while maintaining transparency, privacy, and platform compliance.
