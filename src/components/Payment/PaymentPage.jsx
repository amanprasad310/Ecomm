import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PaymentPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedMethod, setSelectedMethod] = useState('');
    const [openAddress, setOpenAddress] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [showCreditCardFields, setShowCreditCardFields] = useState(false);
    const [showUpiInput, setShowUpiInput] = useState(false);
    const [otpSection, setOtpSection] = useState(false);
    const [buyProduct, setBuyProduct] = useState({});
    const [pod, setPod] = useState(false);
    const [newAddress, setNewAddress] = useState({
        street: '',
        city: '',
        country: '',
        postalCode: ''
    });
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [upiId, setUpiId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:8080/find-products/${id}`);
                const product = await res.json();
                setBuyProduct(product);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();

        setAddresses(["ZTR coloney , Hno-224 ,Begusari , Bihar,801101"]);
    }, [id]);

    const data = JSON.parse(localStorage.getItem('cartItems'));

    let q = "";
    let s = "";
    if (data) {
        data.forEach(item => {
            if (item.productId === id) {
                q = item.quantity;
                s = item.selectedSize;
            }
        });
    }

    const handlePaymentMethodChange = (method) => {
        setSelectedMethod(method);
        setShowCreditCardFields(method === 'credit/debit card');
        setShowUpiInput(method === 'upi');
        setPod(method === 'pod');
    };

    const handleToggleAddressSection = () => {
        setOpenAddress(!openAddress);
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(prevAddress => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handleAddAddress = () => {
        const { street, city, country, postalCode } = newAddress;
        if (street && city && country && postalCode) {
            const fullAddress = `${street}, ${city}, ${country}, ${postalCode}`;
            setAddresses([...addresses, fullAddress]);
            setNewAddress({
                street: '',
                city: '',
                country: '',
                postalCode: ''
            });
            setOpenAddress(false);
        }
    };

    const handleDeleteAddress = (index) => {
        const updatedAddresses = [...addresses];
        updatedAddresses.splice(index, 1);
        setAddresses(updatedAddresses);
    };

    const handleGetOTP = () => {
        setOtpSection(true);
    };

    const handlePlaceOrder = async () => {
        const order = {
            img: buyProduct.imgUrl,
            productId: id,
            productName: buyProduct.pname,
            price: buyProduct.price,
            quantity: q,
            size: s,
            address: addresses[0],
            paymentMethod: selectedMethod,
        };

        // Send order details to backend to trigger email
        const storedData = localStorage.getItem('myData');
        // console.log(storedData)

        const userData = JSON.parse(storedData);
        const email = userData.email;
        // console.log(userEmail);
        // const userId = userData._id;


        try {
            const response = await fetch('http://localhost:8080/order-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, orderDetails: order }),
            });

            if (response.ok) {
                console.log('Email sent successfully!');
                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(order);
                localStorage.setItem('orders', JSON.stringify(orders));
                toast.success('We will send u mail regarding your order details and shipping date');
                setIsModalOpen(true);
            } else {
                // Optionally, you can parse the response to get more details on the error
                const errorData = await response.json();
                // console.error('Error response:', errorData);
                console.log(`Failed to send email: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Error sending email. Please try again.');
        }


    };

    const formatCardNumber = (value) => {
        return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setCardNumber(formatCardNumber(value));
    };

    const handleExpireDateChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 4) {
            const formattedValue = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
            setExpireDate(formattedValue);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-gray-100 rounded-lg p-6">
                <div className="bg-gray-500 rounded-lg px-4 py-2">
                    <h2 className="text-lg font-semibold text-white">Your Order</h2>
                </div>
                <div className="border border-gray-300 rounded-lg mt-4">
                    <div className="flex items-center border-b border-gray-300 py-4">
                        <div className="w-28 h-24 ml-4 flex-shrink-0 mr-4">
                            <img src={buyProduct.imgUrl} alt="Product" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex-1">
                            <p className="text-lg font-semibold">{buyProduct.pname}</p>
                            <p className="text-sm text-gray-600">{buyProduct.description}</p>
                            <p className="text-sm text-gray-600">quantity : {q}</p>
                            <p className="text-sm text-gray-600">size : {s}</p>
                        </div>
                        <div className="text-lg font-semibold mr-5">{buyProduct.price}.00</div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 mt-6">
                <div className="bg-gray-500 rounded-lg px-4 py-2">
                    <h2 className="text-lg font-semibold text-white">Your Shipping Address</h2>
                </div>
                <div className="border border-gray-300 rounded-lg mt-4 p-4">
                    {addresses.map((address, index) => (
                        <div key={index} className="flex justify-between">
                            <p className="text-pretty">{address}</p>
                            <button onClick={() => handleDeleteAddress(index)} className="text-red-600">Delete</button>
                        </div>
                    ))}
                    <div className="mt-3 flex">
                        <span className="text-sm cursor-pointer" onClick={handleToggleAddressSection}>Add new Address</span>
                    </div>
                </div>
                {openAddress && (
                    <div className="border border-gray-300 rounded-lg mt-4 p-4">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="street" className="block text-gray-700 font-semibold mb-2">Street</label>
                                <input type="text" id="street" name="street" value={newAddress.street} onChange={handleAddressChange} className="border rounded-md px-3 py-2 w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">City</label>
                                <input type="text" id="city" name="city" value={newAddress.city} onChange={handleAddressChange} className="border rounded-md px-3 py-2 w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">Country</label>
                                <input type="text" id="country" name="country" value={newAddress.country} onChange={handleAddressChange} className="border rounded-md px-3 py-2 w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="postalCode" className="block text-gray-700 font-semibold mb-2">Postal Code</label>
                                <input type="text" id="postalCode" name="postalCode" value={newAddress.postalCode} onChange={handleAddressChange} className="border rounded-md px-3 py-2 w-full" />
                            </div>
                        </form>
                        <button onClick={handleAddAddress} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">Add Address</button>
                    </div>
                )}
            </div>
            <div className="bg-gray-100 rounded-lg p-6 mt-6">
                <div className="bg-gray-500 rounded-lg px-4 py-2">
                    <h2 className="text-lg font-semibold text-white">Payment Method</h2>
                </div>
                <div className="border border-gray-300 rounded-lg mt-4 p-4">
                    <label className="flex items-center mb-2">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="credit/debit card"
                            checked={selectedMethod === 'credit/debit card'}
                            onChange={() => handlePaymentMethodChange('credit/debit card')}
                        />
                        <span className="ml-2">Credit/Debit Card</span>
                    </label>
                    {showCreditCardFields && (
                        <div className="border border-gray-300 rounded-lg mt-4 p-4 w-1/2">
                            <div className="mb-4">
                                <label htmlFor="cardNumber" className="block text-gray-700 font-semibold mb-2">Card Number</label>
                                <input
                                    required
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    className="border rounded-md px-3 py-2 w-full"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    maxLength={19}
                                />
                            </div>
                            <div className='flex justify-between'>
                                <div className="mb-4">
                                    <label htmlFor="cvv" className="block text-gray-700 font-semibold mb-2">CVV</label>
                                    <input
                                        required
                                        type="text"
                                        id="cvv"
                                        name="cvv"
                                        className="border rounded-md px-3 py-2 w-20"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        maxLength={3}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="expireDate" className="block text-gray-700 font-semibold mb-2">Expiration Date</label>
                                    <input
                                        required
                                        type="text"
                                        id="expireDate"
                                        name="expireDate"
                                        className="border rounded-md px-3 py-2 w-32"
                                        value={expireDate}
                                        onChange={handleExpireDateChange}
                                        maxLength={5}
                                    />
                                </div>
                            </div>
                            <button onClick={handleGetOTP} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">Get OTP</button>
                            {otpSection && (
                                <div className="mt-4">
                                    <label htmlFor="otp" className="block text-gray-700 font-semibold mb-2">Enter OTP</label>
                                    <input
                                        required
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        className="border rounded-md px-3 py-2 w-32"
                                    />
                                    <button onClick={handlePlaceOrder} className="bg-blue-500 ml-5 text-white px-4 py-2 mt-2 rounded-md">Place Order</button>
                                </div>
                            )}
                        </div>
                    )}
                    <label className="flex items-center mb-2">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            checked={selectedMethod === 'upi'}
                            onChange={() => handlePaymentMethodChange('upi')}
                        />
                        <span className="ml-2">UPI</span>
                    </label>
                    {showUpiInput && (
                        <div className="mt-4">
                            <label htmlFor="upiId" className="block text-gray-700 font-semibold mb-2">UPI ID</label>
                            <input
                                type="text"
                                id="upiId"
                                name="upiId"
                                className="border rounded-md px-3 py-2 w-full"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                            />
                            <button onClick={handlePlaceOrder} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">Place Order</button>
                        </div>
                    )}
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="pod"
                            checked={selectedMethod === 'pod'}
                            onChange={() => handlePaymentMethodChange('pod')}
                        />
                        <span className="ml-2">Pay on Delivery</span>
                    </label>
                    {pod && (
                        <button onClick={handlePlaceOrder} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">Place Order</button>
                    )}
                </div>
            </div>
            <ToastContainer />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg z-50">
                        <img src="https://media1.tenor.com/m/Hw7f-4l0zgEAAAAC/check-green.gif" alt="Order Successful" className=" w-96 h-96 mx-auto" />
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md mx-auto block"
                        >
                            Done
                        </button>
                    </div>
                    <div className="fixed inset-0 bg-black opacity-50 z-40 pointer-events-none"></div>
                </div>
            )}
        </div>
    );
}
