## NPM GUI

The goal of this project is simple, to provide an easy and clean way for you to manage your Node based
projects in which uses with NPM or Yarn.

You can update, delete and add new packages on the fly as this project taps into both the CLI commands and the
API to fetch data about your particular project.

## How does it work?

![Startup](https://i.imgur.com/EALOZLP.png)

When you launch the application we ask you for a directory to your main application.
This application should contain either: `yarn.lock` or `package-lock.json` and a `package.json`.

Once you enter the path to your application we then fetch the appropriate data and show you:

![Manage Application](https://i.imgur.com/tDeAeEP.png)

From here you can manage the Dev Dependencies and the Core Dependencies. You get to see basic information including
version and name and you have the option to update and delete the package.
