// Definisikan fungsi modExp
function modExp(x, y, N) {
    let result = 1n;
    while (y > 0n) {
      if (y % 2n === 1n) {
        result = (result * x) % N;
      }
      x = (x * x) % N;
      y = y / 2n;
    }
    return result;
  }
  
  // Definisikan fungsi decryptRSA
  function decryptRSA(ciphertext, privateKey) {
    const d = privateKey.d;
    const N = privateKey.N;
  
    // Hitung nilai plaintext M
    const CInt = BigInt(ciphertext);
    const MInt = modExp(CInt, BigInt(d), BigInt(N));
    let M = MInt.toString();
  
    // Konversi bilangan bulat ke pesan teks
    let plaintext = "";
    for (let i = 0; i < M.length; i += 2) {
      const charCode = parseInt(M.substr(i, 2));
      plaintext += String.fromCharCode(charCode);
    }
  
    return plaintext;
  }
  
  const docRef = db.collection("post");
  
  // Ambil data dari Firestore
  docRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
  
      // Tampilkan data ke dalam HTML
      const listItem = document.createElement("li");
      const listText = document.createTextNode(`${id}: ${JSON.stringify(data)}`);
      listItem.appendChild(listText);
      document.getElementById("list-data").appendChild(listItem);
    });
  });
  
  document.getElementById("submit").addEventListener('click',function(event){ 
    event.preventDefault();
    let dekrip = document.getElementById("dekrip");
    let key1 = document.getElementById("key1");
    let key2 = document.getElementById("key2");
    const ciphertext = "308446296444856000513936426019635469294498736064617619820943509664";
    const privateKey = { d: key1.value, N: key2.value }
    const plaintext = decryptRSA(ciphertext, privateKey);
    console.log(plaintext);
    console.log("priv = ", privateKey)
    sudahdekrip = decryptRSA(dekrip.value, privateKey)
    console.log("ini no hp", sudahdekrip)
  });
  

  
