import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { SignUpForm } from "./components";
import { usePostSignUp } from "../controller/usePostSignUp";
import { DialogCustom } from "@/components/common/dialog";
import { useNavigate } from "react-router-dom";

export function DaftarAkunPage() {
	const navigate = useNavigate();

	const {
		form,
		handleSave,
		loading: loadingSignUp,
		isShow,
		setIsShow,
	} = usePostSignUp();

	const onSubmit = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	const disabled = loadingSignUp;

	return (
		<>
			<div className="flex flex-col w-full h-full gap-4">
				<div className="flex">
					<Button
						type="button"
						disabled={disabled}
						onClick={() => {
							navigate("/login");
						}}
						className="bg-white hover:bg-primary/80 hover:text-white border border-primary text-primary"
					>
						<FaArrowLeft />
						<p>Kembali</p>
					</Button>
				</div>
				<p className="font-bold text-2xl">Daftar Akun</p>

				<SignUpForm form={form} onSubmit={onSubmit} loading={disabled} />
			</div>

			<DialogCustom
				open={isShow}
				setOpen={setIsShow}
				title={
					<p className="text-xl font-semibold text-primary">
						Konfirmasi Daftar Akun
					</p>
				}
				description={
					<p className="text-gray-600 text-sm">
						Apakah Anda yakin ingin menyimpan perubahan pada data profile ini?
						Data lama akan diperbarui dan tidak dapat dikembalikan.
					</p>
				}
				children={
					<div className="flex flex-col gap-4 w-full mt-2">
						<div className="flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => setIsShow(false)}
								disabled={disabled}
								className="py-1.5 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
							>
								Batal
							</button>
							<button
								type="button"
								onClick={() => handleSave()}
								disabled={disabled}
								className="py-1.5 px-4 rounded-md bg-primary hover:bg-primary/90 text-white text-sm font-medium transition disabled:opacity-50"
							>
								Simpan Perubahan
							</button>
						</div>
					</div>
				}
			/>
		</>
	);
}
