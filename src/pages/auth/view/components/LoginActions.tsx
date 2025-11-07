import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function LoginActions() {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col gap-3 w-full">
			<Button className="w-full bg-white text-[#272CCD] border-[#272CCD] hover:bg-[#272CCD] hover:text-white border">
				Masuk Dengan E-KTP
			</Button>
			<Button
				onClick={() => {
					navigate(`/sign-up`);
				}}
				className="w-full bg-white text-[#272CCD] border-[#272CCD] hover:bg-[#272CCD] hover:text-white border"
			>
				Daftar
			</Button>
		</div>
	);
}
