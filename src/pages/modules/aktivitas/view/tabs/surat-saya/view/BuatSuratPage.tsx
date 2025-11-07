import BackLabel from "@/components/common/label/BackLabel";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { useGetProfil } from "@/pages/modules/profil/controller";
import { LoadingMona } from "@/components/ui/loading";
import { DetailPelapor } from "../../laporan/view/components";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { DialogCustom } from "@/components/common/dialog";
import { ListSurat, type ListSuratType } from "./components/ListSurat";
import clsx from "clsx";
import { X } from "lucide-react";
import Search from "@/components/common/table/Search";
import { buatSurat } from "./buat-surat";
import { usePathname } from "@/utils/usePathname";

export function BuatSuratPage() {
	const { thirdPathname } = usePathname();
	const isLayananPersuratan = thirdPathname === "layanan-persuratan";

	const { data, loading } = useGetProfil();

	const [isShow, setIsShow] = useState<boolean>(false);
	const [_search, setSearch] = useState<string>("");
	const [isSearching, setIsSearching] = useState(false);
	const [groupedList, setGroupedList] = useState<
		{ type: string; data: ListSuratType[] }[]
	>([]);
	// const [choice, setChoice] = useState<string | null>(null);
	const [choice, setChoice] = useState<string | null>(null);

	// 🔍 Fungsi pencarian utama (dipanggil di onSearch)
	const onSearch = (value: string) => {
		setSearch(value);
		setIsSearching(true);

		const delay = setTimeout(() => {
			const keywords = value.toLowerCase().split(" ").filter(Boolean);

			const filtered = ListSurat.filter((item) =>
				keywords.every((keyword) =>
					(
						item.nama.toLowerCase() +
						" " +
						item.deskripsi.toLowerCase() +
						" " +
						item.tipe.toLowerCase()
					).includes(keyword)
				)
			);

			// Group hasil berdasarkan tipe
			const grouped: { [key: string]: ListSuratType[] } = {};
			filtered.forEach((item) => {
				if (!grouped[item.tipe]) grouped[item.tipe] = [];
				grouped[item.tipe].push(item);
			});

			const result = Object.entries(grouped).map(([type, data]) => ({
				type,
				data,
			}));

			setGroupedList(result);
			setIsSearching(false);
		}, 500); // debounce ringan

		return () => clearTimeout(delay);
	};

	// Jalankan pencarian pertama kali (menampilkan semua)
	useEffect(() => {
		onSearch("");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="flex flex-col gap-4">
				<Breadcrumbs
					items={[
						{ label: "Beranda", to: "/modules/dashboard" },
						{
							label: isLayananPersuratan ? "Layanan Persuratan" : "Aktivitas",
							to: isLayananPersuratan
								? "/modules/layanan/layanan-persuratan"
								: "/modules/aktivitas",
						},
						{ label: `Buat ${choice ? choice : "Surat"}`, to: "" },
					]}
				/>

				<div className="flex flex-col gap-4">
					<BackLabel label={`Buat ${choice ? choice : "Surat"}`} />

					{loading ? (
						<LoadingMona />
					) : (
						<>
							<DetailPelapor
								alamat={data?.alamat || "-"}
								nama={data?.nama_warga || "-"}
								no_telp={data?.no_telp || "-"}
								photo={data?.photo || "-"}
								isBuat
							/>

							<button
								type="button"
								onClick={() => setIsShow(true)}
								className="flex w-full rounded-md border shadow items-center bg-white p-4 gap-4 justify-between"
							>
								<p className="text-[#888]">
									{choice ? (
										<>
											Jenis Surat:
											<span className="font-bold pl-2">{choice}</span>
										</>
									) : (
										<>Pilih Jenis Surat</>
									)}
								</p>
								<div className="flex items-center gap-3">
									{choice && (
										<span
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												setChoice(null);
											}}
										>
											<X size={14} color="red" />
										</span>
									)}
									<FaCaretDown />
								</div>
							</button>

							{choice && buatSurat(choice)}
						</>
					)}
				</div>
			</div>

			<DialogCustom
				open={isShow}
				setOpen={setIsShow}
				isNotFleksibel={false}
				title={
					<p className="text-xl font-semibold text-primary">
						Pilih Jenis Surat
					</p>
				}
				description={
					<p className="text-gray-600 text-sm">
						Pilih jenis surat yang sesuai dengan kebutuhan Anda. Pastikan
						informasi yang Anda pilih sudah benar sebelum melanjutkan.
					</p>
				}
				children={
					<div className="flex relative w-full flex-col gap-4">
						<Search
							placeholder="Masukkan nama atau deskripsi surat"
							className="w-full"
							onSearch={onSearch}
						/>

						<div className="flex flex-col gap-4 overflow-auto">
							{isSearching ? (
								<LoadingMona width="w-[6rem] py-6" />
							) : groupedList.length > 0 ? (
								groupedList.map((group) => (
									<div key={group.type} className="flex flex-col gap-3">
										<h2 className="pb-2 font-semibold text-neutral-800">
											{group.type}
										</h2>

										<div className="grid grid-cols-3 gap-4 phones:grid-cols-1">
											{group.data.map((item, idx) => (
												<div
													key={idx}
													onClick={() => setChoice(item.nama)}
													className={clsx(
														"flex cursor-pointer flex-col items-center gap-3 rounded-md border border-neutral-200 p-4 text-center transition-all duration-300 hover:shadow-md",
														{
															"bg-gradient-to-r from-indigo-50 via-violet-50 to-purple-50":
																choice === item.nama,
															"hover:bg-neutral-50": choice !== item.nama,
														}
													)}
												>
													<p className="text-3xl">{item.icon}</p>
													<p>{item.nama}</p>
													<p className="text-xs font-light leading-[1.3] text-[#888]">
														{item.deskripsi}
													</p>
												</div>
											))}
										</div>
									</div>
								))
							) : (
								<p className="text-center text-gray-500 py-6">
									Tidak ada surat yang cocok dengan pencarian.
								</p>
							)}
						</div>

						{/* Tombol bawah sticky */}
						<div className="flex sticky py-2 bg-white justify-end bottom-0 right-0 items-center gap-3 border-t border-gray-100">
							<button
								type="button"
								onClick={() => {
									setChoice(null);
									setIsShow(false);
								}}
								className="border-primary border py-1.5 px-4 rounded-md text-primary"
							>
								<p>Batal</p>
							</button>
							<button
								className="bg-primary disabled:bg-primary/50 text-white py-1.5 px-4 rounded-md"
								type="button"
								disabled={!choice}
								onClick={() => setIsShow(false)}
							>
								<p>Buat Surat {choice}</p>
							</button>
						</div>
					</div>
				}
			/>
		</>
	);
}
