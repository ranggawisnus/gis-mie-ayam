import logo from "../../../public/icons/map.png";
import ItemSlider from "@/Components/ItemSlider";
import RatingStar from "@/Components/RatingStar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { isValidURL } from "@/utils/utils";
import { Head, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, {
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup,
    ScaleControl,
} from "react-map-gl/maplibre";

export default function Dashboard({ auth }) {
    const { locations } = usePage().props;

    console.log(auth.user);

    const [allLocations, setAllLocations] = useState([]);

    const sliderRef = useRef();
    const mapRef = useRef();

    const [popupInfo, setPopupInfo] = useState(null);

    // handle scroll image based on clicked pin
    const scrollToSlide = useCallback(
        (index) => {
            sliderRef.current.slickGoTo(index);
        },
        [sliderRef]
    );

    // handle jum to long,lat when click on the slider
    const handleJumpTo = useCallback(
        (data) => {
            mapRef.current.easeTo(
                {
                    center: [Number(data.long), Number(data.lat)],
                    zoom: 13, // Zoom level of the target location
                    bearing: 0, // Bearing of the map (optional)
                    pitch: 0, // Pitch of the map (optional)
                },
                {
                    duration: 2000, // Animation duration in milliseconds
                    easing: (t) => t, // Easing function, default is linear
                }
            );
        },
        [mapRef]
    );

    // map all locations to pin, dont forget to use useMemo to improve perfomance
    const pins = useMemo(
        () =>
            locations.map((location, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={location.long}
                    latitude={location.lat}
                    anchor="bottom"
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();

                        setPopupInfo(location);
                        scrollToSlide(index);
                        handleJumpTo(location);
                    }}
                    onDragStart={() => setPopupInfo(null)}
                    onDragEnd={(e) => {
                        const copiedLocations = [...allLocations];

                        copiedLocations[index] = {
                            ...copiedLocations[index],
                            lat: +e.lngLat.lat,
                            long: +e.lngLat.lng,
                        };

                        setAllLocations(copiedLocations);
                    }}
                >
                    <img
                        src="https://cdn.iconscout.com/icon/free/png-256/free-restaurant-1495593-1267764.png?f=webp"
                        className={`h-8 w-8 `}
                    />
                </Marker>
            )),
        []
    );

    //make sure to update state when locations update from server after create new location
    useEffect(() => {
        setAllLocations(locations);
    }, [locations]);

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
                            Selamat Datang {auth.user.name} di Dashboard GIS
                        </div>
                    </div>
                    <div className="h-max">
                        <Map
                            reuseMaps
                            ref={mapRef}
                            initialViewState={{
                                longitude: 106.7362,
                                latitude: -6.3442,
                                zoom: 12,
                                bearing: 0,
                                pitch: 0,
                            }}
                            style={{ width: "100%", height: 600 }}
                            mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
                            cursor="auto"
                        >
                            <GeolocateControl position="top-left" />
                            <FullscreenControl position="top-left" />
                            <NavigationControl position="top-left" />
                            <ScaleControl />
                            {pins}
                            {/* Handle Pop Up when Pin Clicked */}
                            {popupInfo && (
                                <Popup
                                    anchor="top"
                                    longitude={Number(popupInfo.long)}
                                    latitude={Number(popupInfo.lat)}
                                    onClose={() => setPopupInfo(null)}
                                    className="rounded-lg shadow-lg overflow-hidden"
                                >
                                    <div className="px-4 pb-4 bg-white">
                                        <h2 className="font-semibold text-lg mb-2 flex justify-between items-center">
                                            {popupInfo.name}
                                        </h2>

                                        <p className="text-gray-600 mb-2">
                                            {popupInfo.description}
                                        </p>
                                        <div className="flex justify-between">
                                            <RatingStar
                                                rating={+popupInfo.rating}
                                            />
                                            <a
                                                href={`https://www.google.com/maps?q=${popupInfo.lat},${popupInfo.long}`}
                                                target="_blank"
                                                title="Buka di Google Maps"
                                                className="text-blue-500 hover:text-blue-700 transition-colors duration-200 ml-2"
                                            >
                                                <img
                                                    src={logo}
                                                    alt="Google Maps Icon"
                                                    className="w-4 inline-block"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                    <img
                                        width="100%"
                                        src={
                                            isValidURL(popupInfo.image)
                                                ? popupInfo.image
                                                : "/images/" + popupInfo.image
                                        }
                                        className="object-cover"
                                    />
                                </Popup>
                            )}
                        </Map>
                        {/* Show Slider and navigate to pin when clicked */}
                        <div className="mt-8" />
                        <ItemSlider
                            locations={allLocations}
                            ref={sliderRef}
                            handleJumpTo={handleJumpTo}
                            setPopupInfo={setPopupInfo}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
