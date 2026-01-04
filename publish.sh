#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LIBRARY_DIR="$SCRIPT_DIR/src/library"
PACKAGE_JSON="$LIBRARY_DIR/package.json"
DIST_DIR="$SCRIPT_DIR/dist/angular-material-wrap"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Angular Material Wrap Publisher${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}Warning: You have uncommitted changes${NC}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Aborted${NC}"
        exit 1
    fi
fi

# Read current version from package.json
CURRENT_VERSION=$(node -p "require('$PACKAGE_JSON').version")
echo -e "${GREEN}Current version: ${CURRENT_VERSION}${NC}"
echo ""

# Parse version components (supports semver with prerelease)
if [[ $CURRENT_VERSION =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)(-([a-zA-Z0-9.]+))?$ ]]; then
    MAJOR="${BASH_REMATCH[1]}"
    MINOR="${BASH_REMATCH[2]}"
    PATCH="${BASH_REMATCH[3]}"
    PRERELEASE="${BASH_REMATCH[5]}"
else
    echo -e "${RED}Error: Invalid version format in package.json${NC}"
    exit 1
fi

# Parse prerelease (e.g., beta.0 -> beta and 0)
PRERELEASE_TAG=""
PRERELEASE_NUM=""
if [[ -n "$PRERELEASE" ]]; then
    if [[ $PRERELEASE =~ ^([a-zA-Z]+)\.([0-9]+)$ ]]; then
        PRERELEASE_TAG="${BASH_REMATCH[1]}"
        PRERELEASE_NUM="${BASH_REMATCH[2]}"
    else
        PRERELEASE_TAG="$PRERELEASE"
        PRERELEASE_NUM="0"
    fi
fi

echo -e "${YELLOW}Version Update Options:${NC}"
echo "1) Major version (breaking changes)"
echo "2) Minor version (new features)"
echo "3) Patch version (bug fixes)"
if [[ -n "$PRERELEASE_TAG" ]]; then
    echo "4) Increment prerelease ($PRERELEASE_TAG.$PRERELEASE_NUM -> $PRERELEASE_TAG.$((PRERELEASE_NUM + 1)))"
    echo "5) Remove prerelease (make stable release)"
    echo "6) Keep current version ($CURRENT_VERSION)"
else
    echo "4) Add prerelease tag (e.g., beta, alpha, rc)"
    echo "5) Keep current version ($CURRENT_VERSION)"
fi
echo ""

read -p "Select option (1-6): " -n 1 -r VERSION_CHOICE
echo ""
echo ""

NEW_VERSION=""
case $VERSION_CHOICE in
    1)
        NEW_MAJOR=$((MAJOR + 1))
        NEW_VERSION="$NEW_MAJOR.0.0"
        ;;
    2)
        NEW_MINOR=$((MINOR + 1))
        NEW_VERSION="$MAJOR.$NEW_MINOR.0"
        ;;
    3)
        NEW_PATCH=$((PATCH + 1))
        NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"
        ;;
    4)
        if [[ -n "$PRERELEASE_TAG" ]]; then
            # Increment prerelease
            NEW_PRERELEASE_NUM=$((PRERELEASE_NUM + 1))
            NEW_VERSION="$MAJOR.$MINOR.$PATCH-$PRERELEASE_TAG.$NEW_PRERELEASE_NUM"
        else
            # Add prerelease tag
            echo -e "${YELLOW}Enter prerelease tag (e.g., beta, alpha, rc):${NC}"
            read -p "> " NEW_PRERELEASE_TAG
            NEW_VERSION="$MAJOR.$MINOR.$PATCH-$NEW_PRERELEASE_TAG.0"
        fi
        ;;
    5)
        if [[ -n "$PRERELEASE_TAG" ]]; then
            # Remove prerelease
            NEW_VERSION="$MAJOR.$MINOR.$PATCH"
        else
            NEW_VERSION="$CURRENT_VERSION"
        fi
        ;;
    6)
        NEW_VERSION="$CURRENT_VERSION"
        ;;
    *)
        echo -e "${RED}Invalid option${NC}"
        exit 1
        ;;
esac

echo -e "${GREEN}New version: ${NEW_VERSION}${NC}"
echo ""

# Determine npm tag
NPM_TAG="latest"
if [[ $NEW_VERSION =~ -([a-zA-Z]+) ]]; then
    NPM_TAG="${BASH_REMATCH[1]}"
fi

echo -e "${YELLOW}Publishing Configuration:${NC}"
echo "  Version: $NEW_VERSION"
echo "  npm tag: $NPM_TAG"
echo ""

read -p "Is this correct? (y/N): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Aborted${NC}"
    exit 1
fi

# Ask about running tests
echo ""
echo -e "${YELLOW}Pre-publish Options:${NC}"

# Check if test files exist before asking
if find "$LIBRARY_DIR/src" -name "*.spec.ts" -type f | grep -q .; then
    read -p "Run tests before publishing? (Y/n): " -n 1 -r RUN_TESTS
    echo ""
    if [[ $RUN_TESTS =~ ^[Yy]$ ]] || [[ -z $RUN_TESTS ]]; then
        RUN_TESTS="yes"
    else
        RUN_TESTS="no"
    fi
else
    echo "No test files found - skipping test option"
    RUN_TESTS="no"
fi

read -p "Create git tag after successful publish? (Y/n): " -n 1 -r CREATE_GIT_TAG
echo ""
if [[ $CREATE_GIT_TAG =~ ^[Yy]$ ]] || [[ -z $CREATE_GIT_TAG ]]; then
    CREATE_GIT_TAG="yes"
