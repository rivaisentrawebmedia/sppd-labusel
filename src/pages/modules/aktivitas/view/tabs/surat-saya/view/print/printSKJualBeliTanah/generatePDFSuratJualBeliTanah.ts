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
	sketch: string;
};

export function generatePdfSurat(data: Surat) {
	const { kop_surat, jenis_surat, surat, website, profil_desa, sketch } = data;
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

	// === Susunan teks isi kop surat ===
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

	// === Template kop surat agar tidak duplikasi ===
	const header = () => ({
		stack: [
			{
				columns: logo_base64
					? [
							{
								image: `data:image/png;base64,${logo_base64}`,
								width: 80,
								height: 80,
							},
							{
								stack: contentTexts.map((ct) => ({
									...ct,
									alignment: "center",
									margin: [0, 2, 0, 2],
								})),
							},
					  ]
					: [
							{
								stack: contentTexts.map((ct) => ({
									...ct,
									alignment: "center",
									margin: [0, 2, 0, 2],
								})),
							},
					  ],
				columnGap: 10,
				margin: [40, 20, 40, 0],
			},
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
		],
	});
	const pad = "\u00A0".repeat(5);

	return {
		content: [
			{
				stack: [
					{
						canvas: [
							{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5 },
						],
						margin: [0, 5, 0, 20],
					},
					// Judul
					{
						text: jenis_surat?.toUpperCase(),
						alignment: "center",
						bold: true,
						fontSize: 15,
						decoration: "underline",
						margin: [0, 0, 0, 0],
					},
					{
						text: `Nomor: ${surat?.kode_depan ? `${surat.kode_depan}/` : ""}${
							surat?.nomor_surat ? `${surat.nomor_surat}/` : `${pad}/`
						}${surat?.kode_belakang ? `${surat.kode_belakang}/` : ""}${toRoman(
							Number(dayjs(surat?.tanggal_surat).locale("id").format("MM"))
						)}/${dayjs(surat?.tanggal_surat).locale("id").format("YYYY")}`,
						alignment: "center",
						fontSize: 10,
						margin: [0, 0, 0, 20],
					},
					// Isi
					{
						text: `Saya yang bertandatangan dibawah ini:`,
						fontSize: 10,
						margin: [0, 0, 0, 10],
					},
					// Data pihak pertama
					{
						table: {
							widths: ["25%", "75%"],
							body: [
								["Nama", surat?.nama_1],
								["NIK", surat?.nik_1],
								[
									"Tempat, Tanggal Lahir",
									`${surat?.tempat_lahir_1}, ${dayjs(surat?.tanggal_lahir_1)
										.locale("id")
										.format("DD MMMM YYYY")}`,
								],
								["Pekerjaan", surat?.pekerjaan_1],
								["Alamat Lengkap", surat?.alamat_1],
							].map(([k, v]) => [
								{ text: k, fontSize: 10 },
								{ text: `: ${v || ""}`, fontSize: 10 },
							]),
						},
						layout: "noBorders",
						margin: [20, 0, 0, 10],
					},
					{
						text: `Benar telah ${surat?.informasi_tanah} kepada:`,
						margin: [0, 0, 0, 5],
						fontSize: 10,
					},
					{
						table: {
							widths: ["25%", "75%"],
							body: [
								["Nama", surat?.nama_2],
								["NIK", surat?.nik_2],
								[
									"Tempat, Tanggal Lahir",
									`${surat?.tempat_lahir_2}, ${dayjs(surat?.tanggal_lahir_2)
										.locale("id")
										.format("DD MMMM YYYY")}`,
								],
								["Pekerjaan", surat?.pekerjaan_2],
								["Alamat Lengkap", surat?.alamat_2],
							].map(([k, v]) => [
								{ text: k, fontSize: 10 },
								{ text: `: ${v || ""}`, fontSize: 10 },
							]),
						},
						layout: "noBorders",
						margin: [20, 0, 0, 20],
					},
					{
						text: `Adapun batas-batas tanah tersebut adalah:`,
						fontSize: 10,
						margin: [0, 0, 0, 5],
					},
					{
						table: {
							widths: ["25%", "75%"],
							body: [
								["Batas Utara", surat?.batas_utara],
								["Batas Timur", surat?.batas_timur],

								["Batas Selatan", surat?.batas_selatan],
								["Batas Barat", surat?.batas_barat],
							].map(([k, v]) => [
								{ text: k, fontSize: 10 },
								{ text: `: ${v || ""}`, fontSize: 10 },
							]),
						},
						layout: "noBorders",
						margin: [20, 0, 0, 20],
					},
					{
						text: `Demikian Surat jual beli tanah ini dengan dialami keadaan sadar, tanpa ada unsur  paksaan dari pihak manapun dan apabila dikemudian hari ada gugatan dari pihak lain, maka  saya sebagai pihak pertama (I) yang akan bertanggung jawab.`,
						fontSize: 10,
						margin: [0, 0, 0, 20],
					},
					{
						columns: [
							{
								width: "50%",
								stack: [
									{
										text: "\nPihak Pertama",
										alignment: "center",
										fontSize: 10,
										margin: [0, 0, 0, 60],
									},
									{
										text: `${surat?.nama_1}`,
										alignment: "center",
										fontSize: 10,
										bold: true,
									},
								],
							},
							{
								width: "50%",
								stack: [
									{
										text: `${profil_desa?.nama_organisasi}, ${dayjs()
											.locale("id")
											.format("DD MMMM YYYY")}\nPihak Kedua`,
										alignment: "center",
										fontSize: 10,
										margin: [0, 0, 0, 60],
									},
									{
										text: `${surat?.nama_2}`,
										alignment: "center",
										fontSize: 10,
										bold: true,
									},
								],
							},
						],
						columnGap: 0,
					},
				],
				pageBreak: "after",
			},
			{
				stack: [
					{
						canvas: [
							{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5 },
						],
						margin: [0, 5, 0, 20],
					},

					// === FUNCTION PEMBUAT TABEL ===
					...(function generateTabelSection(title, dataArray) {
						if (!Array.isArray(dataArray) || dataArray.length === 0) return [];
						return [
							{ text: title, margin: [0, 0, 0, 8], bold: true },
							{
								table: {
									widths: [20, "*", "*", 150],
									body: [
										[
											{
												text: "No",
												fillColor: "#E4E0F5",
												alignment: "center",
												bold: true,
											},
											{ text: "Nama", fillColor: "#E4E0F5", bold: true },
											{ text: "NIK", fillColor: "#E4E0F5", bold: true },
											{
												text: "Tanda Tangan",
												fillColor: "#E4E0F5",
												bold: true,
												alignment: "center",
											},
										],
										...dataArray.map((item, i) => {
											const isEven = i % 2 === 1; // genap
											return [
												{ text: `${i + 1}`, alignment: "center" },
												{ text: item?.nama || "-" },
												{ text: item?.nik || "-" },
												{
													stack: [
														{
															text: `${i + 1}.`,
															alignment: isEven ? "center" : "left", // ✅ ganjil kiri, genap tengah
															margin: [0, 0, 0, 0],
														},
													],
												},
											];
										}),
									],
								},
								layout: {
									hLineWidth: () => 0.5,
									vLineWidth: () => 0.5,
									hLineColor: () => "#E2E2E3",
									vLineColor: () => "#E2E2E3",
									paddingLeft: () => 5,
									paddingRight: () => 5,
									paddingTop: () => 4,
									paddingBottom: () => 4,
								},
								width: "100%",
								margin: [0, 0, 0, 20],
							},
						];
					})("SAKSI PIHAK PERTAMA", surat?.daftar_saksi_1),

					...(function generateTabelSection(title, dataArray) {
						if (!Array.isArray(dataArray) || dataArray.length === 0) return [];
						return [
							{ text: title, margin: [0, 0, 0, 8], bold: true },
							{
								table: {
									widths: [20, "*", "*", 150],
									body: [
										[
											{
												text: "No",
												fillColor: "#E4E0F5",
												alignment: "center",
												bold: true,
											},
											{ text: "Nama", fillColor: "#E4E0F5", bold: true },
											{ text: "NIK", fillColor: "#E4E0F5", bold: true },
											{
												text: "Tanda Tangan",
												fillColor: "#E4E0F5",
												bold: true,
												alignment: "center",
											},
										],
										...dataArray.map((item, i) => {
											const isEven = i % 2 === 1;
											return [
												{ text: `${i + 1}`, alignment: "center" },
												{ text: item?.nama || "-" },
												{ text: item?.nik || "-" },
												{
													stack: [
														{
															text: `${i + 1}.`,
															alignment: isEven ? "center" : "left",
															margin: [0, 0, 0, 0],
														},
													],
												},
											];
										}),
									],
								},
								layout: {
									hLineWidth: () => 0.5,
									vLineWidth: () => 0.5,
									hLineColor: () => "#E2E2E3",
									vLineColor: () => "#E2E2E3",
									paddingLeft: () => 5,
									paddingRight: () => 5,
									paddingTop: () => 4,
									paddingBottom: () => 4,
								},
								width: "100%",
								margin: [0, 0, 0, 20],
							},
						];
					})("SAKSI PIHAK KEDUA", surat?.daftar_saksi_2),

					...(function generateTabelSection(title, dataArray) {
						if (!Array.isArray(dataArray) || dataArray.length === 0) return [];
						return [
							{ text: title, margin: [0, 0, 0, 8], bold: true },
							{
								table: {
									widths: [20, "*", "*", 150],
									body: [
										[
											{
												text: "No",
												fillColor: "#E4E0F5",
												alignment: "center",
												bold: true,
											},
											{ text: "Nama", fillColor: "#E4E0F5", bold: true },
											{ text: "NIK", fillColor: "#E4E0F5", bold: true },
											{
												text: "Tanda Tangan",
												fillColor: "#E4E0F5",
												bold: true,
												alignment: "center",
											},
										],
										...dataArray.map((item, i) => {
											const isEven = i % 2 === 1;
											return [
												{ text: `${i + 1}`, alignment: "center" },
												{ text: item?.nama || "-" },
												{ text: item?.nik || "-" },
												{
													stack: [
														{
															text: `${i + 1}.`,
															alignment: isEven ? "center" : "left",
															margin: [0, 0, 0, 0],
														},
													],
												},
											];
										}),
									],
								},
								layout: {
									hLineWidth: () => 0.5,
									vLineWidth: () => 0.5,
									hLineColor: () => "#E2E2E3",
									vLineColor: () => "#E2E2E3",
									paddingLeft: () => 5,
									paddingRight: () => 5,
									paddingTop: () => 4,
									paddingBottom: () => 4,
								},
								width: "100%",
								margin: [0, 0, 0, 30],
							},
						];
					})("TURUT MENYAKSIKAN PEMERINTAH DESA", surat?.saksi_pemda),

					// === FOOTER ===
					{
						columns: [
							{ width: "30%", text: "" },
							{
								width: "40%",
								stack: [
									{
										text: `Mengetahui\nKepala Desa`,
										alignment: "center",
										fontSize: 10,
										margin: [0, 0, 0, 60],
									},
									{
										text: surat?.nama_pejabat || "",
										alignment: "center",
										fontSize: 10,
										bold: true,
										decoration: "underline",
									},
								],
							},
							{ width: "30%", text: "" },
						],
						columnGap: 0,
					},
				],
				pageBreak: "after",
			},
			{
				stack: [
					{
						canvas: [
							{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5 },
						],
						margin: [0, 5, 0, 20],
					},
					{
						text: "LAMPIRAN SURAT KETERANGAN",
						bold: true,
						fontSize: 10,
						decoration: "underline",
						margin: [0, 0, 0, 0],
					},
					{
						text: `Nomor: ${surat?.kode_depan ? `${surat.kode_depan}/` : ""}${
							surat?.nomor_surat ? `${surat.nomor_surat}/` : `${pad}/`
						}${surat?.kode_belakang ? `${surat.kode_belakang}/` : ""}${toRoman(
							Number(dayjs(surat?.tanggal_surat).locale("id").format("MM"))
						)}/${dayjs(surat?.tanggal_surat).locale("id").format("YYYY")}`,
						fontSize: 10,
						margin: [0, 0, 0, 20],
					},
					{
						text: "SKETSA LOKASI TANAH",
						bold: true,
						fontSize: 10,
						decoration: "underline",
						aligment: "center",
						margin: [0, 0, 0, 10],
					},
					{
						table: {
							widths: ["30%", "40%", "30%"],
							body: [
								[
									{ text: "", fillColor: "#F1F5F9" }, // slate-100 kiri
									{
										fillColor: "#F1F5F9",
										stack: [
											sketch &&
											typeof sketch === "string" &&
											sketch.startsWith("data:image")
												? {
														image: sketch,
														width: 300,
														height: 150,
														alignment: "center",
														margin: [0, 10, 0, 10],
												  }
												: {
														text: "",
														alignment: "center",
														margin: [0, 50, 0, 50],
												  }, // fallback kosong
										],
										alignment: "center",
									},
									{ text: "", fillColor: "#F1F5F9" }, // slate-100 kanan
								],
							],
						},
						layout: "noBorders", // hilangkan garis tabel
						margin: [0, 0, 0, 20],
					},
					{
						columns: [
							{
								width: "50%",
								stack: [
									{
										text: "\nPihak Pertama",
										alignment: "center",
										fontSize: 10,
										margin: [0, 0, 0, 60],
									},
									{
										text: `${surat?.nama_1}`,
										alignment: "center",
										fontSize: 10,
										bold: true,
									},
								],
							},
							{
								width: "50%",
								stack: [
									{
										text: `${profil_desa?.nama_organisasi}, ${dayjs()
											.locale("id")
											.format("DD MMMM YYYY")}\nPihak Kedua`,
										alignment: "center",
										fontSize: 10,
										margin: [0, 0, 0, 60],
									},
									{
										text: `${surat?.nama_2}`,
										alignment: "center",
										fontSize: 10,
										bold: true,
									},
								],
							},
						],
						columnGap: 0,
						margin: [0, 0, 0, 30],
					},
					// === FUNCTION PEMBUAT TABEL ===
					...(function generateTabelSection(title, dataArray) {
						if (!Array.isArray(dataArray) || dataArray.length === 0) return [];
						return [
							{ text: title, margin: [0, 0, 0, 8], bold: true },
							{
								table: {
									widths: [20, "*", "*", 150],
									body: [
										[
											{
												text: "No",
												fillColor: "#E4E0F5",
												alignment: "center",
												bold: true,
											},
											{ text: "Nama", fillColor: "#E4E0F5", bold: true },
											{ text: "NIK", fillColor: "#E4E0F5", bold: true },
											{
												text: "Tanda Tangan",
												fillColor: "#E4E0F5",
												bold: true,
												alignment: "center",
											},
										],
										...dataArray.map((item, i) => {
											const isEven = i % 2 === 1; // genap
											return [
												{ text: `${i + 1}`, alignment: "center" },
												{ text: item?.nama || "-" },
												{ text: item?.nik || "-" },
												{
													stack: [
														{
															text: `${i + 1}.`,
															alignment: isEven ? "center" : "left", // ✅ ganjil kiri, genap tengah
															margin: [0, 0, 0, 0],
														},
													],
												},
											];
										}),
									],
								},
								layout: {
									hLineWidth: () => 0.5,
									vLineWidth: () => 0.5,
									hLineColor: () => "#E2E2E3",
									vLineColor: () => "#E2E2E3",
									paddingLeft: () => 5,
									paddingRight: () => 5,
									paddingTop: () => 4,
									paddingBottom: () => 4,
								},
								width: "100%",
								margin: [0, 0, 0, 20],
							},
						];
					})("SAKSI PIHAK PERTAMA", surat?.daftar_saksi_1),

					...(function generateTabelSection(title, dataArray) {
						if (!Array.isArray(dataArray) || dataArray.length === 0) return [];
						return [
							{ text: title, margin: [0, 0, 0, 8], bold: true },
							{
								table: {
									widths: [20, "*", "*", 150],
									body: [
										[
											{
												text: "No",
												fillColor: "#E4E0F5",
												alignment: "center",
												bold: true,
											},
											{ text: "Nama", fillColor: "#E4E0F5", bold: true },
											{ text: "NIK", fillColor: "#E4E0F5", bold: true },
											{
												text: "Tanda Tangan",
												fillColor: "#E4E0F5",
												bold: true,
												alignment: "center",
											},
										],
										...dataArray.map((item, i) => {
											const isEven = i % 2 === 1;
											return [
												{ text: `${i + 1}`, alignment: "center" },
												{ text: item?.nama || "-" },
												{ text: item?.nik || "-" },
												{
													stack: [
														{
															text: `${i + 1}.`,
															alignment: isEven ? "center" : "left",
															margin: [0, 0, 0, 0],
														},
													],
												},
											];
										}),
									],
								},
								layout: {
									hLineWidth: () => 0.5,
									vLineWidth: () => 0.5,
									hLineColor: () => "#E2E2E3",
									vLineColor: () => "#E2E2E3",
									paddingLeft: () => 5,
									paddingRight: () => 5,
									paddingTop: () => 4,
									paddingBottom: () => 4,
								},
								width: "100%",
								margin: [0, 0, 0, 20],
							},
						];
					})("SAKSI PIHAK KEDUA", surat?.daftar_saksi_2),

					...(function generateTabelSection(title, dataArray) {
						if (!Array.isArray(dataArray) || dataArray.length === 0) return [];
						return [
							{ text: title, margin: [0, 0, 0, 8], bold: true },
							{
								table: {
									unbreakable: true,
									widths: [20, "*", "*", 150],
									body: [
										[
											{
												text: "No",
												fillColor: "#E4E0F5",
												alignment: "center",
												bold: true,
											},
											{ text: "Nama", fillColor: "#E4E0F5", bold: true },
											{ text: "NIK", fillColor: "#E4E0F5", bold: true },
											{
												text: "Tanda Tangan",
												fillColor: "#E4E0F5",
												bold: true,
												alignment: "center",
											},
										],
										...dataArray.map((item, i) => {
											const isEven = i % 2 === 1;
											return [
												{ text: `${i + 1}`, alignment: "center" },
												{ text: item?.nama || "-" },
												{ text: item?.nik || "-" },
												{
													stack: [
														{
															text: `${i + 1}.`,
															alignment: isEven ? "center" : "left",
															margin: [0, 0, 0, 0],
														},
													],
												},
											];
										}),
									],
								},
								layout: {
									hLineWidth: () => 0.5,
									vLineWidth: () => 0.5,
									hLineColor: () => "#E2E2E3",
									vLineColor: () => "#E2E2E3",
									paddingLeft: () => 5,
									paddingRight: () => 5,
									paddingTop: () => 4,
									paddingBottom: () => 4,
								},
								width: "100%",
								margin: [0, 0, 0, 30],
							},
						];
					})("TURUT MENYAKSIKAN PEMERINTAH DESA", surat?.saksi_pemda),

					// === FOOTER ===
					{
						columns: [
							{ width: "30%", text: "" },
							{
								width: "40%",
								stack: [
									{
										text: `Mengetahui\nKepala Desa`,
										alignment: "center",
										fontSize: 10,
										margin: [0, 0, 0, 60],
									},
									{
										text: surat?.nama_pejabat || "",
										alignment: "center",
										fontSize: 10,
										bold: true,
										decoration: "underline",
									},
								],
							},
							{ width: "30%", text: "" },
						],
						columnGap: 0,
					},
				],
			},
		],
		header,
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
		pageMargins: [40, 120, 40, 60],
		defaultStyle: {
			fontSize: 10, // 👈 default font size seluruh dokumen
		},
	} as unknown as TDocumentDefinitions;
}
