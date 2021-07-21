import { stringifyUrl, parseUrl } from "query-string";

export function changeUrlQueryParam(key, value) {
  if (!history.pushState) {
    throw "Not allowed for url mutation";
  }
  let curUrl = parseUrl(window.location.href);
  curUrl.query[key] = value;
  let newUrl = stringifyUrl({
    url: curUrl.url,
    query: curUrl.query,
  });
  window.history.pushState({ path: newUrl }, "", newUrl);
}

export function getUrlQueryParam(key) {
  let curUrl = parseUrl(window.location.href);
  return curUrl.query[key];
}

export function deleteUrlQueryParam(key) {
  if (!history.pushState) {
    throw "Not allowed for url mutation";
  }
  let curUrl = parseUrl(window.location.href);
  delete curUrl.query[key];
  let newUrl = stringifyUrl({
    url: curUrl.url,
    query: curUrl.query,
  });
  window.history.pushState({ path: newUrl }, "", newUrl);
}
