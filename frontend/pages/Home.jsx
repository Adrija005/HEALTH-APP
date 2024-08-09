import React from 'react';
import Specialist from "../src/components/Specialist";
import Test from "../src/components/Test";
import InHouseDoctor from "../src/components/InHouseDoctor";
import MessageForm from "../src/components/MessageForm";

const Home = () => {
  return (
    <>

    <Specialist 
    title={"Welcome To Health App | Easy Way To Be In Check"} 
    imageUrl={"/healthapp.png"}
    />
    <Test imageUrl={"/test.png"}/>
    <InHouseDoctor/>
    <MessageForm/>
    
    </>
  );
};

export default Home;