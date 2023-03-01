import {
  ShieldCheckIcon,
  DeviceMobileIcon,
  UserIcon,
  GlobeAltIcon,
  CodeIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/outline";
import { DeviceMobile } from "heroicons-react";


const benefitOne = {
  title: "Secure and Transparent Betting",
  desc: "Cricbet is a secure and transparent betting platform built on the Tezos blockchain. With its smart contract technology, all bets are accurately and transparently resolved, ensuring fair payouts for all users.",
  image: "/feature1.svg",
  bullets: [
    {
      title: "Blockchain Technology",
      desc: "Cricbet is built on the secure and transparent Tezos blockchain, ensuring that bets are resolved accurately and transparently.",
      icon:  < ShieldCheckIcon />,
    },
    {
      title: "Smart Contract Technology",
      desc: "Cricbet's smart contract technology automatically resolves bets, ensuring fair and transparent payouts.",
      icon: <CodeIcon/>,
    },
    {
      title: "Decentralized",
      desc: "Cricbet is a decentralized platform, ensuring that all bets are secure and transparently recorded on the Tezos blockchain.",
      icon: <GlobeAltIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Easy-to-Use Platform",
  desc: "Cricbet offers a user-friendly platform that allows users to easily place bets on their favorite cricket teams. With a simple and intuitive interface, users can place bets in just a few clicks, making the betting experience seamless and enjoyable.",
  image: "/feature2.svg",
  bullets: [
    {
      title: "Simple User Interface",
      desc: " Cricbet's user interface is easy to navigate, even for beginners in blockchain and sports betting.",
      icon: <UserIcon />,
    },
    {
      title: "Low Fees",
      desc: "Cricbet charges low transaction fees, ensuring that users keep more of their winnings.",
      icon: <CurrencyRupeeIcon/>,
    },
    {
      title: "Mobile Responsive",
      desc: "Cricbet is designed to be mobile responsive, allowing users to place bets and monitor their winnings on the go. ",
      icon: <DeviceMobile />,
    },
  ],
};

export { benefitOne, benefitTwo };

