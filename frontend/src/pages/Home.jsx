import React from "react";
import Navbar from "../components/Nav/Navbar";
import Hero from "../components/Hero/Hero";
import FeatureCard from "../components/FeatureCard/FeatureCard";
import AccordionComponent from "../components/Accordian/AccordionComponent";
import FeedBackSection from "../components/FeedBackSection/FeedBackSection";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="box-border">
        <Hero />
        <br />
        <br />
        <FeatureCard />
        <br />
        <br />
        <AccordionComponent />
        <br />
        <br />
        <FeedBackSection />
        <Footer />
      </div>
    </>
  );
}
