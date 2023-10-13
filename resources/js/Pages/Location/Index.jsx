import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    useEffect,
} from "react";
import { Head, usePage, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Map, {
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup,
    ScaleControl,
} from "react-map-gl/maplibre";
import ItemSlider from "@/Components/ItemSlider";
import LocationForm from "@/Components/LocationForm";
import PrimaryButton from "@/Components/PrimaryButton";

const Location = ({ auth }) => {
    const { locations } = usePage().props;

    const [allLocations, setAllLocations] = useState([]);
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const sliderRef = useRef();
    const mapRef = useRef();

    const [popupInfo, setPopupInfo] = useState(null);

    const {
        setData,
        post: postHTTPMethod,
        delete: deleteHTTPMethod,
        reset,
        data,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        long: "",
        lat: "",
        name: "",
        description: "",
        image: "",
    });

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
            setIsUpdateMode(true);

            setData({
                id: data.id,
                lat: data.lat,
                long: data.long,
                name: data.name,
                description: data.description,
                rating: data.rating,
            });

            mapRef.current.easeTo(
                {
                    center: [data.long, data.lat],
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
        [mapRef, isCreateMode]
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

                        //make sure user can't click marker when in create mode
                        if (isCreateMode) return;

                        setPopupInfo(location);
                        scrollToSlide(index);
                        handleJumpTo(location);
                    }}
                    draggable={location.id === data.id}
                    onDragStart={() => setPopupInfo(null)}
                    onDragEnd={(e) => {
                        const copiedLocations = [...allLocations];

                        copiedLocations[index] = {
                            ...copiedLocations[index],
                            lat: e.lngLat.lat,
                            long: e.lngLat.lng,
                        };

                        setAllLocations(copiedLocations);

                        setData({
                            ...data,
                            lat: e.lngLat.lat,
                            long: e.lngLat.lng,
                        });
                    }}
                >
                    <img
                        src="https://cdn.iconscout.com/icon/free/png-256/free-restaurant-1495593-1267764.png?f=webp"
                        className={`h-8 w-8 ${
                            isCreateMode ||
                            (isUpdateMode && location.id !== data.id)
                                ? "opacity-40"
                                : "opacity-100"
                        }`}
                    />
                </Marker>
            )),
        []
    );

    const handleSetLocation = useCallback(
        (e) => {
            if (!isCreateMode) return;

            setData({
                long: e.lngLat.lng,
                lat: e.lngLat.lat,
            });
        },
        [isCreateMode]
    );

    //handle to save location to database
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            if (isCreateMode) {
                postHTTPMethod(route("location.create", data), {
                    onSuccess: () => {
                        handleResetForm();
                    },
                });
            } else {
                postHTTPMethod(route("location.update", data), {
                    onSuccess: () => {
                        handleResetForm();
                    },
                });
            }
        },
        [isCreateMode, data]
    );

    const handleDeleteLocation = useCallback((id) => {
        deleteHTTPMethod(
            route("location.delete", {
                id,
            }),
            {
                onSuccess: () => {
                    handleResetForm();
                },
            }
        );
    }, []);

    const handleResetForm = useCallback(() => {
        setPopupInfo(null);
        setIsCreateMode(false);
        setIsUpdateMode(false);
        setAllLocations(locations);
        reset();
    }, [locations]);

    //make sure to update state when locations update from server after create new location
    useEffect(() => {
        setAllLocations(locations);
    }, [locations]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Master Location
                </h2>
            }
        >
            <Head name="Dashboard GIS" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-4">
                    <div className="h-max w-3/4">
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
                            handleSetLocation={handleSetLocation}
                            cursor={isCreateMode ? "pointer" : "auto"}
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

                    <div className="w-1/4">
                        {!isCreateMode && !isUpdateMode && (
                            <PrimaryButton
                                className="mb-4"
                                onClick={() => setIsCreateMode(true)}
                            >
                                Add New Location
                            </PrimaryButton>
                        )}

                        {(isCreateMode || isUpdateMode) && (
                            <LocationForm
                                data={data}
                                setData={setData}
                                errors={errors}
                                handleSubmit={handleSubmit}
                                handleResetForm={handleResetForm}
                                handleDeleteLocation={handleDeleteLocation}
                                processing={processing}
                                recentlySuccessful={recentlySuccessful}
                                isUpdateMode={isUpdateMode}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Location;
