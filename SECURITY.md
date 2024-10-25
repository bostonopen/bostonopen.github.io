# Security Policy

## Reporting a Vulnerability

We take the security of Boston Open Dev's website and community infrastructure seriously. If you discover a security vulnerability, please follow these steps:

1. **DO NOT** create a public GitHub issue
2. Report via one of these secure channels (in order of preference):
   - Send a private message on [Zulip](https://osdc.zulipchat.com/#narrow/stream/406743-boston) to the maintainers
   - Use GitHub's private security advisory reporting
   - Direct message on [Mastodon](https://floss.social/@bostonopen)
3. Provide as much information as possible about:
   - The location and nature of the vulnerability
   - Steps to reproduce (if applicable)
   - Potential impact of the vulnerability

## What to Report

Please report issues related to:

- Cross-site scripting (XSS) vulnerabilities
- Exposed sensitive information
- Issues with authentication (if implemented)
- Problems with data handling
- Concerns about personal information exposure
- Any other security-related issues

## Scope

In scope:
- The bostonopen.dev website
- Any subdomains under bostonopen.dev
- Repository content
- Community-related infrastructure

Out of scope:
- Third-party services we link to
- Individual members' personal websites
- Hypothetical attacks
- Social engineering attempts

## Security Best Practices

For contributors:
1. Always review content before committing
2. Don't commit sensitive information
3. Keep dependencies updated
4. Use secure links (HTTPS) when adding external resources

## Attribution

We believe in responsible disclosure and will credit security researchers who report valid vulnerabilities if they wish to be attributed.

## Updates

This security policy may be updated from time to time. Please refer to the Git history for changelog.

Last Updated: October 2024
