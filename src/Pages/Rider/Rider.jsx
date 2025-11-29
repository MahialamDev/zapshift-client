import React from 'react';
import MySection from '../../Layouts/MySection';
import MyContainer from '../../Layouts/MyContainer';
import PrimaryBtn from '../../Components/UI/Buttons/PrimaryBtn';
import riderImg from '../../assets/agent-pending.png'
const Rider = () => {
    return (
        <MySection>
            <MyContainer>
                <h1 className='font-bold text-2xl md:4xl'>Become A Rider</h1>
                <p>Rider Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eius aspernatur necessitatibus voluptatum commodi explicabo ex. Sit, unde. Porro cumque tempora asperiores ullam eos et sed, eius, molestias perferendis sapiente nihil! Illo ipsa dolorum maiores labore esse accusamus, pariatur facilis. Ipsa nihil similique ducimus ut. Cumque reprehenderit libero reiciendis optio.</p>
                <div className='grid grid-cols-2 shadow-md w-full rounded-2xl mt-10 border border-gray-50'>
                    <form className='border border-gray-200 p-4 my-5 max-w-[380px] space-y-1 rounded-2xl shadow-2xl bg-base-100 mt-5 mx-auto'>
                    <h1 className='my-4 text-2xl font-semibold text-center text-secondary '>Submit Form For Rider</h1>
                    <label className='label' htmlFor="">Name</label>
                    <input className='input' type="text" />
                    <label className='label' htmlFor="">Email</label>
                    <input className='input' type="text" />
                    <label className='label' htmlFor="">Address</label>
                    <input className='input' type="text" />
                    <label className='label' htmlFor="">NID No</label>
                    <input className='input' type="text" />
                    <label className='label' htmlFor="">Contcat No</label>
                    <input className='input' type="text" />
                    <PrimaryBtn className='border-primary hover:bg-transparent transition duration-200 rounded-4xl mt-2 w-full'>Submit</PrimaryBtn>
                    </form>
                    
                    <div className='bg-primary rounded-r-2xl flex items-center'>
                        <img className='w-1/2 mx-auto' src={riderImg} alt="" />
                    </div>
                </div>
            </MyContainer>
        </MySection>
    );
};

export default Rider;