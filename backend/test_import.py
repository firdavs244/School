import traceback

try:
    from app.main import app
    print("✓ Import successful!")
    print("✓ All models and routers loaded correctly!")
except Exception as e:
    print("✗ Import failed!")
    traceback.print_exc()

