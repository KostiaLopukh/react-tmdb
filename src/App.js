import React from 'react';
import {Routes, Route} from "react-router-dom";

import {MovieDetails, Layout} from "./pages";

const App = () => {

    return (<div>
        <Routes>
            <Route path={'/'} element={<Layout/>}/>
            <Route path={'/id/:id'} element={<MovieDetails/>}/>
        </Routes>
    </div>);


};

export default App;



