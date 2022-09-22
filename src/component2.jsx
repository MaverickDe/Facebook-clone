import React, { Component } from 'react';
// import Counter from './component1';

class counts extends Component {
  
    // b =this.dist()
    state = {
        counters: 6
        , text: "S"
    }
    
    dist=()=>{
let list = []
        for(let i=0;i<this.state.counters;i++){
           list.push({i,value:0})
        }
        // return list
        // this.state.list = list
        this.setState({list})
    }


    handledelete = (id)=>{
      
        console.log(id)
        let b = this.state.list.filter(e=>e.i!==id)
        console.log(b)
        this.setState({list:b})
        console.log(this.state.list)
        
    }

       changee = (e) => {
                    this.setState({ text: e.target.value })
                console.log(this.state.text)}
                
            
    render() { 
        // if(! this.state.list){
        //     this.dist()
        // }
        
              
        return <div>
            {

        //   this.state.list.map(e=><Counter key={e.i} id={e.i}value={e.value} handledelete={this.handledelete}/>)
                <form>
                    <input type="text"  onChange={this.changee} />
                    <input type="email" />
                    <button type="submit">submit</button>
        </form>

        
            }
        </div>
         ;
    }
}
 
// var jj="Ff"
export default counts;