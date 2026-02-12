#!/bin/bash
#
# ClawSoul Installer
# Usage: curl -fsSL clawsoul.com/i/pm-expert | bash
#        ./install.sh pm-expert
#

set -e

REPO_URL="https://raw.githubusercontent.com/openclaw0205/clawsoul/main"
WORKSPACE="${OPENCLAW_WORKSPACE:-$HOME/.openclaw/workspace}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${GREEN}==>${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}Warning:${NC} $1"
}

print_error() {
    echo -e "${RED}Error:${NC} $1"
    exit 1
}

# Get soul name from argument or stdin
if [ -n "$1" ]; then
    SOUL_NAME="$1"
elif [ ! -t 0 ]; then
    # Being piped, extract soul name from URL path
    # This is set by the server redirect
    SOUL_NAME="${CLAWSOUL_NAME:-}"
fi

if [ -z "$SOUL_NAME" ]; then
    echo "🦞 ClawSoul Installer"
    echo ""
    echo "Usage:"
    echo "  ./install.sh <soul-name>"
    echo "  curl -fsSL clawsoul.com/i/<soul-name> | bash"
    echo ""
    echo "Available souls:"
    echo "  - pm-expert     产品经理专家"
    echo "  - seo-master    SEO专家"
    echo ""
    exit 0
fi

echo ""
echo "🦞 ClawSoul Installer"
echo "   Installing: $SOUL_NAME"
echo ""

# Check if workspace exists
if [ ! -d "$WORKSPACE" ]; then
    print_error "OpenClaw workspace not found at $WORKSPACE"
fi

# Create backup
BACKUP_DIR="$WORKSPACE/.clawsoul-backup-$(date +%Y%m%d%H%M%S)"
print_step "Backing up current config to $BACKUP_DIR"

mkdir -p "$BACKUP_DIR"
for file in SOUL.md AGENTS.md MEMORY.md; do
    if [ -f "$WORKSPACE/$file" ]; then
        cp "$WORKSPACE/$file" "$BACKUP_DIR/"
    fi
done

# Download soul files
print_step "Downloading $SOUL_NAME..."

SOUL_URL="$REPO_URL/souls/$SOUL_NAME"

# Download each file
for file in SOUL.md AGENTS.md MEMORY.md; do
    if curl -fsSL "$SOUL_URL/$file" -o "/tmp/clawsoul-$file" 2>/dev/null; then
        cp "/tmp/clawsoul-$file" "$WORKSPACE/$file"
        echo "   ✓ $file"
    fi
done

# Check for required skills
if curl -fsSL "$SOUL_URL/skills.txt" -o "/tmp/clawsoul-skills.txt" 2>/dev/null; then
    echo ""
    print_step "Required skills:"
    while IFS= read -r skill; do
        if [ -n "$skill" ]; then
            echo "   - $skill"
        fi
    done < "/tmp/clawsoul-skills.txt"
fi

# Cleanup
rm -f /tmp/clawsoul-*.md /tmp/clawsoul-skills.txt

echo ""
echo -e "${GREEN}✅ Soul installed successfully!${NC}"
echo ""
echo "Your previous config is backed up at:"
echo "   $BACKUP_DIR"
echo ""
echo "Restart OpenClaw to apply changes."
echo ""
