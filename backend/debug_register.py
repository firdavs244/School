"""
Debug script - Register endpoint test
"""
import sys
import traceback

print("=" * 60)
print("🧪 Testing Register Endpoint")
print("=" * 60)

try:
    print("\n1️⃣ Importing modules...")
    from app.main import app
    from app.schemas.user import UserCreate
    from app.models.user import UserRole
    from fastapi.testclient import TestClient
    print("   ✅ Imports successful!")

    print("\n2️⃣ Creating test client...")
    client = TestClient(app)
    print("   ✅ Test client created!")

    print("\n3️⃣ Testing root endpoint...")
    response = client.get("/")
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")

    print("\n4️⃣ Testing register endpoint...")
    test_user = {
        "email": "debug_test@school.com",
        "full_name": "Debug Test User",
        "password": "test123",
        "role": "student"
    }

    print(f"   Request data: {test_user}")
    response = client.post("/users/register", json=test_user)

    print(f"   Status: {response.status_code}")

    if response.status_code == 201:
        print(f"   ✅ SUCCESS: {response.json()}")
    elif response.status_code == 400:
        print(f"   ⚠️  User exists: {response.json()}")
    else:
        print(f"   ❌ ERROR: {response.status_code}")
        print(f"   Response: {response.text}")

    print("\n" + "=" * 60)
    print("✅ Debug complete!")
    print("=" * 60)

except Exception as e:
    print("\n" + "=" * 60)
    print("❌ ERROR OCCURRED:")
    print("=" * 60)
    print(f"\nError: {str(e)}")
    print("\nFull traceback:")
    traceback.print_exc()
    print("=" * 60)

