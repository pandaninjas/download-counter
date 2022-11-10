# download-counter
Track downloads of your GitHub releases using Cloudflare Workers and the GitHub API<br>
If you want to use a public instance, simply substitute the following information into the URL for the image.<br>
`https://download-counter.thefightagainstmalware.workers.dev/<USERNAME>/<REPO>/?filter=<optional filter>`<br>
The filter option is to filter the end of the file. For example, to ensure that it only counts downloads of jar files, use the query string `filter=jar`

## Running your own instance
If you need to run your own instance, simply deploy worker.js to Cloudflare Workers with module syntax.<br>
If you want to specify your own GitHub PAT, modify the fetch to add an Authorization header with your PAT