else
    CREATE_GIT_TAG="no"
fi

read -p "Push git tag to remote? (Y/n): " -n 1 -r PUSH_GIT_TAG
echo ""
if [[ $PUSH_GIT_TAG =~ ^[Yy]$ ]] || [[ -z $PUSH_GIT_TAG ]]; then
    PUSH_GIT_TAG="yes"
else
    PUSH_GIT_TAG="no"
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Starting Publish Process${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Update version in package.json
if [[ "$NEW_VERSION" != "$CURRENT_VERSION" ]]; then
    echo -e "${YELLOW}[1/7] Updating version in package.json...${NC}"
    node -e "
        const fs = require('fs');
        const pkg = require('$PACKAGE_JSON');
        pkg.version = '$NEW_VERSION';
        fs.writeFileSync('$PACKAGE_JSON', JSON.stringify(pkg, null, 2) + '\n');
    "
    echo -e "${GREEN}✓ Version updated to $NEW_VERSION${NC}"
    echo ""
else
    echo -e "${YELLOW}[1/7] Version unchanged${NC}"
    echo ""
fi

# Run tests
if [[ "$RUN_TESTS" == "yes" ]]; then
    echo -e "${YELLOW}[2/7] Running tests...${NC}"
    if npm run test:lib -- --watch=false; then
        echo -e "${GREEN}✓ Tests passed${NC}"
        echo ""
    else
        echo -e "${RED}✗ Tests failed${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}[2/7] Skipping tests${NC}"
    echo ""
fi

# Build library
echo -e "${YELLOW}[3/7] Building library...${NC}"
if npm run build:lib; then
    echo -e "${GREEN}✓ Library built successfully${NC}"
    echo ""
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

# Verify build output
echo -e "${YELLOW}[4/7] Verifying build output...${NC}"
if [[ ! -d "$DIST_DIR" ]]; then
    echo -e "${RED}✗ Build output directory not found: $DIST_DIR${NC}"
    exit 1
fi

DIST_PACKAGE_JSON="$DIST_DIR/package.json"
if [[ ! -f "$DIST_PACKAGE_JSON" ]]; then
    echo -e "${RED}✗ package.json not found in build output${NC}"
    exit 1
fi

DIST_VERSION=$(node -p "require('$DIST_PACKAGE_JSON').version")
if [[ "$DIST_VERSION" != "$NEW_VERSION" ]]; then
    echo -e "${RED}✗ Version mismatch: expected $NEW_VERSION, got $DIST_VERSION${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build output verified${NC}"
echo ""

# Check npm authentication
echo -e "${YELLOW}[5/7] Checking npm authentication...${NC}"
if npm whoami > /dev/null 2>&1; then
    NPM_USER=$(npm whoami)
    echo -e "${GREEN}✓ Logged in as: $NPM_USER${NC}"
    echo ""
else
    echo -e "${RED}✗ Not logged in to npm${NC}"
    echo -e "${YELLOW}Run 'npm login' first${NC}"
    exit 1
fi

# Publish to npm
echo -e "${YELLOW}[6/7] Publishing to npm...${NC}"
echo -e "${BLUE}Running: npm publish --tag $NPM_TAG --access public${NC}"
echo ""

cd "$DIST_DIR"
if npm publish --tag "$NPM_TAG" --access public; then
    echo ""
    echo -e "${GREEN}✓ Successfully published to npm!${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}✗ npm publish failed${NC}"
    exit 1
fi

cd "$SCRIPT_DIR"

# Create git tag
if [[ "$CREATE_GIT_TAG" == "yes" ]]; then
    echo -e "${YELLOW}[7/7] Creating git tag...${NC}"

    GIT_TAG="v$NEW_VERSION"

    if git rev-parse "$GIT_TAG" >/dev/null 2>&1; then
        echo -e "${YELLOW}Warning: Tag $GIT_TAG already exists${NC}"
        read -p "Delete and recreate? (y/N): " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git tag -d "$GIT_TAG"
        else
            echo -e "${YELLOW}Skipping tag creation${NC}"
            CREATE_GIT_TAG="no"
        fi
    fi

    if [[ "$CREATE_GIT_TAG" == "yes" ]]; then
        git add "$PACKAGE_JSON"
        git commit -m "chore: bump version to $NEW_VERSION

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
        git tag -a "$GIT_TAG" -m "Release $NEW_VERSION"
        echo -e "${GREEN}✓ Created git tag: $GIT_TAG${NC}"
        echo ""

        if [[ "$PUSH_GIT_TAG" == "yes" ]]; then
            echo -e "${YELLOW}Pushing tag to remote...${NC}"
            if git push origin "$GIT_TAG" && git push origin main; then
                echo -e "${GREEN}✓ Pushed tag to remote${NC}"
            else
                echo -e "${RED}✗ Failed to push tag${NC}"
            fi
        fi
    fi
else
    echo -e "${YELLOW}[7/7] Skipping git tag${NC}"
    echo ""
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  🎉 Publish Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Package Information:${NC}"
echo "  Name:    angular-material-wrap"
echo "  Version: $NEW_VERSION"
echo "  Tag:     $NPM_TAG"
echo ""
echo -e "${BLUE}View on npm:${NC}"
echo "  https://www.npmjs.com/package/angular-material-wrap"
echo ""
echo -e "${BLUE}Install command:${NC}"
if [[ "$NPM_TAG" == "latest" ]]; then
    echo "  npm install angular-material-wrap"
else
    echo "  npm install angular-material-wrap@$NPM_TAG"
fi
echo ""
