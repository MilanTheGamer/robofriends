import React,{Component} from "react";
import CardList from '../components/cardList';
import SearchBox from "../components/searchBox";
import "./app.css";
import Scroll from "../components/scroll";
import ErrorBoundary from "../components/errorBoundary";

class App extends Component {
    constructor(){
        super();
        this.state = {
            robots:[],
            searchField:"",
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())
            .then(users => this.setState({robots:users}))
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
    }
    render(){
        const {robots, searchField} = this.state;
        const filterRobots = robots.filter(robot =>{
            return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
            })
        if (!robots.length){
            return <h1>Loading</h1>
        }else{
            return(
            <div className="tc">
                <h1 className="f1">ROBOFRIENDS</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filterRobots} />  
                    </ErrorBoundary>
                      
                </Scroll>
            </div>
            );
        }
        
    }
    
}

export default App;