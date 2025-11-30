import React from 'react';
import MySection from '../../Layouts/MySection';
import MyContainer from '../../Layouts/MyContainer';
import { useForm, useWatch } from 'react-hook-form';
import PrimaryBtn from '../../Components/UI/Buttons/PrimaryBtn';
import useAuth from '../../Hooks/useAuth';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const SendParcel = () => {
    const { user } = useAuth();
    const { register, handleSubmit, control, } = useForm();
    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData();
    const navigate = useNavigate()
    // console.log(serviceCenters) 
    const senderRegion = useWatch({control, name: 'senderRegion'});
    const reciverRegion = useWatch({control, name: 'reciverRegion'});
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    // console.log(regions)

    const districByRegion = region => {
        const regionDistrict = serviceCenters.filter(c => c.region === region);
        // console.log('function region' , regionDistrict)
        const districts = regionDistrict.map(d => d.district);
        // console.log('function dist', districts)
        return districts;
    }
     
    
    const handleSendParcel = data => {
        console.log(data)

       
        const document = data.parcelType === 'document';
        const sameDistrict = data.senderDistrict === data.reciverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight)

        let cost = 0;

        if (document) {
            cost = sameDistrict ? 60 : 80;
        } else {
            if (parcelWeight < 3) {
                cost = sameDistrict ? 110 : 150;
            } else {
                const minCharge = sameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = sameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }

        console.log("MY COST", cost);
                Swal.fire({
        title: "Please Confirm Price?",
        text: `Your Charge is ${cost} Tk`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3A8F96",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I Agree!"
        }).then((result) => {
            if (result.isConfirmed) {
                data.cost = cost;
                axiosSecure.post('/parcels', data)
                    .then((res) => {
                        if (res.data.insertedId) {
                             navigate('/dashboard/my-parcels')
                             Swal.fire({
                    title: "Parcel is created. Please Pay!",
                    text: `You have to pay ${data.cost}`,
                    icon: "success"
                             });
                            
                           
                        }
                       
                    })
                    .catch(err=> console.log(err))

            
  }
});
    }
    return (
        <MySection>
            <MyContainer className='overflow-hidden  rounded-2xl'>
                <div className='bg-base-200 w-full min-h-[90vh] rounded-2xl shadow-2xl p-4 md:px-20 md:py-15  border border-gray-100 '>
                    <h1 className='text-3xl md:text-5xl font-bold '>Send A Parcel</h1>
                    <p className='my-4 text-xl md:text-2xl font-semibold'>Enter your parcel details</p>
                    <form onSubmit={handleSubmit(handleSendParcel)} className='w-full'>
                        {/* Document */}
                        <div className='flex gap-5 mb-5'>
                            <label className='label'>
                                <input {...register('parcelType')} type="radio"  className="radio radio-primary" value='document' defaultChecked/>
                                Document 
                            </label>
                            <label className='label'>
                                <input {...register('parcelType')} type="radio"  className="radio radio-primary" value='non-document' />
                                Non-Document 
                            </label>
                           
                        </div>

                       
                        {/* Parcel details Name, Weight */}
                        <div className='border-y border-gray-200 grid grid-cols-1 md:grid-cols-2 py-8 gap-5 md:gap-10'>
                            <div >
                                <label className='block text-sm mb-1'>Parcel Name</label>
                                <input className='input bg-transparent w-full' type="text" {...register('parcelName')} placeholder='Parcel Name' />
                            </div>
                            <div >
                                <label className='block text-sm mb-1'>Parcel Weight (KG)</label>
                                <input className='input bg-transparent w-full' type="text" {...register('parcelWeight')} placeholder='Parcel Weight (KG)'/>
                            </div>
                        </div>

                        {/* Two Column */}
                        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10'>
                            {/* Sender Info */}
                            <div className='space-y-4'>
                                <h1 className='font-bold text-xl mb-8'>Sender Details</h1>
                                {/* name */}
                                <div>
                                    <label className='block text-sm mb-1 font-semibold'>Sender Name</label>
                                    <input className='input bg-transparent w-full' type="text" {...register('senderName')} placeholder='Sender Name' defaultValue={user?.displayName}/>
                                </div>
                                {/* email */}
                                <div>
                                    <label className='block text-sm mb-1 font-semibold'>Sender Email</label>
                                    <input className='input bg-transparent w-full' type="text" {...register('senderEmail')} placeholder='Sender Emali' defaultValue={user?.email}/>
                                </div>
                                {/* address */}
                                <div>
                                    <label className='block text-sm mb-1 font-semibold'>Address</label>
                                    <input className='input bg-transparent w-full' type="text" {...register('senderAddress')} placeholder='Address' />
                                </div>
                                {/* Number */}
                                <div>
                                    <label className='block text-sm mb-1 font-semibold'>Sender Phone No</label>
                                    <input className='input bg-transparent w-full' type="text" {...register('senderPhoneNo')} placeholder='Address' />
                                </div>
                                {/* Division */}
                                <div>
                                     <label className='block text-sm mb-1 font-semibold'>Select Region</label>
                                    <select defaultValue="" className="select bg-base-200" {...register('senderRegion')}>
                                        <option value="" disabled={true}>Select Region</option>
                                        {
                                            regions.map((r, index) => <option key={index} value={r}>{r}</option>)
                                        }
                                    </select>
                                </div>
                                {/* Distric */}
                                <div>
                                     <label className='block text-sm mb-1 font-semibold'>Select District</label>
                                    <select defaultValue="" className="select bg-base-200" {...register('senderDistrict')}>
                                        <option value="" disabled={true}>Select District</option>
                                        {
                                            districByRegion(senderRegion).map((r, index) => <option key={index} value={r}>{r}</option>)
                                        }
                                    </select>
                                </div>
                                {/* Pickup Instruction */}
                                <div>
                                    <label className='block text-sm mb-1 font-semibold'>Pickup Instruction</label>
                                    <textarea className='input bg-transparent w-full h-10 p-2' {...register('senderInstraction')} placeholder='Pickup Instruction' maxLength={300} >
                                    </textarea >
                                </div>
                            
                            </div>

                            {/* Reciver Info */}
                            <div className='space-y-4'>
                                <h1 className='font-bold text-xl mb-8'>Reciver Details</h1>
                                {/* name */}
                                <div>
                                    <label className='block text-sm mb-1 font-semibold'>Reciver Name</label>
                                    <input className='input bg-transparent w-full' type="text" {...register('reciverName')} placeholder='Sender Name' />
                                </div>
                                {/* name */}
                                <div>
                                    <label className='block text-sm mb-1 font-semibold'>Reciver Email</label>
                                    <input className='input bg-transparent w-full' type="text" {...register('reciverEmail')} placeholder='Sender Email' />
                                </div>
                                {/* address */}
                                <div>
                                    <label className='block text-sm mb-1 font-semibold'>Address</label>
                                    <input className='input bg-transparent w-full' type="text" {...register('reciverAddress')} placeholder='Address' />
                                </div>
                                {/* Number */}
                                <div>
                                    <label className='block text-sm mb-1 font-semibold'>Reciver Phone No</label>
                                    <input className='input bg-transparent w-full' type="text" {...register('reciverPhoneNo')} placeholder='Address' />
                                </div>
                                 {/* Division */}
                                <div>
                                     <label className='block text-sm mb-1 font-semibold'>Select Region</label>
                                    <select  defaultValue="" className="select bg-base-200" {...register('reciverRegion')}>
                                        <option value="" disabled={true}>Select Region</option>
                                        {
                                            regions.map((r, index) => <option key={index} value={r}>{r}</option>)
                                        }
                                    </select>
                                </div>
                                {/* District */}
                                <div>
                                     <label className='block text-sm mb-1 font-semibold'>Select District</label>
                                    <select  defaultValue="" className="select bg-base-200" {...register('reciverDistrict')}>
                                        <option value="" disabled={true}>Select District</option>
                                        {
                                            districByRegion(reciverRegion).map((r, index) => <option key={index} value={r}>{r}</option>)
                                        }
                                    </select>
                                </div>
                                {/* Pickup Instruction */}
                                <div>
                                    <label className='block text-sm mb-1 font-semibold'>Pickup Instruction</label>
                                    <textarea className='input bg-transparent w-full h-10 p-2' {...register('reciverInstraction')} placeholder='Pickup Instruction' maxLength={300} >
                                    </textarea >
                                </div>
                                

                            </div>
                        </div>

                      <PrimaryBtn type='submit' className='mt-5 border-primary rounded-sm'>Send Parcel</PrimaryBtn>
                    </form>
                </div>
            </MyContainer>
        </MySection>
    );
};

export default SendParcel;