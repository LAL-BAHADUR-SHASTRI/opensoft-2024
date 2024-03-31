
import BarGraph from "@/components/BarGraph";
import DonutChart from "@/components/DonutChart";
import LineChart from "@/components/LineChart";
import React from "react";



const About = () => {
    const data=[
        { year: "Hello", number: 30 },
        { year: 2021, number: 40 },
        { year: 2022, number: 25 },
        { year: 2023, number: 35 },
        // Add more data entries as needed
      ];
      const data2=[
        { year: "Hello", number: 30 },
        { year: 2021, number: 40 },
        // Add more data entries as needed
      ];
    return (
        <div className="ml-60 mr-60">
            <h1 className="text-2xl text-white font-bold mb-4">Discover Cinema, Redefined: Welcome to Flexify</h1>
            <p className="text-white italic">Welcome to Flexify, where the magic of movies meets cutting-edge technology. Powered by MongoDB Atlas, Flexify brings you an unparalleled movie-watching experience, replete with advanced search options, semantic search results, and a seamless backend infrastructure built upon the robust foundation of Golang.</p>
            <h1 className="text-xl text-white font-bold mb-4">Unleash the Power of Advanced Search</h1>
            <p className="text-white italic">Flexify isn't just another movie website; it's a gateway to cinematic exploration. With our advanced search options, powered by MongoDB Atlas, finding your favorite movies has never been easier. Our autocomplete feature anticipates your queries, while fuzzy search results ensure that even intermediate searches yield relevant and accurate results.</p>
            <img src="statbackg.png" className="mx-auto"></img>
            <h1 className="text-xl text-white font-bold mb-4">Precision Perfected: Semantic Search Results </h1>
            <p className="text-white italic">At Flexify, we've invested countless hours in fine-tuning our semantic search capabilities. Say goodbye to vague results; our system delivers precise and tailored recommendations, ensuring that every movie suggestion resonates with your preferences.</p>
            <div className="m-auto w-2/3"><LineChart data={data} type="ms"/></div>
            {/* <div><DonutChart data={data} type="Year"/></div> */}
            <h1 className="text-xl text-white font-bold mb-4">Next-Level Backend Systems</h1>
            <p className="text-white italic">Behind the scenes, Flexify operates on the best-in-class backend systems crafted upon Golang. Our architecture prioritizes concurrency and scalability, guaranteeing a seamless browsing experience even during peak traffic hours.</p>
            <div className="size-48 w-4/12 h-9/12 mx-auto"><BarGraph data={data2} type="ms"/></div>
            <h1 className="text-xl text-white font-bold mb-4">Security at the Forefront</h1>
            <p className="text-white italic">Your security is our utmost priority. With robust login mechanisms and meticulous user data handling, Flexify ensures that your personal information remains safe and secure. Our integrated payment method adds an extra layer of protection, allowing you to enjoy premium content with peace of mind.</p>
        </div>
    );
}
export default About;