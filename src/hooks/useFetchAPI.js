export default function useFetchAPI(URL, callback) {
  fetch(URL).then((respose) => respose.json())
    .then((data) => callback(data));
}
