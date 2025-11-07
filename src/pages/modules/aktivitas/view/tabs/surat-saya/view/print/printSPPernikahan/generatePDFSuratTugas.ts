import dayjs from "dayjs";
import type {
	ResKotakSuratDetailType,
	ResProfilDesaType,
} from "../../../model";
import { toRoman } from "@/utils/helpers";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

export type Surat = {
	surat: ResKotakSuratDetailType;
	profil_desa: ResProfilDesaType;
	isCetak?: boolean;
	website: string;
};

export function generatePdfSurat(data: Surat) {
	const { profil_desa, surat } = data;

	const profilDesa = profil_desa;

	const defaultFontSize = 10;

	const makeTableRow = (label: string, value: string) => [
		{ text: label, fontSize: defaultFontSize, width: "30%" },
		{ text: `: ${value || "-"}`, fontSize: defaultFontSize, width: "70%" },
	];

	const pad = "\u00A0".repeat(5);

	// === Halaman Suami ===
	const pageSuami = [
		{
			text: "MODEL N1",
			alignment: "right",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("Kantor Desa / Kelurahan", profilDesa?.nama_organisasi),
					makeTableRow("Kecamatan", profilDesa?.Kecamatan),
					makeTableRow("Kabupaten", profilDesa?.Kabupaten),
				],
			},
			layout: "noBorders",
			margin: [0, 0, 0, 10],
		},
		{
			text: "SURAT PENGANTAR PERNIKAHAN",
			alignment: "center",
			bold: true,
			decoration: "underline",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},
		{
			text: `Nomor: ${surat?.kode_depan ? `${surat?.kode_depan}/` : ""}${
				surat?.nomor_surat ? `${surat?.nomor_surat}/` : `${pad}/`
			}${surat?.kode_belakang ? `${surat?.kode_belakang}/` : ""}${toRoman(
				Number(dayjs(surat?.tanggal_surat).locale("id").format("MM"))
			)}/${dayjs(surat?.tanggal_surat).locale("id").format("YYYY")}`,
			alignment: "center",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			text: `Yang bertanda tangan di bawah ini, atas nama ${surat?.disahkan_oleh} ${profilDesa?.nama_organisasi} Kecamatan ${profilDesa?.Kecamatan} Kabupaten ${profilDesa?.Kabupaten} dengan ini menerangkan bahwa:`,
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_suami),
					makeTableRow("Nama", surat?.nama_suami),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_suami}, ${dayjs(surat?.tanggal_lahir_suami)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_suami),
					makeTableRow("Pekerjaan", surat?.pekerjaan_suami),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_suami?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_suami),
					makeTableRow("Status Perkawinan", surat?.status_kawin_suami),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{
			text: `Adalah benar warga ${profilDesa?.nama_organisasi} Kecamatan ${profilDesa?.Kecamatan} Kabupaten ${profilDesa?.Kabupaten} dan yang bersangkutan merupakan anak dari seorang pria:`,
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_ayah_suami),
					makeTableRow("Nama", surat?.nama_ayah_suami),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_ayah_suami}, ${dayjs(
							surat?.tanggal_lahir_ayah_suami
						)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_ayah_suami),
					makeTableRow("Pekerjaan", surat?.pekerjaan_ayah_suami),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_ayah_suami?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_ayah_suami),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{
			text: "Dengan seorang wanita:",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_ibu_suami),
					makeTableRow("Nama", surat?.nama_ibu_suami),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_ibu_suami}, ${dayjs(
							surat?.tanggal_lahir_ibu_suami
						)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_ibu_suami),
					makeTableRow("Pekerjaan", surat?.pekerjaan_ibu_suami),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_ibu_suami?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_ibu_suami),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{
			text: "Demikian Surat Pengantar Pernikahan ini dibuat dan diberikan kepada yang bersangkutan untuk dipergunakan sebagaimana mestinya.",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 20],
		},
		{
			columns: [
				{
					width: "*",
					text: "",
				},
				{
					width: "40%",
					stack: [
						{
							table: {
								widths: ["35%", "*"],
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
											text: `: ${dayjs().locale("id").format("DD MMMM YYYY")}`,
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
			columnGap: 0,
		},
	];

	// === Halaman Istri === (mirip, ganti field)
	const pageIstri = [
		{ text: "", pageBreak: "after" },
		{
			text: "MODEL N1",
			alignment: "right",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("Kantor Desa / Kelurahan", profilDesa?.nama_organisasi),
					makeTableRow("Kecamatan", profilDesa?.Kecamatan),
					makeTableRow("Kabupaten", profilDesa?.Kabupaten),
				],
			},
			layout: "noBorders",
			margin: [0, 0, 0, 10],
		},
		{
			text: "SURAT PENGANTAR PERNIKAHAN",
			alignment: "center",
			bold: true,
			decoration: "underline",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},
		{
			text: `Nomor: ${surat?.kode_depan ? `${surat?.kode_depan}/` : ""}${
				surat?.nomor_surat ? `${surat?.nomor_surat}/` : `${pad}/`
			}${surat?.kode_belakang ? `${surat?.kode_belakang}/` : ""}${toRoman(
				Number(dayjs(surat?.tanggal_surat).locale("id").format("MM"))
			)}/${dayjs(surat?.tanggal_surat).locale("id").format("YYYY")}`,
			alignment: "center",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			text: `Yang bertanda tangan di bawah ini, atas nama ${surat?.disahkan_oleh} ${profilDesa?.nama_organisasi} Kecamatan ${profilDesa?.Kecamatan} Kabupaten ${profilDesa?.Kabupaten} dengan ini menerangkan bahwa:`,
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_istri),
					makeTableRow("Nama", surat?.nama_istri),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_istri}, ${dayjs(surat?.tanggal_lahir_istri)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_istri),
					makeTableRow("Pekerjaan", surat?.pekerjaan_istri),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_istri?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_istri),
					makeTableRow("Status Perkawinan", surat?.status_kawin_istri),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{
			text: `Adalah benar warga ${profilDesa?.nama_organisasi} Kecamatan ${profilDesa?.Kecamatan} Kabupaten ${profilDesa?.Kabupaten} dan yang bersangkutan merupakan anak dari seorang pria:`,
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_ayah_istri),
					makeTableRow("Nama", surat?.nama_ayah_istri),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_ayah_istri}, ${dayjs(
							surat?.tanggal_lahir_ayah_istri
						)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_ayah_istri),
					makeTableRow("Pekerjaan", surat?.pekerjaan_ayah_istri),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_ayah_istri?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_ayah_istri),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{
			text: "Dengan seorang wanita:",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_ibu_istri),
					makeTableRow("Nama", surat?.nama_ibu_istri),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_ibu_istri}, ${dayjs(
							surat?.tanggal_lahir_ibu_istri
						)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_ibu_istri),
					makeTableRow("Pekerjaan", surat?.pekerjaan_ibu_istri),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_ibu_istri?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_ibu_istri),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{
			text: "Demikian Surat Pengantar Pernikahan ini dibuat dan diberikan kepada yang bersangkutan untuk dipergunakan sebagaimana mestinya.",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 20],
		},
		{
			columns: [
				{
					width: "*",
					text: "",
				},
				{
					width: "40%",
					stack: [
						{
							table: {
								widths: ["35%", "*"],
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
											text: `: ${dayjs().locale("id").format("DD MMMM YYYY")}`,
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
			columnGap: 0,
		},
	];

	// === Halaman N2 ===
	const pageN2 = [
		{ text: "", pageBreak: "after" },
		{
			text: "PERMOHONAN KEHENDAK PERNIKAHAN",
			alignment: "center",
			bold: true,
			decoration: "underline",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			text: [
				"Kepada Yth,\n",
				`Kepala KUA Kecamatan ${profilDesa?.Kecamatan}\n`,
				"Di Tempat\n\n",
			],
			fontSize: defaultFontSize,
		},
		{
			text: "Dengan Hormat,",
			fontSize: defaultFontSize,
			margin: [0, 10, 0, 10],
		},
		{
			text: `Kami mengajukan permohonan kehendak pernikahan untuk calon suami bernama ${
				surat?.nama_suami
			} dengan calon istri bernama ${surat?.nama_istri} pada hari ${dayjs(
				surat?.tanggal
			)
				.locale("id")
				.format("dddd DD MMMM YYYY")} jam ${surat?.jam} WIB yang bertempat di ${
				surat?.tempat
			} Kecamatan ${profilDesa?.Kecamatan}.`,
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			text: "Bersama ini kami sampaikan surat-surat yang diperlukan untuk diperiksa sebagai berikut:",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},
		{
			ol: [
				"Surat Pengantar dari Desa/Kelurahan",
				"Persetujuan Calon Mempelai",
				"Fotocopy KTP",
				"Fotocopy Akta Kelahiran",
				"Fotocopy Kartu Keluarga",
				"Pas Photo masing-masing Catin 2x3 = 3 Lembar, 3x4 = 2 Lembar, 4x6 = 1 Lembar Latar Belakang Biru",
				"Fotocopy KTP Wali",
				"Fotocopy KTP Saksi 2 Orang",
				"No. HP Catin dan Wali",
				"Imunisasi bagi Perempuan",
			],
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			text: `Demikian permohonan ini disampaikan, kiranya dapat diperiksa, dihadiri dan dicatat sesuai dengan ketentuan perundang-undangan.`,
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{ text: "Diterima Tanggal", fontSize: defaultFontSize },
		{
			text: "................................................",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 20],
		},
		{
			columns: [
				{
					width: "40%",
					stack: [
						{ text: "Yang Menerima,", fontSize: defaultFontSize },
						{
							text: "Kepala KUA/Penghulu\n\n\n\n\n",
							fontSize: defaultFontSize,
						},
						{
							text: "...................................",
							fontSize: defaultFontSize,
						},
					],
					alignment: "center",
				},
				{
					width: "*",
					text: "",
				},
				{
					width: "40%",
					stack: [
						{ text: "Wassalam,", fontSize: defaultFontSize },
						{ text: "Pemohon\n\n\n\n\n", fontSize: defaultFontSize },
						{ text: surat?.nama_suami, fontSize: defaultFontSize },
					],
					alignment: "center",
				},
			],
		},
	];

	// === Halaman N3 ===
	const pageN3 = [
		{ text: "", pageBreak: "after" },
		{
			text: "MODEL N3",
			alignment: "right",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},
		{
			text: "SURAT PERSETUJUAN MEMPELAI",
			alignment: "center",
			bold: true,
			decoration: "underline",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},

		{
			text: "Yang bertanda tangan di bawah ini:",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{ text: "Calon Suami:", fontSize: defaultFontSize },
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_suami),
					makeTableRow("Nama", surat?.nama_suami),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_suami}, ${dayjs(surat?.tanggal_lahir_suami)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_suami),
					makeTableRow("Pekerjaan", surat?.pekerjaan_suami),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_suami?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_suami),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{ text: "Calon Istri:", fontSize: defaultFontSize },
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_istri),
					makeTableRow("Nama", surat?.nama_istri),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_istri}, ${dayjs(surat?.tanggal_lahir_istri)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_istri),
					makeTableRow("Pekerjaan", surat?.pekerjaan_istri),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_istri?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_istri),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{
			text: "Menyatakan dengan sesungguhnya bahwa atas dasar suka rela, dengan kesadaran sendiri, tanpa ada paksaan dari siapapun juga, setuju untuk melangsungkan pernikahan.",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			text: "Demikian Surat Persetujuan Mempelai ini dibuat untuk dipergunakan sebagaimana mestinya.",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			text: `${profilDesa?.nama_organisasi}, ${dayjs()
				.locale("id")
				.format("DD MMMM YYYY")}`,
			alignment: "center",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 20],
		},
		{
			columns: [
				{
					width: "40%",
					stack: [
						{ text: "Calon Suami", fontSize: defaultFontSize },
						{
							text: `\n\n\n\n\n${surat?.nama_suami}`,
							fontSize: defaultFontSize,
						},
					],
					alignment: "center",
				},
				{ width: "*", text: "" },
				{
					width: "40%",
					stack: [
						{ text: "Calon Istri", fontSize: defaultFontSize },
						{
							text: `\n\n\n\n\n${surat?.nama_istri}`,
							fontSize: defaultFontSize,
						},
					],
					alignment: "center",
				},
			],
		},
	];

	// === Halaman N4 Suami ===
	const pageN4Suami = [
		{ text: "", pageBreak: "after" },
		{
			text: "MODEL N4",
			alignment: "right",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},
		{
			text: "SURAT IZIN ORANG TUA",
			alignment: "center",
			bold: true,
			decoration: "underline",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			text: "Yang bertanda tangan di bawah ini:",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{ text: "Ayah:", fontSize: defaultFontSize },
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_ayah_suami),
					makeTableRow("Nama", surat?.nama_ayah_suami),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_ayah_suami}, ${dayjs(
							surat?.tanggal_lahir_ayah_suami
						)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_ayah_suami),
					makeTableRow("Pekerjaan", surat?.pekerjaan_ayah_suami),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_ayah_suami?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_ayah_suami),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{ text: "Ibu:", fontSize: defaultFontSize },
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_ibu_suami),
					makeTableRow("Nama", surat?.nama_ibu_suami),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_ibu_suami}, ${dayjs(
							surat?.tanggal_lahir_ibu_suami
						)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_ibu_suami),
					makeTableRow("Pekerjaan", surat?.pekerjaan_ibu_suami),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_ibu_suami?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_ibu_suami),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{ text: "Adalah Ayah dan Ibu kandung dari:", fontSize: defaultFontSize },
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_suami),
					makeTableRow("Nama", surat?.nama_suami),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_suami}, ${dayjs(surat?.tanggal_lahir_suami)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_suami),
					makeTableRow("Pekerjaan", surat?.pekerjaan_suami),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_suami?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_suami),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{
			text: "Memberikan izin kepada kami untuk melangsungkan pernikahan dengan:",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_istri),
					makeTableRow("Nama", surat?.nama_istri),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_istri}, ${dayjs(surat?.tanggal_lahir_istri)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_istri),
					makeTableRow("Pekerjaan", surat?.pekerjaan_istri),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_istri?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_istri),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{
			text: "Demikian Surat Izin Orang Tua ini dibuat dengan kesadaran penuh dan tanpa ada paksaan dari siapapun untuk dipergunakan sebagaimana mestinya.",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 20],
		},
		{
			text: `${profilDesa?.nama_organisasi}, ${dayjs()
				.locale("id")
				.format("DD MMMM YYYY")}`,
			alignment: "center",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 20],
		},
		{
			columns: [
				{
					width: "40%",
					stack: [
						{ text: "Ayah,", fontSize: defaultFontSize },
						{
							text: `\n\n\n\n${surat?.nama_ayah_suami}`,
							fontSize: defaultFontSize,
						},
					],
					alignment: "center",
				},
				{ width: "*", text: "" },
				{
					width: "40%",
					stack: [
						{ text: "Ibu,", fontSize: defaultFontSize },
						{
							text: `\n\n\n\n${surat?.nama_ibu_suami}`,
							fontSize: defaultFontSize,
						},
					],
					alignment: "center",
				},
			],
		},
	];

	// === Halaman N4 Istri ===
	const pageN4Istri = [
		{ text: "", pageBreak: "after" },
		{
			text: "MODEL N4",
			alignment: "right",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},
		{
			text: "SURAT IZIN ORANG TUA",
			alignment: "center",
			bold: true,
			decoration: "underline",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{
			text: "Yang bertanda tangan di bawah ini:",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 10],
		},
		{ text: "Ayah:", fontSize: defaultFontSize },
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_ayah_istri),
					makeTableRow("Nama", surat?.nama_ayah_istri),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_ayah_istri}, ${dayjs(
							surat?.tanggal_lahir_ayah_istri
						)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_ayah_istri),
					makeTableRow("Pekerjaan", surat?.pekerjaan_ayah_istri),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_ayah_istri?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_ayah_istri),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{ text: "Ibu:", fontSize: defaultFontSize },
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_ibu_istri),
					makeTableRow("Nama", surat?.nama_ibu_istri),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_ibu_istri}, ${dayjs(
							surat?.tanggal_lahir_ibu_istri
						)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_ibu_istri),
					makeTableRow("Pekerjaan", surat?.pekerjaan_ibu_istri),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_ibu_istri?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_ibu_istri),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{ text: "Adalah Ayah dan Ibu kandung dari:", fontSize: defaultFontSize },
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_istri),
					makeTableRow("Nama", surat?.nama_istri),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_istri}, ${dayjs(surat?.tanggal_lahir_istri)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_istri),
					makeTableRow("Pekerjaan", surat?.pekerjaan_istri),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_istri?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_istri),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{
			text: "Memberikan izin kepada kami untuk melangsungkan pernikahan dengan:",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 5],
		},
		{
			table: {
				widths: ["30%", "*"],
				body: [
					makeTableRow("NIK", surat?.nik_suami),
					makeTableRow("Nama", surat?.nama_suami),
					makeTableRow(
						"Tempat, Tanggal Lahir",
						`${surat?.tempat_lahir_suami}, ${dayjs(surat?.tanggal_lahir_suami)
							.locale("id")
							.format("DD MMMM YYYY")}`
					),
					makeTableRow("Agama", surat?.agama_suami),
					makeTableRow("Pekerjaan", surat?.pekerjaan_suami),
					makeTableRow(
						"Kewarganegaraan",
						surat?.kewarganegaraan_suami?.toUpperCase()
					),
					makeTableRow("Alamat Lengkap", surat?.alamat_suami),
				],
			},
			layout: "noBorders",
			margin: [20, 0, 0, 10],
		},
		{
			text: "Demikian Surat Izin Orang Tua ini dibuat dengan kesadaran penuh dan tanpa ada paksaan dari siapapun untuk dipergunakan sebagaimana mestinya.",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 20],
		},
		{
			text: `${profilDesa?.nama_organisasi}, ${dayjs()
				.locale("id")
				.format("DD MMMM YYYY")}`,
			alignment: "center",
			fontSize: defaultFontSize,
			margin: [0, 0, 0, 20],
		},
		{
			columns: [
				{
					width: "40%",
					stack: [
						{ text: "Ayah,", fontSize: defaultFontSize },
						{
							text: `\n\n\n\n${surat?.nama_ayah_istri}`,
							fontSize: defaultFontSize,
						},
					],
					alignment: "center",
				},
				{ width: "*", text: "" },
				{
					width: "40%",
					stack: [
						{ text: "Ibu,", fontSize: defaultFontSize },
						{
							text: `\n\n\n\n${surat?.nama_ibu_istri}`,
							fontSize: defaultFontSize,
						},
					],
					alignment: "center",
				},
			],
		},
	];

	return {
		content: [
			...pageSuami,
			...pageIstri,
			...pageN2,
			...pageN3,
			...pageN4Suami,
			...pageN4Istri,
		],
		defaultStyle: { fontSize: defaultFontSize },
		footer: function (currentPage: number, pageCount: number) {
			return {
				columns: [
					{
						text: `Dicetak pada ${dayjs()
							.locale("id")
							.format("DD MMMM YYYY")} dari ${data?.website || ""}`,
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
