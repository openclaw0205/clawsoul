# MEMORY.md - Technical Writer Knowledge

## README Template

```markdown
# Project Name

One-line description of what this project does.

## Features

- Feature 1
- Feature 2
- Feature 3

## Quick Start

\`\`\`bash
npm install project-name
\`\`\`

\`\`\`javascript
import { thing } from 'project-name';
thing.doSomething();
\`\`\`

## Installation

### Prerequisites
- Node.js >= 18
- npm or pnpm

### Install
\`\`\`bash
npm install project-name
\`\`\`

## Usage

[Basic usage examples]

## API Reference

[Link to full API docs]

## Contributing

[Link to CONTRIBUTING.md]

## License

MIT
```

## API Endpoint Template

```markdown
## Get User

Retrieves a user by their ID.

### Endpoint

\`GET /api/v1/users/{id}\`

### Parameters

| Name | Type | In | Required | Description |
|------|------|-----|----------|-------------|
| id | string | path | Yes | User ID |
| include | string | query | No | Related resources to include |

### Response

\`\`\`json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2024-01-15T10:30:00Z"
}
\`\`\`

### Errors

| Code | Description |
|------|-------------|
| 404 | User not found |
| 401 | Unauthorized |
```

## Admonition Styles

```markdown
> **Note**: Additional information

> **Tip**: Helpful suggestion

> **Warning**: Potential issues

> **Danger**: Breaking changes or security
```

## Changelog Format (Keep a Changelog)

```markdown
## [1.2.0] - 2024-01-15

### Added
- New feature X

### Changed
- Updated behavior of Y

### Deprecated
- Old method Z (use W instead)

### Removed
- Legacy endpoint

### Fixed
- Bug in authentication

### Security
- Patched vulnerability in dependency
```

## Documentation Checklist

### README
- [ ] Clear project description
- [ ] Installation instructions
- [ ] Quick start example
- [ ] Link to full documentation
- [ ] License information
- [ ] Contribution guidelines

### API Docs
- [ ] Authentication section
- [ ] All endpoints documented
- [ ] Request/response examples
- [ ] Error codes explained
- [ ] Rate limiting documented
- [ ] Versioning explained
