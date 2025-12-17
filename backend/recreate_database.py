"""
Database Recreation Script
This script helps you safely recreate the database with the new schema
"""
import os
import sys

print("=" * 70)
print("🗄️  DATABASE RECREATION SCRIPT")
print("=" * 70)

db_path = "school.db"

# Check if database exists
if os.path.exists(db_path):
    print(f"\n⚠️  WARNING: Database file '{db_path}' exists!")
    print("\nThis database needs to be deleted because:")
    print("  • Old schema doesn't have 'role' column")
    print("  • New schema uses String type for role (not Enum)")
    print("  • Incompatible structure")

    response = input("\n❓ Delete old database and create new one? (yes/no): ").lower()

    if response in ['yes', 'y']:
        try:
            os.remove(db_path)
            print(f"\n✅ Deleted: {db_path}")
        except Exception as e:
            print(f"\n❌ Error deleting database: {e}")
            print("\n💡 Solution:")
            print("   1. Stop the backend server (Ctrl+C)")
            print("   2. Run this script again")
            print("   3. Or manually delete school.db file")
            sys.exit(1)
    else:
        print("\n❌ Aborted. Database not deleted.")
        print("\n⚠️  Backend won't work with old database!")
        sys.exit(1)
else:
    print(f"\n✅ No old database found. Will create new one.")

# Create new database
print("\n📦 Creating new database with updated schema...")
try:
    from app.main import app
    from app.db import engine, Base

    # Create all tables
    Base.metadata.create_all(bind=engine)

    print("✅ Database created successfully!")
    print(f"✅ Location: {os.path.abspath(db_path)}")

    print("\n📋 Tables created:")
    print("   • users (with role column)")
    print("   • courses")
    print("   • enrollments")
    print("   • assignments")
    print("   • submissions")
    print("   • grades")

    print("\n" + "=" * 70)
    print("✅ SUCCESS! Database is ready!")
    print("=" * 70)
    print("\nNext steps:")
    print("  1. Start backend: uvicorn app.main:app --reload")
    print("  2. Start frontend: npm run dev")
    print("  3. Register a new user")
    print("  4. Enjoy! 🎉")
    print("=" * 70)

except Exception as e:
    print(f"\n❌ Error creating database: {e}")
    print("\nFull error:")
    import traceback
    traceback.print_exc()
    sys.exit(1)

