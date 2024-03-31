
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
            <h1 className="text-2xl text-white font-bold mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate quam iste explicabo quasi aut nulla odio ad repellendus rem, possimus, molestiae omnis dicta tempore culpa aspernatur voluptates eveniet eaque at!</h1>
            <p className="text-white italic">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis illo in eligendi perspiciatis nobis voluptates officiis tempore delectus ad cum modi amet et corporis qui laborum, ipsam quos at ducimus.</p>
            <img src="statbackg.png" className="mx-auto"></img>
            <p className="text-white italic">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis illo in eligendi perspiciatis nobis voluptates officiis tempore delectus ad cum modi amet et corporis qui laborum, ipsam quos at ducimus.</p>
            <div className="m-auto w-2/3"><LineChart data={data} type="Year"/></div>
            {/* <div><DonutChart data={data} type="Year"/></div> */}
            <p className="text-white italic">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis illo in eligendi perspiciatis nobis voluptates officiis tempore delectus ad cum modi amet et corporis qui laborum, ipsam quos at ducimus.</p>
            <div className="size-48 w-4/12 h-9/12 mx-auto"><BarGraph data={data2} type="Year"/></div>
            <p className="text-white italic">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis illo in eligendi perspiciatis nobis voluptates officiis tempore delectus ad cum modi amet et corporis qui laborum, ipsam quos at ducimus.</p>

        </div>
    );
}
export default About;