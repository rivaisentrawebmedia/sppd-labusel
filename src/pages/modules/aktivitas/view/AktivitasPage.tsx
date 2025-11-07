import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { TabComponent } from "./components";
import { Outlet } from "react-router-dom";

export default function AktivitasLayout() {
	return (
		<>
			<div className="flex flex-col gap-4">
				<Breadcrumbs
					items={[
						{
							label: "Beranda",
							to: "/modules/dashboard",
						},
						{
							label: "Aktivitas",
							to: "",
						},
					]}
				/>

				<div
					className="flex flex-col gap-0 bg-white rounded-md"
					style={{
						boxShadow: "0px 4px 4px 0px #0000000A",
					}}
				>
					<TabComponent />
					<div className="flex flex-col gap-4 p-4">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}
