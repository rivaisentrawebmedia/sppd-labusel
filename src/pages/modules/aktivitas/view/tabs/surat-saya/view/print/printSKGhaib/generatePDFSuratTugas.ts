import dayjs from "dayjs";
import type {
	ResKopSuratType,
	ResKotakSuratDetailType,
	ResProfilDesaType,
} from "../../../model";
import { toRoman } from "@/utils/helpers";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

function mapStyle({
	font,
	style,
	size,
}: {
	font: string;
	style: string;
	size: string;
}) {
	return {
		font,
		bold: style.toLowerCase() === "bold",
		italics: style.toLowerCase() === "italic",
		fontSize: parseInt(size),
	};
}

export type Surat = {
	surat: ResKotakSuratDetailType;
	jenis_surat: string;
	profil_desa: ResProfilDesaType;
	isCetak?: boolean;
	kop_surat: ResKopSuratType;
	website: string;
};

export function generatePdfSurat(data: Surat) {
	const { kop_surat, jenis_surat, profil_desa, surat, website } = data;
	const profilDesa = profil_desa;

	const {
		logo_base64,
		isi_1,
		jenis_font_1,
		gaya_font_1,
		ukuran_font_1,
		isi_2,
		jenis_font_2,
		gaya_font_2,
		ukuran_font_2,
		isi_3,
		jenis_font_3,
		gaya_font_3,
		ukuran_font_3,
		isi_4,
		jenis_font_4,
		gaya_font_4,
		ukuran_font_4,
		isi_5,
		jenis_font_5,
		gaya_font_5,
		ukuran_font_5,
		isi_6,
		jenis_font_6,
		gaya_font_6,
		ukuran_font_6,
	} = kop_surat;

	const contentTexts = [
		{
			text: isi_1 || "",
			...mapStyle({
				font: jenis_font_1,
				style: gaya_font_1,
				size: ukuran_font_1,
			}),
		},
		{
			text: isi_2 || "",
			...mapStyle({
				font: jenis_font_2,
				style: gaya_font_2,
				size: ukuran_font_2,
			}),
		},
		{
			text: isi_3 || "",
			...mapStyle({
				font: jenis_font_3,
				style: gaya_font_3,
				size: ukuran_font_3,
			}),
		},
		{
			text: isi_4 || "",
			...mapStyle({
				font: jenis_font_4,
				style: gaya_font_4,
				size: ukuran_font_4,
			}),
		},
		{
			text: isi_5 || "",
			...mapStyle({
				font: jenis_font_5,
				style: gaya_font_5,
				size: ukuran_font_5,
			}),
		},
		...(isi_6
			? [
					{
						text: isi_6 || "",
						...mapStyle({
							font: jenis_font_6,
							style: gaya_font_6,
							size: ukuran_font_6,
						}),
					},
			  ]
			: []),
	];

	const pad = "\u00A0".repeat(5);

	return {
		content: [
			// 1️⃣ Kop Surat
			{
				columns: logo_base64
					? [
							{
								image: `data:image/png;base64,${logo_base64}`,
								width: 80,
								height: 80,
							},
							{ width: "*", alignment: "center", stack: contentTexts },
					  ]
					: [{ width: "*", alignment: "center", stack: contentTexts }],
				columnGap: 10,
				margin: [0, 0, 0, 10],
			},
			// 2️⃣ Garis
			{
				canvas: [
					{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5 },
				],
				margin: [0, 5, 0, 20],
			},
			// 3️⃣ Judul & Nomor Surat
			{
				text: jenis_surat?.toUpperCase(),
				alignment: "center",
				bold: true,
				fontSize: 15,
				decoration: "underline",
				margin: [0, 0, 0, 0],
			},
			{
				text: `Nomor: ${surat?.kode_depan ? `${surat?.kode_depan}/` : ""}${
					surat?.nomor_surat ? `${surat?.nomor_surat}/` : `${pad}/`
				}${surat?.kode_belakang ? `${surat?.kode_belakang}/` : ""}${toRoman(
					Number(dayjs(surat?.tanggal_surat).locale("id").format("MM"))
				)}/${dayjs(surat?.tanggal_surat).locale("id").format("YYYY")}`,
				alignment: "center",
				fontSize: 10,
				margin: [0, 0, 0, 20],
			},

			{
				text: `Yang bertanda tangan di bawah ini, atas nama ${surat?.disahkan_oleh} ${profilDesa?.nama_organisasi} Kecamatan ${profilDesa?.Kecamatan} Kabupaten ${profilDesa?.Kabupaten} dengan ini menerangkan bahwa:`,
				fontSize: 10,
				margin: [0, 0, 0, 10],
			},

			// Data Orang Hilang
			{
				table: {
					widths: ["30%", "70%"],
					body: [
						["Nama", `: ${surat?.nama_orang_hilang}`],
						["Usia", `: ${surat?.usia} Tahun`],
					].map(([label, value]) => [
						{ text: label, fontSize: 10 },
						{ text: value, fontSize: 10 },
					]),
				},
				layout: "noBorders",
				margin: [20, 0, 0, 10],
			},

			// Paragraf keterangan orang hilang
			{
				text: `Adalah benar warga ${profilDesa?.nama_organisasi} Kecamatan ${
					profilDesa?.Kecamatan
				} Kabupaten ${
					profilDesa?.Kabupaten
				} dan berdasarkan keterangan, sejak ${dayjs(surat?.hilang_sejak).format(
					"DD MMMM YYYY"
				)} yang bersangkutan tidak pernah berada di alamat tersebut serta tidak diketahui lagi keberadaannya sampai sekarang (Ghaib).`,
				fontSize: 10,
				margin: [0, 0, 0, 10],
			},

			// Paragraf laporan
			{
				text: `Surat keterangan ini dibuat berdasarkan laporan dari :`,
				fontSize: 10,
				margin: [0, 0, 0, 10],
			},

			// Data Pelapor
			{
				table: {
					widths: ["30%", "70%"],
					body: [
						["NIK", `: ${surat?.nik}`],
						["Nama", `: ${surat?.nama}`],
						[
							"Jenis Kelamin",
							`: ${surat?.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}`,
						],
						["Hubungan", `: ${surat?.hubungan}`],
						["Alamat", `: ${surat?.alamat}`],
					].map(([label, value]) => [
						{ text: label, fontSize: 10 },
						{ text: value, fontSize: 10 },
					]),
				},
				layout: "noBorders",
				margin: [20, 0, 0, 10],
			},

			// Penutup
			{
				text: `Demikian Surat Keterangan Ghaib ini dibuat dan diberikan kepada yang bersangkutan ${surat?.keperluan}`,
				fontSize: 10,
				margin: [0, 0, 0, 20],
			},

			{
				// ➤ Container: Penuh 100% lebar halaman
				width: "100%",
				columns: [
					// ➤ KIRI: Pelapor
					{
						width: "40%", // setengah
						text: "",
					},
					{
						width: "*", // setengah
						text: "",
					},
					// ➤ KANAN: TTD + QR
					{
						width: "40%",
						stack: [
							{
								table: {
									widths: ["40%", "*"],
									body: [
										[
											{ text: "Dikeluarkan di", fontSize: 10 },
											{
												text: `: ${profil_desa?.nama_organisasi}`,
												fontSize: 10,
											},
										],
										[
											{ text: "Pada Tanggal", fontSize: 10 },
											{
												text: `: ${dayjs(data?.surat?.tanggal_surat)
													.locale("id")
													.format("DD MMMM YYYY")}`,
												fontSize: 10,
											},
										],
									],
								},
								layout: "noBorders",
								margin: [0, 0, 0, 5],
							},
							{
								canvas: [
									{
										type: "line",
										x1: 0,
										y1: 0,
										x2: 200,
										y2: 0,
										lineWidth: 0.5,
									},
								],
								margin: [0, 0, 0, 5],
							},
						],
						alignment: "left",
					},
				],
				columnGap: 20, // jarak antar kiri-kanan
				margin: [0, 0, 0, 0], // jarak ke atas
			},
			{
				// ➤ Container: Penuh 100% lebar halaman
				width: "100%",
				columns: [
					// ➤ KIRI: Pelapor
					{
						width: "40%", // setengah
						stack: [
							{
								text: "Pelapor",
								fontSize: 10,
								margin: [0, 0, 0, 50],
							},
							{
								text: surat?.nama || "",
								fontSize: 10,
								margin: [0, 0, 0, 0],
							},
						],
						alignment: "center",
					},
					{
						width: "*", // setengah
						text: "",
					},
					// ➤ KANAN: TTD + QR
					{
						width: "40%",
						stack: [
							surat?.nama_jabatan_utama && {
								text: `an. ${surat.nama_jabatan_utama}`,
								bold: true,
								fontSize: 10,
								margin: [0, 0, 0, 0],
							},
							{
								text: `${surat?.disahkan_oleh}`,
								bold: true,
								fontSize: 10,
								margin: [0, 0, 0, 50], // spasi tanda tangan
							},
							{
								text: `${surat?.nama_pejabat}`,
								bold: true,
								fontSize: 10,
							},
						],
						alignment: "left",
					},
				],
				columnGap: 20, // jarak antar kiri-kanan
				margin: [0, 0, 0, 0], // jarak ke atas
			},
		],
		footer: function (currentPage: number, pageCount: number) {
			return {
				columns: [
					{
						text: `Dicetak pada ${dayjs()
							.locale("id")
							.format("DD MMMM YYYY")} dari ${website}`,
						alignment: "left",
						italics: true,
						fontSize: 8,
					},
					{
						text: `Halaman ${currentPage} dari ${pageCount}`,
						alignment: "right",
						fontSize: 8,
					},
				],
				margin: [40, 0, 40, 20],
			};
		},
	} as TDocumentDefinitions;
}
