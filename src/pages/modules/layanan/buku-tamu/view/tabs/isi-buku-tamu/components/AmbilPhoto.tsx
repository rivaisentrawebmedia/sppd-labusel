import type { UseFormReturn } from "react-hook-form";
import type { BukuTamuPayload } from "../../../../model";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { usePostUploadFile } from "@/layouts/constroller";
import { toast } from "react-toastify";
import { Image } from "@/components/common/image/getImage";
import {
	Camera,
	Check,
	FolderSync,
	ImagePlus,
	Loader2,
	Upload,
} from "lucide-react";
import { DialogCustom } from "@/components/common/dialog";

export function AmbilPhoto({
	form,
	disabled,
}: {
	form: UseFormReturn<BukuTamuPayload>;
	disabled: boolean;
}) {
	const photo = form.watch("photo");
	const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
	const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
	const [isShow, setIsShow] = useState(false);
	const [url, setUrl] = useState<string | null>(null);

	const webcamRef = useRef<Webcam>(null);

	const { loading, onSubmitUploadFile } = usePostUploadFile();

	// --- Ambil daftar device kamera ---
	useEffect(() => {
		async function initDevices() {
			try {
				await navigator.mediaDevices.getUserMedia({ video: true });
				const mediaDevices = await navigator.mediaDevices.enumerateDevices();
				const videoDevices = mediaDevices.filter(
					(d) => d.kind === "videoinput"
				);
				setDevices(videoDevices);
				if (videoDevices.length > 0)
					setSelectedDeviceId(videoDevices[0].deviceId);
			} catch (err) {
				console.error("Tidak bisa akses kamera:", err);
				toast.error("Kamera tidak dapat diakses, periksa izin browser Anda.");
			}
		}
		initDevices();
	}, []);

	// --- Ambil foto dari webcam ---
	const capturePhoto = useCallback(() => {
		if (webcamRef.current) {
			const imageSrc = webcamRef.current.getScreenshot();
			if (imageSrc) setUrl(imageSrc);
		}
	}, []);

	// --- Upload foto dari input file ---
	const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		await onSubmitUploadFile({ form, fields: "photo", file });
		setIsShow(false);
	};

	// --- Upload foto dari webcam ---
	const handleUploadWebcam = async () => {
		if (!url) return;
		try {
			const blob = await (await fetch(url)).blob();
			const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
			await onSubmitUploadFile({ form, fields: "photo", file });
			setIsShow(false);
			setUrl(null);
		} catch (error) {
			toast.error("Gagal mengunggah foto webcam");
		}
	};

	return (
		<>
			<div className="flex flex-col gap-2">
				<p className="font-medium text-lg">Ambil Foto Kunjungan</p>

				<div className="flex w-full md:w-1/2 flex-col md:flex-row md:items-center gap-4 ">
					{photo ? (
						<Image
							alt="Foto Tamu"
							src={photo}
							classNameImage="h-[200px] w-[300px] rounded-md border border-slate-200 object-cover shadow"
							classNamePlaceHolder="h-[200px] w-[300px] rounded-md border border-slate-200 object-cover shadow"
						/>
					) : (
						<div className="flex h-[200px] w-[300px] flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-500 shadow-inner transition-all hover:border-slate-400 hover:bg-slate-50">
							<ImagePlus size={48} className="mb-4 text-slate-400" />
							<p className="font-medium">Belum ada foto tamu</p>
							<p className="text-sm mt-1 text-slate-400">
								Klik tombol ambil foto atau unggah manual
							</p>
							<p className="text-xs mt-2 text-slate-400">
								Format yang didukung: JPG, PNG
							</p>
						</div>
					)}

					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => setIsShow(true)}
							className="flex items-center gap-2 rounded-2xl bg-[#2395f3] px-4 py-1.5 text-white"
						>
							<Camera size={16} />
							Ambil / Ganti Foto
						</button>

						<label className="flex items-center gap-2 cursor-pointer rounded-2xl bg-slate-500 px-4 py-1.5 text-white">
							<Upload size={16} />
							Pilih File
							<input
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleUploadFile}
								disabled={disabled || loading}
							/>
						</label>
					</div>
				</div>
			</div>

			{/* Modal Kamera */}
			<DialogCustom
				open={isShow}
				setOpen={setIsShow}
				title={<p className="text-xl font-semibold text-primary">Ambil Foto</p>}
				description={
					<p className="text-gray-600 text-sm">
						Gunakan kamera untuk mengambil foto pengunjung.
					</p>
				}
				children={
					<div className="flex flex-col gap-4 w-full mt-2">
						{/* Pilihan kamera */}
						{devices.length > 1 && (
							<select
								value={selectedDeviceId || ""}
								onChange={(e) => setSelectedDeviceId(e.target.value)}
								className="rounded w-full border p-2"
							>
								{devices.map((device, index) => (
									<option key={device.deviceId} value={device.deviceId}>
										{device.label || `Kamera ${index + 1}`}
									</option>
								))}
							</select>
						)}

						{/* Preview webcam atau hasil foto */}
						{!url ? (
							<Webcam
								ref={webcamRef}
								audio={false}
								screenshotFormat="image/jpeg"
								videoConstraints={{ deviceId: selectedDeviceId || undefined }}
								className="w-full rounded-md shadow-md"
							/>
						) : (
							<img
								src={url}
								alt="Preview"
								className="w-full rounded-md shadow-md"
							/>
						)}

						{/* Tombol aksi */}
						<div className="flex items-center justify-center gap-4">
							{!url ? (
								<button
									type="button"
									onClick={capturePhoto}
									className="flex items-center gap-2 rounded-md bg-green-500 px-4 py-1.5 text-white"
								>
									<Camera size={16} /> Ambil Foto
								</button>
							) : (
								<>
									<button
										type="button"
										onClick={() => setUrl(null)}
										className="flex items-center gap-2 rounded-md bg-slate-500 px-4 py-1.5 text-white"
									>
										<FolderSync size={16} /> Foto Ulang
									</button>
									<button
										type="button"
										disabled={loading || disabled}
										onClick={handleUploadWebcam}
										className="flex items-center gap-2 rounded-2xl bg-green-500 px-4 py-1.5 text-white"
									>
										{loading ? (
											<Loader2 size={16} className="animate-spin" />
										) : (
											<Check size={16} />
										)}
										{loading ? "Menyimpan..." : "Selesai"}
									</button>
								</>
							)}
						</div>
					</div>
				}
			/>
		</>
	);
}
