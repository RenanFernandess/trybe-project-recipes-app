export default function fetchAPI(URL, callback) {
  fetch(URL).then((respose) => respose.json())
    .then(({ meals, drinks }) => {
      const result = meals || drinks || [];
      callback(result);
    });
}
