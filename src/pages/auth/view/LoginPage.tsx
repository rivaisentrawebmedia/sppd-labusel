import { LoginActions, LoginForm, LoginHeader } from "./components";
import { usePostLogin } from "../controller";
import { useGetPublikInfo } from "@/layouts/constroller";

export function LoginPage() {
	const { loading: loadingInfo, publikInfo } = useGetPublikInfo();

	const {
		form,
		handleCheckedIsRemember,
		handleSave,
		isRemember,
		loading: loadingPost,
		num1,
		num2,
	} = usePostLogin();

	const disabled = loadingInfo || loadingPost;

	return (
		<div className="flex flex-col items-center w-full gap-4">
			<LoginHeader
				namaDesa={publikInfo?.nama_desa || "Indosistem"}
				logoDesa={publikInfo?.logo}
			/>
			<LoginForm
				form={form}
				handleSave={handleSave}
				num1={num1}
				num2={num2}
				isRemember={isRemember}
				handleCheckedIsRemember={handleCheckedIsRemember}
				loading={disabled}
			/>
			<LoginActions />
		</div>
	);
}
