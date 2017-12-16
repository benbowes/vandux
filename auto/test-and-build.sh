yarn test

yarn build

# git add new dist/ assets
git add .

# Commit dist/ changes
git commit -m "Deploy to gh-pages..."

# Push dist folder to gh-pages branch
git push -f origin master:gh-pages
