import os
import shutil
from pathlib import Path
from fastapi import UploadFile
from core.file_validator import validate_file, sanitize_filename, MAX_FILE_SIZE
from core.exceptions import ValidationError

MEDIA_FOLDER = Path("media/users")
MEDIA_FOLDER.mkdir(parents=True, exist_ok=True)

def save_image(file: UploadFile, user_id: int) -> str:
    """
    Save uploaded image securely.
    
    Args:
        file: UploadFile object
        user_id: Current user ID
        
    Returns:
        str: Relative path to saved file (e.g., "users/123_1640160000_photo.jpg")
        
    Raises:
        ValidationError: If file validation fails
    """
    
    # 1. VALIDATE FILE
    is_valid, error_message = validate_file(file)
    if not is_valid:
        raise ValidationError(
            detail=error_message,
            error_code="INVALID_FILE_UPLOAD"
        )
    
    # 2. SANITIZE FILENAME
    safe_filename = sanitize_filename(file.filename, user_id)
    
    # 3. CREATE USER MEDIA FOLDER
    user_folder = MEDIA_FOLDER / str(user_id)
    user_folder.mkdir(parents=True, exist_ok=True)
    
    # 4. GENERATE FULL PATH
    file_path = user_folder / safe_filename
    
    # 5. SAVE FILE (with size limit check)
    try:
        with open(file_path, "wb") as f:
            bytes_written = 0
            chunk_size = 1024 * 1024  # 1MB chunks
            
            while True:
                chunk = file.file.read(chunk_size)
                if not chunk:
                    break
                
                bytes_written += len(chunk)
                
                # Check size limit during write
                if bytes_written > MAX_FILE_SIZE:
                    file_path.unlink()  # Delete partial file
                    raise ValidationError(
                        detail="File too large during upload",
                        error_code="FILE_TOO_LARGE"
                    )
                
                f.write(chunk)
    
    except ValidationError:
        raise
    except Exception as e:
        # Clean up on error
        if file_path.exists():
            file_path.unlink()
        raise ValidationError(
            detail="Error saving file",
            error_code="FILE_SAVE_ERROR"
        )
    
    # 6. RETURN RELATIVE PATH
    # Store as "users/123_1640160000_photo.jpg" not full path
    relative_path = f"users/{user_id}/{safe_filename}"
    
    return relative_path

def remove_single_file(file_path: str):
    """Remove a single file safely"""
    try:
        if file_path and os.path.exists(file_path):
            os.remove(file_path)
    except Exception as e:
        raise ValidationError(
            detail="Error deleting file",
            error_code="FILE_DELETE_ERROR"
        )

def get_random_string(length: int) -> str:
    """Generate random string for tokens"""
    import secrets
    return secrets.token_urlsafe(length)
