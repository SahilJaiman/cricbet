'use client';
import Image from "next/image";
import React from "react";
import MyContainer from "../Container";

export default function Benefits(props) {
  const { data } = props;

  return (
    <>
      <MyContainer className="flex flex-wrap mb-16 lg:gap-10 lg:flex-nowrap ">
        <div
          className={`flex  items-center justify-center w-full lg:w-1/2 ${
            props.imgPos === "right" ? "lg:order-1" : ""
          }`}>
          <div>
            <Image
              src={data.image}
              width="480"
              height="480"
              alt="Benefits"
            
            />
          </div>
        </div>

        <div
          className={`flex md:mx-2 lg:mx-2 p-4 flex-wrap items-center w-full lg:w-1/2 ${
            props.imgPos === "right" ? "lg:justify-end" : ""
          }`}>
          <div>
            <div className="flex flex-col w-full mt-4">
              <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight  lg:leading-tight lg:text-4xl ">
                {data.title}
              </h3>

              <p className="max-w-2xl py-4 text-lg leading-normal opacity-70 lg:text-xl xl:text-xl ">
                {data.desc}
              </p>
            </div>

            <div className="w-full mt-5">
              {data.bullets.map((item, index) => (
                <Benefit key={index} title={item.title} icon={item.icon}>
                  {item.desc}
                </Benefit>
              ))}
            </div>
          </div>
        </div>
      </MyContainer>
    </>
  );
}

function Benefit(props) {
  return (
    <>
      <div className="flex items-start mt-8 space-x-3">
        <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-primary rounded-md w-11 h-11 ">
          {React.cloneElement(props.icon, {
            className: "w-7 h-7 text-primary-content",
          })}
        </div>
        <div>
          <h4 className="text-xl font-medium   ">
            {props.title}
          </h4>
          <p className="mt-1 opacity-60 ">
            {props.children}
          </p>
        </div>
      </div>
    </>
  );
}