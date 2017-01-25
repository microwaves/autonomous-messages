// Decodes decrypted data to String.
function decodeDecryptedData(arr) {
  return new TextDecoder().decode(arr);
}

// Converts ArrayBuffer to String.
function arrayBufferToString(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// Converts String to ArrayBuffer.
function stringToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length*2);
  var bufView = new Uint16Array(buf);

  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
}

// Generate unique IDs.
function generateUniqueId(length) {
  var str = "";
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    str += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

  return str;
}
