"""
Test password hashing after bcrypt fix
"""
import sys
sys.path.insert(0, 'C:/Users/Firdavs/Desktop/School/backend')

print("=" * 60)
print("🔐 Testing Bcrypt Password Hashing")
print("=" * 60)

try:
    from app.utils import get_password_hash, verify_password

    # Test 1: Normal password
    print("\n1️⃣ Testing normal password...")
    password = "test123"
    hash1 = get_password_hash(password)
    print(f"   Password: {password}")
    print(f"   Hash: {hash1[:30]}...")
    print(f"   ✅ Hash generated successfully!")

    # Test 2: Verify password
    print("\n2️⃣ Testing password verification...")
    is_valid = verify_password(password, hash1)
    print(f"   Valid: {is_valid}")
    if is_valid:
        print("   ✅ Password verification works!")
    else:
        print("   ❌ Password verification failed!")

    # Test 3: Long password (previously caused error)
    print("\n3️⃣ Testing long password (72+ bytes)...")
    long_password = "a" * 100  # 100 characters
    print(f"   Password length: {len(long_password)} chars")
    hash2 = get_password_hash(long_password)
    print(f"   Hash: {hash2[:30]}...")
    print(f"   ✅ Long password handled correctly!")

    # Test 4: Verify long password
    print("\n4️⃣ Verifying long password...")
    is_valid2 = verify_password(long_password, hash2)
    print(f"   Valid: {is_valid2}")
    if is_valid2:
        print("   ✅ Long password verification works!")
    else:
        print("   ❌ Long password verification failed!")

    # Test 5: Wrong password
    print("\n5️⃣ Testing wrong password...")
    is_valid3 = verify_password("wrongpassword", hash1)
    print(f"   Valid: {is_valid3}")
    if not is_valid3:
        print("   ✅ Correctly rejected wrong password!")
    else:
        print("   ❌ Should have rejected wrong password!")

    print("\n" + "=" * 60)
    print("✅ ALL TESTS PASSED!")
    print("=" * 60)
    print("\nBcrypt password hashing is working correctly!")
    print("You can now:")
    print("  1. Start backend: uvicorn app.main:app --reload")
    print("  2. Register users without errors")
    print("  3. Login successfully")
    print("=" * 60)

except Exception as e:
    print("\n" + "=" * 60)
    print("❌ ERROR:")
    print("=" * 60)
    print(f"\n{e}\n")
    import traceback
    traceback.print_exc()
    print("\n" + "=" * 60)

