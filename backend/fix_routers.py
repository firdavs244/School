"""
Fix UserRole enum references in all routers
"""
import os
import re

# Files to update
files = [
    'app/routers/course.py',
    'app/routers/enrollment.py',
    'app/routers/assignment.py',
    'app/routers/submission.py',
    'app/routers/grade.py',
]

# Replacements
replacements = [
    (r'UserRole\.ADMIN', '"admin"'),
    (r'UserRole\.TEACHER', '"teacher"'),
    (r'UserRole\.STUDENT', '"student"'),
    (r'from app\.models\.user import User, UserRole', 'from app.models.user import User'),
    (r'from app\.models\.user import UserRole', '# UserRole no longer needed - using strings'),
]

for filepath in files:
    if not os.path.exists(filepath):
        print(f"⚠️  Skipping {filepath} - file not found")
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Updated {filepath}")
    else:
        print(f"⏭️  No changes needed in {filepath}")

print("\n✅ All routers updated!")

