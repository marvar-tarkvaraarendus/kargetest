#!/bin/bash

# Script to copy assets from the old Vite project to the new Next.js project
# Run this from the nextjs directory

SOURCE_DIR="../src/assets"
DEST_DIR="./public/assets"

if [ ! -d "$SOURCE_DIR" ]; then
    echo "Source directory not found: $SOURCE_DIR"
    echo "Make sure you're running this from the nextjs directory"
    exit 1
fi

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Copy all assets
cp -r "$SOURCE_DIR"/* "$DEST_DIR"/

echo "✅ Assets copied successfully from $SOURCE_DIR to $DEST_DIR"
echo ""
echo "Copied files:"
ls -la "$DEST_DIR"
