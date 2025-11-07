export type ListSuratType = {
	nama: string;
	icon: string;
	deskripsi: string;
	tipe: string;
};

export const ListSurat: ListSuratType[] = [
	{
		deskripsi:
			"Menyatakan tempat tinggal seseorang untuk keperluan administrasi.",
		icon: "🌏",
		nama: "Surat Keterangan Domisili",
		tipe: "Surat Keterangan",
	},

	{
		deskripsi:
			"Digunakan untuk menyatakan bahwa seseorang telah berpindah tempat tinggal secara sah.",
		icon: "🚚",
		nama: "Surat Keterangan Pindah Domisili",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi:
			"Menyatakan kondisi ekonomi kurang mampu untuk bantuan atau keringanan biaya.",
		icon: "🙏",
		nama: "Surat Keterangan Tidak Mampu",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Mengonfirmasi kelahiran anak untuk pengurusan akta kelahiran.",
		icon: "👶",
		nama: "Surat Keterangan Kelahiran",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Menyatakan kematian seseorang untuk urusan administratif.",
		icon: "❌",
		nama: "Surat Keterangan Kematian",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi:
			"Menyatakan keberadaan usaha untuk perizinan atau pengajuan kredit.",
		icon: "🏬",
		nama: "Surat Keterangan Usaha",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Memberi izin bepergian keluar daerah dalam situasi tertentu.",
		icon: "✈️",
		nama: "Surat Keterangan Bepergian",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Bukti izin tidak masuk kerja karena alasan tertentu.",
		icon: "💼",
		nama: "Surat Keterangan Izin Tidak Masuk Kerja",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi:
			"Menyatakan jumlah penghasilan untuk pengajuan pinjaman atau bantuan.",
		icon: "💵",
		nama: "Surat Keterangan Penghasilan",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Menyatakan status perkawinan untuk keperluan administratif.",
		icon: "💍",
		nama: "Surat Keterangan Status Perkawinan",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Pengganti sementara KTP yang belum selesai dicetak.",
		icon: "🪪",
		nama: "Surat Keterangan Resi KTP Sementara",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Menyatakan domisili perusahaan untuk perizinan.",
		icon: "📌",
		nama: "Surat Keterangan Domisili Perusahaan",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Menyatakan status janda/duda untuk administrasi.",
		icon: "💔",
		nama: "Surat Keterangan Janda / Duda",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Mengklarifikasi perbedaan identitas di dokumen resmi.",
		icon: "📃",
		nama: "Surat Keterangan Beda Identitas",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Menyatakan seseorang hilang untuk proses hukum.",
		icon: "👤",
		nama: "Surat Keterangan Ghaib",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Menyatakan telah terjadi transaksi jual beli secara sah.",
		icon: "📝",
		nama: "Surat Keterangan Jual Beli",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Menyatakan telah terjadi transaksi jual beli tanah secara sah.",
		icon: "🏡",
		nama: "Surat Keterangan Jual Beli Tanah",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi:
			"Dibutuhkan untuk mengurus Surat Keterangan Catatan Kepolisian (SKCK).",
		icon: "👮‍♂️",
		nama: "Surat Pengantar Catatan Kepolisian",
		tipe: "Surat Pengantar",
	},
	{
		deskripsi: "Digunakan untuk melaporkan kehilangan barang atau dokumen.",
		icon: "❓",
		nama: "Surat Pengantar Kehilangan",
		tipe: "Surat Pengantar",
	},
	{
		deskripsi: "Diperlukan untuk administrasi pernikahan (Pria atau Wanita).",
		icon: "💍",
		nama: "Surat Pengantar Pernikahan",
		tipe: "Surat Pengantar",
	},
	{
		deskripsi:
			"Diperlukan untuk mendapatkan izin mengadakan acara atau kegiatan yang melibatkan keramaian.",
		icon: "🎉",
		nama: "Surat Rekomendasi Izin Keramaian",
		tipe: "Surat Rekomendasi",
	},
	{
		deskripsi:
			"Memberi wewenang kepada orang lain untuk bertindak atas nama pemberi kuasa.",
		icon: "🏛️",
		nama: "Surat Kuasa",
		tipe: "Surat Lainnya",
	},
	{
		deskripsi:
			"Dokumen resmi yang menugaskan seseorang untuk melaksanakan tugas tertentu.",
		icon: "☝️",
		nama: "Surat Tugas",
		tipe: "Surat Lainnya",
	},
	{
		deskripsi:
			"Menyatakan bahwa seseorang belum memiliki objek Pajak Bumi dan Bangunan (PBB) untuk keperluan administratif.",
		icon: "🏠",
		nama: "Surat Keterangan Belum Memiliki Pajak Bumi dan Bangunan",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi:
			"Berisi data lengkap seseorang untuk keperluan administrasi atau pengajuan dokumen resmi.",
		icon: "📇",
		nama: "Surat Keterangan Biodata",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Menyatakan bahwa KTP seseorang sedang dalam proses pembuatan.",
		icon: "⏳",
		nama: "Surat Keterangan KTP dalam Proses",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Digunakan untuk menyatakan kepesertaan dalam program JAMKESOS.",
		icon: "🏥",
		nama: "Surat Keterangan JAMKESOS",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi:
			"Digunakan untuk mengajukan permohonan pembuatan akta kelahiran.",
		icon: "📄",
		nama: "Surat Permohonan Akta Lahir",
		tipe: "Surat Permohonan",
	},
	{
		deskripsi: "Dibuat untuk mengurus akta kelahiran yang belum dimiliki.",
		icon: "🍼",
		nama: "Surat Permohonan Belum Memiliki Akta Lahir",
		tipe: "Surat Permohonan",
	},
	{
		deskripsi:
			"Digunakan untuk mengajukan kembali akta kelahiran yang hilang atau rusak.",
		icon: "📑",
		nama: "Surat Permohonan Duplikat Kelahiran",
		tipe: "Surat Permohonan",
	},
	{
		deskripsi:
			"Menjelaskan bahwa seseorang lahir dalam kondisi tidak bernyawa.",
		icon: "⚰️",
		nama: "Surat Keterangan Lahir Mati",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Diperlukan untuk menikah di luar wilayah tempat tinggal.",
		icon: "🚶‍♀️",
		nama: "Surat Keterangan Pergi Kawin",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi:
			"Surat ini menyatakan bahwa seseorang belum pernah menikah sebelumnya secara sah baik secara hukum maupun agama.",
		icon: "💌",
		nama: "Surat Keterangan Belum Pernah Menikah",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi:
			"Digunakan ketika tidak ada wali nikah, sehingga pengadilan menetapkan wali hakim.",
		icon: "⚖️",
		nama: "Surat Keterangan Wali Hakim",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Permohonan duplikat surat nikah karena hilang atau rusak.",
		icon: "📜",
		nama: "Surat Permohonan Duplikat Surat Nikah",
		tipe: "Surat Permohonan",
	},
	{
		deskripsi: "Dokumen pengajuan cerai secara resmi ke instansi terkait.",
		icon: "📂",
		nama: "Surat Permohonan Cerai",
		tipe: "Surat Permohonan",
	},
	{
		deskripsi: "Dokumen pendukung untuk proses rujuk atau cerai.",
		icon: "🔁",
		nama: "Surat Keterangan Pengantar Rujuk/Cerai",
		tipe: "Surat Pengantar",
	},
	{
		deskripsi:
			"Digunakan untuk mengajukan permohonan pembuatan Kartu Keluarga baru.",
		icon: "👨‍👩‍👧‍👦",
		nama: "Surat Permohonan Kartu Keluarga",
		tipe: "Surat Permohonan",
	},
	{
		deskripsi:
			"Izin resmi dari orang tua/suami/istri untuk kegiatan atau pernikahan.",
		icon: "📝",
		nama: "Surat Keterangan Izin Orang Tua/Suami/Istri",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi:
			"Pernyataan kepemilikan fisik atas tanah yang belum bersertifikat resmi.",
		icon: "🌾",
		nama: "Surat Pernyataan Penguasaan Fisik Bidang Tanah (SPORADIK)",
		tipe: "Surat Pernyataan",
	},
	{
		deskripsi:
			"Digunakan untuk mengajukan perubahan data dalam Kartu Keluarga.",
		icon: "🔄",
		nama: "Surat Permohonan Perubahan Kartu Keluarga",
		tipe: "Surat Permohonan",
	},
	{
		deskripsi:
			"Digunakan untuk permohonan penerbitan buku pas lintas daerah/perairan.",
		icon: "🚤",
		nama: "Surat Pengantar Permohonan Penerbitan Buku Pas Lintas",
		tipe: "Surat Pengantar",
	},
	{
		deskripsi: "Menyatakan kepemilikan kendaraan bermotor oleh pemohon.",
		icon: "🚗",
		nama: "Surat Keterangan Kepemilikan Kendaraan",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi: "Menyatakan hak milik seseorang terhadap sebidang tanah.",
		icon: "🏡",
		nama: "Surat Keterangan Kepemilikan Tanah",
		tipe: "Surat Keterangan",
	},
	{
		deskripsi:
			"Surat pengantar untuk keperluan pernikahan bagi warga non-Muslim.",
		icon: "📘",
		nama: "Surat Keterangan Untuk Nikah Warga Non Muslim",
		tipe: "Surat Pengantar",
	},
];
