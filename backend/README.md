# FoodBridge Backend

The Express + Node.js REST API service for FoodBridge.

## Features
- Endpoints for food donations, user profiles, pickup requests, and notifications
- Dual-mode database layer: Supabase PostgreSQL with local JSON (`db.json`) fallback
- Secure Groq AI assistant proxy endpoint (`/api/chat`)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   ```

3. Start server:
   ```bash
   npm start
   ```

The backend server runs on `http://localhost:5000`.

