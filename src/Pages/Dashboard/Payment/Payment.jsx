import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import ScreenLoading from '../../../Components/Loader/ScreenLoading/ScreenLoading';


const Payment = () => {
    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure();
    // console.log('params', parcelId)

    const { isLoading, data: parcel = [] } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    const handlePayNow = async () => {
        console.log('clicked')
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName : parcel.parcelName
        }

        const res = await axiosSecure.post(`/create-checkout-session`, paymentInfo);
        console.log(res.data);

        window.location.href = res.data.url;
    }

    if (isLoading) {
        return <ScreenLoading />
    }

    console.log('after King', parcel);
    return (
        <div className="bg-secondary border border-primary/20 shadow-md rounded-2xl p-6 max-w-md">
    <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-5">
        Payment Details
    </h1>

    <div className="space-y-4 text-base-200">

        <p className="flex justify-between">
            <span className="font-medium">Pay For:</span>
            <span>{parcel?.parcelName}</span>
        </p>

        <p className="flex justify-between">
            <span className="font-medium">Sender Email:</span>
            <span>{parcel?.senderEmail}</span>
        </p>

        {/* Receiver Details */}
        <div className="pt-3 border-t border-primary/20">
            <h2 className="text-lg font-semibold text-primary mb-2">Receiver Details</h2>

            <div className="space-y-2">
                <p className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{parcel?.reciverlName}</span>
                </p>

                <p className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span>{parcel?.reciverPhoneNo}</span>
                </p>

                <p className="flex justify-between">
                    <span className="font-medium">Region:</span>
                    <span>{parcel?.reciverRegion}</span>
                </p>

                <p className="flex justify-between">
                    <span className="font-medium">District:</span>
                    <span>{parcel?.reciverDistrict}</span>
                </p>
            </div>
        </div>

        <p className="flex justify-between text-lg font-bold border-t border-primary/20 pt-4">
            <span>Total Amount:</span>
            <span className="text-primary">৳ {parcel?.cost}</span>
        </p>
    </div>

    <button onClick={handlePayNow} className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition">
        Pay Now
    </button>
</div>


    );
};

export default Payment;