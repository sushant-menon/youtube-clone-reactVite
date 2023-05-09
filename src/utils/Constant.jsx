export const GOOGLE_API_KEY = "AIzaSyDAsKp4amGlRvlaezu-XFyHU9ZDbhACB4s";

export const YOUTUBE_VIDEOS_API_BY_ID =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=";

export const YOUTUBE_VIDEOS_API =
  " https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_SEARCHED_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=";

export const YOUTUBE_RELATED_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=";
