// Fungsi inisialisasi sesi user
function initUserSession() {
  var currentUser = JSON.parse(sessionStorage.getItem("sitta_user"));
  var navUserName = document.getElementById("navUserName");
  var navAvatar = document.getElementById("navAvatar");

  if (currentUser) {
    if (navUserName) navUserName.textContent = currentUser.nama;
    if (navAvatar) navAvatar.textContent = currentUser.nama.charAt(0).toUpperCase();
  } else {
    if (navUserName) navUserName.textContent = "Tamu UT";
  }

  // Tombol logout
  var btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", function() {
      sessionStorage.removeItem("sitta_user");
      alert("Anda telah berhasil keluar.");
      window.location.href = "index.html";
    });
  }
}

// Handler Halaman Login (index.html)
function initLoginPage() {
  var loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  // Form login submit
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var emailInput = document.getElementById("loginEmail").value.trim();
    var passInput = document.getElementById("loginPassword").value.trim();

    // Validasi data pengguna
    var foundUser = dataPengguna.find(function(user) {
      return user.email.toLowerCase() === emailInput.toLowerCase() && user.password === passInput;
    });

    if (foundUser) {
      sessionStorage.setItem("sitta_user", JSON.stringify(foundUser));
      alert("Login berhasil! Selamat datang, " + foundUser.nama);
      window.location.href = "dashboard.html";
    } else {
      // Alert error sesuai soal
      alert("email/password yang anda masukkan salah");
    }
  });

  // Modal Lupa Password
  var modalLupa = document.getElementById("modalLupa");
  var btnOpenLupa = document.getElementById("btnOpenLupa");
  var btnCloseLupa = document.getElementById("btnCloseLupa");
  var formLupa = document.getElementById("formLupa");

  if (btnOpenLupa) {
    btnOpenLupa.addEventListener("click", function(e) {
      e.preventDefault();
      modalLupa.classList.add("show");
    });
  }

  if (btnCloseLupa) {
    btnCloseLupa.addEventListener("click", function() {
      modalLupa.classList.remove("show");
    });
  }

  if (formLupa) {
    formLupa.addEventListener("submit", function(e) {
      e.preventDefault();
      var email = document.getElementById("lupaEmail").value;
      alert("Instruksi reset password telah dikirim ke email: " + email);
      modalLupa.classList.remove("show");
      formLupa.reset();
    });
  }

  // Modal Registrasi Akun
  var modalDaftar = document.getElementById("modalDaftar");
  var btnOpenDaftar = document.getElementById("btnOpenDaftar");
  var btnCloseDaftar = document.getElementById("btnCloseDaftar");
  var formDaftar = document.getElementById("formDaftar");

  if (btnOpenDaftar) {
    btnOpenDaftar.addEventListener("click", function(e) {
      e.preventDefault();
      modalDaftar.classList.add("show");
    });
  }

  if (btnCloseDaftar) {
    btnCloseDaftar.addEventListener("click", function() {
      modalDaftar.classList.remove("show");
    });
  }

  if (formDaftar) {
    formDaftar.addEventListener("submit", function(e) {
      e.preventDefault();
      var newUser = {
        id: dataPengguna.length + 1,
        nama: document.getElementById("regNama").value,
        email: document.getElementById("regEmail").value,
        password: document.getElementById("regPassword").value,
        role: "UPBJJ-UT",
        lokasi: document.getElementById("regLokasi").value
      };

      dataPengguna.push(newUser);
      localStorage.setItem("sitta_pengguna", JSON.stringify(dataPengguna));
      alert("Pendaftaran berhasil! Silakan login dengan akun baru anda.");
      modalDaftar.classList.remove("show");
      formDaftar.reset();
    });
  }
}

