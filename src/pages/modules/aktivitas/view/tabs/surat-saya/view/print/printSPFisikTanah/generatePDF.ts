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
				text: `Yang bertanda tangan di bawah ini :`,
				fontSize: 10,
				margin: [0, 0, 0, 5],
			},
			// 4️⃣ Table
			[
				{
					table: {
						widths: ["25%", "75%"],
						body: [
							[
								{ text: "Nama Lengkap", fontSize: 10 },
								{ text: `: ${surat?.nama_pemohon || ""}`, fontSize: 10 },
							],
							[
								{ text: "Tempat, Tanggal Lahir", fontSize: 10 },
								{
									text: `: ${surat?.tempat_lahir_pemohon || ""}, ${
										surat?.tanggal_lahir_pemohon
											? dayjs(surat?.tanggal_lahir_pemohon)
													.locale("id")
													.format("DD MMMM YYYY")
											: ""
									}`,
									fontSize: 10,
								},
							],
							[
								{ text: "Pekerjaan", fontSize: 10 },
								{ text: `: ${surat?.pekerjaan || ""}`, fontSize: 10 },
							],
							[
								{ text: "Nomor KTP", fontSize: 10 },
								{ text: `: ${surat?.nik_pemohon || ""}`, fontSize: 10 },
							],
							[
								{ text: "Alamat", fontSize: 10 },
								{ text: `: ${surat?.alamat || ""}`, fontSize: 10 },
							],
						],
					},
					layout: "noBorders",
					margin: [20, 0, 0, 10],
				},
			],
			{
				text: `Dengan ini menyatakan bahwa saya dengan itikad baik telah menguasai sebidang tanah yang terletak :`,
				fontSize: 10,
				margin: [0, 0, 0, 5],
			},
			[
				{
					table: {
						widths: ["25%", "75%"],
						body: [
							[
								{ text: "Jalan", fontSize: 10 },
								{ text: `: ${surat?.jalan || ""}`, fontSize: 10 },
							],
							[
								{ text: "RT/RW", fontSize: 10 },
								{ text: `: ${surat?.rt_rw || ""}`, fontSize: 10 },
							],
							[
								{ text: "Desa/Kelurahan", fontSize: 10 },
								{ text: `: ${surat?.desa || ""}`, fontSize: 10 },
							],
							[
								{ text: "Kecamatan", fontSize: 10 },
								{ text: `: ${surat?.kecamatan || ""}`, fontSize: 10 },
							],
							[
								{ text: "Kabupaten", fontSize: 10 },
								{ text: `: ${surat?.kabupaten || ""}`, fontSize: 10 },
							],
							[
								{ text: "NIB", fontSize: 10 },
								{ text: `: ${surat?.nib || ""}`, fontSize: 10 },
							],
							[
								{ text: "Status Tanah", fontSize: 10 },
								{ text: `: ${surat?.status_tanah || ""}`, fontSize: 10 },
							],
							[
								{ text: "Dipergunakan Untuk", fontSize: 10 },
								{ text: `: ${surat?.dipergunakan || ""}`, fontSize: 10 },
							],
							[
								{ text: "Luas", fontSize: 10 },
								{
									text: [
										": ",
										surat?.luas_tanah?.toString() || "",
										" m",
										{ text: "2", fontSize: 7, baseline: -2 },
									],
									fontSize: 10,
								},
							],
						],
					},
					layout: "noBorders",
					margin: [20, 0, 0, 10],
				},
			],
			{
				text: `Batas-Batas Tanah`,
				fontSize: 10,
				margin: [0, 0, 0, 5],
			},
			[
				{
					table: {
						widths: ["25%", "75%"],
						body: [
							[
								{ text: "Sebelah Utara", fontSize: 10 },
								{ text: `: ${surat?.batas_utara || ""}`, fontSize: 10 },
							],
							[
								{ text: "Sebelah Timur", fontSize: 10 },
								{ text: `: ${surat?.batas_timur || ""}`, fontSize: 10 },
							],
							[
								{ text: "Sebelah Selatan", fontSize: 10 },
								{ text: `: ${surat?.batas_selatan || ""}`, fontSize: 10 },
							],
							[
								{ text: "Sebelah Barat", fontSize: 10 },
								{ text: `: ${surat?.batas_barat || ""}`, fontSize: 10 },
							],
						],
					},
					layout: "noBorders",
					margin: [20, 0, 0, 10],
				},
			],
			{
				text: [
					"Bidang Tanah tersebut saya peroleh dari ",
					{ text: surat?.diperoleh_dari || "", bold: true },
					"tahun ",
					{ text: surat?.diperoleh_sejak || "", bold: true },
					" dengan jalan ",
					{ text: surat?.diperoleh_dengan || "", bold: true },
					"/ terlampir yang sampai saat ini saya kuasai secara terus menerus dan",
				],
				fontSize: 10,
				margin: [0, 0, 0, 5],
			},
			{
				ol: [
					"Tidak diajukan/ menjadi jaminan hutang",
					"Tidak dalam keadaan sengketa",
					"Tidak merupakan tanah warisan yang belum di bagi",
					"Belum bersertifikat",
					"Penggunaannya tidak pernah di ganggu gugat",
				],
				fontSize: 10,
				margin: [10, 0, 0, 5],
			},
			{
				text: `Surat pernyataan ini saya bubuhkan cap jempol setelah saya dibacakan dan mengerti isi/ maksud, dibuat dengan sebenarnya dengan penuh tanggung jawab dan saya bersedia untuk mengangkat sumpah bila diperlukan.`,
				fontSize: 10,
				margin: [0, 0, 0, 5],
			},
			{
				text: `Demikian dan apabila ini tidak benar, saya bersedia dituntut di hadapan pihak berwenang.`,
				fontSize: 10,
				margin: [0, 0, 0, 5],
			},
			{
				text: `SAKSI-SAKSI`,
				fontSize: 10,
				margin: [0, 0, 0, 5],
			},
			{
				columns: [
					{ width: "3%", text: "1.  ", fontSize: 10 }, // tambahkan fontSize agar seragam
					{
						width: "*",
						stack: [
							{
								table: {
									widths: ["15%", "*"],
									body: [
										["Nama", `: ${surat?.nama_1}`],
										["Pekerjaan", `: ${surat?.pekerjaan_1}`],
										["Alamat", `: ${surat?.alamat_1}`],
										["Tanda Tangan", `:`],
									],
								},
								layout: "noBorders",
								fontSize: 10,
							},
						],
					},
				],
				margin: [20, 0, 0, 10],
			},
			{
				columns: [
					{ width: "3%", text: "2.  ", fontSize: 10 }, // tambahkan fontSize agar seragam
					{
						width: "*",
						stack: [
							{
								table: {
									widths: ["15%", "*"],
									body: [
										["Nama", `: ${surat?.nama_2}`],
										["Pekerjaan", `: ${surat?.pekerjaan_2}`],
										["Alamat", `: ${surat?.alamat_2}`],
										["Tanda Tangan", `:`],
									],
								},
								layout: "noBorders",
								fontSize: 10,
							},
						],
					},
				],
				margin: [20, 0, 0, 10],
			},

			// 6️⃣ Tanda tangan + QR Code
			{
				columns: [
					{
						width: "30%",
						text: "",
					},
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
				columnGap: 0,
			},
			{
				columns: [
					{
						width: "30%",
						stack: [
							{
								text: `Hormat Kami`,
								fontSize: 10,
								margin: [0, 0, 0, 50], // spasi tanda tangan
							},
							{
								text: `${surat?.nama_pemohon}`,
								bold: true,
								fontSize: 10,
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
