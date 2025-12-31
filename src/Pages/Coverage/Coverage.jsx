import React, { useRef } from "react";
import MySection from "../../Layouts/MySection";
import MyContainer from "../../Layouts/MyContainer";
import PrimaryBtn from "../../Components/UI/Buttons/PrimaryBtn";
import { CiSearch } from "react-icons/ci";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
    const serviceCenters = useLoaderData();
    const mapRef = useRef(null);
    // console.log(serviceCenters);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
      
      const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()));
      if (district) {
          const cord = [ district.latitude, district.longitude];
          console.log(location, cord);
          mapRef.current.flyTo(cord, 14)
      }

      
  };

  return (
      <MySection className='pt-20'>
      <MyContainer>
        <h1 className="font-bold text-2xl md:text-4xl text-secondary my-5 md:my-10">
          We are available in 64 districts
        </h1>

        {/* Search */}
        <form onSubmit={handleSearch}>
          <div className="relative flex items-center">
            <input
              className="relative input pl-10"
              type="text"
              placeholder="Search Here"
              name="location"
            />{" "}
            <PrimaryBtn className="-ml-5 z-50 cursor-pointer">
              Search
            </PrimaryBtn>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-50">
              <CiSearch className="" />
            </div>
          </div>
        </form>

        <div className="z-10">
          <h1 className="text-2xl md:text-3xl font-semibold my-5">
            We deliver almost all over Bangladesh
          </h1>
          {/* Main Map */}
          <div className="border w-full h-[800px]">
            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={false}
                          className="h-full z-10"
                          ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {serviceCenters.map((center) => (
                <Marker position={[center.latitude, center.longitude]}>
                  <Popup>
                    <strong>{center.district}</strong> <br /> Service Area :{" "}
                    {center.covered_area.join(", ")}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </MyContainer>
    </MySection>
  );
};

export default Coverage;
