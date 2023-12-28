# For Contributing

## What you can Contribute ?
**1. Adding New Features** : You can request a feature by raising an issue and submit valuable solutions by creating a pull request.
- You can contribute by adding new features to the project.

**2. Bugs or Error**
- Bug fixing and reporting bugs that you find in the code.


# Contributing Guidlines
1. Fork this repository.

2. Clone this repository.
```bash
  git@github.com:<USERNAME>/course-website-backend.git
```

3. Navigate to the project directory.
```bash
  cd course-website-backend
```

5. Setup .env file by following this steps
    1. Copy .env.sample file by running this command in your terminal 
    ```bash
        cp .env.sample .env
    ```

    2. Add your Mongo Atlas database url in .env file
    ```bash
        DATABASE_URL = 
    ```
4. Create new branch
```bash
  git checkout -b <your_branch_name>
```

5. Make changes.
6. Stage your changes and commit
```css
git add -A
git commit -m "<your_commit_message>"
```
7. Push your local commits to the remote repo.
```css
git push -u origin <your_branch_name>
```
8. Create a Pull Request.
9. Congratulations! 🎉 you've made your contribution.

# Your Pull request will be reviewed as soon as possible !

## Happy Coding!!