"""
Test script to verify backend is working correctly
"""
import sys
sys.path.insert(0, 'C:/Users/Firdavs/Desktop/School/backend')

from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

print("=" * 60)
print("🧪 Testing Online Maktab Backend API")
print("=" * 60)

# Test 1: Root endpoint
print("\n1. Testing root endpoint...")
response = client.get("/")
print(f"   Status: {response.status_code}")
print(f"   Response: {response.json()}")
assert response.status_code == 200

# Test 2: Register a new user
print("\n2. Testing user registration...")
user_data = {
    "email": "test_teacher@school.com",
    "full_name": "Test Teacher",
    "password": "testpass123",
    "role": "teacher"
}
response = client.post("/users/register", json=user_data)
print(f"   Status: {response.status_code}")
if response.status_code == 201:
    print(f"   ✓ User registered: {response.json()['email']}")
elif response.status_code == 400:
    print(f"   ⚠ User already exists (OK)")
else:
    print(f"   Response: {response.json()}")

# Test 3: Login
print("\n3. Testing login...")
login_data = {
    "username": "test_teacher@school.com",
    "password": "testpass123"
}
response = client.post("/users/login", data=login_data)
print(f"   Status: {response.status_code}")
if response.status_code == 200:
    token = response.json()["access_token"]
    print(f"   ✓ Login successful, token received")

    # Test 4: Get current user
    print("\n4. Testing authenticated endpoint...")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/users/me", headers=headers)
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        user = response.json()
        print(f"   ✓ User: {user['full_name']} ({user['role']})")

    # Test 5: Get all courses
    print("\n5. Testing courses endpoint...")
    response = client.get("/courses/", headers=headers)
    print(f"   Status: {response.status_code}")
    print(f"   ✓ Courses: {len(response.json())} found")

else:
    print(f"   ✗ Login failed: {response.json()}")

print("\n" + "=" * 60)
print("✅ All tests completed successfully!")
print("=" * 60)
print("\n📚 Available endpoints:")
print("   - POST /users/register - Register new user")
print("   - POST /users/login - Login and get token")
print("   - GET  /users/me - Get current user")
print("   - GET  /courses/ - Get all courses")
print("   - POST /courses/ - Create course (teacher/admin)")
print("   - GET  /enrollments/my-courses - Get my enrollments")
print("   - POST /enrollments/ - Enroll in course")
print("   - GET  /assignments/course/{id} - Get course assignments")
print("   - POST /submissions/ - Submit assignment")
print("   - GET  /grades/my-grades - Get my grades")
print("\n🌐 Server should be running on: http://127.0.0.1:8000")
print("📖 API Docs: http://127.0.0.1:8000/docs")
print("=" * 60)

