/* const apiServiceUrl = "https://www.reddit.com/r/aww.json";

export default WebService = {

  redditData: [],

  getRedditData(callback) {
    console.log(callback, apiServiceUrl);
    fetch(apiServiceUrl)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        redditData = response.data.children;
        callback(response);
      })
      .catch((error) => {
        callback(null);
      });
  },
}
*/
