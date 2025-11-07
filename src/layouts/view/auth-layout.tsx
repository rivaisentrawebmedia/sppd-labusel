import { usePathname } from "@/utils/usePathname";
import clsx from "clsx";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
	const { firstPathname } = usePathname();

	const isSignUpPage = firstPathname === "sign-up";
	return (
		<div className="w-full h-screen items-center justify-center flex flex-col bg-[#F5F5FF] overflow-auto scrollbar">
			{/* HEADER */}

			{/* CONTENT */}
			<div
				style={{
					boxShadow: "0px 4px 4px 0px #0000000A",
				}}
				className={clsx(
					"flex justify-center w-11/12  items-center max-h-[90%] overflow-auto scrollbar bg-white flex-col gap-4 p-4 md:p-6 rounded-md",
					{
						"md:w-2/5": !isSignUpPage,
						"md:w-4/5": isSignUpPage,
					}
				)}
			>
				<Outlet />
			</div>
			{/* FOOTER */}
		</div>
	);
}
