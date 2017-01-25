function generate_key_pair() {
  generateKeyPair().then(function(key) {
    // export and store private key
    exportKey(key.privateKey).then(function(exported_private_key) {
      chrome.storage.local.set(
        { exported_private_key: exported_private_key },
        function() {
          var status = document.getElementById('status');
          status.textContent = 'Key pair was successfully created.';

          setTimeout(function() {
            status.textContent = '';
          }, 750);
        }
      );
    });

    // export and store public key
    exportKey(key.publicKey).then(function(exported_public_key) {
      chrome.storage.local.set(
        { exported_public_key: exported_public_key },
        function() {
          setTimeout(function() {
            status.textContent = '';
          }, 750);
        }
      );
    });
  });
}

function export_public_key() {
  chrome.storage.local.get("exported_public_key", function(public_key) {
    var json_public_key = JSON.stringify(public_key, null, 4);
    var url = "data:application/json;base64," + btoa(json_public_key);

    chrome.downloads.download(
      {
        url: url,
        filename: "autonomous-messages-public-key-" + generateUniqueId(10) + ".json"
      }
    );
  });
}

document.getElementById('generate-key-pair').addEventListener('click', generate_key_pair);
document.getElementById('export-public-key').addEventListener('click', export_public_key);
