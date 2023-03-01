'use client';
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import Benefits from '@/components/Features/Features';
import { benefitOne,benefitTwo } from '@/components/Features/Data';
import CTA from '@/components/CTA';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>


      <div className="min-h-screen ">
        <Navbar />
        <Hero />
        <SectionTitle
        pretitle="Decentralized Betting"
        title=" Why Cricket betting on Tezos?">
          Cricbet is a decentralized betting platform built on the Tezos blockchain,
          where cricket enthusiasts can bet on their favorite teams securely and transparently.
        </SectionTitle>
        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />
        <CTA/>



      

        <Footer />


      </div>



    </>
  )
}
