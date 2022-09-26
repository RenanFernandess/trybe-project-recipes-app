export default function fetchAPI(URL, callback) {
  fetch(URL).then((respose) => respose.json())
    .then((data) => callback(data));
}
