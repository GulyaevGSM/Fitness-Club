import React from 'react';
import {useRouter} from "./routes/router";
import {RouterProvider} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";

function App() {
    const router = useRouter(true)

  return (
   <ChakraProvider>
       <RouterProvider router={router} />
   </ChakraProvider>
  );
}

export default App;