// Handler Halaman Dashboard (dashboard.html)
function initDashboardPage() {
  var greetingText = document.getElementById("greetingText");
  if (!greetingText) return;

  var currentUser = JSON.parse(sessionStorage.getItem("sitta_user"));
  var namaUser = currentUser ? currentUser.nama : "Mahasiswa";

  // Hitung waktu local time
  var hour = new Date().getHours();
  var greeting = "Selamat Pagi";

  if (hour >= 12 && hour < 15) {
    greeting = "Selamat Siang";
  } else if (hour >= 15 && hour < 18) {
    greeting = "Selamat Sore";
  } else if (hour >= 18 || hour < 4) {
    greeting = "Selamat Malam";
  }

  greetingText.textContent = greeting + ", " + namaUser + "!";

  // Hitung statistik dashboard
  var statTotalStok = document.getElementById("statTotalStok");
  var statPengguna = document.getElementById("statPengguna");

  if (statTotalStok) {
    var total = dataBahanAjar.reduce(function(acc, item) {
      return acc + parseInt(item.stok);
    }, 0);
    statTotalStok.textContent = total.toLocaleString("id-ID");
  }

  if (statPengguna) {
    statPengguna.textContent = dataPengguna.length;
  }
}

// Handler Halaman Tracking (tracking.html)
function initTrackingPage() {
  var formTracking = document.getElementById("formTracking");
  if (!formTracking) return;

  formTracking.addEventListener("submit", function(e) {
    e.preventDefault();
    var noDO = document.getElementById("inputNoDO").value.trim();
    var resultCard = document.getElementById("trackingResultCard");
    var notFoundCard = document.getElementById("trackingNotFound");

    var itemTracking = dataTracking[noDO];

    if (itemTracking) {
      notFoundCard.style.display = "none";
      resultCard.style.display = "block";

      document.getElementById("resNoDO").textContent = itemTracking.nomorDO;
      document.getElementById("resNama").textContent = itemTracking.nama;
      document.getElementById("resEkspedisi").textContent = itemTracking.ekspedisi;
      document.getElementById("resTglKirim").textContent = itemTracking.tanggalKirim;
      document.getElementById("resPaket").textContent = itemTracking.paket;
      document.getElementById("resTotal").textContent = itemTracking.total;

      // Status badge & progress bar
      var badgeStatus = document.getElementById("badgeStatus");
      var progressBar = document.getElementById("progressBar");

      badgeStatus.textContent = itemTracking.status;
      if (itemTracking.status.toLowerCase() === "selesai") {
        badgeStatus.className = "badge badge-success";
        progressBar.style.width = "100%";
      } else {
        badgeStatus.className = "badge badge-warning";
        progressBar.style.width = "60%";
      }

      // Render riwayat perjalanan (timeline)
      var timelineContainer = document.getElementById("timelineContainer");
      timelineContainer.innerHTML = "";

      itemTracking.perjalanan.forEach(function(step) {
        var itemDiv = document.createElement("div");
        itemDiv.className = "timeline-item";

        var dot = document.createElement("div");
        dot.className = "timeline-dot";

        var dateDiv = document.createElement("div");
        dateDiv.className = "timeline-date";
        dateDiv.textContent = step.waktu;

        var contentDiv = document.createElement("div");
        contentDiv.className = "timeline-content";
        contentDiv.textContent = step.keterangan;

        itemDiv.appendChild(dot);
        itemDiv.appendChild(dateDiv);
        itemDiv.appendChild(contentDiv);

        timelineContainer.appendChild(itemDiv);
      });

    } else {
      resultCard.style.display = "none";
      notFoundCard.style.display = "block";
    }
  });
}

