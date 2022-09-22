import React, { useContext } from "react";
import { MyContext } from "../../redux";

export default function Test(){
    return(
        <div>
            <h1>
                hello world!
            </h1>
            <Greet/>
        </div>
    )
}

function Greet(){
    const context = useContext(MyContext);
    return (
        <h2>
            My name is  {context.name}
        </h2>
    )
}
