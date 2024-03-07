import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import WheelComponent from './components/WheelComponent';
import WheelComponentWithParameter from './components/WheelComponent';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" Component={WheelComponent} />
                    {/*<Route path="/wheel/" Component={WheelComponent<WheelComponentProps>} />*/}
                    {/*<Route path="/wheel/:scribble" Component={WheelComponent} />*/}
                    <Route path="wheel/:scribble" element={<WheelComponentWithParameter />} />
                    {/*<Route path="/wheel/:scribble" Component={(routeProps) => <WheelComponentWithScribble {...routeProps}></WheelComponentWithScribble>} />*/}
                    
                </Routes>
            </Router>
        </>
    )
}

export default App
