'use client';

import { Inter } from '@next/font/google'

import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import Benefits from '@/components/Features/Features';
import { benefitOne, benefitTwo } from '@/components/Features/Data';
import CTA from '@/components/CTA';

import { motion, useInView, useScroll, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';


export default function Home() {
  const { scrollYProgress } = useScroll();



  return (
    <>


      <div className="min-h-screen ">
      
        <motion.div className='fixed top-0 left-0 right-0 h-2 bg-primary ' style={{ scaleX: scrollYProgress }} />
        <section id='hero'>
          <ScrollReveal>
            <Hero />
          </ScrollReveal>


        </section>

        <section id='features'>
          <SectionTitle
            pretitle="Decentralized Betting"
            title=" Why Cricket betting on Tezos?">
            Cricbet is a decentralized betting platform built on the Tezos blockchain,
            where cricket enthusiasts can bet on their favorite teams securely and transparently.
          </SectionTitle>
          <Benefits data={benefitOne} />
          <Benefits imgPos="right" data={benefitTwo} />
        </section>
        <CTA />





        


      </div>



    </>
  )
}
