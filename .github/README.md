# GitHub Actions CI/CD

This directory contains the GitHub Actions workflows for the Codify project.

## Workflows

### 1. CI Pipeline (`ci.yml`)
- **Trigger**: Pull requests and pushes to main branch
- **Jobs**:
  - **Frontend**: Tests the React/Vite client application
  - **Backend**: Tests the Node.js/Express server application

### 2. Issue Automation (`issue-create-automate-message.yml`)
- **Trigger**: When new issues are created
- **Purpose**: Automatically comments on new issues with helpful information

### 3. PR Automation (`pr-create-automate-message.yml`)
- **Trigger**: When new pull requests are opened
- **Purpose**: Automatically comments on new PRs with review guidelines

### 4. Test Build (`test-build.yml`)
- **Trigger**: Manual workflow dispatch
- **Purpose**: Manual testing of build processes

## Common Issues and Solutions

### Node.js Version
- All workflows use Node.js 18 for consistency
- Ensure your local development uses the same version

### Dependencies
- Frontend dependencies are installed from `./client/package.json`
- Backend dependencies are installed from `./server/package.json`
- Root `package.json` should not have conflicting dependencies

### Environment Variables
- CI uses dummy values for external APIs during testing
- Real environment variables should be configured in repository secrets

### Health Checks
- Frontend health check hits `http://localhost:5173`
- Backend health check hits `http://localhost:5050`
- Both use 20-second startup delays to ensure services are ready

## Troubleshooting

1. **Build Failures**: Check Node.js version compatibility
2. **Dependency Issues**: Ensure package.json files are properly configured
3. **Health Check Failures**: Verify port numbers and startup times
4. **Action Version Issues**: Keep GitHub Actions versions updated

## Maintenance

- Review and update GitHub Actions versions quarterly
- Test CI pipeline changes in feature branches
- Monitor workflow run times and optimize if needed