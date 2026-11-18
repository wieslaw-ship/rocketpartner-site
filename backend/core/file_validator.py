# backend/core/file_validator.py - Secure file validation
from fastapi import UploadFile
from core.exceptions import ValidationError
from pathlib import Path

# ✅ WHITELIST (only allow these)
ALLOWED_EXTENSIONS = {
    'jpg', 'jpeg', 'png', 'gif', 'webp',  # Images
    'pdf', 'doc', 'docx',                  # Documents
}

# ❌ BLACKLIST (never allow these)
DANGEROUS_EXTENSIONS = {
    'exe', 'dll', 'sh', 'bat', 'cmd',     # Executables
    'js', 'py', 'php', 'asp', 'jar',      # Scripts
    'zip', 'rar', '7z', 'tar',            # Archives
}

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB max

ALLOWED_MIMES = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
}

def validate_file(file: UploadFile) -> tuple[bool, str]:
    """
    Validate uploaded file for security.
    
    Returns:
        tuple: (is_valid, error_message)
    """
    
    # 1. Check if file exists
    if not file or not file.filename:
        return False, "File not provided"
    
    # 2. Get file extension (safe way)
    filename = Path(file.filename).name
    if '.' not in filename:
        return False, "File must have an extension"
    
    ext = filename.rsplit('.', 1)[1].lower()
    
    # 3. Check extension blacklist
    if ext in DANGEROUS_EXTENSIONS:
        return False, f"File type .{ext} is not allowed"
    
    # 4. Check extension whitelist
    if ext not in ALLOWED_EXTENSIONS:
        return False, f"File type .{ext} is not allowed. Only {', '.join(ALLOWED_EXTENSIONS)} allowed"
    
    # 5. Check MIME type
    if file.content_type not in ALLOWED_MIMES:
        return False, f"Invalid MIME type: {file.content_type}"
    
    # 6. Check file size
    if file.size and file.size > MAX_FILE_SIZE:
        return False, f"File too large. Max size: {MAX_FILE_SIZE / 1024 / 1024}MB"
    
    # 7. Check for path traversal attempts
    if ".." in filename or "/" in filename or "\\" in filename:
        return False, "Invalid filename: contains path separators"
    
    return True, ""

def sanitize_filename(filename: str, user_id: int) -> str:
    """
    Generate safe filename: user_id_timestamp_original.ext
    
    Example: 123_1640160000_profile_photo.jpg
    """
    from time import time
    
    name_part = Path(filename).stem  # Get name without extension
    ext = Path(filename).suffix.lower()  # Get extension with dot
    
    # Remove special characters from original name
    safe_name = "".join(c for c in name_part if c.isalnum() or c in ('-', '_'))[:30]
    
    # Create new filename: user_id_timestamp_original.ext
    timestamp = int(time())
    new_filename = f"{user_id}_{timestamp}_{safe_name}{ext}"
    
    return new_filename
