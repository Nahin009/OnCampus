"use client";

import SuccessAnimationData from "@/public/animations/Success.json"; 
import LoadingAnimationData from "@/public/animations/Loading.json";
import Loading_MailAnimation from "@/public/animations/Loading_Mail.json";
import CrossAnimation from "@/public/animations/Cross.json";
import Exclamation from "@/public/animations/Exclamation.json";
import Loading from "@/public/animations/Loading.json";
import Redirecting from "@/public/animations/Redirecting.json";
import CongratsSuccess from "@/public/animations/CongratsSuccess.json";
import lottie from "lottie-web";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";

const SuccessAnimation = () => {
  useEffect(() => {
    // Initialize Lottie animation
    const anim = lottie.loadAnimation({
      container: document.getElementById("animation-container"),
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: SuccessAnimationData,
    });

    return () => {
      anim.destroy(); // Cleanup animation when component unmounts
    };
  }, []);

  return <div id="animation-container" className="w-12 h-12"></div>;
};

const LoadingAnimation = () => {
  useEffect(() => {
    // Initialize Lottie animation
    const anim = lottie.loadAnimation({
      container: document.getElementById("loading-animation-container"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: LoadingAnimationData,
    });

    return () => {
      anim.destroy(); // Cleanup animation when component unmounts
    };
  }, []);

  return <div id="loading-animation-container" className="w-12 h-12"></div>;
}

const ErrorAnimation = () => {
  useEffect(() => {
    // Initialize Lottie animation
    const anim = lottie.loadAnimation({
      container: document.getElementById("error-animation-container"),
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: CrossAnimation,
    });

    return () => {
      anim.destroy(); // Cleanup animation when component unmounts
    };
  }, []);

  return <div id="error-animation-container" className="w-12 h-12"></div>;
}

const WarningAnimation = () => {
  useEffect(() => {
    // Initialize Lottie animation
    const anim = lottie.loadAnimation({
      container: document.getElementById("warning-animation-container"),
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: Exclamation,
    });

    return () => {
      anim.destroy(); // Cleanup animation when component unmounts
    };
  }, []);

  return <div id="warning-animation-container" className="w-12 h-12"></div>;
}

const LoadingMailAnimation = () => {
  useEffect(() => {
    // Initialize Lottie animation
    const anim = lottie.loadAnimation({
      container: document.getElementById("loading-mail-animation-container"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: Loading_MailAnimation,
    });

    return () => {
      anim.destroy(); // Cleanup animation when component unmounts
    };
  }, []);

  return <div id="loading-mail-animation-container" className="w-96 h-96"></div>;
}

const RedirectingAnimation = () => {
  useEffect(() => {
    // Initialize Lottie animation
    const anim = lottie.loadAnimation({
      container: document.getElementById("redirecting-animation-container"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: Redirecting,
    });

    return () => {
      anim.destroy(); // Cleanup animation when component unmounts
    };
  }, []);

  return <div id="redirecting-animation-container" className="w-96 h-96"></div>;
}

const CongratsSuccessAnimation = () => {
  useEffect(() => {
    // Initialize Lottie animation
    const anim = lottie.loadAnimation({
      container: document.getElementById("congrats-success-animation-container"),
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: CongratsSuccess,
    });

    return () => {
      anim.destroy(); // Cleanup animation when component unmounts
    };
  }, []);

  return <div id="congrats-success-animation-container" className="w-96 h-96"></div>;
}


export { SuccessAnimation, LoadingAnimation, ErrorAnimation, WarningAnimation, LoadingMailAnimation, RedirectingAnimation, CongratsSuccessAnimation};
