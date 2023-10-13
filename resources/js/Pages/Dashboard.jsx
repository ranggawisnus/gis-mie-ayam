import ItemSlider from "@/Components/ItemSlider";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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
                            Selamat Datang
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
                                >
                                    <div className="mb-3">
                                        <h2 className="font-semibold mb-2 text-lg">
                                            {popupInfo.name}
                                        </h2>
                                        <p>{popupInfo.description}</p>
                                        <p>Rating: {popupInfo.rating}</p>
                                    </div>
                                    <img
                                        width="100%"
                                        src={"/images/" + popupInfo.image}
                                        className="object-cover rounded-sm"
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
