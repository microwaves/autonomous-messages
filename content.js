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

// Generates a key pair.
function generateKeyPair() {
  return this.crypto.subtle.generateKey(
		{
			name: "RSA-OAEP",
			modulusLength: 2048,
			publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
			hash: {name: "SHA-256"},
		},
		true,
		["encrypt", "decrypt"]
	);
}

// Encrypts data.
function encryptData(publicKey, data) {
	return this.crypto.subtle.encrypt({ name: "RSA-OAEP", }, publicKey, data);
}

// Decrypts data.
function decryptData(privateKey, data) {
	return this.crypto.subtle.decrypt({ name: "RSA-OAEP", }, privateKey, data);
}

// Exports a given private or public key.
function exportKey(key) {
	return this.crypto.subtle.exportKey("jwk", key);
}

// Imports a given private or public key.
function importKey(key, usage) {
	return this.crypto.subtle.importKey(
		"jwk",
		key,
		{
			name: "RSA-OAEP",
			hash: { name: "SHA-256" },
		},
		false,
		[usage]
	)
}

// Decodes decrypted data to String.
function decodeDecryptedData(arr) {
  return new TextDecoder().decode(arr);
}

/*

Next steps:

- Send/Receive public key to/from peer.
- When message is written on text field, encodes to ArrayBuffer and encrypt with public key from peer.
- Substitute content of the field with encrypted message and send.
- Read content from page and decrypt.

*/
