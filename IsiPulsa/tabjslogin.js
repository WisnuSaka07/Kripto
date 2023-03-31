function validateLogin() {
	// Ambil nilai username dan password dari form
	var username = document.getElementById("Username").value;
	var password = document.getElementById("password").value;

	// Validasi login
	if(username === "admin" && password === "admin12345") {
		// Jika login berhasil, arahkan pengguna ke halaman selanjutnya
        window.location.href("http://localhost/IsiPulsa/tabdatabaru.html");
		
	} else {
		// Jika login gagal, tampilkan pesan error dan jangan arahkan pengguna ke halaman selanjutnya
		alert("Username atau password salah!");
        // exit()
		return false;
	}
}
