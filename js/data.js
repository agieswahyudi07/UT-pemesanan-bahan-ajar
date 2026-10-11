// Data dummy pengguna
var defaultDataPengguna = [
  {
    id: 1,
    nama: "Rina Wulandari",
    email: "rina@ut.ac.id",
    password: "rina123",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Jakarta"
  },
  {
    id: 2,
    nama: "Agus Pranoto",
    email: "agus@ut.ac.id",
    password: "agus123",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Makassar"
  },
  {
    id: 3,
    nama: "Siti Marlina",
    email: "siti@ut.ac.id",
    password: "siti123",
    role: "Puslaba",
    lokasi: "Pusat"
  },
  {
    id: 4,
    nama: "Doni Setiawan",
    email: "doni@ut.ac.id",
    password: "doni123",
    role: "Fakultas",
    lokasi: "FISIP"
  },
  {
    id: 5,
    nama: "Admin SITTA",
    email: "admin@ut.ac.id",
    password: "admin123",
    role: "Administrator",
    lokasi: "Pusat"
  },
  {
    id: 6,
    nama: "Agies Wahyudi",
    email: "agieswahyudi@gmail.com",
    password: "agieswahyudi",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ-UT Bandung"
  }
];

// Data dummy bahan ajar
var defaultDataBahanAjar = [
  {
    kodeLokasi: "0TMP01",
    kodeBarang: "ASIP4301",
    namaBarang: "Pengantar Ilmu Komunikasi",
    jenisBarang: "BMP",
    edisi: "2",
    stok: 548,
    cover: "assets/pengantar_komunikasi.jpg"
  },
  {
    kodeLokasi: "0JKT01",
    kodeBarang: "EKMA4216",
    namaBarang: "Manajemen Keuangan",
    jenisBarang: "BMP",
    edisi: "3",
    stok: 392,
    cover: "assets/manajemen_keuangan.jpg"
  },
  {
    kodeLokasi: "0SBY02",
    kodeBarang: "EKMA4310",
    namaBarang: "Kepemimpinan",
    jenisBarang: "BMP",
    edisi: "1",
    stok: 278,
    cover: "assets/kepemimpinan.jpg"
  },
  {
    kodeLokasi: "0MLG01",
    kodeBarang: "BIOL4211",
    namaBarang: "Mikrobiologi Dasar",
    jenisBarang: "BMP",
    edisi: "2",
    stok: 165,
    cover: "assets/mikrobiologi.jpg"
  },
  {
    kodeLokasi: "0UPBJJBDG",
    kodeBarang: "PAUD4401",
    namaBarang: "Perkembangan Anak Usia Dini",
    jenisBarang: "BMP",
    edisi: "4",
    stok: 204,
    cover: "assets/paud_perkembangan.jpeg"
  }
];

// Data dummy tracking DO
var defaultDataTracking = {
  "2023001234": {
    nomorDO: "2023001234",
    nama: "Rina Wulandari",
    status: "Dalam Perjalanan",
    ekspedisi: "JNE Express",
    tanggalKirim: "2025-08-25",
    paket: "0JKT01 - BMP Manajemen Keuangan",
    total: "Rp 180.000",
    perjalanan: [
      {
        waktu: "2025-08-25 10:12:20",
        keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
      },
      {
        waktu: "2025-08-25 14:07:56",
        keterangan: "Tiba di Hub: TANGERANG SELATAN"
      },      
      {
        waktu: "2025-08-25 18:30:15",
        keterangan: "Diteruskan ke Kantor Jakarta Selatan"
      }
    ]
  },
  "2023005678": {
    nomorDO: "2023005678",
    nama: "Agus Pranoto",
    status: "Selesai",
    ekspedisi: "Pos Indonesia",
    tanggalKirim: "2025-08-25",
    paket: "0UPBJJBDG - BMP Perkembangan Anak",
    total: "Rp 220.000",
    perjalanan: [
      {
        waktu: "2025-08-25 10:12:20",
        keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
      },
      {
        waktu: "2025-08-25 14:07:56",
        keterangan: "Tiba di Hub: TANGERANG SELATAN"
      },      
      {
        waktu: "2025-08-25 16:30:10",
        keterangan: "Diteruskan ke Kantor Kota Bandung"
      },
      {
        waktu: "2025-08-26 12:15:33",
        keterangan: "Tiba di Hub: Kota BANDUNG"
      },
      {
        waktu: "2025-08-26 15:06:12",
        keterangan: "Proses antar ke Cimahi"
      },
      {
        waktu: "2025-08-26 20:00:00",
        keterangan: "Selesai Antar. Penerima: Agus Pranoto"
      }
    ]
  }
};

// Inisialisasi data ke localStorage
var currentStoredUsers = localStorage.getItem("sitta_pengguna");
if (!currentStoredUsers) {
  localStorage.setItem("sitta_pengguna", JSON.stringify(defaultDataPengguna));
} else {
  var parsedUsers = JSON.parse(currentStoredUsers);
  var userExists = parsedUsers.some(function(u) { return u.email === "agieswahyudi@gmail.com"; });
  if (!userExists) {
    parsedUsers.push({
      id: parsedUsers.length + 1,
      nama: "Agies Wahyudi",
      email: "agieswahyudi@gmail.com",
      password: "agieswahyudi",
      role: "UPBJJ-UT",
      lokasi: "UPBJJ-UT Bandung"
    });
    localStorage.setItem("sitta_pengguna", JSON.stringify(parsedUsers));
  }
}

var currentStoredBahanAjar = localStorage.getItem("sitta_bahan_ajar");
if (!currentStoredBahanAjar) {
  localStorage.setItem("sitta_bahan_ajar", JSON.stringify(defaultDataBahanAjar));
} else {
  // Update cover lokal jika masih format lama
  var parsedBahan = JSON.parse(currentStoredBahanAjar);
  var needUpdate = false;
  parsedBahan.forEach(function(item) {
    var def = defaultDataBahanAjar.find(function(d) { return d.kodeBarang === item.kodeBarang; });
    if (def && item.cover !== def.cover) {
      item.cover = def.cover;
      needUpdate = true;
    }
  });
  if (needUpdate) {
    localStorage.setItem("sitta_bahan_ajar", JSON.stringify(parsedBahan));
  }
}

if (!localStorage.getItem("sitta_tracking")) {
  localStorage.setItem("sitta_tracking", JSON.stringify(defaultDataTracking));
}

// Global variable penampung data
var dataPengguna = JSON.parse(localStorage.getItem("sitta_pengguna"));
var dataBahanAjar = JSON.parse(localStorage.getItem("sitta_bahan_ajar"));
var dataTracking = JSON.parse(localStorage.getItem("sitta_tracking"));
