"""
CORS Test Script - Backend va Frontend aloqasini tekshirish
"""
import requests
import json

print("=" * 60)
print("🧪 CORS TEST - Backend ↔️ Frontend")
print("=" * 60)

BASE_URL = "http://localhost:8000"

# Test 1: Root endpoint
print("\n1️⃣ Testing root endpoint...")
try:
    response = requests.get(f"{BASE_URL}/")
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    print("   ✅ Backend is running!")
except Exception as e:
    print(f"   ❌ Error: {e}")
    print("   ⚠️  Backend is NOT running! Start it with: uvicorn app.main:app --reload")
    exit(1)

# Test 2: CORS headers
print("\n2️⃣ Testing CORS headers...")
try:
    response = requests.options(
        f"{BASE_URL}/users/register",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type"
        }
    )

    cors_headers = {
        "Access-Control-Allow-Origin": response.headers.get("Access-Control-Allow-Origin"),
        "Access-Control-Allow-Methods": response.headers.get("Access-Control-Allow-Methods"),
        "Access-Control-Allow-Headers": response.headers.get("Access-Control-Allow-Headers"),
    }

    print(f"   Status: {response.status_code}")
    for key, value in cors_headers.items():
        if value:
            print(f"   ✅ {key}: {value}")
        else:
            print(f"   ❌ {key}: NOT SET")

    if cors_headers["Access-Control-Allow-Origin"]:
        print("   ✅ CORS is configured!")
    else:
        print("   ❌ CORS is NOT configured!")

except Exception as e:
    print(f"   ❌ Error: {e}")

# Test 3: Register endpoint
print("\n3️⃣ Testing register endpoint...")
test_user = {
    "email": "cors_test@school.com",
    "full_name": "CORS Test User",
    "password": "test123",
    "role": "student"
}

try:
    response = requests.post(
        f"{BASE_URL}/users/register",
        json=test_user,
        headers={"Origin": "http://localhost:5173"}
    )

    print(f"   Status: {response.status_code}")

    if response.status_code == 201:
        print(f"   ✅ User registered successfully!")
        print(f"   Response: {response.json()}")
    elif response.status_code == 400:
        print(f"   ⚠️  User already exists (OK for test)")
    else:
        print(f"   ❌ Unexpected status code")
        print(f"   Response: {response.text}")

except Exception as e:
    print(f"   ❌ Error: {e}")

# Test 4: API Documentation
print("\n4️⃣ Testing API documentation...")
try:
    response = requests.get(f"{BASE_URL}/docs")
    if response.status_code == 200:
        print(f"   ✅ API Docs available at: {BASE_URL}/docs")
    else:
        print(f"   ⚠️  Status: {response.status_code}")
except Exception as e:
    print(f"   ❌ Error: {e}")

print("\n" + "=" * 60)
print("📊 SUMMARY")
print("=" * 60)
print("✅ Backend is running: http://localhost:8000")
print("✅ CORS should be working (if headers are present)")
print("✅ API Docs: http://localhost:8000/docs")
print("\n🔄 If CORS is not working:")
print("   1. Stop backend (Ctrl+C)")
print("   2. Restart: uvicorn app.main:app --reload")
print("   3. Clear browser cache")
print("   4. Try registering from frontend")
print("=" * 60)

