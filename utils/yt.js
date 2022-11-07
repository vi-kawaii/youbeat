export default function getYouTubeVideoId(url) {
  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : false;
}

export const opts = {
  playerVars: {
    fs: 0,
    controls: 0,
    disablekb: 1,
    rel: 0,
  },
};
