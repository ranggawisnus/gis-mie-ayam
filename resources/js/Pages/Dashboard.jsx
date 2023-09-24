import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Map from "react-map-gl/maplibre";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard GIS
                </h2>
            }
        >
            <Head title="Dashboard GIS" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Selamat Datang
                        </div>
                    </div>
                    <div className="h-max">
                        <Map
                            initialViewState={{
                                longitude: 106.7362,
                                latitude: -6.3442,
                                zoom: 12,
                            }}
                            style={{ width: "100%", height: 600 }}
                            mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
                        />
                        ;
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
