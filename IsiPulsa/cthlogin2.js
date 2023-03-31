
function submitForm() {
// Ambil nilai nomor HP dan nominal dari form
var nomor_hp = document.getElementById("nomor_hp").value;
var nominal = document.getElementById("nominal").value;
  console.log (nominal)
// Validasi nomor HP
if(nomor_hp.length < 10) {
  showPopup("Nomor HP tidak valid!");
  return;
}
  
  // Validasi Nominal
  if(nominal > 100000) {
  showPopup("Nominal tidak valid!");
  return;
} 

// Kirim data ke server
var message = "Pengisian pulsa berhasil dilakukan untuk nomor " + nomor_hp + " dengan nominal " + nominal;
showPopup(message);

}

function showPopup(message) {
// Tampilkan popup
var popup = document.getElementById("popup");
popup.style.display = "block";

// Tampilkan pesan pada popup
var popupMessage = document.getElementById("popup-message");
popupMessage.innerText = message;
}

function closePopup() {
// Sembunyikan popup
var popup = document.getElementById("popup");
popup.style.display = "none";
}

//=======================================================================

// Fungsi untuk menghitung nilai modulus N
function getModulus(p, q) {
  return p * q;
}

// Fungsi untuk menghitung nilai totient dari N
function getTotient(p, q) {
  return (p - 1) * (q - 1);
}

// Fungsi untuk memilih nilai eksponen publik e
function getPublicExponent(totient) {
  let e = 2;
  while (e < totient) {
    if (gcd(e, totient) === 1) {
      break;
    }
    e++;
  }
  return e;
}

// Fungsi untuk menghitung nilai eksponen privat d
function getPrivateExponent(e, totient) {
  let d = 0;
  for (let i = 1; i < totient; i++) {
    if ((e * i) % totient === 1) {
      d = i;
      break;
    }
  }
  return d;
}

// Fungsi untuk mengenkripsi pesan teks dengan RSA
function encryptRSA(plaintext, publicKey) {
  const e = publicKey.e;
  const N = publicKey.N;

  // Konversi pesan teks menjadi bilangan bulat dalam basis 100
  let M = "";
  for (let i = 0; i < plaintext.length; i++) {
    const charCode = plaintext.charCodeAt(i);
    if (charCode < 10) {
      M += "0" + charCode;
    } else {
      M += charCode;
    }
  }

  // Hitung nilai ciphertext C
  const MInt = BigInt(M);
  const CInt = modExp(MInt, BigInt(e), BigInt(N));
  const ciphertext = CInt.toString();

  return ciphertext;
}

// Fungsi untuk menghitung gcd (greatest common divisor)
function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

// Fungsi untuk menghitung x^y mod N menggunakan algoritma square and multiply
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

// Contoh penggunaan fungsi encryptRSA
//   const plaintext = "0895332013112";
const p = 61;
const q = 53;
const N = getModulus(p, q);
const totient = getTotient(p, q);
const e = getPublicExponent(totient);
const d = getPrivateExponent(e, totient);
//   const publicKey = { e: e, N: N };
//   const ciphertext = encryptRSA(plaintext, publicKey);
//   console.log(ciphertext);


document.getElementById("submit").addEventListener('click',function(event){ 
  event.preventDefault();
  
  let nomorHp = document.getElementById("nomor_hp");
  let nominal = document.getElementById("nominal");
  console.log(nomorHp.value);
  console.log(nominal.value);
  const publicKey = { e: e, N: N };
  const privateKey = { d: d, N: p };
  console.log(privateKey)
  console.log(publicKey)
  nomorHpEnkrip = encryptRSA(nomorHp.value, publicKey)
  nominalEnkrip = encryptRSA(nominal.value, publicKey)

      db.collection("post").add({
          nomorHpEnkrip: nomorHpEnkrip,
          nominalEnkrip: nominalEnkrip,
          nomorHp : nomorHp.value,
          nominal : nominal.value,
          key1 : privateKey.d,
          key2 : privateKey.N,
      })
      var message = "Pengisian pulsa berhasil dilakukan untuk nomor " + nomorHp.value + " dengan nominal " + nominal.value;
      showPopup(message);

      nomorHp.value="";
      nominal.value=""
  
})
