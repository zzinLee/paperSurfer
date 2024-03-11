import _ from "lodash";

function decodedString(string) {
  return _.unescape(string).replace(/<\/?[^>]+(>|$)/g, "");
}

export { decodedString };
