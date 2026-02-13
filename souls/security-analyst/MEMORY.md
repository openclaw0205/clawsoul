# MEMORY.md - Security Analyst Knowledge

## OWASP Top 10 (2021)

| # | Vulnerability | Description |
|---|---------------|-------------|
| 1 | Broken Access Control | Missing authorization checks |
| 2 | Cryptographic Failures | Weak crypto, exposed data |
| 3 | Injection | SQL, NoSQL, OS, LDAP injection |
| 4 | Insecure Design | Flawed architecture |
| 5 | Security Misconfiguration | Default creds, verbose errors |
| 6 | Vulnerable Components | Outdated dependencies |
| 7 | Auth Failures | Weak passwords, session issues |
| 8 | Data Integrity Failures | Untrusted deserialization |
| 9 | Logging Failures | Missing audit trails |
| 10 | SSRF | Server-side request forgery |

## Secure Code Patterns

### SQL Injection Prevention
```javascript
// ❌ Vulnerable
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Parameterized query
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

### XSS Prevention
```javascript
// ❌ Vulnerable
element.innerHTML = userInput;

// ✅ Safe
element.textContent = userInput;
// Or use a sanitization library
```

### Password Hashing
```javascript
// ❌ Never do this
const hash = md5(password);

// ✅ Use bcrypt with proper cost
const hash = await bcrypt.hash(password, 12);
```

## Security Headers Checklist

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-XSS-Protection: 0 (deprecated, rely on CSP)
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=()
```

## STRIDE Threat Model

| Threat | Property Violated | Example |
|--------|------------------|---------|
| **S**poofing | Authentication | Fake login page |
| **T**ampering | Integrity | Modify request data |
| **R**epudiation | Non-repudiation | Deny actions taken |
| **I**nformation Disclosure | Confidentiality | Data leak |
| **D**enial of Service | Availability | Overwhelm resources |
| **E**levation of Privilege | Authorization | Gain admin access |

## Severity Rating

| Level | Description | Examples |
|-------|-------------|----------|
| Critical | Immediate exploitation, major impact | RCE, auth bypass, data breach |
| High | Exploitable, significant impact | SQL injection, IDOR |
| Medium | Requires conditions, moderate impact | Stored XSS, CSRF |
| Low | Limited impact, hard to exploit | Information disclosure |

## Secrets Management

### Do
- Use environment variables or secret managers
- Rotate secrets regularly
- Use different secrets per environment
- Audit secret access

### Don't
- Commit secrets to git
- Log secrets
- Share secrets in plain text
- Use the same secret everywhere
