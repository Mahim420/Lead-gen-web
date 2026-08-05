"use client";

import Form from "@/components/Dashboard/Form";
import Image from "next/image";
import React from "react";
import { FaUserEdit } from "react-icons/fa";

const GenLeads = () => {
  return (
    <div>
      <section>
        <h1 className="text-3xl font-bold">Generate Leads</h1>
        <p className="text-lg mt-3 text-gray-600">
          Fill in the informations below to find potential leads.
        </p>
      </section>
      <section>
        <div>
          <div className=" bg-base-200">
            <div className="hero-content flx-cole lg:flex-row-reverse justify-evenly gap-5">
              <div className="text-center lg:text-left h-full">
                <Image
                  alt="Lead generation"
                  src="/assets/leadgen.jpeg"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                  <div className="flex gap-2.5 items-center">
                    <div>
                      <FaUserEdit size={30} className="text-2xl" />
                    </div>
                    <div className="">
                      <h1 className="text-2xl font-semibold">
                        Lead generation form
                      </h1>
                      <p className="">
                        Provide your target criteria to generate the most
                        relevant leads.
                      </p>
                    </div>
                  </div>
                  <Form></Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GenLeads;
