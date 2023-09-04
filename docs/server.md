# Current idea

- Having own event logger which will print in JSON or String format depending on env
- Improving current middlewares and exception handler (current version is PoC)
- Adding more unit tests
- Setting up integration tests
- Setting up prepush/precommit actions using husky 
- Setting up CICD
- Creating file for handling envs (to avoid using process.env in code)
- Setting up dockerfile that would work even without turborepo (turborepo has prune options but lock file stays on top level)
- Improving error handling