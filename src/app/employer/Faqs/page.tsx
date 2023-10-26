"use client";
import React from "react";
import FAQAccordion from "../component/FaqAccordian";

export default function page() {
  const faqData = [
    {
      question: "What is the purpose of this website?",
      answer:
        "The purpose of this website is to provide information about our company and the products/services we offer. You can also find answers to common questions and contact us for further assistance.",
    },
    {
      question: "What is the purpose of this website?",
      answer:
        "The purpose of this website is to provide information about our company and the products/services we offer. You can also find answers to common questions and contact us for further assistance.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact our customer support team by clicking on the 'Contact Us' link in the navigation menu. We are available 24/7 to assist you with any questions or issues.",
    },
    {
      question: "Do you offer Courses?",
      answer:
        "Yes, we offer international shipping to many countries. During the checkout process, you can select your country, and the shipping options and costs will be displayed.",
    },
    {
      question: "What is Vtitti?",
      answer:
        "Our return policy allows you to return products within 30 days of purchase for a full refund. Please refer to our 'Returns and Refunds' page for detailed instructions and conditions.",
    },
  ];
  return (
    <div className="my-6">
      <FAQAccordion faqData={faqData} />
    </div>
  );
}
