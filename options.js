function generate_key_pair() {
  generateKeyPair().then(function(key) {
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
  });
}

function export_public_key() {}

document.getElementById('generate-key-pair').addEventListener('click', generate_key_pair);
//document.getElementById('export-public-key').addEventListener('click', export_public_key);
