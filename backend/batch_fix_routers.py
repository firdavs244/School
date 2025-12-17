"""
Batch fix all router files - Replace UserRole enum with strings
"""
import os
import re

print("=" * 60)
print("🔧 Fixing all router files...")
print("=" * 60)

# Router files to fix
routers_dir = "app/routers"
router_files = [
    "assignment.py",
    "submission.py",
    "grade.py"
]

# Replacements
replacements = [
    # Remove UserRole import
    (r'from app\.models\.user import User, UserRole', 'from app.models.user import User'),
    # Replace enum values
    (r'UserRole\.ADMIN', '"admin"'),
    (r'UserRole\.TEACHER', '"teacher"'),
    (r'UserRole\.STUDENT', '"student"'),
    # Fix list comparisons
    (r'\[UserRole\.ADMIN, UserRole\.TEACHER\]', '["admin", "teacher"]'),
    (r'\[UserRole\.ADMIN\]', '["admin"]'),
]

for filename in router_files:
    filepath = os.path.join(routers_dir, filename)

    if not os.path.exists(filepath):
        print(f"⚠️  Skipping {filename} - not found")
        continue

    print(f"\n📝 Processing {filename}...")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"   ✅ Fixed!")
    else:
        print(f"   ⏭️  No changes needed")

print("\n" + "=" * 60)
print("✅ All router files fixed!")
print("=" * 60)

