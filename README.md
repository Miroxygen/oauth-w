# OAuth + Consuming REST and GraphQL APIs

I created this OAuth2 application to allow a web app to work with GitLab. It uses the three-legged OAuth2 method so users can log in using their GitLab account from gitlab.lnu.se.

The app lets users log in with their GitLab credentials securely. Once logged in, the app can get basic profile information and show the user their 101 most recent GitLab activities.

The app also shows information about the user's groups and projects. It displays details about the first three projects in each of the user's first five groups. For each project, it shows information about the latest commit, as long as the user has access to those groups.

I built this without using any external packages that have OAuth support. This means I wrote the OAuth code myself, which gives me a better understanding of how it works and more control over the process.

The app is designed to be easy to maintain and expand in the future. This project shows how to use OAuth2 to let a web app securely connect with GitLab and provide useful information to users.
