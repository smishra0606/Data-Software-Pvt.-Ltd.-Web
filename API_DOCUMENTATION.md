# API Documentation & Production Guide

## API Endpoints Overview

### Base URL
- **Development**: `http://localhost:8000/api`
- **Production**: `https://api.yourdomain.com/api`

### Health Check (No Authentication Required)
```http
GET /health
```

Response:
```json
{
  "uptime": 1234.56,
  "status": "OK",
  "timestamp": "2026-02-21T10:00:00.000Z",
  "environment": "production",
  "database": "connected"
}
```

---

## Authentication Routes (`/api/auth`)

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### Google OAuth
```http
POST /auth/google
Content-Type: application/json

{
  "token": "google_id_token"
}
```

---

## User Routes (`/api/user`)

### Get User Profile (Protected)
```http
GET /user/profile
Authorization: Bearer {token}
```

### Update User Profile (Protected)
```http
PUT /user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "avatar": "url_to_avatar"
}
```

### Get User Courses (Protected)
```http
GET /user/courses
Authorization: Bearer {token}
```

---

## Course Routes (`/api/courses`)

### List All Courses
```http
GET /courses?page=1&limit=10
```

### Get Course Details
```http
GET /courses/{courseId}
```

### Enroll in Course (Protected)
```http
POST /courses/{courseId}/enroll
Authorization: Bearer {token}
```

### Create Course (Admin Only)
```http
POST /courses
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Course Title",
  "description": "Course Description",
  "category": "Technology",
  "level": "Beginner",
  "price": 99.99
}
```

---

## File Upload Routes (`/api/upload`)

### Upload File (Protected)
```http
POST /upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

[file binary data]
```

**Note:** Maximum file size: 10MB

---

## Contact Routes (`/api/contact`)

### Submit Contact Form
```http
POST /contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Help Request",
  "message": "I need assistance with..."
}
```

**Rate Limit:** 3 submissions per hour per IP

---

## Career Routes (`/api/careers`)

### Get Open Positions
```http
GET /careers
```

### Apply for Position
```http
POST /careers/{positionId}/apply
Content-Type: multipart/form-data

name: "John Doe"
email: "john@example.com"
resume: [file]
coverLetter: "Optional cover letter text"
```

---

## Internship Routes (`/api/internships`)

### Get Internship Programs
```http
GET /internships
```

### Apply for Internship (Protected)
```http
POST /internships/{internshipId}/apply
Authorization: Bearer {token}
Content-Type: application/json

{
  "motivation": "Why you want to join",
  "skills": ["JavaScript", "React", "Node.js"]
}
```

---

## Admin Routes (`/api/admin`)

### Requires Admin Role

#### Get All Users
```http
GET /admin/users
Authorization: Bearer {admin_token}
```

#### Get Dashboard Stats
```http
GET /admin/stats
Authorization: Bearer {admin_token}
```

#### Delete User
```http
DELETE /admin/users/{userId}
Authorization: Bearer {admin_token}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

### Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Request completed successfully |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input provided |
| 401 | Unauthorized | Authentication token missing/invalid |
| 403 | Forbidden | User doesn't have permission |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate email or resource exists |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Internal server error |

---

## Rate Limiting

### General API
- **Limit**: 100 requests per 15 minutes per IP
- **Header**: `RateLimit-Remaining`, `RateLimit-Reset`

### Authentication Routes
- **Limit**: 5 login attempts per 15 minutes per IP
- **Note**: Successful logins don't count against limit

### Contact Form
- **Limit**: 3 submissions per hour per IP

---

## Authentication Headers

All protected endpoints require:

```http
Authorization: Bearer {your_jwt_token}
```

Tokens expire after 30 days. Refresh by logging in again.

---

## Response Pagination

List endpoints support pagination:

```http
GET /endpoint?page=1&limit=20&sort=-createdAt
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

## Production Best Practices

### For API Consumers

1. ✅ Always use HTTPS in production
2. ✅ Store JWT tokens securely (HttpOnly cookies recommended)
3. ✅ Refresh tokens before expiration
4. ✅ Handle rate limit errors gracefully (409 responses)
5. ✅ Implement request timeout (30 seconds recommended)
6. ✅ Log API errors for debugging
7. ✅ Validate all user inputs before sending
8. ✅ Use appropriate HTTP methods (GET, POST, PUT, DELETE)

### For API Providers (Backend)

1. ✅ Monitor API usage and performance
2. ✅ Implement proper error handling
3. ✅ Use rate limiting to prevent abuse
4. ✅ Sanitize all inputs (NoSQL injection protection)
5. ✅ Validate JWT tokens on every protected route
6. ✅ Log all API requests for debugging
7. ✅ Keep response payloads small
8. ✅ Use database indexing for fast queries
9. ✅ Implement caching where appropriate
10. ✅ Regular security audits

---

## Testing API Endpoints

### Using cURL

```bash
# Get health check
curl https://api.yourdomain.com/health

# Test authentication
curl -X POST https://api.yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass"}'

# Get protected resource
curl https://api.yourdomain.com/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

1. Import collection (if available)
2. Set base URL: `https://api.yourdomain.com/api`
3. Test endpoints one by one
4. Verify responses match documentation

### Using Thunder Client (VS Code)

1. Install extension
2. Create requests and test locally
3. Export to cURL for production testing

---

## Monitoring & Logging

### Recommended Tools

- **Error Tracking**: Sentry, Rollbar
- **Performance**: New Relic, Datadog
- **Logging**: LogRocket, Papertrail
- **Uptime**: UptimeRobot, Pingdom
- **CDN Analytics**: Cloudflare, AWS CloudFront

### Key Metrics to Monitor

- Response time (p50, p95, p99)
- Error rate (5xx, 4xx)
- API availability
- Database query performance
- File upload success rate
- Authentication success/failure rate

---

## Support & Resources

- **API Status**: Check health endpoint
- **Documentation**: This file
- **Issues**: GitHub Issues
- **Email**: support@yourdomain.com

---

Last Updated: February 2026
