import React, { useState } from "react";

function Contact() {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <section className="px-8 py-8 lg:py-16">
            <div className="container mx-auto text-center">
                <h5 className="text-base lg:text-2xl text-blue-gray mb-4">
                    Customer Care
                </h5>
                <h1 className="text-3xl lg:text-5xl text-blue-gray mb-4">
                    We're Here to Help
                </h1>
                <p className="text-lg text-gray-500 mb-10 lg:mb-20 mx-auto max-w-3xl">
                    Whether it's a question about our services, a request for
                    technical assistance, or suggestions for improvement, our team is
                    eager to hear from you.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30774829.262983374!2d60.9692356!3d19.6830977!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1714142816667!5m2!1sen!2sin"
                        className="w-full h-full"
                        title="Google Maps"
                    ></iframe>
                    {selectedOption ? (
                        <form action="#" className="flex flex-col gap-4 lg:max-w-sm">
                            <p className="text-left font-semibold text-gray-600">
                                {selectedOption}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first-name" className="mb-2 text-left font-medium text-gray-900">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        name="first-name"
                                        placeholder="First Name"
                                        className="bg-white border border-gray-300 focus:border-gray-900 rounded-lg px-4 py-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="mb-2 text-left font-medium text-gray-900">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        name="last-name"
                                        placeholder="Last Name"
                                        className="bg-white border border-gray-300 focus:border-gray-900 rounded-lg px-4 py-2 w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-2 text-left font-medium text-gray-900">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="name@email.com"
                                    className="bg-white border border-gray-300 focus:border-gray-900 rounded-lg px-4 py-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="mb-2 text-left font-medium text-gray-900">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    placeholder="Message"
                                    className="bg-white border border-gray-300 focus:border-gray-900 rounded-lg px-4 py-2 w-full"
                                ></textarea>
                            </div>
                            <button className="bg-black hover:bg-black text-white  hover:opacity-85 px-4 py-2 rounded-lg w-full">
                                Send message
                            </button>
                        </form>
                    ) : (
                        <div className="flex flex-row gap-4 lg:max-w-sm">
                            <button
                                onClick={() => handleOptionClick("General inquiry")}
                                className="max-w-fit border border-gray-400 px-4 py-2 rounded-lg"
                            >
                                General inquiry
                            </button>
                            <button
                                onClick={() => handleOptionClick("Product Support")}
                                className="max-w-fit border border-gray-400 px-4 py-2 rounded-lg"
                            >
                                Product Support
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Contact;
