import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import WheelComponent from './components/WheelComponent';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" Component={WheelComponent} />
                    
                    {/*<Route path="/segment/:sid" Component={(routeProps) => <WcSegmentView {...routeProps} width={1200} height={720} segmentId="" match={routeProps} ></WcSegmentView>} />*/}
                    Add more routes for additional pages
                </Routes>
            </Router>
        </>
    )
}

export default App
