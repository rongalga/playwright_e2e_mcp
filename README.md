# Valentino's Magic Beans - E2E Tests

Playwright E2E test suite for testing [Valentino's Magic Beans](https://valentinos-magic-beans.click/) application.

## Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with UI mode
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run specific browser tests
```bash
# Chromium only
npm run test:chromium

# Firefox only
npm run test:firefox

# WebKit only
npm run test:webkit
```

### Generate new tests with Codegen
```bash
npm run codegen
```

## Project Structure

```
.
├── tests/
│   ├── fixtures/          # Reusable test fixtures
│   ├── utils/             # Test utility functions and helpers
│   └── *.spec.ts          # Test files
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Configuration

- **Base URL**: https://valentinos-magic-beans.click/
- **Test Directory**: `./tests`
- **Browsers**: Chromium, Firefox, WebKit
- **Parallel Execution**: Enabled by default
- **Screenshots**: Captured on test failure
- **Videos**: Retained on test failure
- **Traces**: Enabled on first retry

## Reports

Test results are generated in `test-results/` directory:
- HTML Report: `index.html`
- JUnit Report: `results.xml`

To view the HTML report:
```bash
npx playwright show-report
```

## Best Practices

1. Use page object model pattern for complex pages
2. Add meaningful test descriptions
3. Use data selectors (e.g., `data-testid`) over CSS classes
4. Keep tests isolated and independent
5. Use fixtures for common setup/teardown
