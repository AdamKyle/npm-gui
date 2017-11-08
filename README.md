## NPM GUI

The goal of this project is simple, to provide an easy and clean way for you to manage your Node based
projects in which uses with NPM or Yarn.

You can update, delete and add new packages on the fly as this project taps into both the CLI commands and the
API to fetch data about your particular project.

## How does it work?

You launch the application and enter the directory to your project. For example: `/Documents/project-name/`
We then determine if you use Yarn or Regular NPM (via either the `yarn.lock` or the `package-lock.json`)

From there we inform you that we will continue with either yarn or npm.