// Handler Halaman Stok (stok.html)
function initStokPage() {
  var tbodyStok = document.getElementById("tbodyStok");
  if (!tbodyStok) return;

  // Render tabel stok
  function renderTable(items) {
    tbodyStok.innerHTML = "";

    if (items.length === 0) {
      var emptyTr = document.createElement("tr");
      emptyTr.innerHTML = "<td colspan='9' style='text-align: center; color: var(--text-secondary);'>Data stok tidak ditemukan.</td>";
      tbodyStok.appendChild(emptyTr);
      return;
    }

    items.forEach(function(item, index) {
      var tr = document.createElement("tr");

      // Badge status stok
      var statusBadge = parseInt(item.stok) > 200 
        ? "<span class='badge badge-success'>Aman</span>"
        : "<span class='badge badge-warning'>Terbatas</span>";

      var coverSrc = item.cover || "assets/pengantar_komunikasi.jpg";

      tr.innerHTML = "<td>" + (index + 1) + "</td>" +
                     "<td><img src='" + coverSrc + "' alt='" + item.namaBarang + "' style='width: 44px; height: 60px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.12); display: block;'></td>" +
                     "<td><strong>" + item.kodeLokasi + "</strong></td>" +
                     "<td>" + item.kodeBarang + "</td>" +
                     "<td>" + item.namaBarang + "</td>" +
                     "<td><span class='badge badge-info'>" + item.jenisBarang + "</span></td>" +
                     "<td>" + item.edisi + "</td>" +
                     "<td><strong>" + item.stok + "</strong></td>" +
                     "<td>" + statusBadge + "</td>";

      tbodyStok.appendChild(tr);
    });
  }

  // Initial render
  renderTable(dataBahanAjar);

  // Filter & Pencarian
  var searchInput = document.getElementById("searchStok");
  var filterSelect = document.getElementById("filterJenis");

  function filterData() {
    var query = searchInput.value.toLowerCase();
    var jenis = filterSelect.value;

    var filtered = dataBahanAjar.filter(function(item) {
      var matchQuery = item.namaBarang.toLowerCase().includes(query) || 
                         item.kodeBarang.toLowerCase().includes(query) ||
                         item.kodeLokasi.toLowerCase().includes(query);
      var matchJenis = jenis === "" || item.jenisBarang === jenis;
      return matchQuery && matchJenis;
    });

    renderTable(filtered);
  }

  if (searchInput) searchInput.addEventListener("input", filterData);
  if (filterSelect) filterSelect.addEventListener("change", filterData);

  // Modal Tambah Stok Baru
  var modalAddStok = document.getElementById("modalAddStok");
  var btnOpenAddStok = document.getElementById("btnOpenAddStok");
  var btnCloseAddStok = document.getElementById("btnCloseAddStok");
  var formAddStok = document.getElementById("formAddStok");

  if (btnOpenAddStok) {
    btnOpenAddStok.addEventListener("click", function() {
      modalAddStok.classList.add("show");
    });
  }

  if (btnCloseAddStok) {
    btnCloseAddStok.addEventListener("click", function() {
      modalAddStok.classList.remove("show");
    });
  }

  // Tambah stok baru menggunakan JavaScript DOM
  if (formAddStok) {
    formAddStok.addEventListener("submit", function(e) {
      e.preventDefault();

      var newItem = {
        kodeLokasi: document.getElementById("addKodeLokasi").value.trim(),
        kodeBarang: document.getElementById("addKodeBarang").value.trim(),
        namaBarang: document.getElementById("addNamaBarang").value.trim(),
        jenisBarang: document.getElementById("addJenisBarang").value,
        edisi: document.getElementById("addEdisi").value.trim(),
        stok: parseInt(document.getElementById("addStok").value),
        cover: "assets/pengantar_komunikasi.jpg"
      };

      // Tambah ke array & simpan ke localStorage
      dataBahanAjar.push(newItem);
      localStorage.setItem("sitta_bahan_ajar", JSON.stringify(dataBahanAjar));

      // Re-render tabel
      renderTable(dataBahanAjar);

      alert("Berhasil menambahkan stok bahan ajar baru!");
      modalAddStok.classList.remove("show");
      formAddStok.reset();
    });
  }
}

// Event Listener DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  initUserSession();
  initLoginPage();
  initDashboardPage();
  initTrackingPage();
  initStokPage();
});
