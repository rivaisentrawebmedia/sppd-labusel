import { ArrowBack } from "@/assets/icons/ArrowBack";
import { useNavigate } from "react-router-dom";

interface Props {
	label: string;
}
const BackLabel = ({ label }: Props) => {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => {
				navigate(-1);
			}}
			className="flex cursor-pointer items-center gap-2 w-fit"
		>
			<ArrowBack />
			<div className="text-xl font-medium">{label}</div>
		</button>
	);
};

export default BackLabel;
