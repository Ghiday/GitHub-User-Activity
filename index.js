
const args = process.argv[2];
const url = `https://api.github.com/users/${args}/events`;
const https = require('https');

// Make a GET request to the GitHub API to fetch user events
https.get({
    hostname: 'api.github.com',
    path: `/users/${args}/events`,
    headers: {'User-Agent': 'Ghiday'}
    
}, res => {
// Collect the response data
  let data = [];
  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    const events = JSON.parse(Buffer.concat(data).toString());
// Process each event and log the relevant information
    for (let event of events) {
        switch (event.type) {
            case 'PushEvent':
                console.log('Pushed to ' + event.repo.name);
                break;
            case 'CreateEvent':
                console.log('Created ' + event.repo.name);
                break;
            case 'DeleteEvent':
                console.log('Deleted ' + event.repo.name);
                break;
            default:
                console.log('Unhandled event type: ' + event.type);
        }
    }

  });
}).on('error', err => {
  console.log('Error: ', err.message);
  
});